import "dotenv/config";

export const PORT = Number(process.env.PORT) || 3000;
export const DATABASE_URL = process.env.DATABASE_URL || "";
export const SECRET = process.env.SECRET || "abcdefg";
