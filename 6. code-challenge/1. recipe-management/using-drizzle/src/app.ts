import express, { Request, Response } from "express";
import { usersTable } from "./db/schema/users";
import { db } from "./db";
import { eq } from "drizzle-orm";

const app = express();

app.use(express.json());

app.use("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: "John",
    password: "adf",

    email: "john@example.com",
  };
  await db.insert(usersTable).values(user);
  console.log("New user created!");
  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */
  await db
    .update(usersTable)
    .set({
      name: "john doe",
    })
    .where(eq(usersTable.email, user.email));
  console.log("User info updated!");
  // await db.delete(usersTable).where(eq(usersTable.email, user.email));
  // console.log("User deleted!");
}
main();

export default app;
