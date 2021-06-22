import express from 'express';

import getHistory from "../controllers/history";
import deposit from "../controllers/deposit";
import withdrawal from "../controllers/withdrawal";

const router = express.Router();

router.get("/history", (req, res) => getHistory(req, res))

router.post("/deposit", (req, res) => deposit(req, res))

router.post("/withdrawal", (req, res) => withdrawal(req, res))

router.use((req, res) => res.send('404: Page not found'))

export default router;