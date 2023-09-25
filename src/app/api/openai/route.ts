import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt");

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Say this is a test" },
    ],
    model: "gpt-3.5-turbo",
  });

  return NextResponse.json({ prompt, message: completion.choices });
}
