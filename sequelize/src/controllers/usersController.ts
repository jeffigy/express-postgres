import { Request, Response } from "express";
import User from "../models/user";
import { Note } from "../models";

export const fetchUsers = async (req: Request, res: Response) => {
  const users = await User.findAll({
    include: {
      model: Note,
    },
  });
  res.json(users);
};

export const newUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
};
