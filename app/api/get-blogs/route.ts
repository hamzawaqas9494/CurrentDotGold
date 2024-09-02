// // import { sql } from "@vercel/postgres";
// // import { NextRequest, NextResponse } from "next/server";
// // export const dynamic = "force-dynamic";

// // export async function GET(req: NextRequest) {
// //   try {
// //     const url = new URL(req.url);
// //     const id = url.searchParams.get("id");
// //     const allDataReverseOrder =
// //       await sql`SELECT * FROM allblogs ORDER BY ID DESC;`;
// //     const alldata = await sql`SELECT * FROM allblogs;`;
// //     const specificBlogResult =
// //       await sql`SELECT * FROM allblogs WHERE ID = ${id};`;
// //     const previousFiveResult =
// //       await sql`SELECT * FROM allblogs ORDER BY ID DESC LIMIT 30 OFFSET 3;`;

// //     return NextResponse.json(
// //       {
// //         allDataReverseOrder: allDataReverseOrder.rows,
// //         alldata: alldata.rows,
// //         specificBlog: specificBlogResult.rows,
// //         previousFive: previousFiveResult.rows,
// //       },
// //       { status: 200 }
// //     );
// //   } catch (error) {
// //     console.error("Error fetching blogs:", error);
// //     const errorMessage =
// //       error instanceof Error ? error.message : "Unknown error";
// //     return NextResponse.json(
// //       { error: "Failed to fetch blogs", details: errorMessage },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { sql } from "@vercel/postgres";
// import { NextRequest, NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

// export async function GET(req: NextRequest) {
//   try {
//     const url = new URL(req.url);
//     const page = parseInt(url.searchParams.get("page") || "1", 10);
//     const blogsPerPage = parseInt(
//       url.searchParams.get("blogsPerPage") || "3",
//       10
//     );

//     const offset = (page - 1) * blogsPerPage;

//     const paginatedBlogs =
//       await sql`SELECT * FROM allblogs ORDER BY ID DESC LIMIT ${blogsPerPage} OFFSET ${offset};`;

//     const totalBlogsResult = await sql`SELECT COUNT(*) FROM allblogs;`;
//     const totalBlogs = parseInt(totalBlogsResult.rows[0].count, 10);

//     return NextResponse.json(
//       {
//         blogs: paginatedBlogs.rows,
//         totalBlogs,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";
//     return NextResponse.json(
//       { error: "Failed to fetch blogs", details: errorMessage },
//       { status: 500 }
//     );
//   }
// }

import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const blogsPerPage = parseInt(url.searchParams.get("blogsPerPage") || "3");

    const offset = (page - 1) * blogsPerPage;

    const paginatedBlogs = await sql`
      SELECT * FROM allblogs ORDER BY ID DESC LIMIT ${blogsPerPage} OFFSET ${offset};
    `;
    const totalBlogs = await sql`SELECT COUNT(*) FROM allblogs;`;

    const previousFiveResult =
      await sql`SELECT * FROM allblogs ORDER BY ID DESC LIMIT 5;`;

    return NextResponse.json(
      {
        paginatedBlogs: paginatedBlogs.rows,
        totalBlogs: totalBlogs.rows[0].count,
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
