import {
  Request,
  Response,
  NextFunction,
} from "express";

import { ApplicationError } from "../../shared/errors/application.error";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error(error);

  if (error instanceof ApplicationError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      code: error.code,
    });

    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
    code: "INTERNAL_SERVER_ERROR",
  });
};