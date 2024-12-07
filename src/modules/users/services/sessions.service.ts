import { PrismaClient, Session, User } from "@prisma/client";
import { tokensService } from "./tokens.service";
import dayjs from "dayjs";
import { ApiError } from "../../../utils/api-error";
import { StatusCodes } from "http-status-codes";
import { API_ERROR_MESSAGES } from "../../../constants/errors";

const prisma = new PrismaClient();

async function createSession(user: User): Promise<Session> {
  const refreshToken = tokensService.generateRefreshToken();

  // TODO: only 3 active sessions, revoke oldest sessions

  return await prisma.session.create({
    data: {
      provider: "local",
      token: refreshToken.value,
      expiresAt: refreshToken.expiresAt,
      userId: user.id,
    },
  });
}

async function getSession(token: string): Promise<Session> {
  const foundSession = await prisma.session.findFirst({
    where: {
      token: token,
    },
  });

  if (!foundSession) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      API_ERROR_MESSAGES.SESSION_NOT_FOUND
    );
  }

  if (dayjs().isAfter(foundSession.expiresAt)) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      API_ERROR_MESSAGES.SESSION_EXPIRED
    );
  }

  return foundSession;
}

export const sessionsService = {
  createSession,
  getSession,
};
