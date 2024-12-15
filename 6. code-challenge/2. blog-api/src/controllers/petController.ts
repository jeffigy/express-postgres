import { Request, Response } from "express";
import db from "../db";
import { pets } from "../db/schema/pets";
import { users } from "../db/schema/users";
import { eq } from "drizzle-orm";

export const fetchPets = async (req: Request, res: Response) => {
  const { ownerId } = req.body;
  const allPets = await db
    .select()
    .from(users)
    .innerJoin(pets, eq(users.userId, pets.ownerId))
    .where(eq(users.userId, ownerId));

  if (allPets.length === 0) {
    res.status(404).json({ message: "Not pets found" });
    return;
  }

  res.json(allPets);
};

export const newPet = async (req: Request, res: Response) => {
  const { name, ownerId } = req.body;

  if (!name || !ownerId) {
    res.status(400).json({ message: "name and owner's id are required" });
    return;
  }

  const newUser = await db.insert(pets).values({ name, ownerId }).returning();

  res.json(newUser[0]);
};
