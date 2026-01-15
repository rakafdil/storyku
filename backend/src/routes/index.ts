import { Router } from "express";
import storiesRoutes from "./story.routes.js";

const router = Router();

router.use("/stories", storiesRoutes);

export default router;
