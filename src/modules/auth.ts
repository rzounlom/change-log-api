import * as bcrypt from "bcrypt";

import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

export const createJWT = (user: { id: string; username: string }) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET!
  );
  return token;
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  //check for bearer
  if (!bearer) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  //check for valid bearer token
  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  try {
    //check for valid jwt
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    req.body.user = payload;
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send("Not authorized");
    return;
  }
};

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};
