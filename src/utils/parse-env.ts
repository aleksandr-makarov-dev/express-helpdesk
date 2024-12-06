import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  //   CONNECTION_STRING: z
  //     .string()
  //     .refine((c) => c.startsWith("mongodb+srv"), "Invalid connection string"),
  //   JSONWEBTOKEN_SECRET: z.string().min(32),
  //   TEST_CONNECTION_STRING: z.string(),
  //   NODE_ENV: z.enum(["production", "development", "test"]).optional(),
  PORT: z.coerce.number(),
});

export const env = envSchema.parse(process.env);
