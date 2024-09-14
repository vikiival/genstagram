import { getUserByFid } from "./fc"

const BASE_URL = "https://graph.cast.k3l.io"

export async function getFriendsScoreByHandle(handle: string  | string[], limit: number = 10): Promise<any> {
  const result = await fetch(
    `${BASE_URL}/scores/personalized/engagement/handles?k=3&limit=${limit}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Array.isArray(handle) ? handle : [handle]),
    }
  );
  const res = await result.json();
  return res.result;
}


export async function getUserScoreByHandle(handle: string  | string[]): Promise<any> {
  const result = await fetch(
    `${BASE_URL}/scores/global/following/handles?lite=false`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Array.isArray(handle) ? handle : [handle]),
    }
  );
  const res = await result.json();
  return res.result;
}

const LIMIT = 25
export async function getFeed(channel: string, offset: number = 0): Promise<any> {
  const result = await fetch(
    `${BASE_URL}/channels/casts/popular/${channel}?lite=false&offset=${Number(offset)}&limit=${LIMIT}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
  const res = await result.json();
  console.log(res)
  return Promise.all(res.result.map(async (c: any) => ({
    ...c,
    pageToken: Number(offset) + LIMIT,
    user: await getUserByFid(c.fid),
    embeds: JSON.parse(c.embeds).filter((e: any) => e.url?.includes("imagedelivery.net")) //.map((e: any) => e.url) //.filter((e: any) => e.includes("imagedelivery.net")),
    
    }))
  );
}