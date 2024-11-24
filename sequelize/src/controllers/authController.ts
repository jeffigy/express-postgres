import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { SECRET } from "../utils/config";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "missing username or password" });
    return;
  }

  const user = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    res.status(401).json({ message: "invalid username or password" });
    return;
  }

  const passwordCorrect = password === "secret";

  if (!passwordCorrect) {
    res.status(401).json({ error: "invalid username or password" });
    return;
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  res.status(200).json({ token, username: user.username, name: user.name });
};
