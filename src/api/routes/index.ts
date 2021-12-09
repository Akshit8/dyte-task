import { Router } from "express";
import { TokenAuth } from "../../middleware";
import { redirectController } from "../controllers/redirect";
import auth from "./auth";
import url from "./url";
import user from "./user";

const router: Router = Router();

router.use("/api/auth", auth);
router.use("/api/user", TokenAuth, user);
router.use("/api/url", TokenAuth, url);

// if favicon recieved then send 200
router.get("/favicon.ico", (req, res) => {
  res.send();
});
// redirect endpoint
router.get("/:code", redirectController);

export default router;
