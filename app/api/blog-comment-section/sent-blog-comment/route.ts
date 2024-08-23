// import { sql } from "@vercel/postgres";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();
//     const commenter_name = formData.get("commenter_name");
//     const comment_content = formData.get("comment_content");
//     const comment_date = formData.get("comment_date");

//     // Ensure required fields are present
//     if (!commenter_name || !comment_content || !comment_date) {
//       return NextResponse.json(
//         { error: "commenter_name, comment_content, and comment_date are required" },
//         { status: 400 }
//       );
//     }

//     // Insert the new comment
//     await sql.query(`
//       INSERT INTO blogcomment (commenter_name, comment_content, comment_date)
//       VALUES ($1, $2, $3);
//     `, [commenter_name, comment_content, comment_date]);

//     return NextResponse.json(
//       { message: "Comment added successfully" },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       { error: `Failed to add comment: ${error.message}` },
//       { status: 500 }
//     );
//   }
// }
// import { sql } from "@vercel/postgres";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();
//     const commenter_name = formData.get("commenter_name");
//     const comment_content = formData.get("comment_content");
//     const comment_date = formData.get("comment_date");
//     const post_id = formData.get("post_id"); // Add post_id field

//     // Ensure required fields are present
//     if (!commenter_name || !comment_content) {
//       return NextResponse.json(
//         { error: "commenter_name, comment_content, comment_date, and post_id are required" },
//         { status: 400 }
//       );
//     }
//     console.log(commenter_name)
//     console.log(comment_content)
//     console.log(comment_date )
// console.log(post_id)
//     // Insert the new comment
//     await sql.query(`
//       INSERT INTO blogcomment (commenter_name, comment_content, comment_date, post_id)
//       VALUES ($1, $2, $3, $4);
//     `, [commenter_name, comment_content, comment_date, post_id]);

//     return NextResponse.json(
//       { message: "Comment added successfully" },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       { error: `Failed to add comment: ${error.message}` },
//       { status: 500 }
//     );
//   }
// }

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import crypto from "crypto"; // Import crypto for token generation

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const commenter_name = formData.get("commenter_name");
    const comment_content = formData.get("comment_content");
    const comment_date = formData.get("comment_date");
    const post_id = formData.get("post_id"); // Add post_id field

    // Ensure required fields are present
    if (!commenter_name || !comment_content || !post_id) {
      return NextResponse.json(
        {
          error:
            "commenter_name, comment_content, comment_date, and post_id are required",
        },
        { status: 400 }
      );
    }

    // Generate a unique token for the comment
    const commentToken = crypto.randomBytes(16).toString("hex");
    console.log(commentToken);
    // Insert the new comment with the token
    await sql.query(
      `
      INSERT INTO blogcomment (commenter_name, comment_content, comment_date, post_id, comment_token)
      VALUES ($1, $2, $3, $4, $5);
    `,
      [commenter_name, comment_content, comment_date, post_id, commentToken]
    );

    return NextResponse.json(
      { message: "Comment added successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: `Failed to add comment: ${error.message}` },
      { status: 500 }
    );
  }
}
