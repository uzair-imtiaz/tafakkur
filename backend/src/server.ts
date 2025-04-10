import express from "express";

const app = express();

app.get("/health-check", (_, res) => {
  res.send("OK");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on port ${process.env.PORT || 3000}`);
});
