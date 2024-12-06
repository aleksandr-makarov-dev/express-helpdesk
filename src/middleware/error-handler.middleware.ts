import { ErrorRequestHandler } from "express";
import { ApiError } from "../utils/api-error";
import { StatusCodes } from "http-status-codes";
import { ProblemDetails } from "../utils/problem-details";

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (err) {
    console.log("error:", err.message);
    console.log("middleware");

    let problem: ProblemDetails = {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      title: "Internal Server Error",
      detail: err.message,
    };

    if (err instanceof ApiError) {
      problem.status = err.code;
      problem.title = `Status Code ${problem.status}`;
    }

    res.status(problem.status).json(problem);
  } else {
    next(err);
  }
};
