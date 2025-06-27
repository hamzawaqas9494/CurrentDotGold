
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
export const dynamic = "force-dynamic";
import Date from "../../../components/Home/Date&Time";

export async function POST(request: NextRequest) {
  try {
    let date = Date();
    let currentdate = date.date;
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const visibility = formData.get("visibility") as string;
    const published = formData.get("published") as string;
    const imageFile = formData.get("image") as string;
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO allblogs (title, content, image, visibility, published, postedtime)
      VALUES (${title}, ${content}, ${imageFile}, ${visibility}, ${published}, ${currentdate})
      RETURNING *;
    `;

    return NextResponse.json({
      message: "Blog post created successfully!",
      result: result.rows[0],
    });
  } catch (error) {
    console.error("Error during blog post creation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
