import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
   /*
    * Serverside Environment variables, not available on the client.
    * Will throw if you access these variables on the client.
    */
   server: {
      NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

      BETTER_AUTH_SECRET: z.string().min(1),

      GOOGLE_CLIENT_ID: z.string().min(1),
      GOOGLE_CLIENT_SECRET: z.string().min(1),

      TURSO_AUTH_TOKEN: z.string().min(process.env.NODE_ENV === "production" ? 1 : 0),
      TURSO_DATABASE_URL: z.string().url(),

      GNEWS_API_KEY: z.string().min(1),

      GEMINI_API_KEY: z.string().min(1),
   },
   /*
    * Environment variables available on the client (and server).
    *
    * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
    */
   client: {
      NEXT_PUBLIC_APP_URL: z.string().url(),
   },
   /*
    * Specify what values should be validated by your schemas above.
    *
    * If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
    * For Next.js >= 13.4.4, you can use the experimental__runtimeEnv option and
    * only specify client-side variables.
    */
   runtimeEnv: {
      NODE_ENV: process.env.NODE_ENV,

      BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,

      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

      TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
      TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,

      GNEWS_API_KEY: process.env.GNEWS_API_KEY,

      GEMINI_API_KEY: process.env.GEMINI_API_KEY,
   },
});
