import { z } from "zod";

export const ticketRequest = z.object({
  title: z.string().min(5).max(150),
  description: z.string().min(5).max(1000),
});

export type TicketRequest = z.infer<typeof ticketRequest>;
