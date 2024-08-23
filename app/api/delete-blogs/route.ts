import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres"; // Adjust if needed for your Postgres setup

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "A single Blog ID is required" },
      { status: 400 }
    );
  }

  try {
    await sql`DELETE FROM AllBlogs WHERE ID = ${id}`;
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
