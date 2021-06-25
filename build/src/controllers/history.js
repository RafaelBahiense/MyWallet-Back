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
const dayjs_1 = __importDefault(require("dayjs"));
const database_1 = require("../config/database");
const schemas_1 = require("../schemas/schemas");
const errorHandler_1 = __importDefault(require("./errorHandler"));
const types_1 = require("./types");
function getHistory(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
            yield schemas_1.Token.validateAsync(token);
            let result = yield database_1.connectionDB.query(`SELECT sessions.token, sessions."userId" FROM sessions WHERE sessions.token = $1`, [token]);
            if ((result === null || result === void 0 ? void 0 : result.rowCount) === 0)
                throw new types_1.CustomError("Unauthorized");
            const { userId } = result.rows[0];
            result = yield database_1.connectionDB.query(`SELECT * FROM transactions WHERE "userId" = $1`, [userId]);
            let depositsTotal = 0;
            let withdrawalTotal = 0;
            const cleanResults = result.rows.map((transaction) => {
                transaction.date = dayjs_1.default(transaction.date).format("DD/MM");
                if (transaction.type === "deposit") {
                    depositsTotal += transaction.value;
                }
                else {
                    withdrawalTotal += transaction.value;
                }
                return transaction;
            });
            res
                .status(200)
                .send({
                transactions: cleanResults,
                total: depositsTotal - withdrawalTotal,
            });
        }
        catch (e) {
            errorHandler_1.default(e, res);
        }
    });
}
exports.default = getHistory;
//# sourceMappingURL=history.js.map