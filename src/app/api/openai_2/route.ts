import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt");

  return NextResponse.json({ prompt, message: "Hello world!" });
}
