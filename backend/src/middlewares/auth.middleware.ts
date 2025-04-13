import config from "#config/index.js";
import { HttpError } from "#errors/HttpError.js";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new HttpError(401, "Unauthorized");
    }
    const decoded = jwt.verify(token, config.SECRET_KEY || "");
    res.locals.user = (decoded as JwtPayload).id;
    next();
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
