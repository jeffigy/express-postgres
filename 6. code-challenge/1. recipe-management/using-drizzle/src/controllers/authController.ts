import { Request, Response } from "express";
import { usersTable } from "../db/schema/users";
import { db } from "../db";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "all fields are required" });
      return;
    }

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
export const login = async (req: Request, res: Response) => {};
