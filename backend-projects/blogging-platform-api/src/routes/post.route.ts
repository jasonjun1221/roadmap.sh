import express from "express";
import { createPost, getPosts, getPost, updatePost, deletePost } from "../controllers/post.controller";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
