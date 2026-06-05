import { GoogleGenAI } from "@google/genai"
import dotenv from "dotenv"
dotenv.config()

const test = async () => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY })
    console.log("Testing gemini-2.5-flash-lite...")
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: "Hi, answer in one word: YES",
    })
    console.log("Success! Response:", response.text)
  } catch (error) {
    console.error("Gemini 2.5 Flash Lite Error:", error.message || error)
  }
}

test()
