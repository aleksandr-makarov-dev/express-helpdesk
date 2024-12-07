import { Payload } from "../../modules/users/models/payload";

declare global {
  namespace Express {
    interface Request {
      session?: Payload;
    }
    interface RequestWithSession extends Request {
      session: Payload;
    }
  }
}
