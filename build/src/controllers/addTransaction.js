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
const database_1 = require("../config/database");
const schemas_1 = require("../schemas/schemas");
const errorHandler_1 = __importDefault(require("./errorHandler"));
const types_1 = require("./types");
function addTransaction(req, res, type) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield schemas_1.Deposit.validateAsync(req.body);
            const { value, description } = req.body;
            const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
            yield schemas_1.Token.validateAsync(token);
            let result = yield database_1.connectionDB.query(`SELECT sessions.token, sessions."userId" FROM sessions WHERE sessions.token = $1`, [token]);
            if ((result === null || result === void 0 ? void 0 : result.rowCount) === 0)
                throw new types_1.CustomError("Unauthorized");
            const { userId } = result.rows[0];
            result = yield database_1.connectionDB.query(`INSERT INTO transactions ("userId", description, type, value) VALUES ($1,$2,$3,$4)`, [userId, description, type, value]);
            res.sendStatus(201);
        }
        catch (e) {
            errorHandler_1.default(e, res);
        }
    });
}
exports.default = addTransaction;
//# sourceMappingURL=addTransaction.js.map