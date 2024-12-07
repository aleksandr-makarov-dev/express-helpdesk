import { Session, User } from "@prisma/client";
import { UserResponse } from "./models/user.response";
import { Payload } from "./models/payload";
import { Token } from "./models/token";
import { LoginResponse } from "./models/login.response";
import { SessionResponse } from "./models/session.response";

function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    email: user.email,
  };
}

function ToPayload(user: User): Payload {
  return {
    id: user.id,
    email: user.email,
  };
}

function ToSessionResponse(
  user: User,
  session: Session,
  token: Token
): SessionResponse {
  return {
    accessToken: token.value,
    accessTokenExpiresAt: token.expiresAt,
    refreshToken: session.token,
    refreshTokenExpiresAt: session.expiresAt,
    user: toUserResponse(user),
  };
}

export const usersMapper = {
  toUserResponse,
  ToPayload,
  ToSessionResponse,
};
