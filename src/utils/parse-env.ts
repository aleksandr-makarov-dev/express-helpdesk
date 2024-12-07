import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  REFRESH_TOKEN_LENGTH: z.coerce.number().min(32).max(128),
  REFRESH_TOKEN_EXPIRES_IN: z.coerce.number().min(5),
  TOKEN_SECRET: z.string().min(64).max(256),
  TOKEN_EXPIRES_IN: z.coerce.number().min(1),
  PORT: z.coerce.number(),
});

export const env = envSchema.parse(process.env);
