import { sign, verify } from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  NODE_ENV,
  REFRESH_TOKEN_SECRET,
} from "../config/env.config";
import { NextFunction, Request, Response } from "express";

import { DecodedToken } from "../types/auth.types";

export const generateAccessToken = (userId: string) => {
  return sign({ userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId: string, res: Response) => {
  const refreshToken = sign({ userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  return refreshToken;
};

export const verifyAccessToken = (
  token: string,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verify(token, ACCESS_TOKEN_SECRET, async (error, decoded) => {
    if (error) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const { userId } = decoded as DecodedToken;

    req.userId = userId;

    next();
  });
};
