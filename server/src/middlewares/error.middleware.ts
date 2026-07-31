import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

import ApiError from "../utils/ApiError.js";
import { env } from "../config/env.js";

const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = 500;
  let message = "Internal server error";
  let errors: unknown[] = [];

  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errors = error.errors;
  } else if (error instanceof Error) {
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    ...(env.NODE_ENV === "development" &&
      error instanceof Error && {
        stack: error.stack,
      }),
  });
};

export default errorHandler;