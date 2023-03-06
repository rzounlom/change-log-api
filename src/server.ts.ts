import { createNewUser, signin } from "./handlers/user";
import express, { NextFunction, Request, Response } from "express";

import cors from "cors";
import morgan from "morgan";
import productRouter from "./routes/product";
import { protect } from "./modules/auth";
import updatePointRouter from "./routes/updatepoint";
import updateRouter from "./routes/update";

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
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello!" });
});

//api routes
app.use("/api/update", protect, updateRouter);
app.use("/api/product", protect, productRouter);
app.use("/api/updatepoint", protect, updatePointRouter);

app.post("/user", createNewUser);
app.post("/signin", signin);

//error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.json({ message: "oops there was an error" });
});

export default app;
