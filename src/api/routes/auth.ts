import { Router } from "express";
import { loginController, signUpController } from "../controllers/auth";

const router: Router = Router();

router.post("/signup", signUpController);
router.post("/login", loginController);

export default router;
