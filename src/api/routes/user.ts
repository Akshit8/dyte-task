import { Router } from "express";
import { getUserController } from "../controllers/user";

const router: Router = Router();

router.get("/", getUserController);

export default router;
