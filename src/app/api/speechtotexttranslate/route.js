import { SarvamAIClient } from "sarvamai";
import fs from "fs";

const API_KEY = process.env.SARVAM_API_KEY;
const FILE_PATH = "path/to/audio.wav"; // or .mp3

async function main() {
  const client = new SarvamAIClient({ apiSubscriptionKey: API_KEY });

  const buffer = fs.readFileSync(FILE_PATH);
  const mimeType = FILE_PATH.endsWith(".mp3") ? "audio/mpeg" : "audio/wav";

  const file = new File(
    [buffer],
    FILE_PATH.split("/").pop() || "audio",
    { type: mimeType }
  );

  const response = await client.speechToText.translate(file, {
    model: "saaras:v2.5"
  });

  console.log(response);
}

main().catch(console.error);
