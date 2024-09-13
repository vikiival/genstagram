export async function getFnameFromFid(fid: any): Promise<any> {
  const result = await fetch(
    `https://hub.pinata.cloud/v1/userDataByFid?fid=${fid}`
    // &user_data_type=USER_DATA_TYPE_USERNAME`,
  );
  const res = await result.json();
  const data = res.messages.reduce((acc:any, message: any) => {
    const { type, value } = message.data.userDataBody;
    acc[type] = value;
    return acc;
  }, {});
  if (Object.keys(data).length === 0) {
    return {
      id: fid,
      name: "Unknown",
      pfp: null,
    };
  }
  return {
    id: fid,
    name: data.USER_DATA_TYPE_USERNAME,
    pfp: data.USER_DATA_TYPE_PFP,
  }
}

export async function cronFeed(channel: any, nextPage: any) {
  try {
    const result = await fetch(
      `https://hub.pinata.cloud/v1/castsByParent?url=${channel}&pageSize=20&reverse=true&pageToken=${nextPage}`,
    );
    const resultData = await result.json();
    const pageToken = resultData.nextPageToken;
    const casts = resultData.messages;
    const simplifiedCasts = await Promise.all(
      casts.map(async (cast: any) => {
        const fname = await getFnameFromFid(cast.data.fid);
        return {
          id: cast.data.fid,
          timestamp: cast.data.timestamp,
          fid: fname.name,
          pfp: fname.pfp,
          castAddBody: cast.data.castAddBody,
          pageToken: pageToken,
        };
      }),
    );
    return simplifiedCasts;
  } catch (error) {
    console.log(error);
    return error;
  }
}


export async function getUserByFid(fid: any): Promise<any> {
  const result = await fetch(
    `https://client.warpcast.com/v2/user?fid=${fid}`
  );
  if (result.ok) {
    const res = await result.json();
    return res.result?.user;
  }
  
  return null;
}

export async function getFollowersByChannel(channel: any, nextPage: any): Promise<any> {
  const result = await fetch(
    `https://client.warpcast.com/v2/channel-followers?channelKey=${channel}&limit=25` + (nextPage ? `&cursor=${nextPage}` : "")
  );
  const res = await result.json();
  console.log(JSON.stringify(res, null, 2))
  const { users } =  res.result;
  const pageToken = res.next.cursor
  // return id, username, displayName, pfp, bio, location, followerCount, followingCount
  return users.map((user: any) => {
    return {
      id: user.fid,
      fid: user.username,
      username: user.username,
      displayName: user.displayName,
      pfp: user.pfp.url,
      bio: user.profile.bio.text,
      location: user.profile.location.description,
      followerCount: user.followerCount,
      followingCount: user.followingCount,
      pageToken: pageToken,
    }
  })
}
