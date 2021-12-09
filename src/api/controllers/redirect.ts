import { NextFunction, Request, Response } from "express";
import { MongoError } from "mongodb";
import { Error } from "mongoose";
import { DEFAULT_FALLBACK_URL_REDIRECT } from "../../config";
import { RedirectError } from "../../errors";
import { URL, Visitor } from "../../models";
import { IPUtils } from "../../utils";

export const redirectController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code } = req.params;
    const url = await URL.findOneAndUpdate(
      { code: code },
      { $inc: { redirects: 1 } }
    ).orFail();
    res.redirect(url.url);
    const ip = IPUtils.getUserIP(req);
    if (ip) {
      const location = IPUtils.getIPLocation(ip);
      const visitor = new Visitor({
        code: code,
        ip: ip,
        city: location.city,
        country: location.country
      });
      await visitor.save();
    }
  } catch (e) {
    if (e instanceof Error.ValidationError || (e as MongoError).code === 11000) {
      return;
    }
    res.redirect(DEFAULT_FALLBACK_URL_REDIRECT);
    // pass error for logging
    next(new RedirectError(e));
  }
};
