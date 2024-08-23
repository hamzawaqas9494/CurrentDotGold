// // import { sql } from "@vercel/postgres";
// // import { NextResponse } from "next/server";

// // export async function PUT(request: Request) {
// //   try {
// //     const formData = await request.formData();
// //     const id = formData.get("id");
// //     const comment_content = formData.get("comment_content");
// //     const comment_token = formData.get("comment_token");

// //     console.log(id);
// //     console.log(comment_content);
// //     console.log(comment_token);

// //     if (!id || !comment_content || !comment_token) {
// //       return NextResponse.json(
// //         { error: "id, comment_content, and comment_token are required" },
// //         { status: 400 }
// //       );
// //     }

// //     // Fetch the comment to check the token
// //     const { rows: comments } = await sql.query(
// //       `
// //       SELECT comment_token
// //       FROM blogcomment
// //       WHERE id = $1
// //     `,
// //       [id]
// //     );

// //     if (comments.length === 0) {
// //       return NextResponse.json({ error: "Comment not found" }, { status: 404 });
// //     }

// //     if (comments[0].comment_token !== comment_token) {
// //       return NextResponse.json(
// //         { error: "Unauthorized to edit this comment" },
// //         { status: 403 }
// //       );
// //     }

// //     // Update the comment
// //     await sql.query(
// //       `
// //       UPDATE blogcomment
// //       SET comment_content = $1
// //       WHERE id = $2
// //     `,
// //       [comment_content, id]
// //     );

// //     // Fetch the updated list of comments
// //     const { rows: updatedComments } = await sql.query(
// //       `
// //       SELECT id, commenter_name, comment_content, comment_date
// //       FROM blogcomment
// //       WHERE id = $1
// //     `,
// //       [id]
// //     );

// //     return NextResponse.json({ comments: updatedComments }, { status: 200 });
// //   } catch (error: any) {
// //     console.error("Error:", error);
// //     return NextResponse.json(
// //       { error: `Failed to update comment: ${error.message}` },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { sql } from "@vercel/postgres";
// import { NextResponse } from "next/server";

// export async function PUT(request: Request) {
//   try {
//     const formData = await request.formData();
//     const id = formData.get("id");
//     const comment_content = formData.get("comment_content");
//     const comment_token = formData.get("comment_token");

//     console.log(id);
//     console.log(comment_content);
//     console.log(comment_token);

//     if (!id || !comment_content || !comment_token) {
//       return NextResponse.json(
//         { error: "id, comment_content, and comment_token are required" },
//         { status: 400 }
//       );
//     }

//     // Fetch the comment to check the token
//     const { rows: comments } = await sql.query(
//       `
//       SELECT comment_token
//       FROM blogcomment
//       WHERE id = $1
//     `,
//       [id]
//     );

//     if (comments.length === 0) {
//       return NextResponse.json({ error: "Comment not found" }, { status: 404 });
//     }

//     if (comments[0].comment_token !== comment_token) {
//       return NextResponse.json(
//         { error: "Unauthorized to edit this comment" },
//         { status: 403 }
//       );
//     }

//     // Update the comment
//     await sql.query(
//       `
//       UPDATE blogcomment
//       SET comment_content = $1
//       WHERE id = $2
//     `,
//       [comment_content, id]
//     );

//     // Fetch the updated comment to return it
//     const { rows: updatedComments } = await sql.query(
//       `
//       SELECT id, commenter_name, comment_content, comment_date
//       FROM blogcomment
//       WHERE id = $1
//     `,
//       [id]
//     );

//     return NextResponse.json({ comment: updatedComments[0] }, { status: 200 });
//   } catch (error: any) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       { error: `Failed to update comment: ${error.message}` },
//       { status: 500 }
//     );
//   }
// }

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id");
    const comment_content = formData.get("comment_content");
    const comment_token = formData.get("comment_token");
    const comment_date = formData.get("comment_date"); // Retrieve the date

    if (!id || !comment_content || !comment_token || !comment_date) {
      return NextResponse.json(
        {
          error:
            "id, comment_content, comment_token, and comment_date are required",
        },
        { status: 400 }
      );
    }
    // Fetch the comment to check the token
    const { rows: comments } = await sql.query(
      `
      SELECT comment_token
      FROM blogcomment
      WHERE id = $1
    `,
      [id]
    );

    if (comments.length === 0) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comments[0].comment_token !== comment_token) {
      return NextResponse.json(
        { error: "Unauthorized to edit this comment" },
        { status: 403 }
      );
    }

    // Update the comment with the date
    await sql.query(
      `
      UPDATE blogcomment
      SET comment_content = $1, comment_date = $2
      WHERE id = $3
    `,
      [comment_content, comment_date, id]
    );

    // Fetch the updated comment to return it
    const { rows: updatedComments } = await sql.query(
      `
      SELECT id, commenter_name, comment_content, comment_date
      FROM blogcomment
      WHERE id = $1
    `,
      [id]
    );

    return NextResponse.json({ comment: updatedComments[0] }, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: `Failed to update comment: ${error.message}` },
      { status: 500 }
    );
  }
}
