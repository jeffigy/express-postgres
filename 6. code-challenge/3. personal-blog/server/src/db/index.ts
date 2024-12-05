import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "../utils/config";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: DATABASE_URL,
});

export const connectDb = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Connected to db");
  } catch (error: any) {
    console.log("Error connecting to db", error);
    process.exit(1);
  }
};

const db = drizzle({ client: pool });

export default db;
