import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../utils/config";

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (
    !authHeader ||
    typeof authHeader !== "string" ||
    !authHeader?.startsWith("Bearer ")
  ) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];
  verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Fobidden" });
      return;
    }

    const payload = decoded as JwtPayload & {
      UserInfo: {
        email: string;
        name: string;
        userId: string;
      };
    };

    if (payload.UserInfo) {
      req.email = payload.UserInfo.email;
      req.name = payload.UserInfo.name;
      req.userId = payload.UserInfo.userId;
    }
  });

  next();
};

export default validateToken;
