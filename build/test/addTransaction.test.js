"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../src/app"));
const supertest_1 = __importDefault(require("supertest"));
const database_1 = require("../src/config/database");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.connectionDB.query(`INSERT INTO users (name, email, password) VALUES ('Jest', 'jest@jest.br','$2b$12$4iSzSqv3Cb8KsewVXCfyyu5BZOzEq2CaDh2eTHni75z/ZLvT7suuC')`);
    const result = yield database_1.connectionDB.query(`SELECT id FROM users WHERE email = 'jest@jest.br'`);
    yield database_1.connectionDB.query(`INSERT INTO sessions ("userId", token) VALUES ($1,'dd848b92-4990-48f7-a4d5-77f133eafea6')`, [result.rows[0].id]);
}));
describe("POST /api/deposit", () => {
    it("returns status 400 for invalid value", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/deposit")
            .send({ value: "null", description: "food" })
            .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
        expect(result.status).toEqual(400);
    }));
    it("returns status 400 for empty value", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/deposit")
            .send({ value: null, description: "food" })
            .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
        expect(result.status).toEqual(400);
    }));
    it("returns status 400 for invalid description", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/deposit")
            .send({ value: 100, description: null })
            .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
        expect(result.status).toEqual(400);
    }));
    it("returns status 400 for empty description", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/deposit")
            .send({ value: 100, description: "" })
            .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
        expect(result.status).toEqual(400);
    }));
    it("returns status 401 for invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/deposit")
            .send({ value: 100, description: "food" })
            .set("Authorization", "invalidToken");
        expect(result.status).toEqual(401);
    }));
    it("returns status 401 for not existent token", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/deposit")
            .send({ value: 100, description: "food" })
            .set("Authorization", "17685a3f-43b1-4c8a-bdf6-a9197dc1310e");
        expect(result.status).toEqual(401);
    }));
    it("returns status 201 for valid params", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/deposit")
            .send({ value: 100, description: "food" })
            .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
        expect(result.status).toEqual(201);
    }));
});
describe("POST /api/withdrawal", () => {
    it("returns status 400 for invalid value", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/withdrawal")
            .send({ value: "null", description: "food" })
            .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
        expect(result.status).toEqual(400);
    }));
    it("returns status 400 for empty value", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/withdrawal")
            .send({ value: null, description: "food" })
            .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
        expect(result.status).toEqual(400);
    }));
    it("returns status 400 for invalid description", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/withdrawal")
            .send({ value: 100, description: null })
            .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
        expect(result.status).toEqual(400);
    }));
    it("returns status 400 for empty description", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/withdrawal")
            .send({ value: 100, description: "" })
            .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
        expect(result.status).toEqual(400);
    }));
    it("returns status 401 for invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/withdrawal")
            .send({ value: 100, description: "food" })
            .set("Authorization", "invalidToken");
        expect(result.status).toEqual(401);
    }));
    it("returns status 401 for not existent token", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/withdrawal")
            .send({ value: 100, description: "food" })
            .set("Authorization", "17685a3f-43b1-4c8a-bdf6-a9197dc1310e");
        expect(result.status).toEqual(401);
    }));
    it("returns status 201 for valid params", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/withdrawal")
            .send({ value: 100, description: "food" })
            .set("Authorization", "dd848b92-4990-48f7-a4d5-77f133eafea6");
        expect(result.status).toEqual(201);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.connectionDB.query(`DELETE FROM users WHERE email = 'jest@jest.br'`);
    yield database_1.connectionDB.query(`DELETE FROM sessions WHERE token = 'dd848b92-4990-48f7-a4d5-77f133eafea6'`);
}));
//# sourceMappingURL=addTransaction.test.js.map