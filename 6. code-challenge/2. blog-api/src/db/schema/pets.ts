import { createId } from "@paralleldrive/cuid2";
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const pets = pgTable("pets", {
  petId: varchar("pet_id").primaryKey().$defaultFn(createId),
  name: text().notNull(),
  ownerId: varchar("owner_id")
    .notNull()
    .references(() => users.userId),
});
