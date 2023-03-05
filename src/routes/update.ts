import { Request, Response, Router } from "express";
import { body, oneOf } from "express-validator";

import { Handler } from "express";
import { handleInputErrors } from "../modules/middleware";

const updateRouter = Router();

/**
 * Update
 */

updateRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "Update route" });
});

updateRouter.get("/:id", (req: Request, res: Response) => {});

updateRouter.post(
  "/",
  [body("title").exists().isString(), body("body").exists().isString()],
  (req: Request, res: Response) => {}
);

updateRouter.put(
  "/:id",
  [
    body("title").optional(),
    body("body").optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
    body("version").optional(),
  ],
  handleInputErrors,
  (req: Request, res: Response) => {}
);

updateRouter.delete("/:id", (req: Request, res: Response) => {});

export default updateRouter;
