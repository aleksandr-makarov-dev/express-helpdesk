import { z } from "zod";

export const loginRequest = z.object({
  email: z.string().email().min(1).max(255),
  password: z.string().min(6).max(128),
});

export type LoginRequest = z.infer<typeof loginRequest>;
