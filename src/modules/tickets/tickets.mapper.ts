import { Ticket } from "@prisma/client";
import { TicketResponse } from "./models/ticket.response";
import { TicketDetailsResponse } from "./models/ticket-details.response";

function toTicketResponse(
  ticket: Pick<Ticket, "id" | "title" | "createdAt">
): TicketResponse {
  return {
    id: ticket.id,
    title: ticket.title,
    createdAt: ticket.createdAt,
  };
}

function toTicketDetailsResponse(ticket: Ticket): TicketDetailsResponse {
  return {
    id: ticket.id,
    title: ticket.title,
    description: ticket.description,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
    createdBy: ticket.createdById,
  };
}

export const ticketsMapper = {
  toTicketResponse,
  toTicketDetailsResponse,
};
