import * as pg from "pg";
const { Pool } = pg.default;

const pool = new Pool({
  connectionString:
    "postgres://postgres:Zz123456789@neatly@db.xgwuvqcswjvvrzrgymfe.supabase.co:6543/postgres",
});

export { pool };
