import mongoose from "mongoose";
import dotenv from "dotenv";
import Doubt from "./models/doubtModel.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB.");

    const doubts = await Doubt.find({}).lean();
    console.log("Found doubts:", doubts.length);
    doubts.forEach((d, idx) => {
      console.log(`\n--- Doubt ${idx + 1} ---`);
      console.log(`ID: ${d._id}`);
      console.log(`Title: ${d.title}`);
      console.log(`Status: ${d.status}`);
      if (d.replies) {
        d.replies.forEach((r, rIdx) => {
          console.log(`  [Reply ${rIdx + 1}] Role: ${r.authorRole}, Name: ${r.authorName}`);
          console.log(`  Message: ${r.message}`);
        });
      }
    });

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

run();
