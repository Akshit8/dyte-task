import { Router } from "express";
import {
  addURLController,
  deleteURLController,
  getAllURLController,
  getURLController,
  updateURLController
} from "../controllers/url";

const router: Router = Router();

router.post("/", addURLController);
router.get("/:id", getURLController);
router.get("/", getAllURLController);
router.put("/:id", updateURLController);
router.delete("/:id", deleteURLController);

export default router;
