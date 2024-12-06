import express, { Router } from "express";
import { ticketsController } from "./tickets.controller";

export const ticketsRouter: Router = express.Router();

ticketsRouter.get("/", ticketsController.getAllTickets);
ticketsRouter.get("/:id", ticketsController.getTicket);
ticketsRouter.post("/", ticketsController.createTicket);
ticketsRouter.put("/:id", ticketsController.updateTicket);
ticketsRouter.delete("/:id", ticketsController.deleteTicket);
