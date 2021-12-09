import { Router } from "express";
import { userCredentialValidator, validate } from "../../validators";
import { loginController, signUpController } from "../controllers/auth";

const router: Router = Router();

router.post("/signup", userCredentialValidator(), validate, signUpController);
router.post("/login", userCredentialValidator(), validate, loginController);

export default router;
