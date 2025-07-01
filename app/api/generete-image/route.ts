import { NextRequest, NextResponse } from 'next/server';
import { createCanvas, loadImage, registerFont } from 'canvas';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { goldRates } = await req.json();

    // ✅ Register custom font (Poppins)
    registerFont(path.join(process.cwd(), '/public/fonts/Poppins-Regular.ttf'), {
      family: 'Poppins',
    });

    const width = 1024;
    const height = 512;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // ✅ Load background image from live domain
    const imageURL = 'https://goldhub.up.railway.app/assets/socialmediabanner.png';
    const response = await fetch(imageURL);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const bgImage = await loadImage(buffer);
    ctx.drawImage(bgImage, 0, 0, width, height);

    // ✅ Set text style
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';

    // ✅ Create current date string
    const now = new Date();
    const dateString = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }); // e.g., "30 Jun 2025"

    // ✅ Draw header with date in one line
    ctx.font = 'bold 36px Poppins';
    ctx.fillText(`Gold Rates - ${dateString}`, width / 2, 100);

    // ✅ Draw gold rates
    ctx.font = '24px Poppins';
    goldRates.forEach((rate: any, index: number) => {
      const y = 160 + index * 50;
      const text = `${rate.units} ${rate.purity}K | ${rate.rateUSD.toFixed(2)} USD | ${rate.ratePKR.toFixed(2)} PKR`;
      ctx.fillText(text, width / 2, y);
    });

    // ✅ Return final image as PNG
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
