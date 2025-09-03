import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

// 🧠 Memory Cache
let cachedResponse: any = null;
let lastFetchTime = 0;

// -----------------------
// Main GET Handler
// -----------------------
export async function GET() {
  const now = Date.now();

  // ✅ Return cached data if within 10 seconds
  if (cachedResponse && now - lastFetchTime < 10000) {
    return NextResponse.json(cachedResponse.body, {
      status: cachedResponse.status,
      headers: cachedResponse.headers,
    });
  }

  try {
    // 🔄 Fetch from your new single API
    const res = await fetch(process.env.API_BASE_URL as string, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Main API failed");

    const apiData = await res.json();

    // Directly use API data structure
    const responseBody = {
      message: "Data fetched successfully",
      data: apiData.data, // already in correct format
    };

    const statusCode = 200;
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // 🧠 Save to cache
    cachedResponse = {
      body: responseBody,
      status: statusCode,
      headers,
    };
    lastFetchTime = now;

    return NextResponse.json(responseBody, { status: statusCode, headers });
  } catch (error) {
    const responseBody = { error: "API request failed" };
    const statusCode = 500;

    return NextResponse.json(responseBody, {
      status: statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }
}

// OPTIONS handler (unchanged)
export function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
