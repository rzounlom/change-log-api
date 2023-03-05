import { Router } from "express";

const updatePointRouter = Router();

/**
 * UpdatePoint
 */

updatePointRouter.get("/", (req, res) => {
  res.json({ message: "update-point" });
});

updatePointRouter.get("/updatepoint/:id", (req, res) => {});

updatePointRouter.post("/updatepoint", (req, res) => {});

updatePointRouter.put("/updatepoint/:id", (req, res) => {});

updatePointRouter.delete("/updatepoint/:id", (req, res) => {});

export default updatePointRouter;
