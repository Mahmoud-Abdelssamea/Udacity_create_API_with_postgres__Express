import { Pool } from "pg";
import * as dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_NAME_TEST, ENV } =
  process.env;
let client: Pool;

if (ENV === "test") {
  client = new Pool({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME_TEST,
  });
}
if (ENV === "dev") {
  client = new Pool({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });
}

export { client };
