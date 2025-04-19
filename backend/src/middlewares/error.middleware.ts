import { HttpError } from "#errors/HttpError.js";
import { NextFunction, Request, Response } from "express";

const errorMiddleware = (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof HttpError) {
    const { statusCode, errors, logging } = err;
    if (logging) {
      console.error(
        JSON.stringify(
          {
            code: err.statusCode,
            errors: err.errors,
            stack: err.stack,
          },
          null,
          2
        )
      );
    }
    res
      .status(statusCode)
      .json({ errors: errors.map(({ message }) => message) });
  } else {
    console.error("Unhandled Error:", err);
    res.status(500).json({
      errors: [{ message: "Internal Server Error" }],
      success: false,
    });
  }
};

export default errorMiddleware;
