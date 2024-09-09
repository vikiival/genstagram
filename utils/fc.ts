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
