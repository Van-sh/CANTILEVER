import { drizzle } from "drizzle-orm/libsql/web";

import { env } from "@/env";

export const db = drizzle({
   connection: {
      url: env.TURSO_DATABASE_URL,
      authToken: env.TURSO_AUTH_TOKEN,
   },
});
