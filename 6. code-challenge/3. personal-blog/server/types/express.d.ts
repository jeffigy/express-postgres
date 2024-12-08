import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      name?: string;
      email?: string;
      userId?: string;
    }
  }
}
