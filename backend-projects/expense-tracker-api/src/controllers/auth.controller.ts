import { Request, Response } from "express";
import bycrypt from "bcryptjs";
import { generateToken, sendCookie } from "../utils/lib";
import prisma from "../prisma";
import asyncHandler from "../middlewares/asyncHandler";
import { AppError } from "../middlewares/globalErrorHandler";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError(400, "fail", "please fill all fields");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError(400, "fail", "user already exists");
  }

  const hashedPassword = await bycrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  const token = generateToken(newUser.id, newUser.email);

  sendCookie(res, token);

  return res.status(201).json({ status: "success", message: "user registered successfully", token });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(400, "fail", "please fill all fields");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError(400, "fail", "wrong email or password");
  }

  const isPasswordMatch = await bycrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new AppError(400, "fail", "wrong email or password");
  }

  const token = generateToken(user.id, user.email);

  sendCookie(res, token);

  return res.status(200).json({ status: "success", message: "user logged in successfully", token });
});
