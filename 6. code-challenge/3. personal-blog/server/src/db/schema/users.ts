import { createId } from "@paralleldrive/cuid2";
import { pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  userId: varchar("user_id").primaryKey().$defaultFn(createId),
  name: varchar().notNull(),
  email: varchar().unique().notNull(),
  password: varchar().notNull(),
});
