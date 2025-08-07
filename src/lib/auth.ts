import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";
import { env } from "@/env";
import * as schema from "@/db/schema";

export const auth = betterAuth({
   emailAndPassword: {
      enabled: true,
   },
   socialProviders: {
      google: {
         prompt: "select_account",
         clientId: env.GOOGLE_CLIENT_ID,
         clientSecret: env.GOOGLE_CLIENT_SECRET,
      },
   },

   database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: schema,
      usePlural: true,
   }),
});
