import { Request, Response } from "express";
import db from "../db";
import { users } from "../db/schema/users";
import { isCuid } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { compare, hash } from "bcrypt";
import {
  JsonWebTokenError,
  NotBeforeError,
  sign,
  TokenExpiredError,
  verify,
} from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../utils/config";

interface DecodedToken {
  email: string;
}

//* Get all users
export const getUsers = async (req: Request, res: Response) => {
  const allUsers = await db.select().from(users);
  if (allUsers.length === 0) {
    res.status(404).json({ message: "No users found" });
    return;
  }

  res.json(allUsers);
};

//* Get a user
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || typeof id !== "string" || !isCuid(id)) {
    res.status(400).json({ message: "Invalid user id " });
    return;
  }

  const user = await db.select().from(users).where(eq(users.userId, id));

  if (user.length === 0) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json(user[0]);
};

//* Register
export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "all fields are required" });
    return;
  }

  const hashedPwd = await hash(password, 10);

  const newUser = await db
    .insert(users)
    .values({ name, email, password: hashedPwd })
    .returning();

  const registeredUser = newUser[0];

  const accessToken = sign(
    {
      UserInfo: {
        email: registeredUser.email,
        name: registeredUser.name,
        userId: registeredUser.userId,
      },
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1hr",
    }
  );

  const refreshToken = sign(
    { email: registeredUser.email },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res.json({ accessToken });
};

//* Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  const foundUser = await db.select().from(users).where(eq(users.email, email));

  if (foundUser.length === 0) {
    res.status(401).json({ message: "Incorrect email or password" });
    return;
  }

  const matchPwd = await compare(password, foundUser[0].password);

  if (!matchPwd) {
    res.status(401).json({ message: "Incorrect email or password" });
    return;
  }

  const user = foundUser[0];

  const accessToken = sign(
    {
      UserInfo: {
        email: user.email,
        name: user.name,
        userId: user.userId,
      },
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1hr",
    }
  );

  const refreshToken = sign({ email: user.email }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res.json({ accessToken });
};

//* Logout

export const logout = (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.status(204);
    return;
  }

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.json({ message: "Cookie cleared" });
};

//* Refresh

export const refresh = (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const refreshToken = cookies.jwt;

  verify(
    refreshToken,
    REFRESH_TOKEN_SECRET,
    async (error: any, decoded: any) => {
      if (error) {
        if (
          error instanceof TokenExpiredError ||
          error instanceof JsonWebTokenError ||
          error instanceof NotBeforeError
        ) {
          res.status(403).json({ message: "Forbidden" });
          return;
        }
      }

      if (!decoded) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }

      const decodedToken = decoded as DecodedToken;

      const foundUser = await db
        .select()
        .from(users)
        .where(eq(users.email, decodedToken.email));

      if (foundUser.length === 0) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const user = foundUser[0];

      const accessToken = sign(
        {
          UserInfo: {
            email: user.email,
            name: user.name,
            userId: user.userId,
          },
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "1hr" }
      );
      res.json({ accessToken });
    }
  );
};
