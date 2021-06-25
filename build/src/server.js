"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const dev = ((_a = process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) === "development" ? " on Dev mode" : "";
dotenv_1.default.config({ path: __dirname + "/./../.env" });
const PORT = process.env.PORT || 4000;
app_1.default.listen(PORT, function () {
    console.log(`Server runing on port ${PORT + dev}`);
});
//# sourceMappingURL=server.js.map