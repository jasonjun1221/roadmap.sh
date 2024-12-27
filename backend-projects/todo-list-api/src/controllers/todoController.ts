import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTodos = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const sortBy = req.query.orderBy === "desc" ? "desc" : "asc";
  const userId = (req as any).user.id;

  try {
    const todos = await prisma.todo.findMany({
      where: { userId },
      take: limit,
      skip: (page - 1) * limit,
      select: { id: true, title: true, description: true },
      orderBy: { id: sortBy },
    });

    return res.status(200).json({ data: todos, page, limit, total: todos.length });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const todo = await prisma.todo.create({
      data: { title, description, userId: (req as any).user.id },
      select: { id: true, title: true, description: true },
    });

    return res.status(201).json(todo);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const id = Number(req.params.id);

  if (!title || !description) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const todo = await prisma.todo.findUnique({ where: { id } });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.userId !== (req as any).user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { title, description },
      select: { id: true, title: true, description: true },
    });

    return res.status(200).json({ data: updatedTodo });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const todo = await prisma.todo.findUnique({ where: { id } });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.userId !== (req as any).user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await prisma.todo.delete({ where: { id } });

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
