import { Request, Response, NextFunction } from "express";
import { HttpException } from "../utils/HttpException.js";

export const errorHandler = (
  error: Error | HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const status = error instanceof HttpException ? error.status : 500;
  const message = error.message || "Something went wrong";

  console.error(`[Error] ${status}: ${message}`);

  res.status(status).json({
    success: false,
    status,
    message,
  });
};
