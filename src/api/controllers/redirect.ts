import { NextFunction, Request, Response } from "express";
import { DEFAULT_FALLBACK_URL_REDIRECT } from "../../config";
import { RedirectError } from "../../errors";
import { URL } from "../../models";

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
  } catch (e) {
    res.redirect(DEFAULT_FALLBACK_URL_REDIRECT);
    // pass error for logging
    next(new RedirectError(e));
  }
};
