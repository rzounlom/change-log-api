import { Router } from "express";

const updatePointRouter = Router();

/**
 * UpdatePoint
 */

updatePointRouter.get("/", (req, res) => {
  res.json({ message: "update-point" });
});

updatePointRouter.get("/:id", (req, res) => {});

updatePointRouter.post("/", (req, res) => {});

updatePointRouter.put("/:id", (req, res) => {});

updatePointRouter.delete("/:id", (req, res) => {});

export default updatePointRouter;
