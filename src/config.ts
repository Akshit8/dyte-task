// application related config
export const PORT = 3000;

// db related config
const DB_NAME = "zebtro";
export const MONGO_URI =
  process.env.MONGO_URI || `mongodb://root:rootpassword@localhost:27017/${DB_NAME}`;
