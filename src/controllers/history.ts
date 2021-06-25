import { Request, Response } from "express";
import dayjs from "dayjs";

import { connectionDB } from "../config/database";
import { Token } from "../schemas/schemas";
import errorHandler from "./errorHandler";
import { CustomError } from "./types";

export default async function getHistory(req: Request, res: Response) {
  try {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    await Token.validateAsync(token);

    let result = await connectionDB.query(
      `SELECT sessions.token, sessions."userId" FROM sessions WHERE sessions.token = $1`,
      [token]
    );

    if (result?.rowCount === 0) throw new CustomError("Unauthorized");
    const { userId } = result.rows[0];

    result = await connectionDB.query(
      `SELECT * FROM transactions WHERE "userId" = $1`,
      [userId]
    );
    let depositsTotal = 0;
    let withdrawalTotal = 0;
    const cleanResults = result.rows.map((transaction) => {
      transaction.date = dayjs(transaction.date).format("DD/MM");
      if (transaction.type === "deposit") {
        depositsTotal += transaction.value;
      } else {
        withdrawalTotal += transaction.value;
      }
      return transaction;
    });
    res
      .status(200)
      .send({
        transactions: cleanResults,
        total: depositsTotal - withdrawalTotal,
      });
  } catch (e) {
    errorHandler(e, res);
  }
}
