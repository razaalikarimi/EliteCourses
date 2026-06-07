import { GoogleGenAI } from "@google/genai"
import dotenv from "dotenv"
import Doubt from "../models/doubtModel.js"
import User from "../models/userModel.js"
import Course from "../models/courseModel.js"
import Content from "../models/contentModel.js"
dotenv.config()

const filterHallucinatedUrls = (text, relevantChunks) => {
  if (!text) return text;
  
  const allowedUrls = relevantChunks.map(c => c.url).filter(Boolean);
  const urlRegex = /https?:\/\/[^\s]+/gi;
  
  let filteredText = text.replace(urlRegex, (url) => {
    const cleanUrl = url.replace(/[.,)]+$/, "");
    const isAllowed = allowedUrls.some(allowed => {
      if (allowed === cleanUrl) return true;
      const getYouTubeId = (u) => {
        const match = u.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
      };
      const allowedId = getYouTubeId(allowed);
      const cleanId = getYouTubeId(cleanUrl);
      return allowedId && cleanId && allowedId === cleanId;
    });
    return isAllowed ? url : "";
  });

  // Remove trailing "Source:" or "Link:" headers if the URL was removed
  filteredText = filteredText
    .replace(/(?:Source|Link|Video|Reference):\s*$/gim, "")
    .replace(/^\s*[\r\n]/gm, "")
    .trim();

  return filteredText;
};

// ─────────────────────────────────────────────
// Gemini AI Response Generator (with RAG support)
// ─────────────────────────────────────────────
const generateAIResponse = async (currentQuestion, history = [], courseTitle = null, userId = null) => {
  let userCustomKey = null
  try {
    if (userId) {
      const user = await User.findById(userId).select("customGeminiApiKey")
      if (user?.customGeminiApiKey && user.customGeminiApiKey.trim()) {
        userCustomKey = user.customGeminiApiKey.trim()
      }
    }
    const apiKey = userCustomKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY
    const ai = new GoogleGenAI({ apiKey })

    const historyText = history.length > 0
      ? history
          .slice(-6) // last 6 messages for context
          .map(r => {
            const role = r.authorRole === "student" ? "Student" : r.authorRole === "educator" ? "Educator" : "AI Tutor"
            return `${role}: ${r.message}`
          })
          .join("\n\n")
      : null

    // Search Knowledge Base (MongoDB) for relevant material using text index
    let ragContext = "";
    const relevantChunks = [];
    try {
      // ── 1. Search ingested Knowledge Base (YouTube, articles, notes) ──
      const kbResults = await Content.find(
        { $text: { $search: currentQuestion } },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .limit(2)
        .lean();

      // ── 2. Search instructor course lectures by title keyword match ──
      const keywords = currentQuestion
        .split(/\s+/)
        .filter(w => w.length > 2)
        .slice(0, 5);

      const lectureResults = keywords.length > 0
        ? await Course.find({
            isPublished: true,
            $or: [
              { title: { $regex: keywords.join("|"), $options: "i" } },
              { description: { $regex: keywords.join("|"), $options: "i" } },
              { category: { $regex: keywords.join("|"), $options: "i" } },
            ],
          })
            .populate({
              path: "lectures",
              match: { lectureTitle: { $regex: keywords.join("|"), $options: "i" } },
            })
            .populate("creator", "name")
            .limit(3)
            .lean()
        : [];

      // Helper: convert "MM:SS" or "HH:MM:SS" to seconds for YouTube timestamp
      const timeToSeconds = (timeStr) => {
        if (!timeStr) return null;
        const parts = timeStr.split(":").map(Number);
        if (parts.length === 2) return parts[0] * 60 + parts[1];
        if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
        return null;
      };

      // ── PRIORITY 1: Instructor course lectures (max 3) ──
      let lectureCount = 0;
      for (const course of lectureResults) {
        if (lectureCount >= 3) break;
        const matchedLectures = (course.lectures || []).filter(l => l && l.videoUrl);
        for (const lecture of matchedLectures) {
          if (lectureCount >= 3) break;
          relevantChunks.push({
            title: `${course.title} — ${lecture.lectureTitle}`,
            topic: lecture.lectureTitle,
            text: `This is a lecture from the course "${course.title}" by instructor ${course.creator?.name || "your educator"}. The lecture covers: "${lecture.lectureTitle}".`,
            url: lecture.videoUrl,
            startTime: null,
            sourceType: "course_lecture",
          });
          lectureCount++;
        }
      }

      // ── PRIORITY 2: Knowledge Base — YouTube & ingested notes (max 2) ──
      let kbCount = 0;
      kbResults.forEach(doc => {
        if (kbCount >= 2) return;
        if (doc.chunks && doc.chunks.length > 0) {
          const chunk = doc.chunks[0]; // take only top chunk per KB doc
          let chunkUrl = doc.url || "";
          if (chunk.startTime && doc.url && (doc.url.includes("youtube.com") || doc.url.includes("youtu.be"))) {
            const secs = timeToSeconds(chunk.startTime);
            if (secs !== null) {
              chunkUrl = doc.url.includes("?")
                ? `${doc.url}&t=${secs}`
                : `${doc.url}?t=${secs}`;
            }
          }
          relevantChunks.push({
            title: doc.title,
            topic: chunk.topic,
            text: chunk.text,
            url: chunkUrl,
            startTime: chunk.startTime || null,
            sourceType: "knowledge_base",
          });
        } else {
          relevantChunks.push({
            title: doc.title,
            topic: "General",
            text: doc.rawContent.slice(0, 500),
            url: doc.url,
            startTime: null,
            sourceType: "knowledge_base",
          });
        }
        kbCount++;
      });

      if (relevantChunks.length > 0) {
        ragContext = `Retrieved Study Material / Context:\n${relevantChunks.map((chunk, index) =>
          `[Source ${index + 1}] Title: ${chunk.title}\nTopic: ${chunk.topic}\nContent: ${chunk.text}${chunk.url ? `\nLink: ${chunk.url}${chunk.startTime ? ` (starts at ${chunk.startTime})` : ""}` : ""}`
        ).join("\n\n")}\n\nUse the study material above as your primary factual source to answer the student's doubt. If the retrieved material is not relevant or helpful, you can rely on your general knowledge to answer, but prioritize the provided material if possible.`;
      }
    } catch (searchError) {
      console.log("RAG search error in generateAIResponse:", searchError);
    }


    const courseContext = courseTitle ? `This question is related to the course: "${courseTitle}".` : ""

    const systemPrompt = `You are a helpful AI Tutor for EliteCourses — an online learning platform for students.
${courseContext}

${ragContext}

LANGUAGE RULE (most important — follow strictly):
- Detect the language of the student's question and reply in the EXACT same language.
- If the student writes in English, reply in English.
- If the student writes in Hindi (Roman script / Hinglish), reply in Hinglish.
- If the student writes in pure Hindi (Devanagari), reply in pure Hindi.
- If the student writes in any other language (Urdu, Tamil, etc.), reply in that language.
- Match the student's language naturally. Never switch to a different language than what the student used.

FORMATTING RULES:
- Do NOT use markdown symbols like **, *, ##, __, or any other markdown formatting.
- Write in plain text only.
- Keep answers to 2 to 3 short paragraphs max.
- Use numbered lists (1. 2. 3.) for steps if needed.
- If the Retrieved Study Material contains a YouTube link or source URL, include it at the end like: "Source: <url>"
- If no source URL is available, do not mention any link.
- Be accurate and stick to the provided study material when available.
- Do not use unnecessary filler phrases, just answer directly.`

    const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase()

    if ((provider === "openai" || provider === "chatgpt") && process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "your_openai_api_key_here") {
      console.log("Using OpenAI ChatGPT Tutor...")
      const openAiMessages = [
        { role: "system", content: systemPrompt }
      ]

      if (history && history.length > 0) {
        history.slice(-6).forEach(r => {
          openAiMessages.push({
            role: r.authorRole === "student" ? "user" : "assistant",
            content: r.message
          })
        })
      }

      openAiMessages.push({ role: "user", content: currentQuestion })

      const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: openAiMessages
        })
      })

      if (!openAiResponse.ok) {
        const errorData = await openAiResponse.json()
        throw new Error(errorData.error?.message || `OpenAI API returned status ${openAiResponse.status}`)
      }

      const data = await openAiResponse.json()
      const rawText = data.choices[0]?.message?.content || "I'm having trouble generating a response right now. Please try again."
      return filterHallucinatedUrls(rawText, relevantChunks)
    } else {
      console.log("Using Google Gemini Tutor...")
      const prompt = `${systemPrompt}\n\n${historyText ? `Previous conversation:\n${historyText}\n\n` : ""}Student's current question: ${currentQuestion}`

      let response
      try {
        response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        })
      } catch (apiErr) {
        console.log("Gemini 2.5 Flash failed or exhausted. Trying Gemini 2.5 Flash Lite fallback...")
        response = await ai.models.generateContent({
          model: "gemini-2.5-flash-lite",
          contents: prompt,
        })
      }

      const rawText = response.text || "I'm having trouble generating a response right now. Please try again."
      return filterHallucinatedUrls(rawText, relevantChunks)
    }
  } catch (error) {
    console.log("AI tutor error:", error)

    const isQuotaOrRateLimit = (err) => {
      if (!err) return false
      if (err.status === 429 || err.statusCode === 429) return true
      const msg = (err.message || "").toLowerCase()
      const statusStr = (err.status || "").toString().toLowerCase()
      return msg.includes("429") || 
             msg.includes("quota") || 
             msg.includes("exhausted") || 
             msg.includes("rate_limit") || 
             msg.includes("rate limit") ||
             statusStr.includes("exhausted") ||
             statusStr.includes("429")
    }

    if (isQuotaOrRateLimit(error)) {
      if (userCustomKey) {
        return "I'm sorry, your custom Gemini API Key has exceeded its rate limit or quota. Please check your Google AI Studio usage/billing or wait a few seconds before trying again."
      } else {
        return "The AI Tutor is temporarily busy because the platform's free Gemini quota has been reached. Please try again in a few seconds, or escalate this doubt to a mentor. You can also configure your own Gemini API Key in your Profile to bypass platform limits."
      }
    }

    const errStr = (error.message || "").toLowerCase()
    if (errStr.includes("api key") || errStr.includes("api_key_invalid") || errStr.includes("invalid api key") || (error.status === 400 && errStr.includes("key"))) {
      if (userCustomKey) {
        return "It seems your custom Gemini API Key is invalid or expired. Please update it in your Profile settings."
      }
    }

    return "I'm sorry, I couldn't process your doubt at the moment. Please try again or escalate to a mentor."
  }
}

// ─────────────────────────────────────────────
// Create Doubt — Student submits a doubt
// ─────────────────────────────────────────────
export const createDoubt = async (req, res) => {
  try {
    const { description, courseId } = req.body
    const userId = req.userId

    if (!description?.trim()) {
      return res.status(400).json({ message: "Please describe your doubt." })
    }

    const user = await User.findById(userId).select("name")
    if (!user) return res.status(404).json({ message: "User not found." })

    // Generate a concise title
    const title =
      description.trim().length > 80
        ? description.trim().slice(0, 80) + "..."
        : description.trim()

    // Fetch course title if courseId provided
    let courseTitle = null
    if (courseId) {
      const course = await Course.findById(courseId).select("title")
      courseTitle = course?.title || null
    }

    // Create the doubt with student's first message
    const doubt = new Doubt({
      userId,
      courseId: courseId || null,
      title,
      description: description.trim(),
      status: "open",
      replies: [
        {
          authorId: userId,
          authorRole: "student",
          authorName: user.name,
          message: description.trim(),
        },
      ],
    })

    await doubt.save()

    // Generate AI response
    const aiAnswer = await generateAIResponse(description, [], courseTitle, userId)

    // Add AI reply and mark as resolved
    doubt.replies.push({
      authorId: null,
      authorRole: "ai",
      authorName: "AI Tutor",
      message: aiAnswer,
    })
    doubt.status = "resolved"
    await doubt.save()

    res.status(201).json({ success: true, doubt })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error while creating doubt." })
  }
}

// ─────────────────────────────────────────────
// Get My Doubts — Student's doubt list
// ─────────────────────────────────────────────
export const getMyDoubts = async (req, res) => {
  try {
    const userId = req.userId

    const doubts = await Doubt.find({ userId })
      .sort({ updatedAt: -1 })
      .populate("courseId", "title thumbnail")
      .lean()

    res.json({ success: true, doubts })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error." })
  }
}

// ─────────────────────────────────────────────
// Get Doubt By ID — Full thread
// ─────────────────────────────────────────────
export const getDoubtById = async (req, res) => {
  try {
    const { doubtId } = req.params
    const userId = req.userId

    const doubt = await Doubt.findById(doubtId)
      .populate("courseId", "title thumbnail")
      .lean()

    if (!doubt) return res.status(404).json({ message: "Doubt not found." })

    // Allow student who owns it OR educators
    const user = await User.findById(userId).select("role")
    if (doubt.userId.toString() !== userId && user?.role !== "educator") {
      return res.status(403).json({ message: "Not authorized." })
    }

    res.json({ success: true, doubt })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error." })
  }
}

// ─────────────────────────────────────────────
// Send Follow-Up — Continue conversation
// ─────────────────────────────────────────────
export const sendFollowUp = async (req, res) => {
  try {
    const { doubtId } = req.params
    const { message } = req.body
    const userId = req.userId

    if (!message?.trim()) {
      return res.status(400).json({ message: "Message cannot be empty." })
    }

    const doubt = await Doubt.findById(doubtId)
    if (!doubt) return res.status(404).json({ message: "Doubt not found." })

    if (doubt.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized." })
    }

    if (doubt.status === "escalated") {
      return res.status(400).json({ message: "This doubt is escalated to a mentor. Wait for their reply." })
    }

    const user = await User.findById(userId).select("name")

    // Fetch course title for context
    let courseTitle = null
    if (doubt.courseId) {
      const course = await Course.findById(doubt.courseId).select("title")
      courseTitle = course?.title || null
    }

    // Add student's follow-up
    doubt.replies.push({
      authorId: userId,
      authorRole: "student",
      authorName: user.name,
      message: message.trim(),
    })

    // Generate AI response with full conversation history
    const aiAnswer = await generateAIResponse(message.trim(), doubt.replies.slice(0, -1), courseTitle, userId)

    // Add AI reply
    doubt.replies.push({
      authorId: null,
      authorRole: "ai",
      authorName: "AI Tutor",
      message: aiAnswer,
    })

    doubt.status = "resolved"
    await doubt.save()

    res.json({ success: true, doubt })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error." })
  }
}

// ─────────────────────────────────────────────
// Escalate Doubt — Send to mentor
// ─────────────────────────────────────────────
export const escalateDoubt = async (req, res) => {
  try {
    const { doubtId } = req.params
    const userId = req.userId

    const doubt = await Doubt.findById(doubtId)
    if (!doubt) return res.status(404).json({ message: "Doubt not found." })

    if (doubt.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized." })
    }

    doubt.status = "escalated"

    // Add a system message in thread
    doubt.replies.push({
      authorId: null,
      authorRole: "ai",
      authorName: "System",
      message: "⚡ This doubt has been escalated to a mentor. You'll get a reply soon.",
    })

    await doubt.save()

    res.json({ success: true, doubt })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error." })
  }
}

// ─────────────────────────────────────────────
// Submit Feedback — Helpful / Not helpful
// ─────────────────────────────────────────────
export const submitFeedback = async (req, res) => {
  try {
    const { doubtId } = req.params
    const { feedback } = req.body // 'helpful' | 'not_helpful'
    const userId = req.userId

    if (!["helpful", "not_helpful"].includes(feedback)) {
      return res.status(400).json({ message: "Invalid feedback value." })
    }

    const doubt = await Doubt.findById(doubtId)
    if (!doubt) return res.status(404).json({ message: "Doubt not found." })

    if (doubt.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized." })
    }

    doubt.feedback = feedback
    await doubt.save()

    res.json({ success: true, feedback })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error." })
  }
}

// ─────────────────────────────────────────────
// Get Escalated Doubts — Educator panel
// ─────────────────────────────────────────────
export const getEscalatedDoubts = async (req, res) => {
  try {
    const userId = req.userId
    const user = await User.findById(userId).select("role")

    if (user?.role !== "educator") {
      return res.status(403).json({ message: "Only educators can view escalated doubts." })
    }

    const doubts = await Doubt.find({ status: "escalated" })
      .sort({ updatedAt: -1 })
      .populate("userId", "name photoUrl email")
      .populate("courseId", "title thumbnail")
      .lean()

    res.json({ success: true, doubts })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error." })
  }
}

// ─────────────────────────────────────────────
// Educator Reply — Reply to escalated doubt
// ─────────────────────────────────────────────
export const educatorReply = async (req, res) => {
  try {
    const { doubtId } = req.params
    const { message, markResolved } = req.body
    const userId = req.userId

    const user = await User.findById(userId).select("name role")
    if (user?.role !== "educator") {
      return res.status(403).json({ message: "Only educators can reply." })
    }

    if (!message?.trim()) {
      return res.status(400).json({ message: "Reply message cannot be empty." })
    }

    const doubt = await Doubt.findById(doubtId)
    if (!doubt) return res.status(404).json({ message: "Doubt not found." })

    // Add educator's reply
    doubt.replies.push({
      authorId: userId,
      authorRole: "educator",
      authorName: user.name,
      message: message.trim(),
    })

    if (markResolved) {
      doubt.status = "resolved"
    }

    await doubt.save()

    res.json({ success: true, doubt })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error." })
  }
}
