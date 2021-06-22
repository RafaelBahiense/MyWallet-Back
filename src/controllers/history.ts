import { Request, Response } from "express";

export default async function getHistory(req: Request, res: Response) {
    res.sendStatus(200);
}