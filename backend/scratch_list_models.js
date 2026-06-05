import { GoogleGenAI } from "@google/genai"
import dotenv from "dotenv"
dotenv.config()

const test = async () => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY })
    const response = await ai.models.list()
    
    console.log("Listing all available models using async iterator:")
    for await (const m of response) {
      if (m.name.includes("gemini") || m.name.includes("flash") || m.name.includes("pro")) {
        console.log(`- ${m.name}`);
      }
    }
  } catch (error) {
    console.error("Error listing models:", error)
  }
}

test()
