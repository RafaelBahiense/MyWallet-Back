import { Request, Response } from "express";
import dayjs from "dayjs";

import {history} from "../routes/routes"

export default async function withdrawal(req: Request, res: Response) {
    const withdrawal = {
        ...req.body,
        type: "withdrawal",
        date: dayjs().format("DD/MM")
    }
    history.push(withdrawal);
    res.sendStatus(200);
}