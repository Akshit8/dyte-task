import { Router } from "express";
import { urlAddValidator, validate } from "../../validators";
import {
  addURLController,
  deleteURLController,
  getAllURLController,
  getURLController,
  updateURLController
} from "../controllers/url";

const router: Router = Router();

router.post("/", urlAddValidator(), validate, addURLController);
router.get("/:id", getURLController);
router.get("/", getAllURLController);
router.put("/:id", updateURLController);
router.delete("/:id", deleteURLController);

export default router;
