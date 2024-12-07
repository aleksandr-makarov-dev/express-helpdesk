import { UserResponse } from "./user.response";

export interface SessionResponse {
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  accessToken: string;
  accessTokenExpiresAt: Date;
  user: UserResponse;
}
