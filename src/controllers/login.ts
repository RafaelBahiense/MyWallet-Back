import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';

import {connectionDB} from "../config/database";
import {Login} from "../schemas/schemas";
import errorHandler from "./errorHandler";
import {CustomError} from "./types";

export default async function login(req: Request, res: Response) {
    try {
        await Login.validateAsync(req.body);
        const { email, password } = req.body;
        const auth = await connectionDB.query(`SELECT password, id, name FROM users WHERE email = $1`, [email]);
        if(auth.rowCount === 0) throw new CustomError("not found")
        const { password: hash, id: userId} = auth.rows[0];
        console.log(email, password, hash, userId);
        if(email && bcrypt.compareSync(password, hash)) {

            let result = await connectionDB.query(`SELECT sessions.token, users.email FROM sessions JOIN users ON sessions."userId" = users.id WHERE users.email = $1`, [email]);
            if(result?.rowCount === 0) {
                const token = uuid();
                await connectionDB.query(`INSERT INTO sessions ("userId", token) VALUES ($1,$2)`, [userId, token]);
                result.rows[0].token = uuid();
            };
            console.log({token: result.rows[0].token, name: auth.rows[0].name});
            res.status(200).send({token: result.rows[0].token, name: auth.rows[0].name});
        } else {
            res.sendStatus(401);
        }
    } catch (e) {
        errorHandler(e,res);
    }
}