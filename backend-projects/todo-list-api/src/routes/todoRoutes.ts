import express from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todoController";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.get("/", authenticate, getTodos);
router.post("/", authenticate, createTodo);
router.put("/:id", authenticate, updateTodo);
router.delete("/:id", authenticate, deleteTodo);

export default router;