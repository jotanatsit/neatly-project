import * as pg from "pg";
const { Pool } = pg.default;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export { pool };
