import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateBody =
  (schema: ZodSchema) =>
  (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map(
        (issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }),
      );

      res.status(400).json({
        success: false,
        message: "Validation failed",
        code: "VALIDATION_ERROR",
        errors,
      });

      return;
    }

    req.body = result.data;

    next();
  };