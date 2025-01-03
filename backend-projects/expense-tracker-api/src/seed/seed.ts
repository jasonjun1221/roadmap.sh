import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import data from "./data.json";
import { Category } from "@prisma/client";

const prisma = new PrismaClient();

interface Expense {
  description: string;
  amount: number;
  category: Category;
  date: string;
  userId: number;
}

const seed = async () => {
  await prisma.expense.deleteMany();
  await prisma.user.deleteMany();

  // Reset the auto-incrementing ID counter for postgres
  await prisma.$executeRaw`TRUNCATE TABLE "Expense" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;

  await prisma.user.create({
    data: {
      name: "jason",
      email: "jason@hotmail.com",
      password: await bcrypt.hash("password", 10),
    },
  });

  await prisma.expense.createMany({ data: data as Expense[] });

  console.log("Seeded the database");
};

// If the script is run directly, seed the database
if (require.main === module) {
  seed()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
