import request from "supertest";
import app from "../server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let token: string;

beforeAll(async () => {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  // Reset the auto-incrementing ID counter for postgres
  await prisma.$executeRaw`TRUNCATE TABLE "Todo" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("User Routes", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/register").send({ name: "test user", email: "testuser@example.com", password: "password" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should login an existing user", async () => {
    const res = await request(app).post("/login").send({ email: "testuser@example.com", password: "password" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");

    token = res.body.token;
  });
});

describe("Todo Routes", () => {
  it("should create a todo", async () => {
    const res = await request(app)
      .post("/todos")
      .set("Cookie", `token=${token}`)
      .send({ title: "Test Todo", description: "This is a test todo" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Test Todo");
  });

  it("should get todos", async () => {
    const res = await request(app).get("/todos").set("Cookie", `token=${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("should update a todo", async () => {
    const createRes = await request(app)
      .post("/todos")
      .set("Cookie", `token=${token}`)
      .send({ title: "Todo to Update", description: "Update this todo" });

    const todoId = createRes.body.id;

    const updateRes = await request(app)
      .put(`/todos/${todoId}`)
      .set("Cookie", `token=${token}`)
      .send({ title: "Updated Todo", description: "Updated description" });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.data.title).toBe("Updated Todo");
  });

  it("should delete a todo", async () => {
    const createRes = await request(app)
      .post("/todos")
      .set("Cookie", `token=${token}`)
      .send({ title: "Todo to Delete", description: "Delete this todo" });

    const todoId = createRes.body.id;

    const deleteRes = await request(app).delete(`/todos/${todoId}`).set("Cookie", `token=${token}`);

    expect(deleteRes.status).toBe(204);
  });
});
