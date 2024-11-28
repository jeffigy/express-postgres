import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { connectDB } from "./utils/db";
import authRoute from "./routes/authRoute";
import recipeRoute from "./routes/recipeRoute";
import cors from "cors";
import cookieParser from "cookie-parser";
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/recipes", recipeRoute);

// app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   const statusCode = res.statusCode ?? 500;
//   res.status(statusCode).json({
//     error: err.name || "Internal Server Error",
//     message: err.message || "Something went wrong",
//   });
// });

export default app;
