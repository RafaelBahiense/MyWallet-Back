import { Request, Response } from "express";
import bcrypt from "bcrypt";

import {connectionDB} from "../config/database";
import {Register} from "../schemas/schemas";
import errorHandler from "./errorHandler";
import {CustomError} from "./types";

export default async function register(req: Request, res: Response) {
    try {
        await Register.validateAsync(req.body);
        const { name, email, password } = req.body;
        const result = await connectionDB.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if(result.rowCount > 0) throw new CustomError("existent");
        const passwordHash = bcrypt.hashSync(password, 12);
        await connectionDB.query(`INSERT INTO users (name,email,password) VALUES ($1,$2,$3)`, [name,email,passwordHash]);
        res.sendStatus(201); 
    } catch (e) {
        errorHandler(e,res);
    }
}
