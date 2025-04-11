import { successResponse } from "#utils/response.js";
import { NextFunction, Request, Response } from "express";
import { loginUser, registerUser } from "./authentication.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    return successResponse(res, user, "Login successful");
  } catch (err) {
    next(err);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name, age, username } = req.body;
    const user = await registerUser(email, password, name, age, username);
    return successResponse(res, user, "Registration successful");
  } catch (err) {
    next(err);
  }
};
