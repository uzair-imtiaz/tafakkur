import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const { token } = req.user as { token: string };
    res.json({ token });
  }
);

router.get("/failure", (req, res) => {
  res.status(401).json({ message: "Google Authentication Failed" });
});

export default router;
