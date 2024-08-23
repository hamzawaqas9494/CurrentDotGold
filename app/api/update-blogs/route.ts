// import { NextRequest, NextResponse } from "next/server";
// import { sql } from "@vercel/postgres";

// export async function PUT(request: NextRequest) {
//   try {
//     const { id, title, content, image, visibility, published } =
//       await request.json();
//     console.log(id);
//     console.log(title);
//     console.log(content);
//     console.log(image);

//     // Check for missing required fields
//     if (
//       id === undefined ||
//       title === undefined ||
//       content === undefined ||
//       image === undefined ||
//       visibility === undefined ||
//       published === undefined
//     ) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Update data in the Blogs table
//     const result = await sql`
//       UPDATE blogs
//       SET title = ${title}, content = ${content}, image = ${image} , visibility = ${visibility}, published = ${published}
//       WHERE id = ${id}
//       RETURNING *;
//     `;
//     console.log(result, "result");

//     // Check if any rows were updated
//     if (result.rows.length === 0) {
//       return NextResponse.json(
//         { error: "Blog post not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Blog post updated successfully", result: result.rows[0] },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating blog:", error);
//     return NextResponse.json(
//       { error: "Failed to update blog post" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { sql } from "@vercel/postgres";

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, we're handling it manually
  },
};

export async function PUT(request: NextRequest) {
  const formData = await request.formData();

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const visibility = formData.get("visibility") as string;
  const published = formData.get("published") as string;
  const postedtime = formData.get("postedtime") as string;
  const imageFile = formData.get("image") as File | null;

  const imagePath = imageFile ? `/uploads/${imageFile.name}` : null;

  if (!id || !title || !content) {
    return NextResponse.json(
      { error: "ID, title, and content are required" },
      { status: 400 }
    );
  }

  try {
    // Save files to the `public/uploads` directory
    if (imageFile) {
      const imagePathFull = path.join(
        process.cwd(),
        "public",
        "uploads",
        imageFile.name
      );
      fs.writeFileSync(
        imagePathFull,
        Buffer.from(await imageFile.arrayBuffer())
      );
    }

    // Update data in the Blogs table
    let result;
    if (imagePath) {
      result = await sql`
        UPDATE AllBlogs
        SET title = ${title}, content = ${content}, image = ${imagePath}, visibility = ${visibility}, published = ${published} ,postedtime = ${postedtime}
        WHERE id = ${id}
        RETURNING *;
      `;
    } else {
      result = await sql`
        UPDATE AllBlogs
        SET title = ${title}, content = ${content}, visibility = ${visibility}, published = ${published} ,postedtime = ${postedtime}
        WHERE id = ${id}
        RETURNING *;
      `;
    }

    // Check if any rows were updated
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Blog post updated successfully", result: result.rows[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}
