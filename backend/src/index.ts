import { errorMiddleware } from "#middlewares";
import express from "express";
import router from "./routes";
import config from "./config";
import { getPgVersion } from "#config/neon.js";
import passport from "passport";
import "#modules/google-auth/passport";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/api", router);
app.use(errorMiddleware);

app.get("/health-check", (_req, res) => {
  res.send("API is up and running!");
});

const server = app.listen(config.PORT || 3000, async () => {
  console.log(`App listening on port ${config.PORT || 3000}`);
  console.log(`Postgres version: ${await getPgVersion()}`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  gracefulShutdown();
});

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

async function gracefulShutdown() {
  console.log("Received shutdown signal, starting graceful shutdown...");

  try {
    await new Promise((resolve) => {
      server.close(resolve);
    });
    console.log("HTTP server closed");

    process.exit(0);
  } catch (err) {
    console.error("Error during shutdown:", err);
    process.exit(1);
  }
}
