'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import MainLayout from '@/app/admin/components/Admin/MainLayout';
import { Card, CardHeader } from '@/app/ui/Card';
import { ArrowDownTrayIcon, SparklesIcon } from '@heroicons/react/24/solid';

export default function GoldSilverImageGenerator() {
  const [rates, setRates] = useState({
    live: 0,
    silverLive: 0,
    currencyLiveUsd: 1,
    currencyLivePkr: 0,
    todayRateUsd: 0,
    todayRatePkr: 0,
    silverRateUsd: 0,
    silverRatePkr: 0,
  });

  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const prevGoldRates = useRef<any[]>([]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch('/api/gold-silver-currency');
        if (!res.ok) throw new Error(`API failed: ${res.status}`);
        const data = await res.json();

        const goldData = data.data.find((item: any) => item.type === 'gold');
        const silverData = data.data.find((item: any) => item.type === 'silver');
        const currencyData = data.data.find((item: any) => item.type === 'currency');

        const goldStandard = goldData.prices.find((p: any) => p.spreadProfile === 'standard');
        const silverStandard = silverData.prices.find((p: any) => p.spreadProfile === 'standard');
        const currencyRates = currencyData.rates || { usd: 1, pkr: 0 };

        setRates({
          live: goldStandard.bid,
          silverLive: silverStandard.bid,
          currencyLiveUsd: currencyRates.usd,
          currencyLivePkr: currencyRates.pkr,
          todayRateUsd: goldStandard.bid * currencyRates.usd,
          todayRatePkr: goldStandard.bid * currencyRates.pkr,
          silverRateUsd: silverStandard.bid * currencyRates.usd,
          silverRatePkr: silverStandard.bid * currencyRates.pkr,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 1000);
    return () => clearInterval(interval);
  }, []);

  const goldRates = useMemo(() => {
    return [
      {
        units: 'Tola',
        purity: 24,
        rateUSD: rates.todayRateUsd * 0.375,
        ratePKR: rates.todayRatePkr * 0.375,
      },
      {
        units: 'Tola',
        purity: 22,
        rateUSD: (0.916 * 11.663 * rates.todayRateUsd) / 31.1,
        ratePKR: (0.916 * 11.663 * rates.todayRatePkr) / 31.1,
      },
      {
        units: 'Tola',
        purity: 21,
        rateUSD: (0.875 * 11.663 * rates.todayRateUsd) / 31.1,
        ratePKR: (0.875 * 11.663 * rates.todayRatePkr) / 31.1,
      },
      {
        units: 'Ounces',
        purity: 24,
        rateUSD: rates.todayRateUsd,
        ratePKR: rates.todayRatePkr,
      },
      {
        units: 'Ounces',
        purity: 22,
        rateUSD: rates.todayRateUsd * 0.916,
        ratePKR: rates.todayRatePkr * 0.916,
      },
      {
        units: 'Ounces',
        purity: 21,
        rateUSD: rates.todayRateUsd * 0.875,
        ratePKR: rates.todayRatePkr * 0.875,
      },
    ];
  }, [rates]);

  const withStatus = goldRates.map((rate, idx) => {
    const prev = prevGoldRates.current[idx];
    let status = 'same';
    if (prev) {
      if (rate.ratePKR > prev.ratePKR) status = 'up';
      else if (rate.ratePKR < prev.ratePKR) status = 'down';
    }
    return { ...rate, status };
  });

  prevGoldRates.current = goldRates;

  const generateImage = async () => {
    try {
      const res = await fetch('/api/generete-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goldRates }),
      });

      if (!res.ok) throw new Error(`Image API failed: ${res.status}`);
      const blob = await res.blob();
      setImgSrc(URL.createObjectURL(blob));
    } catch (err: any) {
      console.error('Image generation error:', err.message);
      alert('Image generation failed!');
    }
  };

  return (
    <MainLayout>
      <div className="m-4">
        <Card className="my-4 shadow-md border border-gray-200">
          <CardHeader>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Live Gold Rates</h2>

              {isLoading ? (
                <div className="text-center py-8 text-gray-600">Loading rate data...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden text-base">
                    <thead className="bg-gray-200 text-gray-700">
                      <tr className="border-b border-gray-300">
                        <th className="px-4 py-3">Unit</th>
                        <th className="px-4 py-3">Purity</th>
                        <th className="px-4 py-3">USD</th>
                        <th className="px-4 py-3">PKR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withStatus.map((r, idx) => (
                         <tr key={idx} className="text-center border-b border-gray-300">
                          <td className="px-4 py-3 font-semibold">{r.units}</td>
                          <td className="px-4 py-3 font-semibold">{r.purity}K</td>
                          <td className="px-4 py-3 font-semibold text-blue-700 whitespace-nowrap">
                            ${r.rateUSD.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-green-700 font-semibold whitespace-nowrap">
                            Rs {r.ratePKR.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex flex-col items-center justify-center mt-6 space-y-4">
                <button
                  onClick={generateImage}
                  className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white px-5 py-2 rounded shadow-md transition duration-300"
                >
                  <SparklesIcon className="w-5 h-5" />
                  Generate Rate Image
                </button>

                {imgSrc && (
                  <>
                    <img
                      src={imgSrc}
                      alt="Generated Rate"
                      className="rounded shadow-lg"
                    />
                    <a
                      href={imgSrc}
                      download="rates.png"
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-5 py-2 rounded shadow-md transition duration-300"
                    >
                      <ArrowDownTrayIcon className="w-5 h-5" />
                      Download Image
                    </a>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </MainLayout>
  );
}
