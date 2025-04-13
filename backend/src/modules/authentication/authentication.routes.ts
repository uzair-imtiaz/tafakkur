import { catchAsync } from "#utils/catchAsync.js";
import { Router } from "express";
import { login, register } from "./authentication.controller";

const router = Router();

router.post("/register", catchAsync(register));
router.post("/login", catchAsync(login));

export default router;
