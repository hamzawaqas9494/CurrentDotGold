import { NextResponse } from "next/server";
import {apiBaseUrlGold, apiBaseUrlSliver,apiBaseUrlCurrency} from "../../../context/constants"

export const dynamic = "force-dynamic";

// ✅ Env variables with type-safe checks
const GOLD_API = apiBaseUrlGold as string;
const SILVER_API = apiBaseUrlSliver as string;
const CURRENCY_API = apiBaseUrlCurrency as string;


// if (!GOLD_API || !SILVER_API || !CURRENCY_API) {
//   throw new Error("Missing one or more API URLs in environment variables.");
// }

// ✅ Type definitions
type SpreadProfilePrice = {
  spreadProfile: string;
  bidSpread: number;
  askSpread: number;
  bid: number;
  ask: number;
};

type MetalApiResponse = {
  topo: { platform: string; server: string };
  spreadProfilePrices: SpreadProfilePrice[];
  ts: number;
};

type CurrencyApiResponse = {
  date: string;
  usd: Record<string, number>;
};

// ✅ Fetch functions
async function fetchMetal(url: string, type: "gold" | "silver") {
  try {
    const res = await fetch(url, {
      headers: { "Cache-Control": "no-cache", Pragma: "no-cache", Expires: "0" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`${type} API failed`);
    const data: MetalApiResponse[] = await res.json();
    const item = data[0];
    return {
      type,
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
    const res = await fetch(CURRENCY_API, { cache: "no-store" });
    if (!res.ok) throw new Error("Currency API failed");
    const data: CurrencyApiResponse = await res.json();
    return {
      type: "currency",
      date: data.date,
      rates: data.usd,
    };
  } catch {
    return null;
  }
}

// ✅ Main handler
export async function GET() {
  const [gold, silver, currency] = await Promise.all([
    fetchMetal(GOLD_API, "gold"),
    fetchMetal(SILVER_API, "silver"),
    fetchCurrency(),
  ]);

  const result = [gold, silver, currency].filter(
    (item): item is NonNullable<typeof item> => item !== null
  );

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
