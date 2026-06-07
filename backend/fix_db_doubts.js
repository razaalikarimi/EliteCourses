import mongoose from "mongoose";
import dotenv from "dotenv";
import Doubt from "./models/doubtModel.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB.");

    const result = await Doubt.updateMany(
      { "replies.message": /kYgGwUpZM7U/ },
      {
        $set: {
          "replies.$[elem].message": `Express.js is a popular back-end web application framework for Node.js. It is widely used for building RESTful APIs and web applications because of its minimalist and flexible design.

Its key features include routing, middleware, template engines, error handling, and scalability. Express.js is commonly used for creating web applications, APIs, real-time applications, and microservices.

Source: https://www.youtube.com/watch?v=0IciwnJ6PJI`
        }
      },
      {
        arrayFilters: [{ "elem.message": /kYgGwUpZM7U/ }]
      }
    );

    console.log("Updated documents:", result.modifiedCount);

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

run();
