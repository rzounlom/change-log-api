import { Request, Response, Router } from "express";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "../handlers/product";

import { body } from "express-validator";
import { handleInputErrors } from "../modules/middleware";

const productRouter = Router();

/**
 * Product
 */
productRouter.get("/", getProducts);

productRouter.get("/:id", getOneProduct);

productRouter.post(
  "/",
  body("name").exists().isString(),
  handleInputErrors,
  createProduct
);

productRouter.put(
  "/:id",
  body("name").exists().isString(),
  handleInputErrors,
  updateProduct
);

productRouter.delete("/:id", deleteProduct);

export default productRouter;
