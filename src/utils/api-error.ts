import { StatusCodes } from "http-status-codes";

export class ApiError extends Error {
  code: StatusCodes;

  constructor(code: StatusCodes, message: string) {
    super(message);
    this.code = code;
  }
}
