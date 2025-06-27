import { NextRequest, NextResponse } from 'next/server';
export const dynamic = "force-dynamic";
import { createCanvas, loadImage } from 'canvas';
import path from 'path';
import { promises as fs } from 'fs';

export async function POST(req: NextRequest) {
  try {
    const { goldRates } = await req.json();

    // ✅ Standard social media image size (e.g., Facebook OG)
    const width = 1200;
    const height = 630;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // ✅ Load background image
    const imagePath = path.join(process.cwd(), 'public/assets/hero.png');
    const imageBuffer = await fs.readFile(imagePath);
    const bgImage = await loadImage(imageBuffer);
    ctx.drawImage(bgImage, 0, 0, width, height);

    // ✅ Text styling (default safe fonts)
    ctx.fillStyle = 'white';
    ctx.font = 'bold 42px sans-serif'; // 👈 Default system font
    ctx.textAlign = 'center';

    // ✅ Header
    ctx.fillText('Gold Rates', width / 2, 100);

    // ✅ Rates
    ctx.font = '32px sans-serif'; // 👈 Again using system font
    goldRates.forEach((rate: any, index: number) => {
      const y = 180 + index * 60;
      const text = `${rate.units} ${rate.purity}K | ${rate.rateUSD.toFixed(2)} USD | ${rate.ratePKR.toFixed(2)} PKR`;
      ctx.fillText(text, width / 2, y);
    });

    const buffer = canvas.toBuffer('image/png');

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (err: any) {
    console.error('Image generation failed:', err.message);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
