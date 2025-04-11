import { Response } from "express";

export const successResponse = <T extends object | any[]>(
  res: Response,
  data: T,
  message = "Request successful",
  statusCode = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
