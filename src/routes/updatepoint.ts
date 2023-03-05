import { Request, Response, Router } from "express";

import { body } from "express-validator";
import { handleInputErrors } from "../modules/middleware";

const updatePointRouter = Router();

/**
 * UpdatePoint
 */

updatePointRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "update-point" });
});

updatePointRouter.get("/updatepoint/:id", (req: Request, res: Response) => {
  res.json({ message: "get update-point by id" });
});

updatePointRouter.post(
  "/updatepoint",
  [
    body("updateId").exists().isString(),
    body("name").isString(),
    body("description").isString(),
  ],
  (req: Request, res: Response) => {
    res.json({ message: "post update-point" });
  }
);

updatePointRouter.put(
  "/updatepoint/:id",
  [
    body("name").optional().isString(),
    body("description").optional().isString(),
  ],
  (req: Request, res: Response) => {
    res.json({ message: "put update-point by id" });
  }
);

updatePointRouter.delete("/updatepoint/:id", (req: Request, res: Response) => {
  res.json({ message: "delete update-point by id" });
});

export default updatePointRouter;
