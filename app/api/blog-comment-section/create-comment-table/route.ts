import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // Drop the existing table if it exists
    await sql.query(`
      DROP TABLE IF EXISTS blogcomment;
    `);

    // Create the new table with the updated schema including the comment_token field
    await sql.query(`
      CREATE TABLE blogcomment (
        id SERIAL PRIMARY KEY,
        commenter_name VARCHAR(255) NOT NULL,
        comment_content TEXT NOT NULL,
        comment_date TEXT,
        post_id INTEGER NOT NULL,
        comment_token VARCHAR(32) NOT NULL
      );
    `);

    return NextResponse.json(
      { message: "Table dropped and recreated successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error dropping and creating table:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to drop and create table: ${errorMessage}` },
      { status: 500 }
    );
  }
}
