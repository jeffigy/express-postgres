import { Request, Response } from "express";
import prisma from "../prisma/client";
import { compare, hash } from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/auth.utils";

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  const existedUser = await prisma.user.findUnique({ where: { email } });

  if (existedUser) {
    res.status(409).json({ message: "Email already in use" });
    return;
  }

  const hashedPwd = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPwd,
    },
  });

  const accessToken = generateAccessToken(user.userId);

  generateRefreshToken(user.userId, res);

  res.json({ accessToken });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  const foundUser = await prisma.user.findUnique({ where: { email } });

  if (!foundUser) {
    res.status(401).json({ message: "Incorrect email or password" });
    return;
  }

  const matchedPwd = await compare(password, foundUser.password);

  if (!matchedPwd) {
    res.status(401).json({ message: "Incorrect email or password" });
    return;
  }

  const accessToken = generateAccessToken(foundUser.userId);

  generateRefreshToken(foundUser.userId, res);

  res.json({ accessToken });
};
