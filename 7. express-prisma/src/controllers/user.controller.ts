import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  res.send("this gets all of the users");
};

export const newUser = async (req: Request, res: Response) => {
  res.send("this adds a new user");
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`this gets a user with an id #${id}`);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`this updates a user with an id #${id}`);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`this deletes a user with an id #${id}`);
};
