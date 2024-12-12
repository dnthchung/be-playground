//path : backend/src/middlewares/errorHandler.ts
import { z } from "zod";
import { ErrorRequestHandler, Response } from "express";
import { HTTP_STATUS } from "../config/http.config";
import { AppError } from "../common/utils/AppError";
import { clearAuthenticationCookies, REFRESH_PATH } from "../common/utils/cookie";

const formatZodError = (res: Response, error: z.ZodError) => {
  const errors = error?.issues?.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
  return res.status(HTTP_STATUS.BAD_REQUEST).json({
    message: "Validation failed",
    errors: errors,
  });
};

export const errorHandler: ErrorRequestHandler = (error, req, res, next): any => {
  console.error(`Error occured on PATH: ${req.path}`, error);

  if (req.path === REFRESH_PATH) {
    // console.log("Clearing authentication cookies");

    // clearAuthenticationCookies(res);

    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: "Unauthorized Access, something went wrong with the refresh token",
    });
  }

  if (error instanceof SyntaxError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Invalid JSON format, please check your request body",
    });
  }

  if (error instanceof z.ZodError) {
    return formatZodError(res, error);
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error?.message || "Unknown error occurred",
  });
};
