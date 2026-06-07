import mongoose from "mongoose";
import dotenv from "dotenv";
import Content from "./models/contentModel.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB.");

    const items = await Content.find({ url: /youtube\.com|youtu\.be/i }).lean();
    console.log("Found YouTube items:", items.length);
    items.forEach((item) => {
      console.log(`- ID: ${item._id}`);
      console.log(`  Title: ${item.title}`);
      console.log(`  URL: ${item.url}`);
    });

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

run();
