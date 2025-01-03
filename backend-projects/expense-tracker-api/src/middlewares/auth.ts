import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.cookie?.split("=")[1];

  if (!token) {
    return res.status(401).json({ status: "fail", message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
  } catch (error) {
    return res.status(401).json({ status: "fail", message: "unauthorized" });
  }
  next();
};
