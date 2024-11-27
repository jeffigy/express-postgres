import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../utils/config";
type CustomRequest = Request & {
  decodedToken?: any;
};
const tokenExtractor = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      res.status(401).json({ error: "token invalid" });
      return;
    }
  } else {
    res.status(401).json({ error: "token missing" });
    return;
  }
  next();
};

export default tokenExtractor;
