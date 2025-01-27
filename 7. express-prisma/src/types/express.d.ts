import { Request } from "express";
import { User } from "./auth.types";

declare global {
  namespace Express {
    interface Request {
      userId: User["userId"];
    }
  }
}
