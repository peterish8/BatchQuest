
import { NextRequest, NextResponse } from "next/server";
import { generativeModel } from "@/lib/gemini-api";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const result = await generativeModel.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
