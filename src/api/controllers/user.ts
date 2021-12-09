import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { NotFoundError } from "../../errors";

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.currentUser;
    await user.populate({ path: "urls", select: "_id code url owner" });
    res.send(user);
  } catch (e) {
    if (e instanceof Error.DocumentNotFoundError) {
      next(new NotFoundError("user not found"));
    } else {
      next(e);
    }
  }
};
