import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

export async function cleanAndChunkContent(rawContent, resourceType) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const systemPrompt = `You are an expert educational content structurer. 
Your job is to take raw, messy educational text (like YouTube transcripts, OCR'd PDFs, or raw notes) and clean it up into high-quality semantic chunks for a RAG (Retrieval-Augmented Generation) system.

RULES FOR CLEANING:
1. Remove filler words ("um", "uh", "you know the drill").
2. Remove non-educational noise (e.g., [Music], [Applause], "Like and subscribe").
3. Fix capitalization and punctuation to make it readable.
4. Preserve the core educational meaning. DO NOT summarize too aggressively.
5. If the input has timestamps (e.g., 0:01, 1:24), map them to the corresponding cleaned text blocks.

RULES FOR CHUNKING:
1. Do not chunk purely by length. Group sentences by CONCEPT or TOPIC.
2. Aim for chunks of around 300 to 800 characters. If a concept is longer, you can make a longer chunk.
3. Each chunk MUST have a "topic" string (2-5 words describing the core concept).

OUTPUT FORMAT:
You MUST return a JSON object with a "chunks" array. Each item in the array must look exactly like this:
{
  "text": "The cleaned, punctuated educational content.",
  "topic": "Short Topic Description",
  "startTime": "0:01", // Optional, only if found in the raw text for this block
  "endTime": "1:24" // Optional
}

Return ONLY a valid JSON object. No markdown, no wrap codes, just raw JSON.`;

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Resource Type: ${resourceType}\n\nRaw Content:\n${rawContent}` }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1
    });

    const text = response.choices[0]?.message?.content?.trim();
    if (!text) {
      throw new Error("No response text from OpenAI");
    }

    const parsed = JSON.parse(text);
    if (!parsed.chunks || !Array.isArray(parsed.chunks)) {
      throw new Error("Invalid format: expected 'chunks' array");
    }

    return parsed.chunks;
  } catch (error) {
    console.error("OpenAI Chunking Error:", error);
    // Simple fallback chunking if AI fails
    return [
      {
        text: rawContent,
        topic: "General Content",
      }
    ];
  }
}
