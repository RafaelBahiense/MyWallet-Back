"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deposit = exports.Token = exports.Login = exports.Register = void 0;
const joi_1 = __importDefault(require("joi"));
exports.Register = joi_1.default.object({
    name: joi_1.default.string().min(3).max(30).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).max(100).required(),
});
exports.Login = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).max(100).required(),
});
exports.Token = joi_1.default.string().guid({ version: "uuidv4" });
exports.Deposit = joi_1.default.object({
    description: joi_1.default.string().min(3).required(),
    value: joi_1.default.number().required(),
});
//# sourceMappingURL=schemas.js.map