import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get("conversationId") || "";

  const conversation = await kv.hgetall(`conversation:${conversationId}`);

  return NextResponse.json(conversation);
}
