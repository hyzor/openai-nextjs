import { NextResponse } from "next/server";

import { kv } from "@vercel/kv";
import { Conversation, User } from "@/app/types";

//import OpenAI from "openai";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt");
  const userId = searchParams.get("userId");
  if (!prompt || !userId) return NextResponse.error();

  const user = await kv.hgetall<User>(`user:${userId}`);
  if (!user) return;

  const newId = await kv.incr("conversation:id");
  const newConversations = [...user.conversations, newId];

  const dateNowIso = new Date().toISOString();

  const conversation: Conversation = {
    id: newId,
    creationDate: dateNowIso,
    lastMessageDate: dateNowIso,
    messages: [
      {
        prompt,
        message: "Hello world!",
      },
    ],
  };

  await kv.hset(`user:${userId}`, { conversations: newConversations });
  await kv.hset(`conversation:${newId}`, conversation);

  return NextResponse.json<Conversation>(conversation);
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt");

  if (!prompt) return NextResponse.error();

  const body = (await req.json()) as Conversation;

  const conversation: Conversation = {
    id: body.id,
    creationDate: body.creationDate,
    lastMessageDate: new Date().toISOString(),
    messages: [
      ...body.messages,
      {
        prompt,
        message: "Hello world!",
      },
    ],
  };

  await kv.hset(`conversation:${body.id}`, conversation);

  return NextResponse.json<Conversation>(conversation);
}
