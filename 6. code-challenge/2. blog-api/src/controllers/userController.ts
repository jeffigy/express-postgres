import { Request, Response } from "express";
import db from "../db";
import { users } from "../db/schema/users";

export const fetchUsers = async (req: Request, res: Response) => {
  const allUsers = await db.select().from(users);

  if (allUsers.length === 0) {
    res.status(404).json({ message: "Not users found" });
    return;
  }

  res.json(allUsers);
};

export const newUser = async (req: Request, res: Response) => {
  const { name, age } = req.body;

  if (!name || !age) {
    res.status(400).json({ message: "name and age are required" });
    return;
  }

  const newUser = await db.insert(users).values({ name, age }).returning();

  res.json(newUser);
};
