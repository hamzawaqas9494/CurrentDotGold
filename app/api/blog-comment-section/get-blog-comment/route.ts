import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const postId = url.searchParams.get("post_id");
    if (!postId) {
      return NextResponse.json(
        { error: "post_id is required" },
        { status: 400 }
      );
    }
    const commentsResult = await sql`
    SELECT * FROM blogcomment WHERE post_id = ${postId} ORDER BY id DESC;
  `;

    return NextResponse.json(
      {
        comments: commentsResult.rows,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching comments:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch comments", details: errorMessage },
      { status: 500 }
    );
  }
}
