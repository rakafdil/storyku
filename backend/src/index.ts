import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import routes from "./routes/index.js";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

export default app;
