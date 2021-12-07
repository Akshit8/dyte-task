import { Request, Response } from "express";
import { catchAsync } from "src/utils";
import { URL } from "../../models/url";

export const addURLController = catchAsync(async (req: Request, res: Response) => {
  try {
    console.log("hey");
    const { url, user } = req.body;
    const u = new URL({
      code: "12w",
      url: url,
      owner: user
    });
    await u.save();
    return res.send(u);
  } catch (e) {
    console.log(e);
    res.send("Err");
  }
});

export const getURLController = catchAsync((req: Request, res: Response) => {});

export const getAllURLController = catchAsync((req: Request, res: Response) => {});

export const updateURLController = catchAsync((req: Request, res: Response) => {});

export const deleteURLController = catchAsync((req: Request, res: Response) => {});
