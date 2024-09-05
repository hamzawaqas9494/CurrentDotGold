"use client";
import React, { FC, useState, useEffect } from "react";
import MainLayout from "@/app/admin/components/Admin/MainLayout";
import { Card, CardBody, CardHeader } from "@/app/ui/Card";

interface ImageGalleryProps {
  deleteImage: (imageUrl: string) => Promise<void>;
}
const Page: React.FC<ImageGalleryProps> = ({ deleteImage }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if images are already in session storage
    const cachedImages = sessionStorage.getItem("imageUrls");
    console.log(cachedImages, "cachedImages");
    if (cachedImages) {
      console.log("if available");
      setImages(JSON.parse(cachedImages));
    } else {
      console.log("if not available");
      // Fetch images from the API only if not cached
      const fetchImages = async () => {
        setLoading(true);
        try {
          const response = await fetch("../api/dashboard-data/gallery");
          if (!response.ok) {
            throw new Error("Failed to fetch images");
          }
          const data = await response.json();

          setImages(data.images);
          // Cache the fetched images in session storage
          sessionStorage.setItem("imageUrls", JSON.stringify(data.images));
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };

      fetchImages();
    }
  }, []);
  console.log(images, "images");
  // const handleDelete = async (imageUrl: string) => {
  //   try {
  //     await deleteImage(imageUrl);
  //     // Remove the image from the list after deletion
  //     const updatedImages = images.filter((url) => url !== imageUrl);
  //     setImages(updatedImages);
  //     // Update the session storage with the remaining images
  //     sessionStorage.setItem("imageUrls", JSON.stringify(updatedImages));
  //   } catch (err) {
  //     console.error("Failed to delete image:", err);
  //   }
  // };

  return (
    <React.Fragment>
      <MainLayout>
        <div className="m-4">
          <Card className="my-4">
            <CardHeader>Gallery</CardHeader>
            <CardBody>
              <div>
                <h2>Image Gallery</h2>
                {images.length === 0 ? (
                  <p>No images available.</p>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {images.map((imageUrl) => (
                      <div key={imageUrl} className="relative">
                        <img
                          src={imageUrl}
                          alt="Uploaded Image"
                          className="w-full h-auto"
                        />
                        {/* <button
                          className="absolute top-0 right-0 p-2 bg-red-600 text-white"
                          onClick={() => handleDelete(imageUrl)}
                        >
                          Delete
                        </button> */}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </MainLayout>
    </React.Fragment>
  );
};

export default Page;
