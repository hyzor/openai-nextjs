import { NextResponse } from "next/server";

import { kv } from "@vercel/kv";
import { Conversation, User } from "@/app/types";

import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

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

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
    model: "gpt-3.5-turbo",
  });

  if (!completion.choices[0].message.content) return NextResponse.error();

  const conversation: Conversation = {
    id: newId,
    creationDate: dateNowIso,
    lastMessageDate: dateNowIso,
    messages: [
      {
        prompt,
        message: completion.choices[0].message.content,
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

  const openAiMsgs = new Array<ChatCompletionMessageParam>();

  openAiMsgs.push({ role: "system", content: "You are a helpful assistant." });

  body.messages.forEach((msg) => {
    openAiMsgs.push({ role: "user", content: msg.prompt });
    openAiMsgs.push({ role: "assistant", content: msg.message });
  });

  openAiMsgs.push({ role: "user", content: prompt });

  const completion = await openai.chat.completions.create({
    messages: openAiMsgs,
    model: "gpt-3.5-turbo",
  });

  if (!completion.choices[0].message.content) return NextResponse.error();

  const conversation: Conversation = {
    id: body.id,
    creationDate: body.creationDate,
    lastMessageDate: new Date().toISOString(),
    messages: [
      ...body.messages,
      {
        prompt,
        message: completion.choices[0].message.content,
      },
    ],
  };

  await kv.hset(`conversation:${body.id}`, conversation);

  return NextResponse.json<Conversation>(conversation);
}
