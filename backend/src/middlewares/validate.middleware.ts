import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { HttpError } from "#errors/HttpError";

const validateMiddleware =
  (schema: AnyZodObject, source: "body" | "params" | "query" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req[source]);
      req[source] = result; // optional: replace with parsed + typed data
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const messages = err.errors.map(
          (e) => `${e.path.join(".")}: ${e.message}`
        );
        return next(
          new HttpError(400, "Validation error", { errors: messages })
        );
      }
      next(err);
    }
  };

export default validateMiddleware;
