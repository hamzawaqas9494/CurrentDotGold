// import { sql } from "@vercel/postgres";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   try {
//     // Create the Rates table with a consistent schema
//     await sql.query(`
//       CREATE TABLE IF NOT EXISTS rates (
//         id SERIAL PRIMARY KEY,
//         gold_rate DECIMAL(10, 4) NOT NULL,
//         silver_rate DECIMAL(10, 4) NOT NULL,
//         date TIMESTAMP NOT NULL
//       );
//     `);

//     const rates = await sql.query(`SELECT * FROM rates;`);

//     // Fetch table column information
//     const columns = await sql.query(`
//       SELECT column_name, data_type
//       FROM information_schema.columns
//       WHERE table_name = 'rates';
//     `);

//     return NextResponse.json(
//       {
//         message: "Rates table created successfully",
//         columns: columns.rows,
//         rates: rates.rows,
//       },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       {
//         error: `Failed to create Rates table: ${error.message}`,
//       },
//       { status: 500 }
//     );
//   }
// }
// import { sql } from "@vercel/postgres";
// import { NextResponse } from "next/server";
// export const dynamic = "force-dynamic";
// export async function GET(request: Request) {
//   try {
//     // Create the Rates table with a consistent schema
//     await sql.query(`
//       CREATE TABLE IF NOT EXISTS rates (
//         id SERIAL PRIMARY KEY,
//         gold_rate DECIMAL(20, 10) NOT NULL,
//         silver_rate DECIMAL(20, 10) NOT NULL,
//         date TIMESTAMP NOT NULL
//       );
//     `);

//     // Fetch table column information
//     const columns = await sql.query(`
//       SELECT column_name, data_type
//       FROM information_schema.columns
//       WHERE table_name = 'rates';
//     `);

//     // Fetch the current rates data
//     const rates = await sql.query(`SELECT * FROM rates;`);

//     return NextResponse.json(
//       {
//         message: "Rates table created successfully",
//         columns: columns.rows,
//         rates: rates.rows,
//       },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       {
//         error: `Failed to create Rates table: ${error.message}`,
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
    // // Drop the Rates table if it exists
    // await sql.query(`
    //   DROP TABLE IF EXISTS rates;
    // `);

    // Create the Rates table with a consistent schema
    await sql.query(`
      CREATE TABLE IF NOT EXISTS rates (
        id SERIAL PRIMARY KEY,
        gold_rate DECIMAL(20, 10) NOT NULL,
        silver_rate DECIMAL(20, 10) NOT NULL,
        date TIMESTAMP NOT NULL
      );
    `);

    // Fetch table column information
    const columns = await sql.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'rates';
    `);

    // Fetch the current rates data (should be empty since the table was just created)
    const rates = await sql.query(`SELECT * FROM rates;`);

    return NextResponse.json(
      {
        message: "Rates table recreated successfully",
        columns: columns.rows,
        rates: rates.rows,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: `Failed to recreate Rates table: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
