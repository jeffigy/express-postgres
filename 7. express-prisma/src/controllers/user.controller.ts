import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();

  if (users.length === 0) {
    res.status(404).json({ message: "No users found" });
    return;
  }
  res.json(users);
};

export const newUser = async (req: Request, res: Response) => {};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`this updates a user with an id #${id}`);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`this deletes a user with an id #${id}`);
};
