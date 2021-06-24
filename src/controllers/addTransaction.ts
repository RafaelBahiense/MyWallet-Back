import { Request, Response } from "express";

import {connectionDB} from "../config/database";
import {Deposit, Token} from "../schemas/schemas";
import errorHandler from "./errorHandler";
import {CustomError} from "./types";

export default async function addTransaction(req: Request, res: Response, type: string) {
    try {
        await Deposit.validateAsync(req.body);
        const { value, description } = req.body;
        const token = req.headers['authorization']?.replace("Bearer ", "");
        await Token.validateAsync(token);
        let result = await connectionDB.query(`SELECT sessions.token, sessions."userId" FROM sessions WHERE sessions.token = $1`, [token]);
        if(result?.rowCount === 0) throw new CustomError("Unauthorized");
        const { userId } = result.rows[0]
        result = await connectionDB.query(`INSERT INTO transactions ("userId", description, type, value) VALUES ($1,$2,$3,$4)`, [userId, description, type, value]);
        res.sendStatus(201);
    } catch (e) {
        errorHandler(e,res);
    }

}