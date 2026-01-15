import { Router } from "express";
import { StoryController } from "../controllers/story.controller.js";
import multer from "multer";

const router = Router();
const storiesController = new StoryController();

const fileFilter = (_req: any, file: Express.Multer.File, cb: any) => {
  const allowedMimes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png, gif, webp)"));
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.get("/", storiesController.getAll);
router.get("/:id", storiesController.getById);
router.post("/", upload.single("coverImage"), storiesController.create);
router.put("/:id", upload.single("coverImage"), storiesController.update);
router.delete("/:id", storiesController.delete);

export default router;
