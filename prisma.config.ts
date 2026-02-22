import { defineConfig, env } from "prisma/config";
import path from "node:path";
import { config } from "dotenv";

config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Use direct (non-pooled) connection for migrations
    // Pooled connection is used at runtime via PrismaPg in src/lib/db.ts
    url: env("DATABASE_URL_DIRECT"),
  },
});
