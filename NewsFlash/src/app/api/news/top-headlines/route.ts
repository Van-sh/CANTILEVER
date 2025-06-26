import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import newsAPI from "@/services/newsAPI";

export async function GET(request: Request) {
   const session = await auth.api.getSession({ headers: await headers() });
   if (!session) {
      return new Response(JSON.stringify({ error: "No session found" }), { status: 401 });
   }

   const topHeadlines = await newsAPI.getTopHeadlines();
   return new Response(JSON.stringify(topHeadlines), { status: 200 });
}
