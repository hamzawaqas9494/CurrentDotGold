import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const responseData: Record<string, any> = {};

    const allBlogsResult = await sql`SELECT * FROM allblogs limit 2;`;
    responseData.allBlogs = allBlogsResult.rows;

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to fetch blogs", details: errorMessage },
      { status: 500 }
    );
  }
}
