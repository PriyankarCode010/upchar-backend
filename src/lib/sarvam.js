import { SarvamAIClient } from "sarvamai";

const client = new SarvamAIClient({
    apiSubscriptionKey: process.env.SARVAM_API_KEY
});

const response = await client.text.translate({
    input: "Hi, My Name is Vinayak.",
    source_language_code: "auto",
    target_language_code: "gu-IN",
    speaker_gender: "Male"
});

console.log(response);
