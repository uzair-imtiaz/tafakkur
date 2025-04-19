import { successResponse } from "#utils";
import { NextFunction, Request, Response } from "express";
import { loginUser, registerUser } from "./authentication.service";
import { LoginSchema, RegisterSchema } from "./authentication.schemas";

export const login = async (
  req: Request<{}, {}, LoginSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, username, password } = req.body;
    const identifier = email || username!;
    const user = await loginUser(identifier, password);
    return successResponse(res, user, "Login successful");
  } catch (err) {
    next(err);
  }
};

export const register = async (
  req: Request<{}, {}, RegisterSchema>,
    res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name, username } = req.body;
    const user = await registerUser(email, password, name, username);
    return successResponse(res, user, "Registration successful");
  } catch (err) {
    next(err);
  }
};
