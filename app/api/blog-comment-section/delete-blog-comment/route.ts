// // // import { NextRequest, NextResponse } from "next/server";
// // // import { sql } from "@vercel/postgres";

// // // type Comment = {
// // //   id: number;
// // //   comment_token: string;
// // //   post_id: number;
// // // };

// // // export async function DELETE(req: NextRequest) {
// // //   const { id, commentToken }: { id: number; commentToken: string } =
// // //     await req.json();

// // //   try {
// // //     const commentResult: any =
// // //       await sql`SELECT * FROM comments WHERE id = ${id}`;

// // //     if (commentResult.length === 0) {
// // //       return NextResponse.json({ error: "Comment not found" }, { status: 404 });
// // //     }

// // //     const comment = commentResult[0];
// // //     if (comment.comment_token !== commentToken) {
// // //       return NextResponse.json(
// // //         { error: "Unauthorized to delete this comment" },
// // //         { status: 403 }
// // //       );
// // //     }

// // //     await sql`DELETE FROM comments WHERE id = ${id}`;
// // //     const updatedComments: any =
// // //       await sql`SELECT * FROM comments WHERE post_id = ${comment.post_id}`;

// // //     return NextResponse.json({ comments: updatedComments }, { status: 200 });
// // //   } catch (error) {
// // //     return NextResponse.json(
// // //       { error: "Error deleting comment" },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // // Ensure that only DELETE method is allowed
// // // export async function OPTIONS(req: NextRequest) {
// // //   return NextResponse.json({}, { status: 200, headers: { Allow: "DELETE" } });
// // // }

// // import { sql } from "@vercel/postgres";
// // import { NextResponse } from "next/server";

// // export async function DELETE(request: Request) {
// //   try {
// //     const { id, commentToken } = await request.json();

// //     if (!id || !commentToken) {
// //       return NextResponse.json(
// //         { error: "id and commentToken are required" },
// //         { status: 400 }
// //       );
// //     }

// //     // Check if the comment exists and matches the token
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

// //     if (comments[0].comment_token !== commentToken) {
// //       return NextResponse.json(
// //         { error: "Unauthorized to delete this comment" },
// //         { status: 403 }
// //       );
// //     }

// //     // Delete the comment
// //     await sql.query(
// //       `
// //       DELETE FROM blogcomment
// //       WHERE id = $1
// //     `,
// //       [id]
// //     );

// //     return NextResponse.json(
// //       { message: "Comment deleted successfully" },
// //       { status: 200 }
// //     );
// //   } catch (error: any) {
// //     console.error("Error:", error);
// //     return NextResponse.json(
// //       { error: `Failed to delete comment: ${error.message}` },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { sql } from "@vercel/postgres";
// import { NextResponse } from "next/server";

// export async function DELETE(request: Request) {
//   try {
//     const { id, commentToken } = await request.json();
//     console.log(id,commentToken)

//     if (!id || !commentToken) {
//       return NextResponse.json(
//         { error: "id and commentToken are required" },
//         { status: 400 }
//       );
//     }

//     // Check if the comment exists and matches the token
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

//     if (comments[0].comment_token !== commentToken) {
//       return NextResponse.json(
//         { error: "Unauthorized to delete this comment" },
//         { status: 403 }
//       );
//     }

//     // Delete the comment
//     await sql.query(
//       `
//       DELETE FROM blogcomment
//       WHERE id = $1
//     `,
//       [id]
//     );

//     return NextResponse.json(
//       { message: "Comment deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       { error: `Failed to delete comment: ${error.message}` },
//       { status: 500 }
//     );
//   }
// }

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const { id, commentToken } = await request.json();
    console.log(id, commentToken); // Ensure this logs the correct values

    if (!id || !commentToken) {
      return NextResponse.json(
        { error: "id and commentToken are required" },
        { status: 400 }
      );
    }

    // Check if the comment exists and matches the token
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

    if (comments[0].comment_token !== commentToken) {
      return NextResponse.json(
        { error: "Unauthorized to delete this comment" },
        { status: 403 }
      );
    }

    // Delete the comment
    await sql.query(
      `
      DELETE FROM blogcomment
      WHERE id = $1
    `,
      [id]
    );

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: `Failed to delete comment: ${error.message}` },
      { status: 500 }
    );
  }
}
