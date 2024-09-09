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
  console.log(res)
  return res.result;
}