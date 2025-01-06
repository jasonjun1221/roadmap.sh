import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(statusCode: number, status: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const globalErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message || "Internal server error";
  const stack = process.env.NODE_ENV === "development" ? err.stack : undefined;

  console.error(err);
  return res.status(statusCode).json({ status, message, stack });
};

export default globalErrorHandler;
