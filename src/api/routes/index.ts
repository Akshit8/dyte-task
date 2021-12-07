import { Router } from "express";
import auth from "./auth";
import url from "./url";
import user from "./user";

const router: Router = Router();

router.use("/auth", auth);
router.use("/user", user);
router.use("/url", url);

export default router;
