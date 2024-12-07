import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log({ currentError: err });

  if (err.code === "23505") {
    res.status(409).json({ message: "Email already exists" });
    return;
  }

  res.status(500).json({ message: "Internal server error" });
};
