import pg from "pg";
import {
  DATABASE_URI,
  PG_DB,
  PG_HOST,
  PG_PORT,
  PG_PWD,
  PG_USER,
} from "./config";

const { Pool } = pg;

const pool = new Pool({
  user: PG_USER,
  password: PG_PWD,
  host: PG_HOST,
  database: PG_DB,
  port: Number(PG_PORT),
  // connectionString: DATABASE_URI,
});

export const query = async (text: string, params?: any[]) => {
  const result = await pool.query(text, params);
  return result.rows;
};
