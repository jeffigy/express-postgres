import "express-async-errors";
import express from "express";
import { connectDB } from "./utils/db";

const app = express();
connectDB();

export default app;
