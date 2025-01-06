import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import Post from "../models/post.model";
import { AppError } from "../middlewares/globalErrorHandler";

export const createPost = asyncHandler(async (req: Request, res: Response) => {
  const { title, content, category, tags } = req.body;

  if (!title || !content || !category || !tags) {
    throw new AppError(400, "fail", "all fields are required");
  }

  const tagsArray = tags
    .split(",")
    .map((tag: string) => tag.trim())
    .filter((tag: string) => /^[a-zA-Z]+$/.test(tag));

  if (tags.length === 0) {
    throw new AppError(400, "fail", "tags must be alphabets only");
  }

  const post = await Post.create({ title: title.trim(), content: content.trim(), category: category.trim(), tags: tagsArray });

  return res.status(201).json({ status: "success", data: post });
});

export const getPosts = asyncHandler(async (req: Request, res: Response) => {
  const term = req.query.term?.toString().trim();

  if (term) {
    const posts = await Post.find({
      $or: [
        { title: { $regex: term, $options: "i" } },
        { content: { $regex: term, $options: "i" } },
        { category: { $regex: term, $options: "i" } },
      ],
    });

    if (posts.length === 0) {
      throw new AppError(404, "fail", "no posts found");
    }

    return res.status(200).json({ status: "success", data: posts });
  }

  const posts = await Post.find();
  return res.status(200).json({ status: "success", data: posts });
});

export const getPost = asyncHandler(async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    throw new AppError(404, "fail", "post not found");
  }

  return res.status(200).json({ status: "success", data: post });
});

export const updatePost = asyncHandler(async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    throw new AppError(404, "fail", "post not found");
  }

  const { title, content, category, tags } = req.body;

  if (!title || !content || !category || !tags) {
    throw new AppError(400, "fail", "all fields are required");
  }

  const tagsArray = tags
    .split(",")
    .map((tag: string) => tag.trim())
    .filter((tag: string) => /^[a-zA-Z]+$/.test(tag));

  if (tagsArray.length === 0) {
    throw new AppError(400, "fail", "tags must be alphabets only");
  }

  post.title = title.trim();
  post.content = content.trim();
  post.category = category.trim();
  post.tags = tagsArray;

  await post.save();

  return res.status(200).json({ status: "success", data: post });
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    throw new AppError(404, "fail", "post not found");
  }

  await post.deleteOne();

  return res.status(204).json({ status: "success", data: null });
});
