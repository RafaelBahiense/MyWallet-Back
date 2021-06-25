import app from "../src/app";
import supertest from "supertest";

describe("POST /api/login", () => {
    it("returns status 201 for valid params", async () => {
        const result  =  await supertest(app).post("/api/register").send({ name: "Jest", email: "jest@jest.br", password: "12345678" });
        expect(result.status).toEqual(201);
    });
});