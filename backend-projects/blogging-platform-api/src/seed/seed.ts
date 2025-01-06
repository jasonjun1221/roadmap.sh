import mongoose from "mongoose";
import Post from "../models/post.model";
import data from "./data.json";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    await Post.deleteMany({});
    await Post.create(data);

    console.log("Data imported successfully");
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
})();
