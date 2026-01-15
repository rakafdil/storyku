import { Router } from "express";
import exampleRoutes from "./example.routes.js";

const router = Router();

// Register routes
router.use("/examples", exampleRoutes);

export default router;
