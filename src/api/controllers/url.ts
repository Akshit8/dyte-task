import { NextFunction, Request, Response } from "express";
import { MongoError } from "mongodb";
import { Error } from "mongoose";
import { BadRequestError, NotFoundError } from "../../errors";
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

export const getURLController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const owner = req.currentUser._id;
    const url = await URL.findOne({ _id: id, owner: owner }).orFail();
    res.send(url);
  } catch (e) {
    if (e instanceof Error.DocumentNotFoundError) {
      next(new NotFoundError("url not found"));
    } else {
      next(e);
    }
  }
};

export const getAllURLController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const owner = req.currentUser._id;
    const urls = await URL.find({ owner: owner });
    res.send(urls);
  } catch (e) {
    next(e);
  }
};

export const updateURLController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const owner = req.currentUser._id;
    const { updatedCode, updatedUrl } = req.body;
    const url = await URL.findOne({ _id: id, owner: owner }).orFail();
    if (updatedCode) {
      url.code = updatedCode;
    }
    if (updatedUrl) {
      url.url = updatedUrl;
    }
    await url.save();
    res.send(url);
  } catch (e) {
    if (e instanceof Error.DocumentNotFoundError) {
      next(new NotFoundError("url not found"));
    } else if (e instanceof Error.ValidationError) {
      next(new BadRequestError("invalid data recieved"));
    } else if ((e as MongoError).code === 11000) {
      next(new BadRequestError("url code already exists"));
    } else {
      next(e);
    }
  }
};

export const deleteURLController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const owner = req.currentUser._id;
    await URL.findOneAndDelete({ _id: id, owner: owner });
    res.send("done");
  } catch (e) {
    next(e);
  }
};
