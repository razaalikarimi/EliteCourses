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
      
      // search for kYgGwUpZM7U in any field
      const docs = await col.find({
        $or: [
          { url: /kYgGwUpZM7U/i },
          { videoUrl: /kYgGwUpZM7U/i },
          { videoId: /kYgGwUpZM7U/i },
          { description: /kYgGwUpZM7U/i },
          { rawContent: /kYgGwUpZM7U/i },
          { message: /kYgGwUpZM7U/i }
        ]
      }).toArray();

      if (docs.length > 0) {
        console.log(`Found in collection "${colName}":`, docs.length);
        docs.forEach((d) => console.log(`- ID: ${d._id}, Title: ${d.title || d.lectureTitle || d.name || "Untitled"}`));
      }
    }

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

run();
