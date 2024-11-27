import { Sequelize } from "sequelize";
import { DATABASE_URL } from "./config";

export const sequelize = new Sequelize(DATABASE_URL);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to the database");
  } catch (error) {
    console.log("failed to connect to the database");
    return process.exit(1);
  }

  return null;
};

export default connectDB;
