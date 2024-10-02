import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN; // Ensure this is defined in your environment

  if (!blobToken) {
    return NextResponse.json(
      { error: "Blob token is not defined" },
      { status: 500 }
    );
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: ["image/jpg", "image/png", "image/gif"],
          tokenPayload: JSON.stringify({
            token: blobToken, // Include the token in the payload
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log("Blob upload completed", blob, tokenPayload);

        try {
          // Perform any actions after the upload is complete
          // e.g., update database with blob.url
        } catch (error) {
          throw new Error("Could not process the upload");
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
