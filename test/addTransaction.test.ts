import app from "../src/app";
import supertest from "supertest";
import { connectionDB } from "../src/config/database";
// Jest   | jest@jest.com    | $2b$12$4iSzSqv3Cb8KsewVXCfyyu5BZOzEq2CaDh2eTHni75z/ZLvT7suuC | dd848b92-4990-48f7-a4d5-77f133eafea6

beforeAll(async () => {
  await connectionDB.query(
    `INSERT INTO users (name, email, password) VALUES ('Jest', 'jest@jest.br','$2b$12$4iSzSqv3Cb8KsewVXCfyyu5BZOzEq2CaDh2eTHni75z/ZLvT7suuC')`
  );
  const result = await connectionDB.query(
    `SELECT id FROM users WHERE email = 'jest@jest.br'`
  );
  await connectionDB.query(
    `INSERT INTO sessions ("userId", token) VALUES ($1,'dd848b92-4990-48f7-a4d5-77f133eafea6')`,
    [result.rows[0].id]
  );
});

describe("POST /api/deposit", () => {
  it("returns status 400 for invalid value", async () => {
    const result = await supertest(app)
      .post("/api/deposit")
      .send({ value: "null", description: "food" })
      .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
    expect(result.status).toEqual(400);
  });
  it("returns status 400 for empty value", async () => {
    const result = await supertest(app)
      .post("/api/deposit")
      .send({ value: null, description: "food" })
      .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
    expect(result.status).toEqual(400);
  });
  it("returns status 400 for invalid description", async () => {
    const result = await supertest(app)
      .post("/api/deposit")
      .send({ value: 100, description: null })
      .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
    expect(result.status).toEqual(400);
  });
  it("returns status 400 for empty description", async () => {
    const result = await supertest(app)
      .post("/api/deposit")
      .send({ value: 100, description: "" })
      .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
    expect(result.status).toEqual(400);
  });
  it("returns status 401 for invalid token", async () => {
    const result = await supertest(app)
      .post("/api/deposit")
      .send({ value: 100, description: "food" })
      .set("Authorization", "invalidToken");
    expect(result.status).toEqual(401);
  });
  it("returns status 401 for not existent token", async () => {
    const result = await supertest(app)
      .post("/api/deposit")
      .send({ value: 100, description: "food" })
      .set("Authorization", "17685a3f-43b1-4c8a-bdf6-a9197dc1310e");
    expect(result.status).toEqual(401);
  });
  it("returns status 201 for valid params", async () => {
    const result = await supertest(app)
      .post("/api/deposit")
      .send({ value: 100, description: "food" })
      .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
    expect(result.status).toEqual(201);
  });
});

describe("POST /api/withdrawal", () => {
  it("returns status 400 for invalid value", async () => {
    const result = await supertest(app)
      .post("/api/withdrawal")
      .send({ value: "null", description: "food" })
      .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
    expect(result.status).toEqual(400);
  });
  it("returns status 400 for empty value", async () => {
    const result = await supertest(app)
      .post("/api/withdrawal")
      .send({ value: null, description: "food" })
      .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
    expect(result.status).toEqual(400);
  });
  it("returns status 400 for invalid description", async () => {
    const result = await supertest(app)
      .post("/api/withdrawal")
      .send({ value: 100, description: null })
      .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
    expect(result.status).toEqual(400);
  });
  it("returns status 400 for empty description", async () => {
    const result = await supertest(app)
      .post("/api/withdrawal")
      .send({ value: 100, description: "" })
      .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
    expect(result.status).toEqual(400);
  });
  it("returns status 401 for invalid token", async () => {
    const result = await supertest(app)
      .post("/api/withdrawal")
      .send({ value: 100, description: "food" })
      .set("Authorization", "invalidToken");
    expect(result.status).toEqual(401);
  });
  it("returns status 401 for not existent token", async () => {
    const result = await supertest(app)
      .post("/api/withdrawal")
      .send({ value: 100, description: "food" })
      .set("Authorization", "17685a3f-43b1-4c8a-bdf6-a9197dc1310e");
    expect(result.status).toEqual(401);
  });
  it("returns status 201 for valid params", async () => {
    const result = await supertest(app)
      .post("/api/withdrawal")
      .send({ value: 100, description: "food" })
      .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
    expect(result.status).toEqual(201);
  });
});

afterAll(async () => {
  await connectionDB.query(`DELETE FROM users WHERE email = 'jest@jest.br'`);
  await connectionDB.query(
    `DELETE FROM sessions WHERE token = 'dd848b92-4990-48f7-a4d5-77f133eafea6'`
  );
});
