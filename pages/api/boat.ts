// pages/api/boat.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "edge"; // ⚡ Use Edge runtime

export default async function POST(req: Request) {
  try {
    const { messages } = await req.json(); // works in Edge

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      })),
      temperature: 0.6,
    });

    return NextResponse.json({
      success: true,
      response: completion.choices[0].message?.content || "",
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
