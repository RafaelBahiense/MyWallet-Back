"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const history_1 = __importDefault(require("../controllers/history"));
const addTransaction_1 = __importDefault(require("../controllers/addTransaction"));
const register_1 = __importDefault(require("../controllers/register"));
const login_1 = __importDefault(require("../controllers/login"));
const logout_1 = __importDefault(require("../controllers/logout"));
const router = express_1.default.Router();
router.get("/history", (req, res) => history_1.default(req, res));
router.post("/deposit", (req, res) => addTransaction_1.default(req, res, "deposit"));
router.post("/withdrawal", (req, res) => addTransaction_1.default(req, res, "withdrawal"));
router.post("/register", (req, res) => register_1.default(req, res));
router.post("/login", (req, res) => login_1.default(req, res));
router.post("/logout", (req, res) => logout_1.default(req, res));
router.use((req, res) => res.send("404: Page not found"));
exports.default = router;
//# sourceMappingURL=routes.js.map