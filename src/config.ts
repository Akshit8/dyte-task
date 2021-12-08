import { ConnectOptions } from "mongoose";

// application related config
export const PORT = 3000;
export const JWT_SECRET = process.env.JWT_SECRET || "verysecureapi";
export const JWT_EXPIRY = process.env.JWT_EXPIRY || "1d";
export const PASSWORD_SALT_ROUNDS = process.env.PASSWORD_SALT_ROUNDS || 8;

// db related config
export const MONGO_URI = process.env.MONGO_URI || `mongodb://localhost:27017/`;
export const MONGO_OPTIONS: ConnectOptions = {
  dbName: "zebtro",
  user: process.env.DB_USER || "root",
  pass: process.env.DB_PASSWORD || "rootpassword"
};

// business logic config
export const SHORT_URL_LENGTH = 5;
export const DEFAULT_FALLBACK_URL_REDIRECT = "https://github.com/Akshit8";
