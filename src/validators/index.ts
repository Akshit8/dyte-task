import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors";

const emailValidator = () => {
  return body("email").exists({ checkNull: true, checkFalsy: true }).isEmail().trim();
};

const urlValidator = (update: boolean) => {
  if (!update) {
    return body("url").exists({ checkNull: true, checkFalsy: true }).isURL().trim();
  } else {
    return body("updatedUrl").isURL().trim();
  }
};

const passwordValidator = () => {
  return body("password")
    .exists({ checkNull: true, checkFalsy: true })
    .isLength({ min: 6 })
    .trim();
};

export const userCredentialValidator = () => {
  return [emailValidator(), passwordValidator()];
};

export const urlAddValidator = () => {
  return [urlValidator(false)];
};

export const validate = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new BadRequestError());
    return;
  }
  next();
};
