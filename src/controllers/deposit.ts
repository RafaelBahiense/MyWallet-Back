import { Request, Response } from "express";
import dayjs from "dayjs";

import {connectionDB} from "../config/database";
import {history} from "../routes/routes"

export default async function deposit(req: Request, res: Response) {
    const deposit = {
        ...req.body,
        type: "deposit",
        date: dayjs().format("DD/MM")
    }
    history.push(deposit);
    res.sendStatus(200);
}