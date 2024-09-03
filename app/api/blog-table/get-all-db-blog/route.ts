import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

// Ensure the route handles dynamic behavior as needed
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // Parse the URL from the incoming request
    const url = new URL(req.url);

    // Check if the 'allblog' query parameter is present
    const shouldFetchAllBlogs = url.searchParams.has("allblog");

    // Initialize an object to store the response data
    const responseData: Record<string, any> = {};

    // If the 'allblog' parameter is present, fetch all blogs
    if (shouldFetchAllBlogs) {
      const allBlogsResult = await sql`SELECT * FROM allblogs;`;
      responseData.allBlogs = allBlogsResult.rows; // Store the fetched blogs in the responseData object
    }

    // Return the response data as JSON with a 200 OK status
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching blogs:", error);

    // Determine the error message to include in the response
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    // Return an error response with a 500 Internal Server Error status
    return NextResponse.json(
      { error: "Failed to fetch blogs", details: errorMessage },
      { status: 500 }
    );
  }
}
