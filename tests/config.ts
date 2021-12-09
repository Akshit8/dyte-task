import { ConnectOptions } from "mongoose";

export const MONGO_URI = "mongodb://localhost:27017/";
export const MONGO_OPTIONS: ConnectOptions = {
  dbName: "test",
  user: "root",
  pass: "rootpassword"
};
