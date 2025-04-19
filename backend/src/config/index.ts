import { getEnvVar } from "#utils";
import * as dotenv from "dotenv";

dotenv.config();

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: getEnvVar("PORT"),
  DATABASE_URL: getEnvVar("DATABASE_URL"),
  PGHOST: getEnvVar("PGHOST"),
  PGDATABASE: getEnvVar("PGDATABASE"),
  PGUSER: getEnvVar("PGUSER"),
  PGPASSWORD: getEnvVar("PGPASSWORD"),
  SECRET_KEY: getEnvVar("SECRET_KEY"),
  GOOGLE_CLIENT_ID: getEnvVar("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnvVar("GOOGLE_CLIENT_SECRET"),
  BASE_URL:
    process.env.NODE_ENV === "production"
      ? getEnvVar("BASE_URL")
      : "http://localhost:5001/api",
} as const;

export default config;
export { default as prisma } from "./prisma";
