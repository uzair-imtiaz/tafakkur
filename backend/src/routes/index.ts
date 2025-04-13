import authRouter from "#modules/authentication/authentication.routes";
import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);

export default router;
