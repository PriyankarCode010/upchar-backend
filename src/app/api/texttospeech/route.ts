import { SarvamAIClient } from "sarvamai";
import { NextRequest, NextResponse } from "next/server";

const client = new SarvamAIClient({
  apiSubscriptionKey: process.env.SARVAM_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { text, lang } = await req.json();

    const response = await client.textToSpeech.convert({
      text,
      target_language_code: lang || 'hi-IN',
    });

    console.log("🔊 TTS Response:", response);

    return NextResponse.json({ audioUrl: response.audios });
  } catch (error) {
    console.error("TTS failed:", error);
    return NextResponse.json({ error: "TTS failed" }, { status: 500 });
  }
}
