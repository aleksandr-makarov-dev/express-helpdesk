import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import { env } from "../../utils/parse-env";
import { Payload } from "./models/payload";
import { Token } from "./models/token";
import dayjs from "dayjs";

function generateRefreshToken(): Token {
  const expiresIn = env.TOKEN_EXPIRES_IN;
  const expiresAt = dayjs().add(expiresIn, "minutes").toDate();
  const value = crypto.randomBytes(env.REFRESH_TOKEN_LENGTH).toString("hex");

  return {
    value,
    expiresAt,
  };
}

function generateAccessToken(payload: Payload): Token {
  const expiresIn = env.TOKEN_EXPIRES_IN;
  const expiresAt = dayjs().add(env.TOKEN_EXPIRES_IN, "minute").toDate();

  const value = jsonwebtoken.sign(payload, env.TOKEN_SECRET, {
    expiresIn: expiresIn * 60,
  });

  return {
    value,
    expiresAt,
  };
}

export const tokensService = {
  generateRefreshToken,
  generateAccessToken,
};
