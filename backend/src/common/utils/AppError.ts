import { HTTP_STATUS, HTTP_STATUSCode } from "../../config/http.config";
import { ErrorCode } from "../enums/error-code.enum";

export class AppError extends Error {
  public statusCode: HTTP_STATUSCode;
  public errorCode?: ErrorCode;

  constructor(
    message: string,
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    errorCode?: ErrorCode
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
