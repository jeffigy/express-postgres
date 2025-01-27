import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/auth.utils";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const token = authHeader.split(" ")[1];
  verifyAccessToken(token, req, res, next);
};

export default validateToken;
