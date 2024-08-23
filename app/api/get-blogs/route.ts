import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // Parse the URL
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    console.log(url, "url..");
    console.log("ID parameter:", id);

    // console.log("Connecting to the database...");s

    // Fetch the data
    const allDataReverseOrder = await sql`SELECT * FROM AllBlogs ORDER BY ID DESC;`;
    const alldata = await sql`SELECT * FROM AllBlogs;`;
    // console.log("All data fetched:", alldata.rows);

    // Ensure ID is not null or empty before querying
    const specificBlogResult =
      await sql`SELECT * FROM AllBlogs WHERE ID = ${id};`;
    // console.log("Specific blog result:", specificBlogResult.rows);

    // const lastThreeResult =
    //   await sql`SELECT * FROM AllBlogs ORDER BY ID DESC LIMIT 3;`;
    // // console.log("Last three blogs:", lastThreeResult.rows);

    const previousFiveResult =
      await sql`SELECT * FROM AllBlogs ORDER BY ID DESC LIMIT 30 OFFSET 3;`;
    // console.log("Previous five blogs:", previousFiveResult.rows);

    // const createdAt = specificBlogResult.rows[0].CreatedAt;
    // const formattedDate = new Date(createdAt).toLocaleString();
    return NextResponse.json(
      {
        // formattedDate,
        allDataReverseOrder:allDataReverseOrder.rows,
        alldata: alldata.rows,
        specificBlog: specificBlogResult.rows,
        // lastThree: lastThreeResult.rows,
        previousFive: previousFiveResult.rows,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch blogs", details: errorMessage },
      { status: 500 }
    );
  }
}
