import express, { Router } from "express";
import { usersController } from "./users.controller";
export const usersRouter: Router = express.Router();

usersRouter.post("/register", usersController.registerUser);
usersRouter.post("/login", usersController.loginUser);
usersRouter.post("/refresh", usersController.refreshSession);
usersRouter.delete("/logout", usersController.logoutUser);
