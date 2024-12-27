import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateToken = (userId: number, userEmail: string): string => {
  return jwt.sign({ id: userId, email: userEmail }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};

export const sendCookie = (res: Response, token: string): void => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};
