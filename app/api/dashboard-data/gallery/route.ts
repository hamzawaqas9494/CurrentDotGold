// app/api/delete-image/route.ts
// import { sql } from "@vercel/postgres";
// import { NextResponse } from "next/server";

// export async function DELETE(request: Request) {
//   try {
//     const { imageUrl } = await request.json();

//     // Delete the image entry from the database
//     await sql`DELETE FROM uploaded_images WHERE image_url = ${imageUrl}`;

//     // You can also delete the image from Vercel Blob storage if required
//     // Vercel Blob deletion logic can go here

//     return NextResponse.json({ message: "Image deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting image:", error);
//     return NextResponse.json(
//       { error: "Error deleting image" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Fetch all image URLs from the 'allblogs' table (image column)
    const result = await sql`SELECT image FROM allblogs;`;

    // Extract image URLs from the result
    const imageUrls = result.rows.map((row) => row.image); // Use the correct column name 'image'

    // Return the list of image URLs as JSON
    return NextResponse.json({ images: imageUrls });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { error: "Error fetching images from the database" },
      { status: 500 }
    );
  }
}
