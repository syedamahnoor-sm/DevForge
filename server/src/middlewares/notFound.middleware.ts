import type { Request, Response, NextFunction } from "express";

import ApiError from "../utils/ApiError.js";

const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  next(
    new ApiError(
      404,
      `Route ${req.method} ${req.originalUrl} was not found`,
    ),
  );
};

export default notFoundHandler;