interface LoginResponse {
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  accessToken: string;
  accessTokenExpiresAt: Date;
}
