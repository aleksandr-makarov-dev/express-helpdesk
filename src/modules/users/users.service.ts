import { PrismaClient, User } from "@prisma/client";
import { RegisterRequest } from "./models/register.request";
import { ApiError } from "../../utils/api-error";
import { StatusCodes } from "http-status-codes";
import { API_ERROR_MESSAGES } from "../../constants/errors";
import { passwordService } from "./password.service";
import { UserResponse } from "./models/user.response";
import { usersMapper } from "./users.mapper";
import { LoginRequest } from "./models/login.request";
import { tokensService } from "./tokens.service";

const prisma = new PrismaClient();

async function registerUser(request: RegisterRequest): Promise<UserResponse> {
  const foundUser = await findByEmail(request.email);

  if (foundUser) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      API_ERROR_MESSAGES.EMAIL_REGISTERED
    );
  }

  // TODO: when email is not confirm response with link to send verification letter

  const passwordHash = await passwordService.hashPassword(request.password);

  const createdUser = await prisma.user.create({
    data: {
      email: request.email,
      passwordHash: passwordHash,
    },
  });

  return usersMapper.toUserResponse(createdUser);
}

async function loginUser(request: LoginRequest) {
  const foundUser = await findByEmail(request.email);

  if (!foundUser) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      API_ERROR_MESSAGES.USER_NOT_FOUND
    );
  }

  const refreshToken = tokensService.generateRefreshToken();
  const accessToken = tokensService.generateAccessToken(
    usersMapper.ToPayload(foundUser)
  );
}

// private

async function findByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

async function isEmailConfirmed(user: User) {
  return user.emailConfirmedAt !== null;
}

export const usersService = {
  registerUser,
};
