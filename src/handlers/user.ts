import { NextFunction, Request, Response } from "express";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

import prisma from "../db";

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hash = await hashPassword(req.body.password);

    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hash,
      },
    });

    const token = createJWT({ id: user.id, username: user.username });
    res.json({ token });
  } catch (error: any) {
    console.log(error);
    error.type = "input";
    next(error);
  }
};

export const signin = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  if (user) {
    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
      res.status(401);
      res.send("Invalid username or password");
      return;
    }
    const token = createJWT({ id: user.id, username: user.username });
    res.json({ token });
  } else {
    res.json({ message: "invalid username/password" });
  }
};
