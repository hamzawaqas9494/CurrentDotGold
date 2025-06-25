// // import { NextResponse } from "next/server";

// // export const dynamic = "force-dynamic";

// // export async function GET() {
// //   try {
// //     const response = await fetch(
// //       "https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD",
// //       {
// //         method: "GET",
// //         headers: {
// //           "Cache-Control": "no-cache",
// //           Pragma: "no-cache",
// //           Expires: "0",
// //         },
// //         cache: "no-store",
// //       }
// //     );

// //     if (!response.ok) {
// //       throw new Error(`API Error: ${response.status}`);
// //     }

// //     const data = await response.json();

// //     // Optional console log - poora spreadProfilePrices dikhane ke liye
// //     console.log("Spread Profile Prices hamza:", data);

// //     // Sirf response return karo, koi loop nahi
// //     return NextResponse.json({
// //       message: "Data fetched successfully",
// //       spreadProfilePrices: data.spreadProfilePrices,
// //     });
// //   } catch (error: any) {
// //     console.error("Error fetching data:", error.message);
// //     return NextResponse.json(
// //       { error: `Failed to fetch data: ${error.message}` },
// //       { status: 500 }
// //     );
// //   }
// // }




// import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

// export async function GET() {
//   try {
//     // Parallel fetch gold + silver
//     const [goldRes, silverRes] = await Promise.all([
//       fetch("https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD", {
//         method: "GET",
//         headers: {
//           "Cache-Control": "no-cache",
//           Pragma: "no-cache",
//           Expires: "0",
//         },
//         cache: "no-store",
//       }),
//       fetch("https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAG/USD", {
//         method: "GET",
//         headers: {
//           "Cache-Control": "no-cache",
//           Pragma: "no-cache",
//           Expires: "0",
//         },
//         cache: "no-store",
//       }),
//     ]);

//     if (!goldRes.ok) throw new Error(`Gold API Error: ${goldRes.status}`);
//     if (!silverRes.ok) throw new Error(`Silver API Error: ${silverRes.status}`);

//     const goldData = await goldRes.json();
//     const silverData = await silverRes.json();

//     const gold = goldData[0];
//     const silver = silverData[0];

//     const result = [
//       {
//         type: "gold",
//         platform: gold.topo.platform,
//         server: gold.topo.server,
//         ts: gold.ts,
//         prices: gold.spreadProfilePrices
//       },
//       {
//         type: "silver",
//         platform: silver.topo.platform,
//         server: silver.topo.server,
//         ts: silver.ts,
//         prices: silver.spreadProfilePrices
//       }
//     ];

//     return NextResponse.json({
//       message: "Data fetched successfully",
//       data: result
//     });

//   } catch (error: any) {
//     console.error("Error fetching data:", error.message);
//     return NextResponse.json(
//       { error: `Failed to fetch data: ${error.message}` },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function fetchGold() {
  try {
    const res = await fetch("https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD", {
      headers: { "Cache-Control": "no-cache", Pragma: "no-cache", Expires: "0" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Gold API failed`);
    const data = await res.json();
    const item = data[0];
    return {
      type: "gold",
      platform: item.topo.platform,
      server: item.topo.server,
      ts: item.ts,
      prices: item.spreadProfilePrices,
    };
  } catch {
    return null;
  }
}

async function fetchSilver() {
  try {
    const res = await fetch("https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAG/USD", {
      headers: { "Cache-Control": "no-cache", Pragma: "no-cache", Expires: "0" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Silver API failed`);
    const data = await res.json();
    const item = data[0];
    return {
      type: "silver",
      platform: item.topo.platform,
      server: item.topo.server,
      ts: item.ts,
      prices: item.spreadProfilePrices,
    };
  } catch {
    return null;
  }
}

async function fetchCurrency() {
  try {
    const res = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Currency API failed`);
    const data = await res.json();
    return {
      type: "currency",
      date: data.date,
      rates: data.usd,
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const [gold, silver, currency] = await Promise.all([
    fetchGold(),
    fetchSilver(),
    fetchCurrency(),
  ]);

  const result = [gold, silver, currency].filter(item => item !== null);

  if (result.length === 0) {
    return NextResponse.json(
      { error: "All API requests failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Data fetched successfully",
    data: result,
  });
}
