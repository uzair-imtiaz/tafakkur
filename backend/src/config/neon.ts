import { neon } from "@neondatabase/serverless";
import config from "#config";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = config;

const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

export async function getPgVersion() {
  const result = await sql`SELECT version()`;
  return result[0].version;
}
