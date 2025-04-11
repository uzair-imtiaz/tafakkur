import { neon } from "@neondatabase/serverless";
import config from "#config";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = config;

const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

async function getPgVersion() {
  const result = await sql`SELECT version()`;
  console.log(result[0]);
}

getPgVersion();
