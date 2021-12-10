import mongoose from "mongoose";
import { exit } from "process";
import { createExpressApp } from "./app";
import { MONGO_OPTIONS, MONGO_URI, PORT } from "./config";
import { addFixtures } from "./utils";

// main process
(async () => {
  try {
    // connecting to mongo db
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS);

    // install some fixtures
    await addFixtures();

    const app = await createExpressApp();
    app.listen(+PORT, () => {
      console.log(`server is listening on port: ${3000}`);
    });
  } catch (e) {
    console.log(`Error: ${e}`);
    exit(1);
  }
})();
