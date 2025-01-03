import { Request, Response } from "express";
import prisma from "../prisma";
import { Category } from "@prisma/client";
import { getFilter } from "../utils/lib";
import asyncHandler from "../middlewares/asyncHandler";
import { AppError } from "../middlewares/globalErrorHandler";

export const createExpense = asyncHandler(async (req: Request, res: Response) => {
  const { amount, description } = req.body;
  const category = req.body.category.toUpperCase().trim() as Category;
  const userId = (req as any).user.id;

  if (!amount || !description || !category) {
    throw new AppError(400, "fail", "please fill all fields");
  }

  const validCategory = Object.values(Category).includes(category);
  if (!validCategory) {
    throw new AppError(400, "fail", "invalid category");
  }

  const expense = await prisma.expense.create({
    data: { amount, description, category, userId },
  });

  return res.status(201).json({ status: "success", message: "expense created successfully", expense });
});

export const getExpenses = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const filter = req.query.filter as string | undefined;
  const startDate = req.query.startDate as string | undefined;
  const endDate = req.query.endDate as string | undefined;

  const filterOptions = startDate && endDate ? { gte: new Date(startDate), lte: new Date(endDate) } : getFilter(filter);

  const expenses = await prisma.expense.findMany({
    where: {
      userId,
      date: filterOptions,
    },
  });

  return res.status(200).json({ status: "success", total: expenses.length, expenses });
});

export const updateExpense = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { amount, description } = req.body;
  const category = req.body.category.toUpperCase().trim() as Category;
  const userId = (req as any).user.id;

  if (!amount || !description || !category) {
    throw new AppError(400, "fail", "please fill all fields");
  }

  const validCategory = Object.values(Category).includes(category);
  if (!validCategory) {
    throw new AppError(400, "fail", "invalid category");
  }

  const existingExpense = await prisma.expense.findUnique({ where: { id } });
  if (!existingExpense) {
    throw new AppError(404, "fail", "expense not found");
  }

  if (existingExpense.userId !== userId) {
    throw new AppError(403, "fail", "unauthorized");
  }

  const updatedExpense = await prisma.expense.update({
    where: { id },
    data: { amount, description, category },
  });

  return res.status(200).json({ status: "success", message: "expense updated successfully", expense: updatedExpense });
});

export const deleteExpense = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const userId = (req as any).user.id;

  const existingExpense = await prisma.expense.findUnique({ where: { id } });
  if (!existingExpense) {
    throw new AppError(404, "fail", "expense not found");
  }

  if (existingExpense.userId !== userId) {
    throw new AppError(403, "fail", "unauthorized");
  }

  await prisma.expense.delete({ where: { id } });

  return res.status(200).json({ status: "success", message: "expense deleted successfully" });
});
