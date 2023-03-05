import { createNewUser, signin } from "./handlers/user";

import cors from "cors";
import express from "express";
import morgan from "morgan";
import productRouter from "./routes/product";
import { protect } from "./modules/auth";
import updatePoint from "./routes/updatepoint";
import updatePointRouter from "./routes/updatepoint";

// import router from "./router";

const app = express();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * app.[method]([route], [route handler])
 */

app.use("/api/update", protect, updatePointRouter);
app.use("/api/product", protect, productRouter);
app.use("/api/updatepoint", protect, updatePoint);

app.post("/user", createNewUser);
app.post("/signin", signin);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello!" });
});

export default app;
