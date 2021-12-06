import cors from "cors";
import express from "express";
import helmet from "helmet";

export const createExpressApp = (): express.Express => {
  const app = express();

  app.use(helmet({ dnsPrefetchControl: { allow: true } }));
  app.use(cors());

  return app;
};
