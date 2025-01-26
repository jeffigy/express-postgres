import prisma from "../prisma/client";

export const connectDb = async () => {
  try {
    await prisma.$connect();
    console.log("app is connected to db");
  } catch (error) {
    console.error("failed connecting to db", error);
    process.exit(1);
  } finally {
    prisma.$disconnect();
  }
};
