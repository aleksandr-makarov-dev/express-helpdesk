import { PrismaClient, Ticket } from "@prisma/client";
import { TicketResponse } from "./models/ticket.response";
import { ticketsMapper } from "./tickets.mapper";
import { TicketRequest } from "./models/ticket.request";
import { TicketDetailsResponse } from "./models/ticket-details.response";

const prisma = new PrismaClient();

async function getAllTickets(): Promise<Array<TicketResponse>> {
  const foundTickets: Array<Pick<Ticket, "id" | "title" | "createdAt">> =
    await prisma.ticket.findMany({
      select: {
        id: true,
        createdAt: true,
        title: true,
      },
    });

  return foundTickets.map(ticketsMapper.toTicketResponse);
}

async function getTicket(id: string): Promise<TicketDetailsResponse | null> {
  const foundTicket: Ticket | null = await prisma.ticket.findFirst({
    where: {
      id: id,
    },
  });

  if (!foundTicket) {
    return null;
  }

  return ticketsMapper.toTicketDetailsResponse(foundTicket);
}

async function createTicket(
  request: TicketRequest,
  createdBy: string
): Promise<TicketResponse> {
  const createdTicket = await prisma.ticket.create({
    data: {
      title: request.title,
      description: request.description,
      createdById: createdBy,
    },
  });

  return ticketsMapper.toTicketResponse(createdTicket);
}

async function deleteTicket(id: string): Promise<boolean> {
  try {
    await prisma.ticket.delete({
      where: {
        id: id,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
}

export const ticketsService = {
  getAllTickets,
  getTicket,
  createTicket,
  deleteTicket,
};
