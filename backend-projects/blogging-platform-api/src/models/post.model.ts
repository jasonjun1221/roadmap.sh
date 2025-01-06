import mongoose from "mongoose";

interface IPost {
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;
