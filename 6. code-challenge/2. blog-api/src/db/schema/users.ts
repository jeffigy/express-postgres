import { createId } from "@paralleldrive/cuid2";
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  userId: varchar("user_id").primaryKey().$defaultFn(createId),
  name: text().notNull(),
  age: integer(),
});
