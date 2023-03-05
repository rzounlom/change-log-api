import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
export interface TypedRequestBody<T> extends Request {
  body: T;
}

export type ReqUser = {
  id: string;
  username: string;
};

export interface TypedRequest extends Request {
  user: string | JwtPayload;
}
