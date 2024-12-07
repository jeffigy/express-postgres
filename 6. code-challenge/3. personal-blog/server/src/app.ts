import "express-async-errors";
import express from "express";
import { connectDb } from "./db";
import blogRoute from "./routes/blogRoute";
import authRoute from "./routes/authRoute";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";

connectDb();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/blogs", blogRoute);
app.use("/auth", authRoute);

app.use(errorHandler);

export default app;
