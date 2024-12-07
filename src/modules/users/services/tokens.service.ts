import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import { env } from "../../../utils/parse-env";
import { Payload, payloadSchema } from "../models/payload";
import { Token } from "../models/token";
import dayjs from "dayjs";

function generateRefreshToken(): Token {
  const expiresIn = env.REFRESH_TOKEN_EXPIRES_IN;
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

function validateAccessToken(token: string): Payload | null {
  try {
    const json = jsonwebtoken.verify(token, env.TOKEN_SECRET);
    const parse = payloadSchema.safeParse(json);

    return parse.success ? parse.data : null;
  } catch (error) {
    console.log("token validation error:", error);
    return null;
  }
}

export const tokensService = {
  generateRefreshToken,
  generateAccessToken,
  validateAccessToken,
};
