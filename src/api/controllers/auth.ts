import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { MongoError } from "mongodb";
import { BadRequestError } from "../../errors";
import { User } from "../../models";
import { JWTUtility } from "../../utils";
import { jwtPayload } from "../../types";

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.send(user);
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
    res.send({ token });
  } catch (e) {
    next(e);
  }
};
