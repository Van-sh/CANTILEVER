import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import newsAPI, { type Category } from "@/services/newsAPI";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
   const session = await auth.api.getSession({ headers: await headers() });
   if (!session) {
      return new Response(JSON.stringify({ error: "No session found" }), { status: 401 });
   }

   const searchParams = request.nextUrl.searchParams;

   const topHeadlines = await newsAPI.getTopHeadlines(
      searchParams.get("q"),
      searchParams.get("category") as Category | null,
   );
   return new NextResponse(JSON.stringify(topHeadlines), { status: 200 });
}
