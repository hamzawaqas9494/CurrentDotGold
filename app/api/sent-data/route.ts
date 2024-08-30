// // import { sql } from "@vercel/postgres";
// // import { NextRequest, NextResponse } from "next/server";

// // export async function POST(request: NextRequest) {
// //   try {
// //     const { title, content, visibility, published } = await request.json();
// //     if (!title || !content) {
// //       return NextResponse.json(
// //         { error: "Title and content are required" },
// //         { status: 400 }
// //       );
// //     }
// //     // Insert data into the Blogs table
// //     const result = await sql`
// //       INSERT INTO blogs (title, content, visibility, published)
// //       VALUES (${title}, ${content}, ${visibility}, ${published})
// //       RETURNING *;
// //     `;
// //     return NextResponse.json(
// //       { message: "Blog post created successfully", result: result.rows[0] },
// //       { status: 200 }
// //     );
// //   } catch (error) {
// //     console.error("Error inserting blog:", error);
// //     return NextResponse.json(
// //       { error: "Failed to create blog post" },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { sql } from "@vercel/postgres";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   try {
//     const { title, content, image, video, visibility, published } =
//       await request.json();

//     if (!title || !content) {
//       return NextResponse.json(
//         { error: "Title and content are required" },
//         { status: 400 }
//       );
//     }

//     // Insert data into the Blogs table
//     const result = await sql`
//       INSERT INTO blogs (title, content, image, video, visibility, published)
//       VALUES (${title}, ${content}, ${image}, ${video}, ${visibility}, ${published})
//       RETURNING *;
//     `;

//     return NextResponse.json(
//       { message: "Blog post created successfully", result: result.rows[0] },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error inserting blog:", error);
//     return NextResponse.json(
//       { error: "Failed to create blog post" },
//       { status: 500 }
//     );
//   }
// }
// import { NextApiRequest, NextApiResponse } from "next";
// import { sql } from "@vercel/postgres";
// import path from "path";
// import fs from "fs";
// import { IncomingForm } from "formidable";

// // Set up Formidable for file uploads
// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, since formidable will handle it
//   },
// };

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   // Using formidable to handle file uploads
//   const form = new IncomingForm();
//   form.uploadDir = path.join(process.cwd(), "uploads");
//   form.keepExtensions = true;

//   form.parse(req, async (err: any, fields: any, files: any) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to upload file" });
//     }

//     const { title, content, visibility, published } = fields;
//     const image =
//       files.image && Array.isArray(files.image)
//         ? files.image[0].filepath
//         : null;
//     const video =
//       files.video && Array.isArray(files.video)
//         ? files.video[0].filepath
//         : null;

//     if (!title || !content) {
//       return res.status(400).json({ error: "Title and content are required" });
//     }

//     try {
//       // Insert data into the Blogs table
//       const result = await sql`
//         INSERT INTO blogs (title, content, image, video, visibility, published)
//         VALUES (${title}, ${content}, ${image}, ${video}, ${visibility}, ${published})
//         RETURNING id
//       `;

//       if (result.rowCount === 0) {
//         // Clean up files if insertion fails
//         if (image) fs.unlinkSync(image);
//         if (video) fs.unlinkSync(video);
//         return res.status(500).json({ error: "Failed to insert blog post" });
//       }

//       // Clean up files if necessary
//       if (image) fs.unlinkSync(image);
//       if (video) fs.unlinkSync(video);

//       return res.status(201).json({ id: result.rows[0].id });
//     } catch (error) {
//       console.error("Database error:", error);
//       return res.status(500).json({ error: "Internal server error" });
//     }
//   });
// };

// export default handler;
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { sql } from "@vercel/postgres";
// import { NextRequest, NextResponse } from "next/server";

// // Configure multer
// const upload = multer({
//   dest: path.join(process.cwd(), "/public/uploads"), // Temporary directory
// });

// // Middleware to handle file uploads
// const uploadMiddleware = upload.fields([{ name: "image" }, { name: "video" }]);

// // Define the API handler
// export async function POST(request: NextRequest) {
//   return new Promise((resolve) => {
//     // Apply the multer middleware
//     uploadMiddleware(request as any, {} as any, async (err: any) => {
//       if (err) {
//         console.error("Error uploading file:", err);
//         return resolve(
//           NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
//         );
//       }

//       // Extract form fields and files
//       const formData = await request.formData();
//       const title = formData.get("title") as string;
//       const content = formData.get("content") as string;
//       const visibility = formData.get("visibility") as string;
//       const published = formData.get("published") as string;
//       const imagePath = formData.get("image")
//         ? (formData.get("image") as any).path
//         : " cs cks";
//       const videoPath = formData.get("video")
//         ? (formData.get("video") as any).path
//         : "ncksnc";

//       if (!title || !content) {
//         return resolve(
//           NextResponse.json(
//             { error: "Title and content are required" },
//             { status: 400 }
//           )
//         );
//       }
//       console.log(title);
//       console.log(content);
//       console.log(visibility);
//       console.log(published);
//       console.log(imagePath);
//       console.log(videoPath);
//       try {
//         // Insert data into the Blogs table
//         const result = await sql`
//           INSERT INTO blogs (title, content, image, video, visibility, published)
//           VALUES (${title}, ${content}, ${imagePath}, ${videoPath}, ${visibility}, ${published})
//           RETURNING *;
//         `;

//         return resolve(
//           NextResponse.json(
//             {
//               message: "Blog post created successfully",
//               result: result.rows[0],
//             },
//             { status: 200 }
//           )
//         );
//       } catch (error) {
//         console.error("Error inserting blog:", error);
//         return resolve(
//           NextResponse.json(
//             { error: "Failed to create blog post" },
//             { status: 500 }
//           )
//         );
//       }
//     });
//   });
// }

// import multer from "multer";
// import path from "path";
// import { sql } from "@vercel/postgres";
// import { NextRequest, NextResponse } from "next/server";

// // Configure multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(process.cwd(), "/public"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// console.log(storage);
// const upload = multer({ storage: storage });

// // Middleware to handle file uploads
// const uploadMiddleware = upload.fields([
//   { name: "image", maxCount: 1 },
//   { name: "video", maxCount: 1 },
// ]);

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // Define the API handler
// export async function POST(request: NextRequest) {
//   return new Promise((resolve) => {
//     uploadMiddleware(request as any, {} as any, async (err: any) => {
//       if (err) {
//         console.error("Error uploading file:", err);
//         return resolve(
//           NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
//         );
//       }

//       // Extract form fields and files
//       const formData = await request.formData();
//       const title = formData.get("title") as string;
//       const content = formData.get("content") as string;
//       const visibility = formData.get("visibility") as string;
//       const published = formData.get("published") as string;
//       const imageFile = formData.get("image") as File;
//       const videoFile = formData.get("video") as File;

//       const imagePath = imageFile ? `/uploads/${imageFile.name}` : null;
//       const videoPath = videoFile ? `/uploads/${videoFile.name}` : null;

//       if (!title || !content) {
//         return resolve(
//           NextResponse.json(
//             { error: "Title and content are required" },
//             { status: 400 }
//           )
//         );
//       }

//       try {
//         // Insert data into the Blogs table
//         const result = await sql`
//           INSERT INTO blogs (title, content, image, video, visibility, published)
//           VALUES (${title}, ${content}, ${imagePath}, ${videoPath}, ${visibility}, ${published})
//         `;
//         console.log(result);
//         console.log(title);
//         console.log(content);
//         console.log(visibility);
//         console.log(published);
//         console.log(imagePath);
//         console.log(videoPath);
//         resolve(
//           NextResponse.json(
//             { message: "Blog post created successfully!" },
//             { status: 201 }
//           )
//         );
//       } catch (error) {
//         console.error("Error inserting data into the database:", error);
//         resolve(
//           NextResponse.json(
//             { error: "Failed to create a blog post hamza" },
//             { status: 500 }
//           )
//         );
//       }
//     });
//   });
// }

// pages/api/upload.ts
// pages/api/upload.ts
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { parse } from "querystring";
import { sql } from "@vercel/postgres";
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const visibility = formData.get("visibility") as string;
  const published = formData.get("published") as string;

  const imageFile = formData.get("image") as File | null;
  const videoFile = formData.get("video") as File | null;

  const imagePath = imageFile ? `/uploads/${imageFile.name}` : null;
  const videoPath = videoFile ? `/uploads/${videoFile.name}` : null;
  const postedtime = formData.get("postedtime") as string;
  console.log(title);
  console.log(content);
  console.log(visibility);
  console.log(published);
  console.log(imagePath);
  console.log(postedtime);
  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required" },
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

    if (videoFile) {
      const videoPathFull = path.join(
        process.cwd(),
        "public",
        "uploads",
        videoFile.name
      );
      fs.writeFileSync(
        videoPathFull,
        Buffer.from(await videoFile.arrayBuffer())
      );
    }

    // Insert data into the Blogs table
    const result = await sql`
      INSERT INTO AllBlogs (title, content, image, video, visibility, published, postedtime)
      VALUES (${title}, ${content}, ${imagePath}, ${videoPath}, ${visibility}, ${published}, ${postedtime})
      RETURNING *;
    `;

    return NextResponse.json({
      message: "Blog post created successfully",
      result: result.rows[0],
    });
  } catch (error) {
    // console.error("Database error :hmza:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import path from "path";
// import fs from "fs";
// import { sql } from "@vercel/postgres";

// export async function POST(request: NextRequest) {
//   const formData = await request.formData();

//   const title = formData.get("title") as string;
//   const content = formData.get("content") as string;
//   const visibility = formData.get("visibility") as string;
//   const published = formData.get("published") as string;
//   const postedtime = formData.get("postedtime") as string;

//   const imageFile = formData.get("image") as File | null;
//   const videoFile = formData.get("video") as File | null;

//   const imagePath = imageFile ? `/uploads/${imageFile.name}` : null;
//   const videoPath = videoFile ? `/uploads/${videoFile.name}` : null;

//   if (!title || !content) {
//     return NextResponse.json(
//       { error: "Title and content are required" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Ensure the `public/uploads` directory exists
//     const uploadsDir = path.join(process.cwd(), "public", "uploads");
//     if (!fs.existsSync(uploadsDir)) {
//       fs.mkdirSync(uploadsDir, { recursive: true });
//     }

//     // Save files to the `public/uploads` directory
//     if (imageFile) {
//       const imagePathFull = path.join(uploadsDir, imageFile.name);
//       fs.writeFileSync(
//         imagePathFull,
//         Buffer.from(await imageFile.arrayBuffer())
//       );
//     }

//     if (videoFile) {
//       const videoPathFull = path.join(uploadsDir, videoFile.name);
//       fs.writeFileSync(
//         videoPathFull,
//         Buffer.from(await videoFile.arrayBuffer())
//       );
//     }

//     // Insert data into the `AllBlogs` table
//     const result = await sql`
//       INSERT INTO AllBlogs (title, content, image, video, visibility, published, postedtime)
//       VALUES (${title}, ${content}, ${imagePath}, ${videoPath}, ${visibility}, ${published}, ${postedtime})
//       RETURNING *;
//     `;

//     return NextResponse.json({
//       message: "Blog post created successfully!",
//       result: result.rows[0],
//     });
//   } catch (error) {
//     console.error("Database error:", error); // Log error details
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
