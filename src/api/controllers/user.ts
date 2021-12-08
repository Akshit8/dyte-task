import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { NotFoundError } from "../../errors";
import { User } from "../../models";

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.currentUser;
    const user = await User.findById(_id)
      .orFail()
      .populate({ path: "urls", select: "_id code url owner" });
    res.send(user);
  } catch (e) {
    if (e instanceof Error.DocumentNotFoundError) {
      next(new NotFoundError("user not found"));
    } else {
      next(e);
    }
  }
};
