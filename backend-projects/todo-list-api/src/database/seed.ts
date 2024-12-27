import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  // Reset the auto-incrementing ID counter for postgres
  await prisma.$executeRaw`TRUNCATE TABLE "Todo" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;

  const jason = await prisma.user.create({
    data: {
      name: "jason",
      email: "jason@hotmail.com",
      password: await bcrypt.hash("password", 10),
    },
  });

  const susan = await prisma.user.create({
    data: {
      name: "susan",
      email: "susan@hotmail.com",
      password: await bcrypt.hash("password", 10),
    },
  });

  const gary = await prisma.user.create({
    data: {
      name: "gary",
      email: "gary@hotmail.com",
      password: await bcrypt.hash("password", 10),
    },
  });

  await prisma.todo.createMany({
    data: [
      {
        title: "Buy groceries",
        description: "Milk, eggs, bread, and bananas",
        userId: jason.id,
      },
      {
        title: "Walk the dog",
        description: "Around the block",
        userId: jason.id,
      },
      {
        title: "Do laundry",
        description: "Wash, dry, and fold",
        userId: jason.id,
      },
    ],
  });

  await prisma.todo.createMany({
    data: [
      {
        title: "Buy groceries",
        description: "Milk, eggs, bread, and bananas",
        userId: susan.id,
      },
      {
        title: "Walk the dog",
        description: "Around the block",
        userId: susan.id,
      },
      {
        title: "Do laundry",
        description: "Wash, dry, and fold",
        userId: susan.id,
      },
    ],
  });

  await prisma.todo.createMany({
    data: [
      {
        title: "Buy groceries",
        description: "Milk, eggs, bread, and bananas",
        userId: gary.id,
      },
      {
        title: "Walk the dog",
        description: "Around the block",
        userId: gary.id,
      },
      {
        title: "Do laundry",
        description: "Wash, dry, and fold",
        userId: gary.id,
      },
    ],
  });

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
