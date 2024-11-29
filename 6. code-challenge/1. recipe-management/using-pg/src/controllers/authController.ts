import { Request, Response } from "express";
import { query } from "../utils/db";
import bcrypt from "bcrypt";
import { User } from "../types/user";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../utils/config";

export const getUsers = async (req: Request, res: Response) => {
  const users = await query("SELECT * FROM users");
  if (users.length === 0) {
    res.status(404).json({ message: "No users found" });
    return;
  }

  res.json(users);
};

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
  }

  const existingEmail = await query(
    "SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)",
    [email]
  );

  if (existingEmail[0].exists) {
    res.status(409).json({ message: "Email is already existed" });
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  const newUser: User[] = await query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashedPwd]
  );

  const registeredUser: User = newUser[0];

  const accessToken = jwt.sign(
    {
      UserInfo: {
        email: registeredUser.email,
        user_id: registeredUser.user_id,
      },
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "1hr" }
  );

  const refreshToken = jwt.sign(
    {
      UserInfo: {
        email: registeredUser.email,
        user_id: registeredUser.user_id,
      },
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "30d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res.json({ accessToken });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  const users: User[] = await query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (users.length === 0) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const foundUser = users[0];

  const correctPwd = await bcrypt.compare(password, foundUser.password);

  if (!correctPwd) {
    res.status(401).json({ message: "Invalid email password" });
    return;
  }

  const accessToken = jwt.sign(
    {
      UserInfo: {
        email: foundUser.email,
        user_id: foundUser.user_id,
      },
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "1hr" }
  );

  const refreshToken = jwt.sign(
    {
      UserInfo: {
        email: foundUser.email,
        user_id: foundUser.user_id,
      },
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "30d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res.json({ accessToken });
};
