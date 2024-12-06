import { StatusCodes } from "http-status-codes";

export interface ProblemDetails {
  status: StatusCodes;
  title: string;
  detail: string;
}
