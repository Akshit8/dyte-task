import { NextFunction, Request, Response } from "express";
import { MongoError } from "mongodb";
import { Error } from "mongoose";
import { BadRequestError } from "../../errors";
import { User } from "../../models";
import { jwtPayload } from "../../types";
import { JWTUtility, renderAPIResponse } from "../../utils";

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
      next(new BadRequestError("passowrd mismatch"));
      return;
    }
    const user = new User({ email, password });
    await user.save();
    renderAPIResponse({ status_code: 201, data: { user } }, res);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      next(new BadRequestError("invalid data recieved"));
    } else if ((e as MongoError).code === 11000) {
      next(new BadRequestError("user already exists"));
    } else {
      next(e);
    }
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const payload: jwtPayload = { id: user._id };
    const token = await new JWTUtility().signToken(payload);
    renderAPIResponse({ data: { token } }, res);
  } catch (e) {
    next(e);
  }
};
