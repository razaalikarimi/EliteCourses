import mongoose from "mongoose";
import dotenv from "dotenv";
import Content from "./models/contentModel.js";
import Course from "./models/courseModel.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB.");

    const currentQuestion = "what is express";
    
    // Search Knowledge Base (MongoDB) for relevant material using text index
    const kbResults = await Content.find(
      { $text: { $search: currentQuestion } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(2)
      .lean();

    console.log("KB Results length:", kbResults.length);
    kbResults.forEach((doc, idx) => {
      console.log(`[KB ${idx}] Title: ${doc.title}, URL: ${doc.url}`);
      if (doc.chunks) {
        console.log(`  Number of chunks: ${doc.chunks.length}`);
        doc.chunks.slice(0, 2).forEach((c, cIdx) => {
          console.log(`    Chunk ${cIdx}: topic=${c.topic}, startTime=${c.startTime}, text=${c.text.slice(0, 100)}...`);
        });
      }
    });

    const keywords = currentQuestion
      .split(/\s+/)
      .filter(w => w.length > 2)
      .slice(0, 5);

    const lectureResults = await Course.find({
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
      .lean();

    console.log("Lecture Results length:", lectureResults.length);

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

run();
