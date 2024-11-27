import pg from "pg";
import { DATABASE_URI } from "./config";

const { Pool } = pg;

const pool = new Pool({
  connectionString: DATABASE_URI,
});

export const connectDB = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Connected to the database");
  } catch (error: any) {
    console.log("Failed toe connect to the database", error);
    process.exit(1);
  }
};

export const query = async (text: string, params?: any[]) => {
  const result = await pool.query(text, params);
  return result.rows;
};
