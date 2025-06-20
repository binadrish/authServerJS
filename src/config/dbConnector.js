import { createClient } from "@libsql/client";
import dotenv from 'dotenv';

dotenv.config();

export const dbClient = createClient({
  url: process.env.TURSO_DATABASE_URL || "https://your-database-url.libsql.com",
  authToken: process.env.TURSO_AUTH_TOKEN || "your-auth-token",
});

