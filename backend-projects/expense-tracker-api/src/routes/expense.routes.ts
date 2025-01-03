import express from "express";
import { createExpense, deleteExpense, getExpenses, updateExpense } from "../controllers/expense.controller";

const router = express.Router();

router.post("/", createExpense);
router.get("/", getExpenses);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
