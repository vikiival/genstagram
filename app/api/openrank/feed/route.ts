import { NextRequest, NextResponse } from "next/server";
import { getFeed } from "@/utils/openrank";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const casts = await getFeed(body.channel, body.nextPage);
    return NextResponse.json(casts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}
