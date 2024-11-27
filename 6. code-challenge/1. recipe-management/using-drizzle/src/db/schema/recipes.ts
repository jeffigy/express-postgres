import {
  integer,
  jsonb,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const recipesTable = pgTable("recipes", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  ingredients: jsonb("ingredients"),
  instructions: text("instructions"),
  userId: integer("user_id").references(() => usersTable.id),
});
