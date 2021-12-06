import mongoose from "mongoose";
import { createExpressApp } from "./app";
import { MONGO_URI, PORT } from "./config";

mongoose.connect(MONGO_URI);

const app = createExpressApp();

app.listen(PORT, () => {
  console.log("server started");
});
