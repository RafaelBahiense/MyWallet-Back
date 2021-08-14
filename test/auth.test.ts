import "../src/config/env";
import app from "../src/app";
import supertest from "supertest";
import connectionDB from "../src/config/database";

describe("POST /api/register", () => {
  it("returns status 400 for invalid name", async () => {
    const result = await supertest(app)
      .post("/api/register")
      .send({ name: null, email: "newjest@jest.br", password: "12345678" });
    expect(result.status).toEqual(400);
  });
  it("returns status 400 for empty name", async () => {
    const result = await supertest(app)
      .post("/api/register")
      .send({ name: "", email: "newjest@jest.br", password: "12345678" });
    expect(result.status).toEqual(400);
  });
  it("returns status 400 for invalid email", async () => {
    const result = await supertest(app)
      .post("/api/register")
      .send({ name: "NewJest", email: null, password: "12345678" });
    expect(result.status).toEqual(400);
  });
  it("returns status 400 for empty name", async () => {
    const result = await supertest(app)
      .post("/api/register")
      .send({ name: "NewJest", email: "", password: "12345678" });
    expect(result.status).toEqual(400);
  });
  it("returns status 400 for invalid name", async () => {
    const result = await supertest(app)
      .post("/api/register")
      .send({ name: "NewJest", email: "newjest@jest.br", password: null });
    expect(result.status).toEqual(400);
  });
  it("returns status 400 for empty name", async () => {
    const result = await supertest(app)
      .post("/api/register")
      .send({ name: "NewJest", email: "newjest@jest.br", password: "" });
    expect(result.status).toEqual(400);
  });
  it("returns status 201 for valid params", async () => {
    const result = await supertest(app).post("/api/register").send({
      name: "NewJest",
      email: "newjest@jest.br",
      password: "12345678",
    });
    expect(result.status).toEqual(201);
  });
  it("returns status 409 for existent params", async () => {
    const result = await supertest(app).post("/api/register").send({
      name: "NewJest",
      email: "newjest@jest.br",
      password: "12345678",
    });
    expect(result.status).toEqual(409);
  });
});

describe("POST /api/login", () => {
  it("returns status 400 for invalid email", async () => {
    const result = await supertest(app)
      .post("/api/login")
      .send({ email: null, password: "12345678" });
    expect(result.status).toEqual(400);
  });
  it("returns status 400 for empty email", async () => {
    const result = await supertest(app)
      .post("/api/login")
      .send({ email: "", password: "12345678" });
    expect(result.status).toEqual(400);
  });
  it("returns status 400 for invalid email", async () => {
    const result = await supertest(app)
      .post("/api/login")
      .send({ email: "newjest@jest.br", password: null });
    expect(result.status).toEqual(400);
  });
  it("returns status 400 for empty password", async () => {
    const result = await supertest(app)
      .post("/api/login")
      .send({ email: "newjest@jest.br", password: "" });
    expect(result.status).toEqual(400);
  });
  it("returns status 404 for not existent params", async () => {
    const result = await supertest(app)
      .post("/api/login")
      .send({ email: "notjest@jest.br", password: "12345678" });
    expect(result.status).toEqual(404);
  });
  it("returns status 200 for valid params", async () => {
    const result = await supertest(app)
      .post("/api/login")
      .send({ email: "newjest@jest.br", password: "12345678" });
    expect(result.status).toEqual(200);
  });
});

afterAll(async () => {
  const result = await connectionDB.query(
    `SELECT sessions.token FROM sessions JOIN users ON users.id = sessions."userId" WHERE email = 'newjest@jest.br'`
  );
  const token = result.rows[0]?.token;
  await connectionDB.query(`DELETE FROM users WHERE email = 'newjest@jest.br'`);
  await connectionDB.query(`DELETE FROM sessions WHERE token = $1`, [token]);
});
