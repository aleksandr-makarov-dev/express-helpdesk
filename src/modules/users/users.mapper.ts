import { User } from "@prisma/client";
import { UserResponse } from "./models/user.response";
import { Payload } from "./models/payload";

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

export const usersMapper = {
  toUserResponse,
  ToPayload,
};
