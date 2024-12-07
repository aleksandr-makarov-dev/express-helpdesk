import { z } from "zod";

export const payloadSchema = z.object({
  id: z.string().uuid().min(1),
  email: z.string().email(),
});

export type Payload = z.infer<typeof payloadSchema>;
