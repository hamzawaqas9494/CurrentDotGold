// // // // // // // // // // import { apiBaseUrl } from "@/context/constants";
// // // // // // // // // // import { sql } from "@vercel/postgres";
// // // // // // // // // // import { NextRequest, NextResponse } from "next/server";

// // // // // // // // // // // Opt out of caching for all data requests in the route segment
// // // // // // // // // // export const dynamic = "force-dynamic";

// // // // // // // // // // export async function GET(req: NextRequest) {
// // // // // // // // // //   try {
// // // // // // // // // //     // Fetch data from the external API

// // // // // // // // // //     const response = await fetch(`${apiBaseUrl}`);
// // // // // // // // // //     if (!response.ok) {
// // // // // // // // // //       throw new Error("Failed to fetch rates from the API");
// // // // // // // // // //     }
// // // // // // // // // //     const data = await response.json();
// // // // // // // // // //     console.log(data);
// // // // // // // // // //     // Extract rates from the API response
// // // // // // // // // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // // // // // // // // //     const silverRate = parseFloat(data.rates.XAG || "0");
// // // // // // // // // //     const customRate = parseFloat(data.rates.PKRXAU || "0");

// // // // // // // // // //     console.log(goldRate, "goldRate");

// // // // // // // // // //     // Insert the rates into the existing table
// // // // // // // // // //     await sql`
// // // // // // // // // //       INSERT INTO rates (gold_rate, silver_rate, custom_rate, date)
// // // // // // // // // //       VALUES (${goldRate}, ${silverRate}, ${customRate}, NOW());
// // // // // // // // // //     `;

// // // // // // // // // //     return NextResponse.json(
// // // // // // // // // //       { message: "Rates inserted successfully." },
// // // // // // // // // //       { status: 200 }
// // // // // // // // // //     );
// // // // // // // // // //   } catch (error: any) {
// // // // // // // // // //     console.error("Error inserting data:", error);
// // // // // // // // // //     const errorMessage =
// // // // // // // // // //       error instanceof Error ? error.message : "Unknown error";
// // // // // // // // // //     return NextResponse.json(
// // // // // // // // // //       {
// // // // // // // // // //         error: `Failed to insert rates: ${errorMessage}`,
// // // // // // // // // //       },
// // // // // // // // // //       { status: 500 }
// // // // // // // // // //     );
// // // // // // // // // //   }
// // // // // // // // // // }
// // // // // // // // // // import { apiBaseUrl } from "@/context/constants";
// // // // // // // // // // import { sql } from "@vercel/postgres";
// // // // // // // // // // import { NextRequest, NextResponse } from "next/server";

// // // // // // // // // // // Function to fetch rates from the API and store them in the database
// // // // // // // // // // async function fetchAndStoreRates() {
// // // // // // // // // //   try {
// // // // // // // // // //     // Fetch data from the external API
// // // // // // // // // //     const response = await fetch(`${apiBaseUrl}`);
// // // // // // // // // //     if (!response.ok) {
// // // // // // // // // //       throw new Error("Failed to fetch rates from the API");
// // // // // // // // // //     }
// // // // // // // // // //     const data = await response.json();
// // // // // // // // // //     console.log(data);

// // // // // // // // // //     // Extract rates from the API response
// // // // // // // // // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // // // // // // // // //     const silverRate = parseFloat(data.rates.XAG || "0");
// // // // // // // // // //     const customRate = parseFloat(data.rates.PKRXAU || "0");

// // // // // // // // // //     console.log(goldRate, "goldRate");

// // // // // // // // // //     // Insert the rates into the existing table
// // // // // // // // // //     await sql`
// // // // // // // // // //       INSERT INTO rates (gold_rate, silver_rate, custom_rate, date)
// // // // // // // // // //       VALUES (${goldRate}, ${silverRate}, ${customRate}, NOW());
// // // // // // // // // //     `;

// // // // // // // // // //     console.log("Rates inserted successfully.");
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error("Error inserting data:", error);
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // // Set an interval to run the fetchAndStoreRates function every 8 hours
// // // // // // // // // // // setInterval(fetchAndStoreRates, 8 * 60 * 60 * 1000);

// // // // // // // // // // // // Optionally, call the function immediately on startup
// // // // // // // // // // // fetchAndStoreRates();

// // // // // // // // // // // Handle GET requests
// // // // // // // // // // export async function GET(req: NextRequest) {
// // // // // // // // // //   try {
// // // // // // // // // //     await fetchAndStoreRates();

// // // // // // // // // //     return NextResponse.json(
// // // // // // // // // //       { message: "Rates inserted successfully." },
// // // // // // // // // //       { status: 200 }
// // // // // // // // // //     );
// // // // // // // // // //   } catch (error: any) {
// // // // // // // // // //     console.error("Error processing request:", error);
// // // // // // // // // //     const errorMessage =
// // // // // // // // // //       error instanceof Error ? error.message : "Unknown error";
// // // // // // // // // //     return NextResponse.json(
// // // // // // // // // //       {
// // // // // // // // // //         error: `Failed to process request: ${errorMessage}`,
// // // // // // // // // //       },
// // // // // // // // // //       { status: 500 }
// // // // // // // // // //     );
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // import { apiBaseUrl } from "@/context/constants";
// // // // // // // // // import { sql } from "@vercel/postgres";
// // // // // // // // // import { NextRequest, NextResponse } from "next/server";

// // // // // // // // // // Function to fetch the latest rates from the database
// // // // // // // // // async function getLatestStoredRates() {
// // // // // // // // //   const result =
// // // // // // // // //     await sql`SELECT gold_rate, silver_rate, custom_rate FROM rates ORDER BY date DESC LIMIT 1`;
// // // // // // // // //   return result?.rows?.[0];
// // // // // // // // // }

// // // // // // // // // // Function to fetch rates from the API and store them in the database if they have changed
// // // // // // // // // async function fetchAndStoreRates() {
// // // // // // // // //   try {
// // // // // // // // //     // Fetch data from the external API
// // // // // // // // //     const response = await fetch(`${apiBaseUrl}`);
// // // // // // // // //     if (!response.ok) {
// // // // // // // // //       throw new Error("Failed to fetch rates from the API");
// // // // // // // // //     }
// // // // // // // // //     const data = await response.json();

// // // // // // // // //     // Extract rates from the API response
// // // // // // // // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // // // // // // // //     const silverRate = parseFloat(data.rates.XAG || "0");
// // // // // // // // //     const customRate = parseFloat(data.rates.PKRXAU || "0");

// // // // // // // // //     console.log(goldRate, "goldRate");

// // // // // // // // //     // Get the latest stored rates from the database
// // // // // // // // //     const latestRates = await getLatestStoredRates();

// // // // // // // // //     // Check if the fetched rates differ from the latest stored rates
// // // // // // // // //     const ratesChanged =
// // // // // // // // //       !latestRates ||
// // // // // // // // //       latestRates.gold_rate !== goldRate ||
// // // // // // // // //       latestRates.silver_rate !== silverRate ||
// // // // // // // // //       latestRates.custom_rate !== customRate;

// // // // // // // // //     if (ratesChanged) {
// // // // // // // // //       // Insert the new rates into the database if they have changed
// // // // // // // // //       await sql`
// // // // // // // // //         INSERT INTO rates (gold_rate, silver_rate, custom_rate, date)
// // // // // // // // //         VALUES (${goldRate}, ${silverRate}, ${customRate}, NOW());
// // // // // // // // //       `;
// // // // // // // // //       console.log("Rates inserted successfully.");
// // // // // // // // //     } else {
// // // // // // // // //       console.log("Rates have not changed. No insertion needed.");
// // // // // // // // //     }
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error("Error inserting data:", error);
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // // Set an interval to run the fetchAndStoreRates function every 8 hours
// // // // // // // // // // Uncomment this line if you want to enable automatic updates every 8 hours
// // // // // // // // // // setInterval(fetchAndStoreRates, 8 * 60 * 60 * 1000);

// // // // // // // // // // Handle GET requests
// // // // // // // // // export async function GET(req: NextRequest) {
// // // // // // // // //   try {
// // // // // // // // //     await fetchAndStoreRates();

// // // // // // // // //     return NextResponse.json(
// // // // // // // // //       { message: "Rates processed successfully." },
// // // // // // // // //       { status: 200 }
// // // // // // // // //     );
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     console.error("Error processing request:", error);
// // // // // // // // //     const errorMessage =
// // // // // // // // //       error instanceof Error ? error.message : "Unknown error";
// // // // // // // // //     return NextResponse.json(
// // // // // // // // //       {
// // // // // // // // //         error: `Failed to process request: ${errorMessage}`,
// // // // // // // // //       },
// // // // // // // // //       { status: 500 }
// // // // // // // // //     );
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // import { apiBaseUrl } from "@/context/constants";
// // // // // // // // // import { sql } from "@vercel/postgres";
// // // // // // // // // import { NextRequest, NextResponse } from "next/server";

// // // // // // // // // // Function to fetch the latest rates from the database
// // // // // // // // // async function getLatestStoredRates() {
// // // // // // // // //   const result =
// // // // // // // // //     await sql`SELECT gold_rate, silver_rate, custom_rate FROM rates ORDER BY date DESC LIMIT 1`;

// // // // // // // // //   return result?.rows?.[0];
// // // // // // // // // }

// // // // // // // // // // Function to fetch rates from the API and store them in the database if they have changed
// // // // // // // // // async function fetchAndStoreRates() {
// // // // // // // // //   try {
// // // // // // // // //     // Fetch data from the external API
// // // // // // // // //     const response = await fetch(`${apiBaseUrl}`);
// // // // // // // // //     if (!response.ok) {
// // // // // // // // //       throw new Error("Failed to fetch rates from the API");
// // // // // // // // //     }
// // // // // // // // //     const data = await response.json();

// // // // // // // // //     // Extract rates from the API response
// // // // // // // // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // // // // // // // //     const silverRate = parseFloat(data.rates.XAG || "0");
// // // // // // // // //     const customRate = parseFloat(0 || "0");

// // // // // // // // //     console.log("Fetched silver rate:", silverRate);

// // // // // // // // //     // Get the latest stored rates from the database
// // // // // // // // //     const latestRates = await getLatestStoredRates();

// // // // // // // // //     // Check if the fetched rates differ from the latest stored rates
// // // // // // // // //     const ratesChanged =
// // // // // // // // //       !latestRates ||
// // // // // // // // //       latestRates.gold_rate !== goldRate ||
// // // // // // // // //       latestRates.silver_rate !== silverRate ||
// // // // // // // // //       latestRates.custom_rate !== customRate;

// // // // // // // // //     console.log("Rates changed:", ratesChanged);

// // // // // // // // //     if (ratesChanged) {
// // // // // // // // //       // Insert the new rates into the database if they have changed
// // // // // // // // //       await sql`
// // // // // // // // //         INSERT INTO rates (gold_rate, silver_rate, custom_rate, date)
// // // // // // // // //         VALUES (${goldRate}, ${silverRate}, ${customRate}, NOW());
// // // // // // // // //       `;
// // // // // // // // //       console.log("Rates inserted successfully.");
// // // // // // // // //     } else {
// // // // // // // // //       console.log("Rates have not changed. No insertion needed.");
// // // // // // // // //     }
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error("Error inserting data:", error);
// // // // // // // // //   }
// // // // // // // // // }
// // // // // // // // // // fetchAndStoreRates();
// // // // // // // // // setInterval(fetchAndStoreRates, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
// // // // // // // // // // Handle GET requests
// // // // // // // // // export async function GET(req: NextRequest) {
// // // // // // // // //   try {
// // // // // // // // //     await fetchAndStoreRates();

// // // // // // // // //     return NextResponse.json(
// // // // // // // // //       { message: "Rates processed successfully." },
// // // // // // // // //       { status: 200 }
// // // // // // // // //     );
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     console.error("Error processing request:", error);
// // // // // // // // //     const errorMessage =
// // // // // // // // //       error instanceof Error ? error.message : "Unknown error";
// // // // // // // // //     return NextResponse.json(
// // // // // // // // //       {
// // // // // // // // //         error: `Failed to process request: ${errorMessage}`,
// // // // // // // // //       },
// // // // // // // // //       { status: 500 }
// // // // // // // // //     );
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // import { apiBaseUrl } from "@/context/constants";
// // // // // // // // // import { sql } from "@vercel/postgres";
// // // // // // // // // import { NextRequest, NextResponse } from "next/server";

// // // // // // // // // // Function to fetch the latest rates from the database
// // // // // // // // // async function getLatestStoredRates() {
// // // // // // // // //   const result = await sql`
// // // // // // // // //     SELECT gold_rate, silver_rate, custom_rate, date
// // // // // // // // //     FROM rates
// // // // // // // // //     ORDER BY date DESC
// // // // // // // // //     LIMIT 1
// // // // // // // // //   `;
// // // // // // // // //   return result?.rows?.[0];
// // // // // // // // // }

// // // // // // // // // // Function to fetch rates from the API and store them in the database if they have changed
// // // // // // // // // async function fetchAndStoreRates() {
// // // // // // // // //   try {
// // // // // // // // //     // Get the latest stored rates from the database
// // // // // // // // //     const latestRates = await getLatestStoredRates();

// // // // // // // // //     // Check if more than 15 minutes have passed since the last update
// // // // // // // // //     const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
// // // // // // // // //     if (latestRates && new Date(latestRates.date) > fifteenMinutesAgo) {
// // // // // // // // //       console.log(
// // // // // // // // //         "Less than 15 minutes since the last update. No need to fetch new rates."
// // // // // // // // //       );
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     // Fetch data from the external API
// // // // // // // // //     const response = await fetch(`${apiBaseUrl}`);
// // // // // // // // //     if (!response.ok) {
// // // // // // // // //       throw new Error("Failed to fetch rates from the API");
// // // // // // // // //     }
// // // // // // // // //     const data = await response.json();

// // // // // // // // //     // Extract rates from the API response
// // // // // // // // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // // // // // // // //     const silverRate = parseFloat(data.rates.XAG || "0");
// // // // // // // // //     const customRate = parseFloat(0 || "0");

// // // // // // // // //     console.log("Fetched silver rate:", silverRate);

// // // // // // // // //     // Check if the fetched rates differ from the latest stored rates
// // // // // // // // //     const ratesChanged =
// // // // // // // // //       !latestRates ||
// // // // // // // // //       latestRates.gold_rate !== goldRate ||
// // // // // // // // //       latestRates.silver_rate !== silverRate ||
// // // // // // // // //       latestRates.custom_rate !== customRate;

// // // // // // // // //     console.log("Rates changed:", ratesChanged);

// // // // // // // // //     if (ratesChanged) {
// // // // // // // // //       // Insert the new rates into the database if they have changed
// // // // // // // // //       await sql`
// // // // // // // // //         INSERT INTO rates (gold_rate, silver_rate, custom_rate, date)
// // // // // // // // //         VALUES (${goldRate}, ${silverRate}, ${customRate}, NOW());
// // // // // // // // //       `;
// // // // // // // // //       console.log("Rates inserted successfully.");
// // // // // // // // //     } else {
// // // // // // // // //       console.log("Rates have not changed. No insertion needed.");
// // // // // // // // //     }
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error("Error inserting data:", error);
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // // Handle GET requests
// // // // // // // // // export async function GET(req: NextRequest) {
// // // // // // // // //   try {
// // // // // // // // //     await fetchAndStoreRates();

// // // // // // // // //     return NextResponse.json(
// // // // // // // // //       { message: "Rates processed successfully." },
// // // // // // // // //       { status: 200 }
// // // // // // // // //     );
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     console.error("Error processing request:", error);
// // // // // // // // //     const errorMessage =
// // // // // // // // //       error instanceof Error ? error.message : "Unknown error";
// // // // // // // // //     return NextResponse.json(
// // // // // // // // //       {
// // // // // // // // //         error: `Failed to process request: ${errorMessage}`,
// // // // // // // // //       },
// // // // // // // // //       { status: 500 }
// // // // // // // // //     );
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // import { apiBaseUrl } from "@/context/constants";
// // // // // // // // import { sql } from "@vercel/postgres";
// // // // // // // // import { NextResponse } from "next/server";

// // // // // // // // // Function to fetch the latest rates from the database
// // // // // // // // async function getLatestStoredRates() {
// // // // // // // //   const result = await sql`
// // // // // // // //     SELECT gold_rate, silver_rate, custom_rate, date
// // // // // // // //     FROM rates
// // // // // // // //     ORDER BY date DESC
// // // // // // // //     LIMIT 1
// // // // // // // //   `;
// // // // // // // //   return result?.rows?.[0];
// // // // // // // // }

// // // // // // // // // Function to fetch rates from the API and store them in the database if they have changed
// // // // // // // // async function fetchAndStoreRates() {
// // // // // // // //   try {
// // // // // // // //     // Get the latest stored rates from the database
// // // // // // // //     const latestRates = await getLatestStoredRates();

// // // // // // // //     // Fetch data from the external API
// // // // // // // //     const response = await fetch(`${apiBaseUrl}`);
// // // // // // // //     if (!response.ok) {
// // // // // // // //       throw new Error("Failed to fetch rates from the API");
// // // // // // // //     }
// // // // // // // //     const data = await response.json();

// // // // // // // //     // Extract rates from the API response
// // // // // // // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // // // // // // //     const silverRate = parseFloat(data.rates.XAG || "0");
// // // // // // // //     const customRate = parseFloat("0");

// // // // // // // //     // Check if the fetched rates differ from the latest stored rates
// // // // // // // //     const ratesChanged =
// // // // // // // //       !latestRates ||
// // // // // // // //       latestRates.gold_rate !== goldRate ||
// // // // // // // //       latestRates.silver_rate !== silverRate ||
// // // // // // // //       latestRates.custom_rate !== customRate;

// // // // // // // //     if (ratesChanged) {
// // // // // // // //       // Insert the new rates into the database if they have changed
// // // // // // // //       await sql`
// // // // // // // //         INSERT INTO rates (gold_rate, silver_rate, custom_rate, date)
// // // // // // // //         VALUES (${goldRate}, ${silverRate}, ${customRate}, NOW());
// // // // // // // //       `;
// // // // // // // //       console.log("Rates inserted successfully.");
// // // // // // // //     } else {
// // // // // // // //       console.log("Rates have not changed. No insertion needed.");
// // // // // // // //     }
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error("Error inserting data:", error);
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // // Handle GET requests
// // // // // // // // export async function GET() {
// // // // // // // //   try {
// // // // // // // //     await fetchAndStoreRates();

// // // // // // // //     return NextResponse.json(
// // // // // // // //       { message: "Rates processed successfully." },
// // // // // // // //       { status: 200 }
// // // // // // // //     );
// // // // // // // //   } catch (error: any) {
// // // // // // // //     console.error("Error processing request:", error);
// // // // // // // //     return NextResponse.json(
// // // // // // // //       { error: `Failed to process request: ${error.message}` },
// // // // // // // //       { status: 500 }
// // // // // // // //     );
// // // // // // // //   }
// // // // // // // // }

// // // // // // // import { apiBaseUrl } from "@/context/constants";
// // // // // // // import { sql } from "@vercel/postgres";
// // // // // // // import { NextResponse } from "next/server";

// // // // // // // // Function to fetch the latest rates from the database
// // // // // // // async function getLatestStoredRates() {
// // // // // // //   const result = await sql`
// // // // // // //     SELECT gold_rate, silver_rate, date
// // // // // // //     FROM rates
// // // // // // //     ORDER BY date DESC
// // // // // // //     LIMIT 1
// // // // // // //   `;
// // // // // // //   return result?.rows?.[0];
// // // // // // // }

// // // // // // // // Function to fetch rates from the API and store them in the database if they have changed
// // // // // // // async function fetchAndStoreRates() {
// // // // // // //   try {
// // // // // // //     // Get the latest stored rates from the database
// // // // // // //     const latestRates = await getLatestStoredRates();

// // // // // // //     // Fetch data from the external API
// // // // // // //     const response = await fetch(`${apiBaseUrl}`);
// // // // // // //     console.log(response);
// // // // // // //     if (!response.ok) {
// // // // // // //       throw new Error("Failed to fetch rates from the API");
// // // // // // //     }
// // // // // // //     const data = await response.json();

// // // // // // //     // Extract rates from the API response
// // // // // // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // // // // // //     const silverRate = parseFloat(data.rates.XAG || "0");

// // // // // // //     console.log(goldRate, "goldRate goldRate");
// // // // // // //     // Check if the fetched rates differ from the latest stored rates
// // // // // // //     // const ratesChanged =
// // // // // // //     //   !latestRates ||
// // // // // // //     //   latestRates.gold_rate !== goldRate ||
// // // // // // //     //   latestRates.silver_rate !== silverRate ||
// // // // // // //     //   latestRates.custom_rate !== customRate;

// // // // // // //     // Insert the new rates into the database if they have changed
// // // // // // //     await sql`
// // // // // // //         INSERT INTO rates (gold_rate, silver_rate, date)
// // // // // // //         VALUES (${goldRate}, ${silverRate}, NOW());
// // // // // // //       `;
// // // // // // //     console.log("Rates inserted successfully.");
// // // // // // //     // }
// // // // // // //   } catch (error) {
// // // // // // //     console.error("Error inserting data:", error);
// // // // // // //   }
// // // // // // // }

// // // // // // // // Handle GET requests
// // // // // // // export async function GET() {
// // // // // // //   try {
// // // // // // //     await fetchAndStoreRates();

// // // // // // //     return NextResponse.json(
// // // // // // //       { message: "Rates processed successfully." },
// // // // // // //       { status: 200 }
// // // // // // //     );
// // // // // // //   } catch (error: any) {
// // // // // // //     console.error("Error processing request:", error);
// // // // // // //     return NextResponse.json(
// // // // // // //       { error: `Failed to process request: ${error.message}` },
// // // // // // //       { status: 500 }
// // // // // // //     );
// // // // // // //   }
// // // // // // // }

// // // // // // import { apiBaseUrl } from "@/context/constants";
// // // // // // import { sql } from "@vercel/postgres";
// // // // // // import { NextResponse } from "next/server";

// // // // // // // Function to fetch the latest rates from the database
// // // // // // async function getLatestStoredRates() {
// // // // // //   const result = await sql`
// // // // // //     SELECT gold_rate, silver_rate, date
// // // // // //     FROM rates
// // // // // //     ORDER BY date DESC
// // // // // //     LIMIT 1
// // // // // //   `;
// // // // // //   return result?.rows?.[0];
// // // // // // }

// // // // // // // Function to fetch rates from the API and store them in the database if they have changed
// // // // // // async function fetchAndStoreRates() {
// // // // // //   try {
// // // // // //     // Get the latest stored rates from the database
// // // // // //     const latestRates = await getLatestStoredRates();

// // // // // //     // Fetch data from the external API
// // // // // //     const response = await fetch(`${apiBaseUrl}`);
// // // // // //     if (!response.ok) {
// // // // // //       throw new Error("Failed to fetch rates from the API");
// // // // // //     }
// // // // // //     const data = await response.json();

// // // // // //     // Extract rates from the API response
// // // // // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // // // // //     const silverRate = parseFloat(data.rates.XAG || "0");

// // // // // //     console.log("Fetched Rates:", { goldRate, silverRate });

// // // // // //     // Check if the fetched rates differ from the latest stored rates
// // // // // //     const ratesChanged =
// // // // // //       !latestRates ||
// // // // // //       latestRates.gold_rate !== goldRate ||
// // // // // //       latestRates.silver_rate !== silverRate;

// // // // // //     // Insert the new rates into the database if they have changed
// // // // // //     if (ratesChanged) {
// // // // // //       await sql`
// // // // // //         INSERT INTO rates (gold_rate, silver_rate, date)
// // // // // //         VALUES (${goldRate}, ${silverRate}, NOW());
// // // // // //       `;
// // // // // //       console.log("Rates inserted successfully.");
// // // // // //     } else {
// // // // // //       console.log("Rates have not changed, no insertion needed.");
// // // // // //     }
// // // // // //   } catch (error) {
// // // // // //     console.error("Error inserting data:", error);
// // // // // //     throw new Error("Error processing rates");
// // // // // //   }
// // // // // // }

// // // // // // // Handle GET requests
// // // // // // export async function GET() {
// // // // // //   try {
// // // // // //     await fetchAndStoreRates();

// // // // // //     return NextResponse.json(
// // // // // //       { message: "Rates processed successfully." },
// // // // // //       { status: 200 }
// // // // // //     );
// // // // // //   } catch (error: any) {
// // // // // //     console.error("Error processing request:", error);
// // // // // //     return NextResponse.json(
// // // // // //       { error: `Failed to process request: ${error.message}` },
// // // // // //       { status: 500 }
// // // // // //     );
// // // // // //   }
// // // // // // }

// // // // // import { apiBaseUrl } from "@/context/constants";
// // // // // import { sql } from "@vercel/postgres";
// // // // // import { NextResponse } from "next/server";

// // // // // // Function to fetch rates from the API and store them in the database
// // // // // async function fetchAndStoreRates() {
// // // // //   try {
// // // // //     // Fetch data from the external API
// // // // //     const response = await fetch(`${apiBaseUrl}`);
// // // // //     if (!response.ok) {
// // // // //       throw new Error("Failed to fetch rates from the API");
// // // // //     }
// // // // //     const data = await response.json();

// // // // //     // Extract rates from the API response
// // // // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // // // //     const silverRate = parseFloat(data.rates.XAG || "0");

// // // // //     console.log("Fetched Rates:", { goldRate, silverRate });

// // // // //     // Insert the new rates into the database
// // // // //     await sql`
// // // // //       INSERT INTO rates (gold_rate, silver_rate, date)
// // // // //       VALUES (${goldRate}, ${silverRate}, NOW());
// // // // //     `;
// // // // //     console.log("Rates inserted successfully.");
// // // // //   } catch (error) {
// // // // //     console.error("Error inserting data:", error);
// // // // //     throw new Error("Error processing rates");
// // // // //   }
// // // // // }
// // // // // setInterval(fetchAndStoreRates, 30 * 60 * 1000);
// // // // // // fetchAndStoreRates();
// // // // // // Handle GET requests
// // // // // export async function GET() {
// // // // //   try {
// // // // //     await fetchAndStoreRates();

// // // // //     return NextResponse.json(
// // // // //       { message: "Rates processed and stored successfully." },
// // // // //       { status: 200 }
// // // // //     );
// // // // //   } catch (error: any) {
// // // // //     console.error("Error processing request:", error);
// // // // //     return NextResponse.json(
// // // // //       { error: `Failed to process request: ${error.message}` },
// // // // //       { status: 500 }
// // // // //     );
// // // // //   }
// // // // // }

// // // // // import { apiBaseUrl } from "@/context/constants";
// // // // // import { sql } from "@vercel/postgres";
// // // // // import { NextResponse } from "next/server";

// // // // // // Function to fetch rates from the API and store them in the database
// // // // // async function fetchAndStoreRates() {
// // // // //   try {
// // // // //     // Fetch data from the external API
// // // // //     const response = await fetch(`${apiBaseUrl}`);
// // // // //     if (!response.ok) {
// // // // //       throw new Error("Failed to fetch rates from the API");
// // // // //     }
// // // // //     const data = await response.json();

// // // // //     // Extract rates from the API response
// // // // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // // // //     const silverRate = parseFloat(data.rates.XAG || "0");

// // // // //     console.log("Fetched Rates:", { goldRate, silverRate });

// // // // //     // Get the last stored rates
// // // // //     // const lastRecord: any =
// // // // //     //   await sql`SELECT * FROM rates ORDER BY date DESC LIMIT 1`;

// // // // //     // // Check if the new rates are different from the last stored rates
// // // // //     // if (
// // // // //     //   lastRecord &&
// // // // //     //   lastRecord.gold_rate === goldRate &&
// // // // //     //   lastRecord.silver_rate === silverRate
// // // // //     // ) {
// // // // //     //   console.log("Rates have not changed.");
// // // // //     //   return;
// // // // //     // }

// // // // //     // Insert the new rates into the database
// // // // //     await sql`
// // // // //       INSERT INTO rates (gold_rate, silver_rate, date)
// // // // //       VALUES (${goldRate}, ${silverRate}, NOW());
// // // // //     `;
// // // // //     console.log("Rates inserted successfully.");
// // // // //   } catch (error) {
// // // // //     console.error("Error inserting data:", error);
// // // // //     throw new Error("Error processing rates");
// // // // //   }
// // // // // }
// // // // // // fetchAndStoreRates();
// // // // // // Handle GET requests
// // // // // export async function GET() {
// // // // //   try {
// // // // //     await fetchAndStoreRates();

// // // // //     return NextResponse.json(
// // // // //       { message: "Rates processed and stored successfully." },
// // // // //       { status: 200 }
// // // // //     );
// // // // //   } catch (error: any) {
// // // // //     console.error("Error processing request:", error);
// // // // //     return NextResponse.json(
// // // // //       { error: `Failed to process request: ${error.message}` },
// // // // //       { status: 500 }
// // // // //     );
// // // // //   }
// // // // // }
// // // // // import { apiBaseUrl } from "@/context/constants";
// // // // // import { sql } from "@vercel/postgres";
// // // // // import { NextResponse } from "next/server";

// // // // // async function fetchAndStoreRates() {
// // // // //   try {
// // // // //     // Fetch the latest rates from the API
// // // // //     const response = await fetch(`${apiBaseUrl}`);
// // // // //     console.log(response);

// // // // //     if (!response.ok) {
// // // // //       throw new Error("Failed to fetch rates from the API");
// // // // //     }
// // // // //     const data = await response.json();

// // // // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // // // //     const silverRate = parseFloat(data.rates.XAG || "0");

// // // // //     await sql`
// // // // //         INSERT INTO rates (gold_rate, silver_rate, date)
// // // // //         VALUES (${goldRate}, ${silverRate}, NOW());
// // // // //       `;
// // // // //     console.log("Fetched Rates hamza:", { goldRate, silverRate });
// // // // //   } catch (error) {
// // // // //     console.error("Error processing data:", error);
// // // // //     throw new Error("Error processing rates");
// // // // //   }
// // // // // }
// // // // // // setInterval(fetchAndStoreRates, 60000);
// // // // // export async function GET() {
// // // // //   try {
// // // // //     console.log("Rates inserted successfully Crons Job Done by hamza!.");
// // // // //     await fetchAndStoreRates();

// // // // //     return NextResponse.json(
// // // // //       { message: "Rates processed successfully." },
// // // // //       { status: 200 }
// // // // //     );
// // // // //   } catch (error: any) {
// // // // //     console.error("Error processing request:", error);
// // // // //     return NextResponse.json(
// // // // //       { error: `Failed to process request: ${error.message}` },
// // // // //       { status: 500 }
// // // // //     );
// // // // //   }
// // // // // }

// // // // // app/api/fetch-rates/route.ts

// // // // import { NextResponse } from "next/server";

// // // // // Replace with your actual API base URL
// // // // const apiBaseUrl = "https://your-external-api.com/endpoint";

// // // // export async function GET() {
// // // //   try {
// // // //     console.log("Fetching latest rates from external API...");

// // // //     const response = await fetch(apiBaseUrl, {
// // // //       method: "GET",
// // // //       cache: "no-store", // Disable Next.js fetch caching
// // // //       headers: {
// // // //         "Content-Type": "application/json",
// // // //         Accept: "application/json",
// // // //         // Additional headers if required by your API
// // // //       },
// // // //     });

// // // //     if (!response.ok) {
// // // //       console.error(`External API responded with status ${response.status}`);
// // // //       return NextResponse.json(
// // // //         { error: `Failed to fetch rates: ${response.statusText}` },
// // // //         { status: response.status }
// // // //       );
// // // //     }

// // // //     const data = await response.json();

// // // //     console.log("Successfully fetched latest rates:", data);

// // // //     // Extract and parse rates
// // // //     const goldRate = parseFloat(data.rates?.PKRXAU ?? "0");
// // // //     const silverRate = parseFloat(data.rates?.XAG ?? "0");

// // // //     console.log("Parsed Rates:", { goldRate, silverRate });

// // // //     return NextResponse.json(
// // // //       {
// // // //         message: "Rates fetched successfully.",
// // // //         rates: { goldRate, silverRate },
// // // //       },
// // // //       {
// // // //         status: 200,
// // // //         headers: {
// // // //           "Cache-Control":
// // // //             "no-store, no-cache, must-revalidate, proxy-revalidate",
// // // //           Pragma: "no-cache",
// // // //           Expires: "0",
// // // //           "Surrogate-Control": "no-store",
// // // //         },
// // // //       }
// // // //     );
// // // //   } catch (error) {
// // // //     console.error("Error fetching rates:", error);
// // // //     return NextResponse.json(
// // // //       { error: "An unexpected error occurred while fetching rates." },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // // import { apiBaseUrl } from "@/context/constants";
// // // import { NextResponse } from "next/server";

// // // async function fetchRates() {
// // //   try {
// // //     // Fetch the latest rates from the external API with no-cache settings
// // //     const response = await fetch(`${apiBaseUrl}`, {
// // //       method: "GET",
// // //       headers: {
// // //         "Cache-Control": "no-cache",
// // //         Pragma: "no-cache",
// // //         Expires: "0",
// // //       },
// // //       // Prevent the fetch function from using any cache
// // //       cache: "no-store",
// // //     });

// // //     // Log the entire response object for debugging
// // //     console.log("Response Object:", response);

// // //     if (!response.ok) {
// // //       throw new Error(`API Error: ${response.status} - ${response.statusText}`);
// // //     }

// // //     // Log response status and headers
// // //     console.log("Response Status:", response.status);
// // //     console.log("Response Status Text:", response.statusText);
// // //     console.log("Response Headers:");
// // //     response.headers.forEach((value, key) => {
// // //       console.log(`${key}: ${value}`);
// // //     });

// // //     // Parse the JSON data from the response
// // //     const data = await response.json();

// // //     // Log the JSON response data
// // //     console.log("Response JSON Data:", data);

// // //     // Extract and parse the gold and silver rates
// // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // //     const silverRate = parseFloat(data.rates.XAG || "0");

// // //     // Log the parsed rates
// // //     console.log("Parsed Gold Rate:", goldRate);
// // //     console.log("Parsed Silver Rate:", silverRate);

// // //     return { goldRate, silverRate };
// // //   } catch (error) {
// // //     console.error("Error fetching rates:", error);
// // //     throw new Error("Error fetching rates");
// // //   }
// // // }

// // // export async function GET() {
// // //   try {
// // //     console.log("GET handler invoked");

// // //     // Fetch the latest rates
// // //     const rates = await fetchRates();
// // //     console.log("Rates fetched successfully!");

// // //     // Return the response with no-store cache directive
// // //     return NextResponse.json(
// // //       { message: "Rates fetched successfully.", rates },
// // //       {
// // //         status: 200,
// // //         headers: {
// // //           "Cache-Control": "no-store", // Prevent caching of this response
// // //         },
// // //       }
// // //     );
// // //   } catch (error: any) {
// // //     console.error("Error processing request:", error);
// // //     return NextResponse.json(
// // //       { error: `Failed to process request: ${error.message}` },
// // //       {
// // //         status: 500,
// // //         headers: { "Cache-Control": "no-store" }, // Prevent caching of error responses
// // //       }
// // //     );
// // //   }
// // // }

// import { apiBaseUrl } from "@/context/constants";
// import { sql } from "@vercel/postgres";
// import { NextResponse } from "next/server";
// export const dynamic = "force-dynamic";

// async function fetchRates() {
//   try {
//     const response = await fetch(`${apiBaseUrl}`, {
//       method: "GET",
//       headers: {
//         "Cache-Control": "no-cache",
//         Pragma: "no-cache",
//         Expires: "0",
//       },
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       throw new Error(`API Error: ${response.status} - ${response.statusText}`);
//     }
//     const data = await response.json();
//     console.log(data, "with new api");
//     const goldRateUsd = parseFloat(data.rates.USDXAU || "0");
//     const silverRateUsd = parseFloat(data.rates.USDXAG || "0");
//     const dollarInPkr = parseFloat(data.rates.PKR || "0");
//     const goldRatePkr = goldRateUsd * dollarInPkr;
//     const silverRatePkr = silverRateUsd * dollarInPkr;
//     return { goldRateUsd, goldRatePkr, silverRateUsd, silverRatePkr };
//   } catch (error) {
//     throw new Error("Error fetching rates");
//   }
// }

// async function getLatestRatesFromDatabase() {
//   try {
//     const result =
//       await sql`SELECT gold_rate, silver_rate FROM rates ORDER BY date DESC LIMIT 1;`;
//     if (result.rows.length === 0) {
//       return null;
//     }
//     return result.rows[0];
//   } catch (error) {
//     throw new Error("Error fetching latest rates from database");
//   }
// }

// async function storeRatesInDatabase(goldRateUsd:number, goldRatePkr:number,silverRateUsd:number,silverRatePkr:number) {
//   try {
//     await sql`
//       INSERT INTO rates (gold_rate_usd, gold_rate_pkr, silver_rate_usd, silver_rate_pkr, date)
//       VALUES (${goldRateUsd}, ${goldRatePkr}, ${silverRateUsd} ,${silverRatePkr}, NOW());
//     `;
//   } catch (error) {
//     throw new Error("Error storing rates in database");
//   }
// }

// export async function GET() {
//   try {
//     const { goldRateUsd, goldRatePkr, silverRateUsd, silverRatePkr } =
//       await fetchRates();
//     console.log(
//       goldRateUsd,
//       goldRatePkr,
//       silverRateUsd,
//       silverRatePkr,
//       "Hit Route With CronJob and Get New Rates in Tory Ounce From API"
//     );
//     const latestRates = await getLatestRatesFromDatabase();
//     if (
//       !latestRates ||
//       latestRates.gold_rate_usd !== goldRateUsd ||
//       latestRates.gold_rate_pkr !== goldRatePkr ||
//       latestRates.silver_rate_usd !== silverRateUsd ||
//       latestRates.silver_rate_pkr !== silverRatePkr ||
//     ) {
//       console.log("Rates fetched and updated in database successfully.");
//       await storeRatesInDatabase(goldRateUsd, goldRatePkr,silverRateUsd,silverRatePkr);
//       return NextResponse.json(
//         { message: "Rates fetched and updated in database successfully." },
//         { status: 200 }
//       );
//     } else {
//       console.log(
//         "Rates fetched but no changes detected, No update to the database."
//       );
//       return NextResponse.json(
//         {
//           message:
//             "Rates fetched but no changes detected, No update to the database.",
//         },
//         { status: 200 }
//       );
//     }
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: `Failed to process request: ${error.message}` },
//       { status: 500 }
//     );
//   }
// }

// // import { apiBaseUrl } from "@/context/constants";
// // import { sql } from "@vercel/postgres";
// // import { NextResponse } from "next/server";
// // export const dynamic = "force-dynamic";

// // async function fetchRates() {
// //   try {
// //     const response = await fetch(`${apiBaseUrl}`, {
// //       method: "GET",
// //       headers: {
// //         "Cache-Control": "no-cache",
// //         Pragma: "no-cache",
// //         Expires: "0",
// //       },
// //       cache: "no-store",
// //     });

// //     if (!response.ok) {
// //       throw new Error(`API Error: ${response.status} - ${response.statusText}`);
// //     }
// //     const data = await response.json();
// //     const goldRateUsd = parseFloat(data.rates.USDXAU || "0");
// //     const silverRateUsd = parseFloat(data.rates.USDXAG || "0");
// //     const dollarInPkr = parseFloat(data.rates.PKR || "0");
// //     const goldRatePkr = goldRateUsd * dollarInPkr;
// //     const silverRatePkr = silverRateUsd * dollarInPkr;
// //     return { goldRateUsd, goldRatePkr, silverRateUsd, silverRatePkr };
// //   } catch (error) {
// //     throw new Error("Error fetching rates");
// //   }
// // }

// // async function getLatestRatesFromDatabase() {
// //   try {
// //     const result =
// //       await sql`SELECT gold_rate_usd, gold_rate_pkr, silver_rate_usd, silver_rate_pkr FROM rates ORDER BY date DESC LIMIT 1;`;
// //     if (result.rows.length === 0) {
// //       return null;
// //     }
// //     return result.rows[0];
// //   } catch (error) {
// //     throw new Error("Error fetching latest rates from database");
// //   }
// // }

// // async function storeRatesInDatabase(
// //   goldRateUsd: number,
// //   goldRatePkr: number,
// //   silverRateUsd: number,
// //   silverRatePkr: number
// // ) {
// //   try {
// //     await sql`
// //       INSERT INTO rates (gold_rate_usd, gold_rate_pkr, silver_rate_usd, silver_rate_pkr, date)
// //       VALUES (${goldRateUsd}, ${goldRatePkr}, ${silverRateUsd}, ${silverRatePkr}, NOW());
// //     `;
// //   } catch (error) {
// //     throw new Error("Error storing rates in database");
// //   }
// // }

// // export async function GET() {
// //   try {
// //     const { goldRateUsd, goldRatePkr, silverRateUsd, silverRatePkr } =
// //       await fetchRates();

// //     const latestRates = await getLatestRatesFromDatabase();

// //     if (
// //       !latestRates ||
// //       latestRates.gold_rate_usd !== goldRateUsd ||
// //       latestRates.gold_rate_pkr !== goldRatePkr ||
// //       latestRates.silver_rate_usd !== silverRateUsd ||
// //       latestRates.silver_rate_pkr !== silverRatePkr
// //     ) {
// //       await storeRatesInDatabase(
// //         goldRateUsd,
// //         goldRatePkr,
// //         silverRateUsd,
// //         silverRatePkr
// //       );
// //       return NextResponse.json(
// //         { message: "Rates fetched and updated in database successfully." },
// //         { status: 200 }
// //       );
// //     } else {
// //       return NextResponse.json(
// //         {
// //           message:
// //             "Rates fetched but no changes detected, No update to the database.",
// //         },
// //         { status: 200 }
// //       );
// //     }
// //   } catch (error: any) {
// //     return NextResponse.json(
// //       { error: `Failed to process request: ${error.message}` },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { apiBaseUrl } from "@/context/constants";
// import { sql } from "@vercel/postgres";
// import { NextResponse } from "next/server";
// export const dynamic = "force-dynamic";

// async function fetchRates() {
//   try {
//     const response = await fetch(`${apiBaseUrl}`, {
//       method: "GET",
//       headers: {
//         "Cache-Control": "no-cache",
//         Pragma: "no-cache",
//         Expires: "0",
//       },
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       throw new Error(`API Error: ${response.status} - ${response.statusText}`);
//     }
//     const data = await response.json();

//     const goldRatePkr = parseFloat(data.metals.gold || "0");
//     const dollar_In_Pkr = parseFloat(data.currencies.USD || "0");
//     const Sar_In_Pkr = parseFloat(data.currencies.SAR || "0");
//     const Uae_In_Pkr = parseFloat(data.currencies.AED || "0");
//     const inr_In_pkr = parseFloat(data.currencies.INR || "0");
//     // goldrate in different country
//     const goldRateUsd = goldRatePkr / dollar_In_Pkr;
//     const goldRateSar = goldRatePkr / Sar_In_Pkr;
//     const goldRateUae = goldRatePkr / Uae_In_Pkr;
//     const goldRateInr = goldRatePkr / inr_In_pkr;

//     return { goldRatePkr, goldRateUsd, goldRateSar, goldRateUae, goldRateInr };
//   } catch (error) {
//     throw new Error("Error fetching rates");
//   }
// }

// async function getLatestRatesFromDatabase() {
//   try {
//     const result =
//       await sql`SELECT gold_rate_PKR,gold_rate_USD,gold_rate_SAR,gold_rate_UAE,gold_rate_INR FROM rates ORDER BY date DESC LIMIT 1;`;

//     if (result.rows.length === 0) {
//       return null;
//     }
//     return result.rows[0];
//   } catch (error) {
//     throw new Error("Error fetching latest rates from database");
//   }
// }

// async function storeRatesInDatabase(
//   goldRatePkr: number,
//   goldRateUsd: number,
//   goldRateSar: number,
//   goldRateUae: number,
//   goldRateInr: number
// ) {
//   try {
//     await sql`
//       INSERT INTO rates (gold_rate_PKR,gold_rate_USD,gold_rate_SAR,gold_rate_UAE,gold_rate_INR,date)
//       VALUES (${goldRatePkr},${goldRateUsd},${goldRateSar},${goldRateUae},${goldRateInr},  NOW());
//     `;
//   } catch (error) {
//     throw new Error("Error storing rates in database");
//   }
// }

// export async function GET() {
//   try {
//     const { goldRatePkr, goldRateUsd, goldRateSar, goldRateUae, goldRateInr } =
//       await fetchRates();

//     const latestRates = await getLatestRatesFromDatabase();

//     if (
//       !latestRates ||
//       latestRates.gold_rate_pkr !== goldRatePkr ||
//       latestRates.gold_rate_usd !== goldRateUsd ||
//       latestRates.gold_rate_sar !== goldRateSar ||
//       latestRates.gold_rate_uae !== goldRateUae ||
//       latestRates.gold_rate_inr !== goldRateInr
//     ) {
//       console.log("Rates fetched and updated in database successfully.");
//       await storeRatesInDatabase(
//         goldRatePkr,
//         goldRateUsd,
//         goldRateSar,
//         goldRateUae,
//         goldRateInr
//       );
//       return NextResponse.json(
//         { message: "Rates fetched and updated in database successfully." },
//         { status: 200 }
//       );
//     } else {
//       console.log(
//         "Rates fetched but no changes detected, No update to the database."
//       );
//       return NextResponse.json(
//         {
//           message:
//             "Rates fetched but no changes detected, No update to the database.",
//         },
//         { status: 200 }
//       );
//     }
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: `Failed to process request: ${error.message}` },
//       { status: 500 }
//     );
//   }
// }

import { apiBaseUrl } from "@/context/constants";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

async function fetchRates() {
  try {
    const response = await fetch(`${apiBaseUrl}`, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    const goldRatePkr = parseFloat(data.metals.gold || "0");
    const dollar_In_Pkr = parseFloat(data.currencies.USD || "0");
    const Sar_In_Pkr = parseFloat(data.currencies.SAR || "0");
    const Uae_In_Pkr = parseFloat(data.currencies.AED || "0");
    const inr_In_pkr = parseFloat(data.currencies.INR || "0");

    // gold rate in different currencies
    const goldRateUsd = goldRatePkr / dollar_In_Pkr;
    const goldRateSar = goldRatePkr / Sar_In_Pkr;
    const goldRateUae = goldRatePkr / Uae_In_Pkr;
    const goldRateInr = goldRatePkr / inr_In_pkr;

    return { goldRatePkr, goldRateUsd, goldRateSar, goldRateUae, goldRateInr };
  } catch (error) {
    throw new Error("Error fetching rates");
  }
}

async function getLatestRatesFromDatabase() {
  try {
    const result =
      await sql`SELECT gold_rate_PKR,gold_rate_USD,gold_rate_SAR,gold_rate_UAE,gold_rate_INR FROM rates ORDER BY date DESC LIMIT 1;`;

    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    throw new Error("Error fetching latest rates from database");
  }
}

async function storeRatesInDatabase(
  goldRatePkr: number,
  goldRateUsd: number,
  goldRateSar: number,
  goldRateUae: number,
  goldRateInr: number
) {
  try {
    await sql`
      INSERT INTO rates (gold_rate_PKR,gold_rate_USD,gold_rate_SAR,gold_rate_UAE,gold_rate_INR,date)
      VALUES (${goldRatePkr},${goldRateUsd},${goldRateSar},${goldRateUae},${goldRateInr}, NOW());
    `;
  } catch (error) {
    throw new Error("Error storing rates in database");
  }
}

async function deleteOldestRateIfLimitExceeded() {
  try {
    const result = await sql`SELECT COUNT(*) FROM rates;`;
    const rowCount = parseInt(result.rows[0].count, 10);

    if (rowCount > 100) {
      await sql`DELETE FROM rates WHERE date = (SELECT MIN(date) FROM rates);`;
      console.log("Oldest rate deleted to maintain the limit of 100 rows.");
    }
  } catch (error) {
    throw new Error("Error deleting the oldest rate from database");
  }
}

export async function GET() {
  try {
    const { goldRatePkr, goldRateUsd, goldRateSar, goldRateUae, goldRateInr } =
      await fetchRates();

    const latestRates = await getLatestRatesFromDatabase();

    if (
      !latestRates ||
      latestRates.gold_rate_pkr !== goldRatePkr ||
      latestRates.gold_rate_usd !== goldRateUsd ||
      latestRates.gold_rate_sar !== goldRateSar ||
      latestRates.gold_rate_uae !== goldRateUae ||
      latestRates.gold_rate_inr !== goldRateInr
    ) {
      console.log("Rates fetched and updated in database successfully.");
      await storeRatesInDatabase(
        goldRatePkr,
        goldRateUsd,
        goldRateSar,
        goldRateUae,
        goldRateInr
      );

      // Check if the number of rows exceeds 100 and delete the oldest if needed
      await deleteOldestRateIfLimitExceeded();

      return NextResponse.json(
        { message: "Rates fetched and updated in database successfully." },
        { status: 200 }
      );
    } else {
      console.log(
        "Rates fetched but no changes detected, No update to the database."
      );
      return NextResponse.json(
        {
          message:
            "Rates fetched but no changes detected, No update to the database.",
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to process request: ${error.message}` },
      { status: 500 }
    );
  }
}
