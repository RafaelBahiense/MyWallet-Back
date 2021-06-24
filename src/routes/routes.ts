import express from 'express';

import getHistory from "../controllers/history";
import deposit from "../controllers/deposit";
import withdrawal from "../controllers/withdrawal";
import register from "../controllers/register";
import login from "../controllers/login";

const router = express.Router();

export const history: any = [];

router.get("/history", (req, res) => getHistory(req, res))

router.post("/deposit", (req, res) => deposit(req, res))

router.post("/withdrawal", (req, res) => withdrawal(req, res))

router.post("/register", (req, res) => register(req, res))

router.post("/login", (req, res) => login(req, res))

router.use((req, res) => res.send('404: Page not found'))

export default router;