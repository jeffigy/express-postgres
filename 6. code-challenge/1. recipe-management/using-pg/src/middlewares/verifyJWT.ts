import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../utils/config";

// Extend Request interface to add custom properties
declare module "express" {
  interface Request {
    email?: string;
    user_id?: string;
  }
}
const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (
    !authHeader ||
    typeof authHeader !== "string" ||
    !authHeader.startsWith("Bearer ")
  ) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Forbidded" });
      return;
    }

    const payload = decoded as JwtPayload & {
      UserInfo?: {
        email: string;
        user_id: string;
      };
    };

    if (payload.UserInfo) {
      req.email = payload.UserInfo.email;
      req.user_id = payload.UserInfo.user_id;
    }
  });

  next();
};

export default verifyJWT;
