import type {
  NextFunction,
  Request,
  Response,
} from "express";

import type { ZodSchema } from "zod";

import ApiError from "../utils/ApiError.js";

const validate = (schema: ZodSchema) => {
  return (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return next(
        new ApiError(
          400,
          "Validation failed",
          errors,
        ),
      );
    }

    req.body = result.data;

    next();
  };
};

export default validate;