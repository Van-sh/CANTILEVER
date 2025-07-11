import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
   out: "./drizzle",
   schema: "./src/db/schema",
   dialect: "turso",
   dbCredentials: {
      url: env.TURSO_DATABASE_URL,
      authToken: env.TURSO_AUTH_TOKEN,
   },
});
