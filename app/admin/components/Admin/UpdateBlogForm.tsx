// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// const UpdateBlogForm: React.FC = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const id = searchParams.get("id");
//   console.log(id, "get id from url");
//   const [blog, setBlog] = useState<any>({ id });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [imageFile, setImageFile] = useState<File | null>(null);

//   useEffect(() => {
//     if (id) {
//       console.log(id, "data");
//       const fetchBlog = async () => {
//         try {
//           const response = await fetch(`/api/get-blogs?id=${id}`);
//           const data = await response.json();

//           if (!response.ok) {
//             throw new Error("Error fetching blog data.");
//           }

//           setBlog(data.specificBlog[0]);
//         } catch (error) {
//           setError("Error fetching blog data.");
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchBlog();
//     }
//   }, [id]);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setBlog((prevBlog: any) => ({
//       ...prevBlog,
//       [name]:
//         name === "visibility" || name === "id" || name === "published"
//           ? parseInt(value)
//           : value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`/api/update-blogs`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(blog),
//       });

//       if (!response.ok) {
//         throw new Error("Error updating blog.");
//       }

//       const updatedBlog = await response.json();
//       console.log("Blog updated:", updatedBlog);
//     } catch (error) {
//       setError("Error updating blog.");
//     }
//   };

//   //   if (loading) {
//   //     return <p>Loading...</p>;
//   //   }

//   //   if (error) {
//   //     return <p>{error}</p>;
//   //   }
//   const handleImageUpload = (file: File) => {
//     setImageFile(file);
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="title">Title:</label>
//         <input
//           type="text"
//           id="title"
//           name="title"
//           value={blog?.title || ""}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="content">Content:</label>
//         <textarea
//           id="content"
//           name="content"
//           value={blog?.content || ""}
//           onChange={handleInputChange}
//           required
//         ></textarea>
//       </div>
//       <div>
//         <label htmlFor="visibility">Visibility:</label>
//         <input
//           type="number"
//           id="visibility"
//           name="visibility"
//           value={blog?.visibility || 0}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="id">ID:</label>
//         <input
//           type="number"
//           id="id"
//           name="id"
//           value={blog?.id || id}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="published">Published:</label>
//         <input
//           type="number"
//           id="published"
//           name="published"
//           value={blog?.published || 0}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="image">Image:</label>
//         {/* Display the image if it exists */}
//         {blog?.image ? (
//           <img
//             src={blog.image} // URL or path to the image
//             alt="Blog Image"
//             style={{ maxWidth: "100%", height: "auto" }} // Ensure proper styling
//           />
//         ) : (
//           <p>No image available</p>
//         )}
//       </div>
//       <div>
//         <label htmlFor="imageUpload">Upload New Image:</label>
//         <input
//           type="file"
//           id="imageUpload"
//           accept="image/*"
//           onChange={(e) => {
//             if (e.target.files && e.target.files[0]) {
//               handleImageUpload(e.target.files[0]);
//             }
//           }}
//         />
//       </div>
//       <button type="submit">Update Blog</button>
//     </form>
//   );
// };

// export default UpdateBlogForm;
"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const UpdateBlogForm: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const [blog, setBlog] = useState<any>({ id });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await fetch(`/api/get-blogs?id=${id}`);
          const data = await response.json();

          if (!response.ok) {
            throw new Error("Error fetching blog data.");
          }

          setBlog(data.specificBlog[0]);
        } catch (error) {
          setError("Error fetching blog data.");
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBlog((prevBlog: any) => ({
      ...prevBlog,
      [name]:
        name === "visibility" || name === "id" || name === "published"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentDateTime = new Date().toLocaleString();
    const formData = new FormData();
    formData.append("title", blog.title || "");
    formData.append("content", blog.content || "");
    formData.append("visibility", blog.visibility || 0);
    formData.append("published", blog.published || 0);
    formData.append("id", blog.id || 0);
    formData.append("postedtime", blog.postedtime || currentDateTime);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(`/api/update-blogs`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error updating blog.");
      }

      const updatedBlog = await response.json();
      console.log("Blog updated:", updatedBlog);
      // router.push("/path-to-redirect-after-update"); // Redirect or update state as needed
    } catch (error) {
      setError("Error updating blog.");
    }
  };

  const handleImageUpload = (file: File) => {
    setImageFile(file);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={blog?.title || ""}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={blog?.content || ""}
          onChange={handleInputChange}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="visibility">Visibility:</label>
        <input
          type="number"
          id="visibility"
          name="visibility"
          value={blog?.visibility || 0}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="id">ID:</label>
        <input
          type="number"
          id="id"
          name="id"
          value={blog?.id || id}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="published">Published:</label>
        <input
          type="number"
          id="published"
          name="published"
          value={blog?.published || 0}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        {/* Show only the new image if it exists; otherwise show the existing image */}
        {imageFile ? (
          <div>
            <img
              src={URL.createObjectURL(imageFile)} // Preview the new image
              alt="New Image Preview"
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <p>New Image Preview</p>
          </div>
        ) : (
          <div>
            {blog?.image ? (
              <img
                src={blog.image} // URL or path to the existing image
                alt="Existing Blog Image"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
        )}
      </div>
      <div>
        <label htmlFor="imageUpload">Upload New Image:</label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleImageUpload(e.target.files[0]);
            }
          }}
        />
      </div>
      <button type="submit">Update Blog</button>
    </form>
  );
};

export default UpdateBlogForm;
