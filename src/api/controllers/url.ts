import { NextFunction, Request, Response } from "express";
import { MongoError } from "mongodb";
import { Error } from "mongoose";
import { BadRequestError, NotFoundError } from "../../errors";
import { URL, URLDocument, Visitor } from "../../models";
import { ipLocation } from "../../types";
import { renderAPIResponse } from "../../utils";

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
    renderAPIResponse({ status_code: 201, data: { url: newURL } }, res);
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
    const visitors = await Visitor.find({ code: url.code });
    const ips: string[] = [];
    const locations: ipLocation[] = [];
    visitors.forEach((visitor) => {
      ips.push(visitor.ip);
      locations.push({ city: visitor.city, country: visitor.country });
    });
    const analytics = {
      visitors: visitors.length,
      ips: ips,
      locations: locations
    };
    renderAPIResponse({ data: { url, analytics } }, res);
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
    renderAPIResponse({ data: { urls } }, res);
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
    renderAPIResponse({ data: { url } }, res);
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
    renderAPIResponse({ data: "success" }, res);
  } catch (e) {
    next(e);
  }
};
