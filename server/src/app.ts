import express, { type Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import errorHandler from "./middlewares/error.middleware.js";
import ApiResponse from "./utils/ApiResponse.js";
import notFoundHandler from "./middlewares/notFound.middleware.js";

const app: Application = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.status(200).json(
    new ApiResponse(
      200,
      {
        environment: env.NODE_ENV,
        timestamp: new Date().toISOString(),
      },
      "DevForge API is running",
    ),
  );
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
