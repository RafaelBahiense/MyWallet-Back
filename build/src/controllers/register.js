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
const database_1 = require("../config/database");
const schemas_1 = require("../schemas/schemas");
const errorHandler_1 = __importDefault(require("./errorHandler"));
const types_1 = require("./types");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield schemas_1.Register.validateAsync(req.body);
            const { name, email, password } = req.body;
            const result = yield database_1.connectionDB.query(`SELECT * FROM users WHERE email = $1`, [email]);
            if (result.rowCount > 0)
                throw new types_1.CustomError("existent");
            const passwordHash = bcrypt_1.default.hashSync(password, 12);
            yield database_1.connectionDB.query(`INSERT INTO users (name,email,password) VALUES ($1,$2,$3)`, [name, email, passwordHash]);
            res.sendStatus(201);
        }
        catch (e) {
            errorHandler_1.default(e, res);
        }
    });
}
exports.default = register;
//# sourceMappingURL=register.js.map