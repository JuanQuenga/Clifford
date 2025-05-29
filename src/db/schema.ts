import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const gmailAccounts = sqliteTable(
  "gmail_accounts",
  {
    userId: text("user_id").notNull(),
    accessToken: text("access_token").notNull(),
    refreshToken: text("refresh_token").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(), // Store as Unix timestamp (seconds)
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId] }),
  }),
);
