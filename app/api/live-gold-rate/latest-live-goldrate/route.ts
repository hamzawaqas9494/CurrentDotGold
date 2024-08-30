// import { sql } from "@vercel/postgres";
// import { NextRequest, NextResponse } from "next/server";
// export const dynamic = "force-dynamic";

// export async function GET(req: NextRequest) {
//   try {
//     const { rows } = await sql`SELECT * FROM rates ORDER BY date DESC LIMIT 1;`;

//     if (rows.length === 0) {
//       return NextResponse.json(
//         { message: "No rate data available." },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ rate: rows[0] }, { status: 200 });
//   } catch (error: any) {
//     console.error("Error fetching data:", error);

//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // Fetch the last 2 rows from the rates table
    const { rows } = await sql`SELECT * FROM rates ORDER BY date DESC LIMIT 2;`;

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "No rate data available." },
        { status: 404 }
      );
    }

    // Destructure the last 2 rows, assigning default values in case there are fewer than 2 rows
    const [latestRate, secondLatestRate] = rows;

    return NextResponse.json(
      {
        latestRate: latestRate || null,
        secondLatestRate: secondLatestRate || null,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching data:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
