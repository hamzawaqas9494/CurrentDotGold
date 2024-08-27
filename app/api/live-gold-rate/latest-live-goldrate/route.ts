import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // Fetch the latest rate from the rates table
    const { rows } = await sql`
      SELECT * FROM rates ORDER BY date DESC LIMIT 1;
    `;
   // Check if we have any results
    if (rows.length === 0) {
      return NextResponse.json(
        { message: "No rate data available." },
        { status: 404 }
      );
    }

    return NextResponse.json({ rate: rows[0] }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching data:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
