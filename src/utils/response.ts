import { Response } from "express";
import { APIResponse } from "../types";

export const renderAPIResponse = (resp: APIResponse, res: Response): void => {
  let code = 200;
  if (resp.status_code) {
    code = resp.status_code;
  } else {
    resp.status_code = code;
  }
  res.status(code).send(resp);
};
