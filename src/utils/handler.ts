import { NextFunction, Request, Response } from "express";
import { APIError, NotFoundError } from "../errors";

export const catchAsync = (handler: any) => {
  return (...args: [Request, Response, NextFunction]) => {
    handler(...args).catch(args[2]);
  };
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
};

export const serverErrorHandler = (
  err: APIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status_code).send(err);
};
