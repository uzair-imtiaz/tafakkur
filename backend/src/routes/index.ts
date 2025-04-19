import authRouter from "#modules/authentication/authentication.routes";
import googleAuthRoutes from "#modules/google-auth/google-auth.routes";

import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);
router.use("/auth", googleAuthRoutes);

export default router;
