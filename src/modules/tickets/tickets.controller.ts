import { Request, Response } from "express";
import { ticketRequest } from "./models/ticket.request";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../utils/api-error";
import { ticketsService } from "./tickets.service";
import { id } from "../../utils/parse-id";
import { API_ERROR_MESSAGES } from "../../constants/errors";

// GET:/api/tickets
async function getAllTickets(_req: Request, res: Response): Promise<void> {
  const foundTickets = await ticketsService.getAllTickets();
  res.status(StatusCodes.OK).json(foundTickets);
}

// GET:/api/tickets/:id
async function getTicket(req: Request, res: Response): Promise<void> {
  const parse = id.safeParse(req.params);

  if (!parse.success) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      API_ERROR_MESSAGES.ID_VALIDATION_FAILED
    );
  }

  const foundTicket = await ticketsService.getTicket(parse.data.id);

  if (!foundTicket) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      API_ERROR_MESSAGES.TICKET_NOT_FOUND
    );
  }

  res.status(StatusCodes.OK).json(foundTicket);
}

// POST:api/tickets
async function createTicket(req: Request, res: Response): Promise<void> {
  const parse = ticketRequest.safeParse(req.body);

  if (parse.error) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      API_ERROR_MESSAGES.BODY_VALIDATION_FAILED
    );
  }

  const createdTicket = await ticketsService.createTicket(
    parse.data,
    "78c0873a-faa7-46a6-ab2c-304db66d8a04"
  );

  res.status(StatusCodes.OK).json(createdTicket);
}

// DELETE:/api/tickets/:id
async function deleteTicket(req: Request, res: Response): Promise<void> {
  const parse = id.safeParse(req.params);

  if (!parse.success) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      API_ERROR_MESSAGES.ID_VALIDATION_FAILED
    );
  }

  const result = await ticketsService.deleteTicket(parse.data.id);

  if (!result) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      API_ERROR_MESSAGES.TICKET_NOT_FOUND
    );
  }

  res.status(StatusCodes.NO_CONTENT).send();
}

// PUT:/api/tickets/:id
async function updateTicket(req: Request, res: Response): Promise<void> {
  // TODO: implement
  throw new Error("Method not implemented");
}

export const ticketsController = {
  getAllTickets,
  createTicket,
  deleteTicket,
  getTicket,
  updateTicket,
};
