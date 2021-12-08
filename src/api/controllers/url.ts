import { NextFunction, Request, Response } from "express";
import { MongoError } from "mongodb";
import { Error } from "mongoose";
import { BadRequestError } from "../../errors";
import { URL, URLDocument } from "../../models";

export const addURLController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { url, code } = req.body;
    const owner = req.currentUser._id;
    let newURL: URLDocument;
    if (code) {
      newURL = new URL({ code, url, owner });
      await newURL.save();
    } else {
      newURL = await URL.saveURL(url, owner);
    }
    res.send(newURL);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      next(new BadRequestError("invalid data recieved"));
    } else if ((e as MongoError).code === 11000) {
      next(new BadRequestError("url code already exists"));
    } else {
      next(e);
    }
  }
};

export const getURLController = (req: Request, res: Response) => {};

export const getAllURLController = (req: Request, res: Response) => {};

export const updateURLController = (req: Request, res: Response) => {};

export const deleteURLController = (req: Request, res: Response) => {};
