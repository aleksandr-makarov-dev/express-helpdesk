require("express-async-errors");
import dotenv from "dotenv";
import express, { Request, Response, Application } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import compression from "compression";
import { env } from "./utils/parse-env";
import { ticketsRouter } from "./modules/tickets/tickets.router";
import { errorHandler } from "./middleware/error-handler.middleware";
import { usersRouter } from "./modules/users/users.router";
import { sessionHandler } from "./modules/users/middlewares/session-handler.middleware";

dotenv.config();

const app: Application = express();
const port = env.PORT || 5000;

app.use(morgan("common"));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.use("/api/tickets", [sessionHandler], ticketsRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
