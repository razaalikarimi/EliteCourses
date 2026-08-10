import mongoose from "mongoose";
import OpenAI from "openai";
import dotenv from "dotenv";
import Content from "./models/contentModel.js";
import Course from "./models/courseModel.js";

dotenv.config();

// Replicating generateAIResponse logic to inspect the prompt and result
const test = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Connected to DB.");

  const currentQuestion = "what is express";
  const history = [];
  const courseTitle = null;

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  let ragContext = "";
  const kbResults = await Content.find(
    { $text: { $search: currentQuestion } },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .limit(2)
    .lean();

  const relevantChunks = [];
  kbResults.forEach(doc => {
    relevantChunks.push({
      title: doc.title,
      topic: "General",
      text: doc.rawContent.slice(0, 500),
      url: doc.url,
      startTime: null,
      sourceType: "knowledge_base",
    });
  });

  if (relevantChunks.length > 0) {
    ragContext = `Retrieved Study Material / Context:\n${relevantChunks.map((chunk, index) =>
      `[Source ${index + 1}] Title: ${chunk.title}\nTopic: ${chunk.topic}\nContent: ${chunk.text}${chunk.url ? `\nLink: ${chunk.url}${chunk.startTime ? ` (starts at ${chunk.startTime})` : ""}` : ""}`
    ).join("\n\n")}\n\nUse the study material above as your primary factual source to answer the student's doubt. If the retrieved material is not relevant or helpful, you can rely on your general knowledge to answer, but prioritize the provided material if possible.`;
  }

  const systemPrompt = `You are a helpful AI Tutor for EliteCourses — an online learning platform for students.

${ragContext}

LANGUAGE RULE (most important — follow strictly):
- Detect the language of the student's question and reply in the EXACT same language.
- If the student writes in English, reply in English.
- If the student writes in Hindi (Roman script / Hinglish), reply in Hinglish.
- If the student writes in pure Hindi (Devanagari), reply in pure Hindi.
- If the student writes in any other language (Urdu, Tamil, etc.), reply in that language.

FORMATTING RULES:
- Do NOT use markdown symbols like **, *, ##, __, or any other markdown formatting.
- Write in plain text only.
- Keep answers to 2 to 3 short paragraphs max.
- Use numbered lists (1. 2. 3.) for steps if needed.
- If the Retrieved Study Material contains a YouTube link or source URL, include it at the end like: "Source: <url>"
- If no source URL is available, do not mention any link.
- Be accurate and stick to the provided study material when available.
- Do not use unnecessary filler phrases, just answer directly.`;

  const prompt = `${systemPrompt}\n\nStudent's current question: ${currentQuestion}`;

  console.log("PROMPT TO OPENAI:\n", prompt);

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [
      { role: "user", content: prompt }
    ]
  });

  console.log("\n=====================\nOPENAI RESPONSE:\n", response.choices[0]?.message?.content);

  mongoose.disconnect();
};

test();
