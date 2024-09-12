// import { sql } from "@vercel/postgres";
// import { NextResponse } from "next/server";
// export const dynamic = "force-dynamic";

// async function fetchRates() {
//   try {
//     const response = await fetch(
//       `https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD`,
//       {
//         method: "GET",
//         headers: {
//           "Cache-Control": "no-cache",
//           Pragma: "no-cache",
//           Expires: "0",
//         },
//         cache: "no-store",
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`API Error: ${response.status} - ${response.statusText}`);
//     }

//     const data = await response.json();
//     console.log(response, "response with new api");
//     return data;
//   } catch (error: any) {
//     throw new Error(`Error fetching rates: ${error.message}`);
//   }
// }

// export async function GET() {
//   try {
//     const data = await fetchRates();

//     // Assuming you're storing some fields from the data, adjust based on the response structure.
//     const { spreadProfilePrices, instrument } = data[0]; // Example of accessing first item from the array.

//     // Insert the fetched rates into the database
//     // await sql`
//     //   INSERT INTO GoldRates (spreadProfilePrices, instrument)
//     //   VALUES (${spreadProfilePrices}, ${instrument})
//     // `;

//     return NextResponse.json({
//       message: "Rates fetched and stored successfully!",
//     });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: `Failed to process request: ${error.message}` },
//       { status: 500 }
//     );
//   }
// }
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

async function fetchRates() {
  try {
    const response = await fetch(
      `https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // Extract the spreadProfilePrices from the first element of the array
    const spreadProfilePrices = data[0]?.spreadProfilePrices;

    // Log spreadProfilePrices for debugging purposes
    console.log("Spread Profile Prices: ", spreadProfilePrices);

    return spreadProfilePrices;
  } catch (error: any) {
    throw new Error(`Error fetching rates: ${error.message}`);
  }
}

export async function GET() {
  try {
    const spreadProfilePrices = await fetchRates();

    // // Insert the fetched spreadProfilePrices into the database (adjust based on your schema)
    // await sql`
    //   INSERT INTO GoldRates (spreadProfilePrices)
    //   VALUES (${spreadProfilePrices})
    // `;

    return NextResponse.json({
      spreadProfilePrices,
      message: "Rates fetched and stored successfully!",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to process request: ${error.message}` },
      { status: 500 }
    );
  }
}
