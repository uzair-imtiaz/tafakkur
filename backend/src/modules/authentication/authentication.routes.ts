import { validateMiddleware } from "#middlewares";
import { catchAsync } from "#utils";
import { Router } from "express";
import { login, register } from "./authentication.controller";
import { loginScehma, registerSchema } from "./authentication.schemas";

const router = Router();

router.post(
  "/register",
  validateMiddleware(registerSchema),
  catchAsync(register)
);
router.post("/login", validateMiddleware(loginScehma), catchAsync(login));

export default router;
