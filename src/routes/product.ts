import { Router } from "express";

const productRouter = Router();

/**
 * Product
 */
productRouter.get("/", (req, res) => {
  res.json({ message: "product api" });
});

productRouter.get("/:id", (req, res) => {});

productRouter.post("/", (req, res) => {});

productRouter.put("/:id", (req, res) => {});

productRouter.delete("/:id", (req, res) => {});

export default productRouter;
