"use server";

import { kv } from "@vercel/kv";
import { Conversation, User } from "./types";

export async function getConversationsForUser(userId: number) {
  const user = await kv.hgetall<User>(`user:${userId}`);

  if (!user) return;

  const conversations = user.conversations;

  const result = [];

  for (const id of conversations) {
    const conversation = await kv.hgetall<Conversation>(`conversation:${id}`);

    if (!conversation) continue;

    result.push(conversation);
  }

  return result;
}

export async function deleteConversation(
  userId: number,
  conversationId: number
) {
  const user = await kv.hgetall<User>(`user:${userId}`);

  if (!user) return;

  const filtered = user.conversations.filter((conv) => conv !== conversationId);

  await kv.hset(`user:${userId}`, { conversations: filtered });

  const keys = await kv.hkeys(`conversation:${conversationId}`);

  await kv.hdel(`conversation:${conversationId}`, ...keys);
}
