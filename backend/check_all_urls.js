import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB.");

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    for (const colInfo of collections) {
      const colName = colInfo.name;
      const col = db.collection(colName);
      
      const docs = await col.find({}).toArray();
      docs.forEach((d) => {
        if (d.videoUrl || d.url) {
          console.log(`[${colName}] ID: ${d._id}, Title: ${d.title || d.lectureTitle || d.name || "Untitled"}`);
          if (d.url) console.log(`  url: ${d.url}`);
          if (d.videoUrl) console.log(`  videoUrl: ${d.videoUrl}`);
        }
        if (d.lectures && Array.isArray(d.lectures)) {
          d.lectures.forEach((l, idx) => {
            if (l.videoUrl) {
              console.log(`[${colName} - Lecture ${idx}] Title: ${l.lectureTitle}, videoUrl: ${l.videoUrl}`);
            }
          });
        }
      });
    }

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

run();
