import { Router } from "express";
import { TokenAuth } from "../../middleware/auth";
import auth from "./auth";
import url from "./url";
import user from "./user";

const router: Router = Router();

router.use("/auth", auth);
router.use("/user", TokenAuth, user);
router.use("/url", TokenAuth, url);

export default router;
