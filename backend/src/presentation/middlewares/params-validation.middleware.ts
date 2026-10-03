import { Request, Response, NextFunction } from "express";

import { ZodSchema } from "zod";

export const validateParams =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      res.status(400).json({
        success: false,
        message: "Invalid request parameters",
        code: "INVALID_PARAMETERS",
        errors,
      });

      return;
    }

    next();
  };
