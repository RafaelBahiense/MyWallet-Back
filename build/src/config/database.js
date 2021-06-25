"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = __importDefault(require("pg"));
const path = ((_a = process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) === "test"
    ? "/./../../.env.test.local"
    : "/./../../.env";
dotenv_1.default.config({ path: __dirname + path });
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;
const { Pool } = pg_1.default;
exports.connectionDB = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
//# sourceMappingURL=database.js.map