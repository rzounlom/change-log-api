import { Router } from "express";

const updateRouter = Router();

/**
 * Update
 */

updateRouter.get("/", (req, res) => {
  res.json({ message: "Update route" });
});

updateRouter.get("/:id", (req, res) => {});

updateRouter.post("/", (req, res) => {});

updateRouter.put("/:id", (req, res) => {});

updateRouter.delete("/:id", (req, res) => {});

export default updateRouter;
