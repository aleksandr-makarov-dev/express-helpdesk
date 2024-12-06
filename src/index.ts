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

dotenv.config();

const app: Application = express();
const port = process.env.PORT || env.PORT;

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

app.use("/api/tickets", ticketsRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
