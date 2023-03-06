import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "../handlers/update";

import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../modules/middleware";

const updateRouter = Router();

/**
 * Update
 */

updateRouter.get("/", getUpdates);

updateRouter.get("/:id", getOneUpdate);

updateRouter.post(
  "/",
  [
    body("title").exists().isString(),
    body("body").exists().isString(),
    body("productId").exists().isString(),
  ],
  createUpdate
);

updateRouter.put(
  "/:id",
  [
    body("title").optional(),
    body("body").optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
    body("version").optional(),
  ],
  handleInputErrors,
  updateUpdate
);

updateRouter.delete("/:id", deleteUpdate);

export default updateRouter;
