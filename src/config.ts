import { ConnectOptions } from "mongoose";

// application related config
export const PORT = 3000;

// db related config
export const MONGO_URI = process.env.MONGO_URI || `mongodb://localhost:27017/`;
export const MONGO_OPTIONS: ConnectOptions = {
  dbName: "zebtro",
  user: process.env.DB_USER || "root",
  pass: process.env.DB_PASSWORD || "rootpassword"
};
