import cors from "cors";
import express from "express";
import helmet from "helmet";
import router from "./api/routes";
import { notFoundHandler, serverErrorHandler } from "./utils";

export const createExpressApp = (): express.Express => {
  const app = express();

  app.use(helmet({ dnsPrefetchControl: { allow: true } }));
  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/v1", router);

  app.use(notFoundHandler);
  app.use(serverErrorHandler);

  return app;
};
