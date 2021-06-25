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
describe("POST /api/register", () => {
    it("returns status 400 for invalid name", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/register")
            .send({ name: null, email: "newjest@jest.br", password: "12345678" });
        expect(result.status).toEqual(400);
    }));
    it("returns status 400 for empty name", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/register")
            .send({ name: "", email: "newjest@jest.br", password: "12345678" });
        expect(result.status).toEqual(400);
    }));
    it("returns status 400 for invalid email", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/register")
            .send({ name: "NewJest", email: null, password: "12345678" });
        expect(result.status).toEqual(400);
    }));
    it("returns status 400 for empty name", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/register")
            .send({ name: "NewJest", email: "", password: "12345678" });
        expect(result.status).toEqual(400);
    }));
    it("returns status 400 for invalid name", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/register")
            .send({ name: "NewJest", email: "newjest@jest.br", password: null });
        expect(result.status).toEqual(400);
    }));
    it("returns status 400 for empty name", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/register")
            .send({ name: "NewJest", email: "newjest@jest.br", password: "" });
        expect(result.status).toEqual(400);
    }));
    it("returns status 201 for valid params", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/register")
            .send({
            name: "NewJest",
            email: "newjest@jest.br",
            password: "12345678",
        });
        expect(result.status).toEqual(201);
    }));
    it("returns status 409 for existent params", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/register")
            .send({
            name: "NewJest",
            email: "newjest@jest.br",
            password: "12345678",
        });
        expect(result.status).toEqual(409);
    }));
});
describe("POST /api/login", () => {
    it("returns status 400 for invalid email", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/login")
            .send({ email: null, password: "12345678" });
        expect(result.status).toEqual(400);
    }));
    it("returns status 400 for empty email", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/login")
            .send({ email: "", password: "12345678" });
        expect(result.status).toEqual(400);
    }));
    it("returns status 400 for invalid email", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/login")
            .send({ email: "newjest@jest.br", password: null });
        expect(result.status).toEqual(400);
    }));
    it("returns status 400 for empty password", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/login")
            .send({ email: "newjest@jest.br", password: "" });
        expect(result.status).toEqual(400);
    }));
    it("returns status 404 for not existent params", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/login")
            .send({ email: "notjest@jest.br", password: "12345678" });
        expect(result.status).toEqual(404);
    }));
    it("returns status 200 for valid params", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default)
            .post("/api/login")
            .send({ email: "newjest@jest.br", password: "12345678" });
        expect(result.status).toEqual(200);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield database_1.connectionDB.query(`SELECT sessions.token FROM sessions JOIN users ON users.id = sessions."userId" WHERE email = 'newjest@jest.br'`);
    const token = (_a = result.rows[0]) === null || _a === void 0 ? void 0 : _a.token;
    yield database_1.connectionDB.query(`DELETE FROM users WHERE email = 'newjest@jest.br'`);
    yield database_1.connectionDB.query(`DELETE FROM sessions WHERE token = $1`, [token]);
}));
//# sourceMappingURL=auth.test.js.map