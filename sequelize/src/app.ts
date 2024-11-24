import express from "express";
import connectDB from "./utils/db";
import noteRoutes from "./routes/noteRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(express.json());

app.use("/api/users", noteRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const start = async () => {
  await connectDB();
};

start();

export default app;
