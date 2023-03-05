import { Request, Response, Router } from "express";

import { body } from "express-validator";
import { handleInputErrors } from "../modules/middleware";

const productRouter = Router();

/**
 * Product
 */
productRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "get all products" });
});

productRouter.get("/:id", (req: Request, res: Response) => {
  res.json({ message: "get product by id" });
});

productRouter.post(
  "/",
  body("name").exists().isString(),
  handleInputErrors,
  (req: Request, res: Response) => {
    res.json({ message: `creating product with name: ${req.body.name}` });
  }
);

productRouter.put(
  "/:id",
  body("name").exists().isString(),
  handleInputErrors,
  (req: Request, res: Response) => {
    res.json({ message: `updating product with name: ${req.body.name}` });
  }
);

productRouter.delete("/:id", (req: Request, res: Response) => {
  res.json({ message: `deleting product ${req.params.id}` });
});

export default productRouter;
