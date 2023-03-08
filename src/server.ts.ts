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
  //send status codes based on type of error
  if (err.type === "auth") {
    console.log(err);
    return res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    console.log(err);
    return res.status(400).json({ message: "invalid input" });
  } else {
    console.log(err);
    return res.status(500).json({ message: "oops, something went wong" });
  }
});

export default app;
