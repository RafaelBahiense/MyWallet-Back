import { Request, Response } from "express";

import {history} from "../routes/routes"

export default async function getHistory(req: Request, res: Response) {
    res.status(200).send(history);
}