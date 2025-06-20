import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { env } from "../env";

const client = createClient({
  url: env.DATABASE_URL,
  // authToken: env.DATABASE_AUTH_TOKEN, // Uncomment if you have an auth token
});

export const db = drizzle(client, { schema });
