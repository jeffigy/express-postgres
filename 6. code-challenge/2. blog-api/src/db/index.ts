import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "../utils/config";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: DATABASE_URL,
});

const db = drizzle(pool);

export default db;
