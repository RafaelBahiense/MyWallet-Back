import app from "../src/app";
import supertest from "supertest";

describe("GET /banana", () => {
    it("returns status 200 for valid params", async () => {
        const result  =  await supertest(app).post("/api/login").send({ email: "rafael@rafael.br", password: "12345678" });
        expect(result.status).toEqual(200);
    });
});