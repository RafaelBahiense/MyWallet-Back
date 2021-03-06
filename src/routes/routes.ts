import express from "express";

import getHistory from "../controllers/history";
import addTransaction from "../controllers/addTransaction";
import register from "../controllers/register";
import login from "../controllers/login";
import logout from "../controllers/logout";

const router = express.Router();

router.get("/history", (req, res) => getHistory(req, res));

router.post("/deposit", (req, res) => addTransaction(req, res, "deposit"));

router.post("/withdrawal", (req, res) =>
  addTransaction(req, res, "withdrawal")
);

router.post("/register", (req, res) => register(req, res));

router.post("/login", (req, res) => login(req, res));

router.post("/logout", (req, res) => logout(req, res));

router.use((req, res) => res.send("404: Page not found"));

export default router;
