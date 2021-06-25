import dotenv from "dotenv";
import pg from "pg";

const path =
  process.env?.NODE_ENV === "test"
    ? "/./../../.env.test.local"
    : "/./../../.env";
dotenv.config({ path: __dirname + path });
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;

const { Pool } = pg;

export const connectionDB = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
      rejectUnauthorized: false
  }
});
