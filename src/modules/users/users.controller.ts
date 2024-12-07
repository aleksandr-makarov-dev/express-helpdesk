import { Request, Response } from "express";
import { registerRequest } from "./models/register.request";
import { ApiError } from "../../utils/api-error";
import { StatusCodes } from "http-status-codes";
import { API_ERROR_MESSAGES } from "../../constants/errors";
import { usersService } from "./users.service";

// POST:/api/users/register
async function registerUser(req: Request, res: Response): Promise<void> {
  const parse = registerRequest.safeParse(req.body);

  if (!parse.success) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      API_ERROR_MESSAGES.BODY_VALIDATION_FAILED
    );
  }

  await usersService.registerUser(parse.data);

  // TODO: send verification email

  res.status(StatusCodes.CREATED).send();
}

// POST:/api/users/login
async function loginUser(req: Request, res: Response): Promise<void> {}

// POST:/aapi/users/refresh
async function refreshSession(req: Request, res: Response): Promise<void> {}

async function logoutUser(req: Request, res: Response): Promise<void> {}

export const usersController = {
  loginUser,
  refreshSession,
  registerUser,
  logoutUser,
};
