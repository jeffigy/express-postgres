import "dotenv/config";

export const PORT = process.env.PORT || 3000;
export const DATABASE_URI = process.env.DATABASE_URI!;
export const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refreshsecret";
export const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "accesssecret";
