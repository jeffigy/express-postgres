import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../utils/config";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const decoded = jwt.verify(jwt, ACCESS_TOKEN_SECRET);

  console.log(decoded);

  next();
};

export default authenticate;
