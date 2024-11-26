import { integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { recipesTable } from "./recipes";

export const favoritesTable = pgTable("favorites", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: integer("user_id").references(() => usersTable.id),
  recipeId: integer("recipe_id").references(() => recipesTable.id),
});
