import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

const config: Config = {
  schema: "./lib/db/schema.ts",          // Your schema file path
  out: "./drizzle/migrations",           // Migration files output directory
  dialect: "mysql",                      // Use "mysql" (not "mysql2")
  dbCredentials: {
    url: process.env.DATABASE_URL!,     // Your MySQL connection string in .env
  },
};

export default config;
