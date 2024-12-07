import { UserResponse } from "./user.response";

export interface LoginResponse {
  accessToken: string;
  accessTokenExpiresAt: Date;
  user: UserResponse;
}
