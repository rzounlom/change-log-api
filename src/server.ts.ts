import cors from "cors";
import express from "express";
import morgan from "morgan";
import router from "./router";

const app = express();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * app.[method]([route], [route handler])
 */

app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello!" });
});

export default app;
