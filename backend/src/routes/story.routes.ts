import { Router } from "express";
import { StoryController } from "../controllers/story.controller.js";

const router = Router();
const storiesController = new StoryController();

router.get("/", storiesController.getAll);
router.get("/:id", storiesController.getById);
// router.post("/", storiesController.create);
// router.put("/:id", storiesController.update);
router.delete("/:id", storiesController.delete);

export default router;
