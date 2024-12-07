import { NextFunction, Request, Response } from "express";
import { tokensService } from "../services/tokens.service";
import { registerRequest } from "../models/register.request";

export function sessionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader?.startsWith("Bearer")) {
    console.log("No token... skipping session setup.");
    return next();
  }

  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    console.log("Token missing from the Authorization header.");
    return next();
  }

  const session = tokensService.validateAccessToken(token);
  if (!session) {
    console.log("Invalid token. Skipping session setup.");
    return next();
  }

  req.session = session;
  next();
}
