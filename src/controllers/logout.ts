import { Request, Response } from "express";

import { connectionDB } from "../config/database";
import { Token } from "../schemas/schemas";
import errorHandler from "./errorHandler";

export default async function logout(req: Request, res: Response) {
  try {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    await Token.validateAsync(token);
    const result = await connectionDB.query(
      `DELETE FROM sessions WHERE token = $1`,
      [token]
    );
    res.sendStatus(200);
  } catch (e) {
    errorHandler(e, res);
  }
}
