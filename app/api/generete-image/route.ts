import { NextRequest, NextResponse } from 'next/server';
import { createCanvas, loadImage } from 'canvas';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { goldRates } = await req.json();

    const width = 1200;
    const height = 630;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // ✅ Fetch image from live domain
    const imageURL = 'https://goldhub.up.railway.app/assets/hero.png';
    const response = await fetch(imageURL);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const bgImage = await loadImage(buffer);

    ctx.drawImage(bgImage, 0, 0, width, height);

    // ✅ Text styling
    ctx.fillStyle = 'white';
   ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';

    ctx.fillText('Gold Rates', width / 2, 100);

   ctx.font = 'bold 12px sans-serif';
    goldRates.forEach((rate: any, index: number) => {
      const y = 180 + index * 60;
      const text = `${rate.units} ${rate.purity}K | ${rate.rateUSD.toFixed(2)} USD | ${rate.ratePKR.toFixed(2)} PKR`;
      ctx.fillText(text, width / 2, y);
    });

    const finalBuffer = canvas.toBuffer('image/png');

    return new NextResponse(finalBuffer, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (err: any) {
    console.error('Image generation failed:', err.message);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
