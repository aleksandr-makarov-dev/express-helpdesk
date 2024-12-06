import { z } from "zod";

export const id = z.object({
  id: z.string().uuid(),
});
