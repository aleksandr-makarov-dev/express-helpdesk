import { z } from "zod";

export const registerRequest = z.object({
  email: z.string().email().min(1).max(255),
  password: z.string().min(6).max(128),
});

export type RegisterRequest = z.infer<typeof registerRequest>;
