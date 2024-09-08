// // // // // // // // // import { apiBaseUrl } from "@/context/constants";
// // // // // // // // // import { sql } from "@vercel/postgres";
// // // // // // // // // import { NextRequest, NextResponse } from "next/server";

// // // // // // // // // // Opt out of caching for all data requests in the route segment
// // // // // // // // // export const dynamic = "force-dynamic";

// // // // // // // // // export async function GET(req: NextRequest) {
// // // // // // // // //   try {
// // // // // // // // //     // Fetch data from the external API

// // // // // // // // //     const response = await fetch(`${apiBaseUrl}`);
// // // // // // // // //     if (!response.ok) {
// // // // // // // // //       throw new Error("Failed to fetch rates from the API");
// // // // // // // // //     }
// // // // // // // // //     const data = await response.json();
// // // // // // // // //     console.log(data);
// // // // // // // // //     // Extract rates from the API response
// // // // // // // // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // // // // // // // //     const silverRate = parseFloat(data.rates.XAG || "0");
// // // // // // // // //     const customRate = parseFloat(data.rates.PKRXAU || "0");

// // // // // // // // //     console.log(goldRate, "goldRate");

// // // // // // // // //     // Insert the rates into the existing table
// // // // // // // // //     await sql`
// // // // // // // // //       INSERT INTO rates (gold_rate, silver_rate, custom_rate, date)
// // // // // // // // //       VALUES (${goldRate}, ${silverRate}, ${customRate}, NOW());
// // // // // // // // //     `;

// // // // // // // // //     return NextResponse.json(
// // // // // // // // //       { message: "Rates inserted successfully." },
// // // // // // // // //       { status: 200 }
// // // // // // // // //     );
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     console.error("Error inserting data:", error);
// // // // // // // // //     const errorMessage =
// // // // // // // // //       error instanceof Error ? error.message : "Unknown error";
// // // // // // // // //     return NextResponse.json(
// // // // // // // // //       {
// // // // // // // // //         error: `Failed to insert rates: ${errorMessage}`,
// // // // // // // // //       },
// // // // // // // // //       { status: 500 }
// // // // // // // // //     );
// // // // // // // // //   }
// // // // // // // // // }
// // // // // // // // // import { apiBaseUrl } from "@/context/constants";
// // // // // // // // // import { sql } from "@vercel/postgres";
// // // // // // // // // import { NextRequest, NextResponse } from "next/server";

// // // // // // // // // // Function to fetch rates from the API and store them in the database
// // // // // // // // // async function fetchAndStoreRates() {
// // // // // // // // //   try {
// // // // // // // // //     // Fetch data from the external API
// // // // // // // // //     const response = await fetch(`${apiBaseUrl}`);
// // // // // // // // //     if (!response.ok) {
// // // // // // // // //       throw new Error("Failed to fetch rates from the API");
// // // // // // // // //     }
// // // // // // // // //     const data = await response.json();
// // // // // // // // //     console.log(data);

// // // // // // // // //     // Extract rates from the API response
// // // // // // // // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // // // // // // // //     const silverRate = parseFloat(data.rates.XAG || "0");
// // // // // // // // //     const customRate = parseFloat(data.rates.PKRXAU || "0");

// // // // // // // // //     console.log(goldRate, "goldRate");

// // // // // // // // //     // Insert the rates into the existing table
// // // // // // // // //     await sql`
// // // // // // // // //       INSERT INTO rates (gold_rate, silver_rate, custom_rate, date)
// // // // // // // // //       VALUES (${goldRate}, ${silverRate}, ${customRate}, NOW());
// // // // // // // // //     `;

// // // // // // // // //     console.log("Rates inserted successfully.");
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error("Error inserting data:", error);
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // // Set an interval to run the fetchAndStoreRates function every 8 hours
// // // // // // // // // // setInterval(fetchAndStoreRates, 8 * 60 * 60 * 1000);

// // // // // // // // // // // Optionally, call the function immediately on startup
// // // // // // // // // // fetchAndStoreRates();

// // // // // // // // // // Handle GET requests
// // // // // // // // // export async function GET(req: NextRequest) {
// // // // // // // // //   try {
// // // // // // // // //     await fetchAndStoreRates();

// // // // // // // // //     return NextResponse.json(
// // // // // // // // //       { message: "Rates inserted successfully." },
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
// // // // // // // // import { NextRequest, NextResponse } from "next/server";

// // // // // // // // // Function to fetch the latest rates from the database
// // // // // // // // async function getLatestStoredRates() {
// // // // // // // //   const result =
// // // // // // // //     await sql`SELECT gold_rate, silver_rate, custom_rate FROM rates ORDER BY date DESC LIMIT 1`;
// // // // // // // //   return result?.rows?.[0];
// // // // // // // // }

// // // // // // // // // Function to fetch rates from the API and store them in the database if they have changed
// // // // // // // // async function fetchAndStoreRates() {
// // // // // // // //   try {
// // // // // // // //     // Fetch data from the external API
// // // // // // // //     const response = await fetch(`${apiBaseUrl}`);
// // // // // // // //     if (!response.ok) {
// // // // // // // //       throw new Error("Failed to fetch rates from the API");
// // // // // // // //     }
// // // // // // // //     const data = await response.json();

// // // // // // // //     // Extract rates from the API response
// // // // // // // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // // // // // // //     const silverRate = parseFloat(data.rates.XAG || "0");
// // // // // // // //     const customRate = parseFloat(data.rates.PKRXAU || "0");

// // // // // // // //     console.log(goldRate, "goldRate");

// // // // // // // //     // Get the latest stored rates from the database
// // // // // // // //     const latestRates = await getLatestStoredRates();

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

// // // // // // // // // Set an interval to run the fetchAndStoreRates function every 8 hours
// // // // // // // // // Uncomment this line if you want to enable automatic updates every 8 hours
// // // // // // // // // setInterval(fetchAndStoreRates, 8 * 60 * 60 * 1000);

// // // // // // // // // Handle GET requests
// // // // // // // // export async function GET(req: NextRequest) {
// // // // // // // //   try {
// // // // // // // //     await fetchAndStoreRates();

// // // // // // // //     return NextResponse.json(
// // // // // // // //       { message: "Rates processed successfully." },
// // // // // // // //       { status: 200 }
// // // // // // // //     );
// // // // // // // //   } catch (error: any) {
// // // // // // // //     console.error("Error processing request:", error);
// // // // // // // //     const errorMessage =
// // // // // // // //       error instanceof Error ? error.message : "Unknown error";
// // // // // // // //     return NextResponse.json(
// // // // // // // //       {
// // // // // // // //         error: `Failed to process request: ${errorMessage}`,
// // // // // // // //       },
// // // // // // // //       { status: 500 }
// // // // // // // //     );
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // import { apiBaseUrl } from "@/context/constants";
// // // // // // // // import { sql } from "@vercel/postgres";
// // // // // // // // import { NextRequest, NextResponse } from "next/server";

// // // // // // // // // Function to fetch the latest rates from the database
// // // // // // // // async function getLatestStoredRates() {
// // // // // // // //   const result =
// // // // // // // //     await sql`SELECT gold_rate, silver_rate, custom_rate FROM rates ORDER BY date DESC LIMIT 1`;

// // // // // // // //   return result?.rows?.[0];
// // // // // // // // }

// // // // // // // // // Function to fetch rates from the API and store them in the database if they have changed
// // // // // // // // async function fetchAndStoreRates() {
// // // // // // // //   try {
// // // // // // // //     // Fetch data from the external API
// // // // // // // //     const response = await fetch(`${apiBaseUrl}`);
// // // // // // // //     if (!response.ok) {
// // // // // // // //       throw new Error("Failed to fetch rates from the API");
// // // // // // // //     }
// // // // // // // //     const data = await response.json();

// // // // // // // //     // Extract rates from the API response
// // // // // // // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // // // // // // //     const silverRate = parseFloat(data.rates.XAG || "0");
// // // // // // // //     const customRate = parseFloat(0 || "0");

// // // // // // // //     console.log("Fetched silver rate:", silverRate);

// // // // // // // //     // Get the latest stored rates from the database
// // // // // // // //     const latestRates = await getLatestStoredRates();

// // // // // // // //     // Check if the fetched rates differ from the latest stored rates
// // // // // // // //     const ratesChanged =
// // // // // // // //       !latestRates ||
// // // // // // // //       latestRates.gold_rate !== goldRate ||
// // // // // // // //       latestRates.silver_rate !== silverRate ||
// // // // // // // //       latestRates.custom_rate !== customRate;

// // // // // // // //     console.log("Rates changed:", ratesChanged);

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
// // // // // // // // // fetchAndStoreRates();
// // // // // // // // setInterval(fetchAndStoreRates, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
// // // // // // // // // Handle GET requests
// // // // // // // // export async function GET(req: NextRequest) {
// // // // // // // //   try {
// // // // // // // //     await fetchAndStoreRates();

// // // // // // // //     return NextResponse.json(
// // // // // // // //       { message: "Rates processed successfully." },
// // // // // // // //       { status: 200 }
// // // // // // // //     );
// // // // // // // //   } catch (error: any) {
// // // // // // // //     console.error("Error processing request:", error);
// // // // // // // //     const errorMessage =
// // // // // // // //       error instanceof Error ? error.message : "Unknown error";
// // // // // // // //     return NextResponse.json(
// // // // // // // //       {
// // // // // // // //         error: `Failed to process request: ${errorMessage}`,
// // // // // // // //       },
// // // // // // // //       { status: 500 }
// // // // // // // //     );
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // import { apiBaseUrl } from "@/context/constants";
// // // // // // // // import { sql } from "@vercel/postgres";
// // // // // // // // import { NextRequest, NextResponse } from "next/server";

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

// // // // // // // //     // Check if more than 15 minutes have passed since the last update
// // // // // // // //     const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
// // // // // // // //     if (latestRates && new Date(latestRates.date) > fifteenMinutesAgo) {
// // // // // // // //       console.log(
// // // // // // // //         "Less than 15 minutes since the last update. No need to fetch new rates."
// // // // // // // //       );
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     // Fetch data from the external API
// // // // // // // //     const response = await fetch(`${apiBaseUrl}`);
// // // // // // // //     if (!response.ok) {
// // // // // // // //       throw new Error("Failed to fetch rates from the API");
// // // // // // // //     }
// // // // // // // //     const data = await response.json();

// // // // // // // //     // Extract rates from the API response
// // // // // // // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // // // // // // //     const silverRate = parseFloat(data.rates.XAG || "0");
// // // // // // // //     const customRate = parseFloat(0 || "0");

// // // // // // // //     console.log("Fetched silver rate:", silverRate);

// // // // // // // //     // Check if the fetched rates differ from the latest stored rates
// // // // // // // //     const ratesChanged =
// // // // // // // //       !latestRates ||
// // // // // // // //       latestRates.gold_rate !== goldRate ||
// // // // // // // //       latestRates.silver_rate !== silverRate ||
// // // // // // // //       latestRates.custom_rate !== customRate;

// // // // // // // //     console.log("Rates changed:", ratesChanged);

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
// // // // // // // // export async function GET(req: NextRequest) {
// // // // // // // //   try {
// // // // // // // //     await fetchAndStoreRates();

// // // // // // // //     return NextResponse.json(
// // // // // // // //       { message: "Rates processed successfully." },
// // // // // // // //       { status: 200 }
// // // // // // // //     );
// // // // // // // //   } catch (error: any) {
// // // // // // // //     console.error("Error processing request:", error);
// // // // // // // //     const errorMessage =
// // // // // // // //       error instanceof Error ? error.message : "Unknown error";
// // // // // // // //     return NextResponse.json(
// // // // // // // //       {
// // // // // // // //         error: `Failed to process request: ${errorMessage}`,
// // // // // // // //       },
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
// // // // // // //     SELECT gold_rate, silver_rate, custom_rate, date
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
// // // // // // //     if (!response.ok) {
// // // // // // //       throw new Error("Failed to fetch rates from the API");
// // // // // // //     }
// // // // // // //     const data = await response.json();

// // // // // // //     // Extract rates from the API response
// // // // // // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // // // // // //     const silverRate = parseFloat(data.rates.XAG || "0");
// // // // // // //     const customRate = parseFloat("0");

// // // // // // //     // Check if the fetched rates differ from the latest stored rates
// // // // // // //     const ratesChanged =
// // // // // // //       !latestRates ||
// // // // // // //       latestRates.gold_rate !== goldRate ||
// // // // // // //       latestRates.silver_rate !== silverRate ||
// // // // // // //       latestRates.custom_rate !== customRate;

// // // // // // //     if (ratesChanged) {
// // // // // // //       // Insert the new rates into the database if they have changed
// // // // // // //       await sql`
// // // // // // //         INSERT INTO rates (gold_rate, silver_rate, custom_rate, date)
// // // // // // //         VALUES (${goldRate}, ${silverRate}, ${customRate}, NOW());
// // // // // // //       `;
// // // // // // //       console.log("Rates inserted successfully.");
// // // // // // //     } else {
// // // // // // //       console.log("Rates have not changed. No insertion needed.");
// // // // // // //     }
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
// // // // // //     console.log(response);
// // // // // //     if (!response.ok) {
// // // // // //       throw new Error("Failed to fetch rates from the API");
// // // // // //     }
// // // // // //     const data = await response.json();

// // // // // //     // Extract rates from the API response
// // // // // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // // // // //     const silverRate = parseFloat(data.rates.XAG || "0");

// // // // // //     console.log(goldRate, "goldRate goldRate");
// // // // // //     // Check if the fetched rates differ from the latest stored rates
// // // // // //     // const ratesChanged =
// // // // // //     //   !latestRates ||
// // // // // //     //   latestRates.gold_rate !== goldRate ||
// // // // // //     //   latestRates.silver_rate !== silverRate ||
// // // // // //     //   latestRates.custom_rate !== customRate;

// // // // // //     // Insert the new rates into the database if they have changed
// // // // // //     await sql`
// // // // // //         INSERT INTO rates (gold_rate, silver_rate, date)
// // // // // //         VALUES (${goldRate}, ${silverRate}, NOW());
// // // // // //       `;
// // // // // //     console.log("Rates inserted successfully.");
// // // // // //     // }
// // // // // //   } catch (error) {
// // // // // //     console.error("Error inserting data:", error);
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

// // // // // // Function to fetch the latest rates from the database
// // // // // async function getLatestStoredRates() {
// // // // //   const result = await sql`
// // // // //     SELECT gold_rate, silver_rate, date
// // // // //     FROM rates
// // // // //     ORDER BY date DESC
// // // // //     LIMIT 1
// // // // //   `;
// // // // //   return result?.rows?.[0];
// // // // // }

// // // // // // Function to fetch rates from the API and store them in the database if they have changed
// // // // // async function fetchAndStoreRates() {
// // // // //   try {
// // // // //     // Get the latest stored rates from the database
// // // // //     const latestRates = await getLatestStoredRates();

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

// // // // //     // Check if the fetched rates differ from the latest stored rates
// // // // //     const ratesChanged =
// // // // //       !latestRates ||
// // // // //       latestRates.gold_rate !== goldRate ||
// // // // //       latestRates.silver_rate !== silverRate;

// // // // //     // Insert the new rates into the database if they have changed
// // // // //     if (ratesChanged) {
// // // // //       await sql`
// // // // //         INSERT INTO rates (gold_rate, silver_rate, date)
// // // // //         VALUES (${goldRate}, ${silverRate}, NOW());
// // // // //       `;
// // // // //       console.log("Rates inserted successfully.");
// // // // //     } else {
// // // // //       console.log("Rates have not changed, no insertion needed.");
// // // // //     }
// // // // //   } catch (error) {
// // // // //     console.error("Error inserting data:", error);
// // // // //     throw new Error("Error processing rates");
// // // // //   }
// // // // // }

// // // // // // Handle GET requests
// // // // // export async function GET() {
// // // // //   try {
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

// // // // import { apiBaseUrl } from "@/context/constants";
// // // // import { sql } from "@vercel/postgres";
// // // // import { NextResponse } from "next/server";

// // // // // Function to fetch rates from the API and store them in the database
// // // // async function fetchAndStoreRates() {
// // // //   try {
// // // //     // Fetch data from the external API
// // // //     const response = await fetch(`${apiBaseUrl}`);
// // // //     if (!response.ok) {
// // // //       throw new Error("Failed to fetch rates from the API");
// // // //     }
// // // //     const data = await response.json();

// // // //     // Extract rates from the API response
// // // //     const goldRate = parseFloat(data.rates.PKRXAU || "0");
// // // //     const silverRate = parseFloat(data.rates.XAG || "0");

// // // //     console.log("Fetched Rates:", { goldRate, silverRate });

// // // //     // Insert the new rates into the database
// // // //     await sql`
// // // //       INSERT INTO rates (gold_rate, silver_rate, date)
// // // //       VALUES (${goldRate}, ${silverRate}, NOW());
// // // //     `;
// // // //     console.log("Rates inserted successfully.");
// // // //   } catch (error) {
// // // //     console.error("Error inserting data:", error);
// // // //     throw new Error("Error processing rates");
// // // //   }
// // // // }
// // // // setInterval(fetchAndStoreRates, 30 * 60 * 1000);
// // // // // fetchAndStoreRates();
// // // // // Handle GET requests
// // // // export async function GET() {
// // // //   try {
// // // //     await fetchAndStoreRates();

// // // //     return NextResponse.json(
// // // //       { message: "Rates processed and stored successfully." },
// // // //       { status: 200 }
// // // //     );
// // // //   } catch (error: any) {
// // // //     console.error("Error processing request:", error);
// // // //     return NextResponse.json(
// // // //       { error: `Failed to process request: ${error.message}` },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// import { apiBaseUrl } from "@/context/constants";
// import { sql } from "@vercel/postgres";
// import { NextResponse } from "next/server";

// // Function to fetch rates from the API and store them in the database
// async function fetchAndStoreRates() {
//   try {
//     // Fetch data from the external API
//     const response = await fetch(`${apiBaseUrl}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch rates from the API");
//     }
//     const data = await response.json();

//     // Extract rates from the API response
//     const goldRate = parseFloat(data.rates.PKRXAU || "0");
//     const silverRate = parseFloat(data.rates.XAG || "0");

//     console.log("Fetched Rates:", { goldRate, silverRate });

//     // Get the last stored rates
//     // const lastRecord: any =
//     //   await sql`SELECT * FROM rates ORDER BY date DESC LIMIT 1`;

//     // // Check if the new rates are different from the last stored rates
//     // if (
//     //   lastRecord &&
//     //   lastRecord.gold_rate === goldRate &&
//     //   lastRecord.silver_rate === silverRate
//     // ) {
//     //   console.log("Rates have not changed.");
//     //   return;
//     // }

//     // Insert the new rates into the database
//     await sql`
//       INSERT INTO rates (gold_rate, silver_rate, date)
//       VALUES (${goldRate}, ${silverRate}, NOW());
//     `;
//     console.log("Rates inserted successfully.");
//   } catch (error) {
//     console.error("Error inserting data:", error);
//     throw new Error("Error processing rates");
//   }
// }
// // fetchAndStoreRates();
// // Handle GET requests
// export async function GET() {
//   try {
//     await fetchAndStoreRates();

//     return NextResponse.json(
//       { message: "Rates processed and stored successfully." },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Error processing request:", error);
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
    const goldRateUsd = parseFloat(data.rates.USDXAU || "0");
    const silverRateUsd = parseFloat(data.rates.USDXAG || "0");
    const dollarInPkr = parseFloat(data.rates.PKR || "0");
    const goldRatePkr = goldRateUsd * dollarInPkr;
    const silverRatePkr = silverRateUsd * dollarInPkr;
    return { goldRateUsd, goldRatePkr, silverRateUsd, silverRatePkr };
  } catch (error) {
    throw new Error("Error fetching rates");
  }
}

async function getLatestRatesFromDatabase() {
  try {
    const result =
      await sql`SELECT gold_rate_usd, gold_rate_pkr, silver_rate_usd, silver_rate_pkr FROM rates ORDER BY date DESC LIMIT 1;`;
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    throw new Error("Error fetching latest rates from database");
  }
}

async function storeRatesInDatabase(
  goldRateUsd: number,
  goldRatePkr: number,
  silverRateUsd: number,
  silverRatePkr: number
) {
  try {
    await sql`
      INSERT INTO rates (gold_rate_usd, gold_rate_pkr, silver_rate_usd, silver_rate_pkr, date)
      VALUES (${goldRateUsd}, ${goldRatePkr}, ${silverRateUsd}, ${silverRatePkr}, NOW());
    `;
  } catch (error) {
    throw new Error("Error storing rates in database");
  }
}

export async function GET() {
  try {
    const { goldRateUsd, goldRatePkr, silverRateUsd, silverRatePkr } =
      await fetchRates();

    const latestRates = await getLatestRatesFromDatabase();

    if (
      !latestRates ||
      latestRates.gold_rate_usd !== goldRateUsd ||
      latestRates.gold_rate_pkr !== goldRatePkr ||
      latestRates.silver_rate_usd !== silverRateUsd ||
      latestRates.silver_rate_pkr !== silverRatePkr
    ) {
      await storeRatesInDatabase(
        goldRateUsd,
        goldRatePkr,
        silverRateUsd,
        silverRatePkr
      );
      return NextResponse.json(
        { message: "Rates fetched and updated in database successfully." },
        { status: 200 }
      );
    } else {
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
