import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateQuery =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      res.status(400).json({
        success: false,
        message: "Invalid query parameters",
        code: "INVALID_QUERY_PARAMETERS",
        errors,
      });

      return;
    }

    req.query = result.data as unknown as Request["query"];

    next();
  };
