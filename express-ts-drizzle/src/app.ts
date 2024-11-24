import express from "express";
import { usersTable } from "./db/schema";
import db from "./db";
import { eq } from "drizzle-orm";

const app = express();

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: "John",
    age: 30,
    email: "john@example.com",
  };

  await db.insert(usersTable).values(user);
  console.log("New User created");

  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);

  await db
    .update(usersTable)
    .set({ age: 31 })
    .where(eq(usersTable.email, user.email));
  console.log("User info updated!");

  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log("User deleted");
}

main();

export default app;
