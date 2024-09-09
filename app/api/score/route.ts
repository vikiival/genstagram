import { NextRequest, NextResponse } from "next/server";
import { getFriendsScoreByHandle } from "@/utils/openrank";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const handle = req.nextUrl.searchParams.get("user");

    if (!handle) {
      return NextResponse.json({ error: "missing user handle" });
    }

    const rank = await getFriendsScoreByHandle(handle);
    return NextResponse.json(rank);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json() as string[];
    const casts = await getFriendsScoreByHandle(body);
    return NextResponse.json(casts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}

