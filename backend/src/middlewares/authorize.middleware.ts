import { HttpError } from "#errors/HttpError";
import { NextFunction, Request, Response } from "express";

const authorizeMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) {
    return next(new HttpError(401, "Unauthorized: No user info"));
  }

  if (user.role !== "admin") {
    return next(
      new HttpError(403, "Forbidden: Admins only", { userId: user.id })
    );
  }

  next();
};

export default authorizeMiddleware;
