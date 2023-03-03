import express from "express";
const app = express();

/**
 * app.[method]([route], [route handler])
 */

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello!" });
});

export default app;
