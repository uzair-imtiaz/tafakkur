import { errorMiddleware } from "#middlewares";
import express from "express";

const app = express();

app.use(express.json());

app.use(errorMiddleware);

app.get("/healthcheck", (_req, res) => {
  res.send("API is up and running!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on port ${process.env.PORT || 3000}`);
});
