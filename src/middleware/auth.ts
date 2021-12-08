import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { JWTError, UnauthorizedError, APIError } from "../errors";
import { User } from "../models";
import { JWTUtility } from "../utils";

export const TokenAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const tokenPayload = await new JWTUtility().verifyToken(token!);
    const user = await User.findById(tokenPayload.id).orFail();
    req.currentUser = user;
    next();
  } catch (e) {
    if (e instanceof JWTError || e instanceof Error.DocumentNotFoundError) {
      next(new UnauthorizedError());
    } else {
      next(new APIError());
    }
  }
};
