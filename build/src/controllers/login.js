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
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const database_1 = require("../config/database");
const schemas_1 = require("../schemas/schemas");
const errorHandler_1 = __importDefault(require("./errorHandler"));
const types_1 = require("./types");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield schemas_1.Login.validateAsync(req.body);
            const { email, password } = req.body;
            const auth = yield database_1.connectionDB.query(`SELECT password, id, name FROM users WHERE email = $1`, [email]);
            if (auth.rowCount === 0)
                throw new types_1.CustomError("not found");
            const { password: hash, id: userId } = auth.rows[0];
            if (email && bcrypt_1.default.compareSync(password, hash)) {
                let result = yield database_1.connectionDB.query(`SELECT sessions.token, users.email FROM sessions JOIN users ON sessions."userId" = users.id WHERE users.email = $1`, [email]);
                if ((result === null || result === void 0 ? void 0 : result.rowCount) === 0) {
                    const token = uuid_1.v4();
                    yield database_1.connectionDB.query(`INSERT INTO sessions ("userId", token) VALUES ($1,$2)`, [userId, token]);
                    result = yield database_1.connectionDB.query(`SELECT sessions.token, users.email FROM sessions JOIN users ON sessions."userId" = users.id WHERE users.email = $1`, [email]);
                }
                res
                    .status(200)
                    .send({ token: result.rows[0].token, name: auth.rows[0].name });
            }
            else {
                res.sendStatus(401);
            }
        }
        catch (e) {
            errorHandler_1.default(e, res);
        }
    });
}
exports.default = login;
//# sourceMappingURL=login.js.map