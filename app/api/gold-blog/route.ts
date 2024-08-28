// import { NextResponse } from "next/server";
// import { sql } from "@vercel/postgres";

// export async function GET(request: Request) {
//   try {
//     await sql`
//       CREATE TABLE IF NOT EXISTS "AllBlogs" (
//         ID SERIAL PRIMARY KEY,
//         Title VARCHAR(255),
//         Content TEXT,
//         Image VARCHAR(255),
//         Video VARCHAR(255),
//         Visibility INT,
//         Published INT,
//         Postedtime TEXT
//       );
//     `;
//     const AllBlogs = await sql`SELECT * FROM "AllBlogs";`;

//     // Fetch table column information
//     const columns = await sql`
//       SELECT column_name, data_type
//       FROM information_schema.columns
//       WHERE table_name = 'AllBlogs';
//     `;

//     return NextResponse.json(
//       {
//         message: "Table created successfully",
//         columns: columns.rows,
//         AllBlogs: AllBlogs.rows,
//       },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       { error: `Failed to create table or fetch data: ${error.message}` },
//       { status: 500 }
//     );
//   }
// }

// import { sql } from "@vercel/postgres";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   try {
//     // Fetch all table names
//     const tables = await sql`
//       SELECT tablename
//       FROM pg_tables
//       WHERE schemaname = 'public';
//     `;

//     // Drop each table
//     for (const row of tables.rows) {
//       await sql.unsafe(`DROP TABLE IF EXISTS "${row.tablename}" CASCADE;`);
//     }

//     // Recreate the AllBlogs table
//     await sql`
//       CREATE TABLE IF NOT EXISTS "AllBlogs" (
//         ID SERIAL PRIMARY KEY,
//         Title VARCHAR(255),
//         Content TEXT,
//         Image VARCHAR(255),
//         Video VARCHAR(255),
//         Visibility INT,
//         Published INT,
//         Postedtime TEXT
//       );
//     `;

//     const AllBlogs = await sql`SELECT * FROM "AllBlogs";`;

//     // Fetch table column information
//     const columns = await sql`
//       SELECT column_name, data_type
//       FROM information_schema.columns
//       WHERE table_name = 'AllBlogs';
//     `;

//     return NextResponse.json(
//       {
//         message: "All tables dropped and AllBlogs table created successfully",
//         columns: columns.rows,
//         AllBlogs: AllBlogs.rows,
//       },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       {
//         error: `Failed to drop tables or create AllBlogs table: ${error.message}`,
//       },
//       { status: 500 }
//     );
//   }
// }

// import { sql } from "@vercel/postgres";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   try {
//     // Fetch all table names
//     const tables = await sql`
//       SELECT tablename
//       FROM pg_tables
//       WHERE schemaname = 'public';
//     `;

//     // Generate a single DROP TABLE statement
//     const dropTableStatements = tables.rows
//       .map(
//         (row: { tablename: string }) =>
//           `DROP TABLE IF EXISTS "${row.tablename}" CASCADE;`
//       )
//       .join(" ");

//     if (dropTableStatements) {
//       // Execute the DROP TABLE statement
//       await sql`${sql.raw(dropTableStatements)}`;
//     }

//     // Recreate the AllBlogs table
//     await sql`
//       CREATE TABLE IF NOT EXISTS "AllBlogs" (
//         ID SERIAL PRIMARY KEY,
//         Title VARCHAR(255),
//         Content TEXT,
//         Image VARCHAR(255),
//         Video VARCHAR(255),
//         Visibility INT,
//         Published INT,
//         Postedtime TEXT
//       );
//     `;

//     const AllBlogs = await sql`SELECT * FROM "AllBlogs";`;

//     // Fetch table column information
//     const columns = await sql`
//       SELECT column_name, data_type
//       FROM information_schema.columns
//       WHERE table_name = 'AllBlogs';
//     `;

//     return NextResponse.json(
//       {
//         message: "All tables dropped and AllBlogs table created successfully",
//         columns: columns.rows,
//         AllBlogs: AllBlogs.rows,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       {
//         error: `Failed to drop tables or create AllBlogs table: ${error.message}`,
//       },
//       { status: 500 }
//     );
//   }
// }

// import { sql } from "@vercel/postgres";
// import { NextResponse } from "next/server";

// type TableRow = { tablename: string };

// export async function GET(request: Request) {
//   try {
//     // Fetch all table names
//     const tables = await sql<TableRow>`
//       SELECT tablename
//       FROM pg_tables
//       WHERE schemaname = 'public';
//     `;

//     // Generate a single DROP TABLE statement
//     const dropTableStatements = tables.rows
//       .map((row) => `DROP TABLE IF EXISTS "${row.tablename}" CASCADE;`)
//       .join(" ");

//     if (dropTableStatements) {
//       // Execute the DROP TABLE statement
//       await sql`${sql.raw(dropTableStatements)}`;
//     }

//     // Recreate the AllBlogs table
//     await sql`
//       CREATE TABLE IF NOT EXISTS "AllBlogs" (
//         ID SERIAL PRIMARY KEY,
//         Title VARCHAR(255),
//         Content TEXT,
//         Image VARCHAR(255),
//         Video VARCHAR(255),
//         Visibility INT,
//         Published INT,
//         Postedtime TEXT
//       );
//     `;

//     const AllBlogs = await sql`SELECT * FROM "AllBlogs";`;

//     // Fetch table column information
//     const columns = await sql`
//       SELECT column_name, data_type
//       FROM information_schema.columns
//       WHERE table_name = 'AllBlogs';
//     `;

//     return NextResponse.json(
//       {
//         message: "All tables dropped and AllBlogs table created successfully",
//         columns: columns.rows,
//         AllBlogs: AllBlogs.rows,
//       },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       {
//         error: `Failed to drop tables or create AllBlogs table: ${error.message}`,
//       },
//       { status: 500 }
//     );
//   }
// }

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await sql.query(`CREATE TABLE allblogs (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      image TEXT,
      video TEXT,
      visibility INT,
      published INT,
      postedtime TEXT
    );
        `);

    await sql.query(`SELECT * FROM allblogs`);
    const AllBlogs = await sql.query(`SELECT * FROM "allblogs";`);

    // Fetch table column information
    const columns = await sql.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'allblogs';
    `);

    return NextResponse.json(
      {
        message: "allblogs table created successfully",
        columns: columns.rows,
        AllBlogs: AllBlogs.rows,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: `Failed to drop tables or create AllBlogs table: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
