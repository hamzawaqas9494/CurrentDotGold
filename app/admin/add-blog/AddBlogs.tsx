// "use client";
// import React, { FC, useState } from "react";
// import MainLayout from "@/app/admin/components/Admin/MainLayout";
// import { Card, CardBody, CardHeader } from "@/app/ui/Card";
// import { EditIcon } from "@/icons";
// import Editor from "./Editor";
// interface Blog {
//   id: number;
//   title: string;
//   content: string;
//   image: string;
//   video: string;
//   Visibility: number;
//   Published: number;
//   length: number;
// }
// const AddBlogs: FC = () => {
//   const [title, setTitle] = useState<string>("");
//   const [content, setContent] = useState<string>("");
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [videoFile, setVideoFile] = useState<File | null>(null);

//   const handlePublish = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("content", content);
//       if (imageFile) formData.append("image", imageFile);
//       if (videoFile) formData.append("video", videoFile);
//       formData.append("visibility", "1");
//       formData.append("published", "1");

//       const response = await fetch("/api/sent-data", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         console.log("Blog post created successfully!");
//       } else {
//         console.error("Failed to create a blog post ali.");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   };

//   const handleContentChange = (newContent: string) => {
//     const tempElement = document.createElement("div");
//     tempElement.innerHTML = newContent;
//     setContent(tempElement.innerText);
//   };

//   const handleImageUpload = (file: File) => {
//     setImageFile(file);
//   };

//   const handleVideoUpload = (file: File) => {
//     setVideoFile(file);
//   };

//   return (
//     <MainLayout>
//       <div className="m-4">
//         <Card className="my-4">
//           <CardHeader>Add New Blog</CardHeader>
//           <CardBody>
//             <div className="newblog">
//               <div className="grid grid-cols-12 gap-x-5">
//                 <div className="col-span-8">
//                   <input
//                     type="text"
//                     id="title"
//                     className="w-[20vw] rounded-md border border-[#BEBEBE] mb-5 px-2 py-2 text-lg text-[#BEBEBE] placeholder:font-semibold focus:outline-none"
//                     placeholder="Enter Title here"
//                     required
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                   />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       if (e.target.files && e.target.files[0]) {
//                         handleImageUpload(e.target.files[0]);
//                       }
//                     }}
//                   />
//                   <input
//                     type="file"
//                     accept="video/*"
//                     onChange={(e) => {
//                       if (e.target.files && e.target.files[0]) {
//                         handleVideoUpload(e.target.files[0]);
//                       }
//                     }}
//                   />
//                   <Editor content={content} setContent={handleContentChange} />
//                 </div>
//                 <div className="col-span-4">
//                   <div className="status bg-[#F9F9F9] px-5 py-4">
//                     <h2 className="border-b-2 text-2xl font-semibold leading-10">
//                       Publish
//                     </h2>
//                     <div className="mt-6 flex justify-between">
//                       <a href="/">
//                         <button className="text-md rounded-full border-2 py-2 px-5 text-[#8D8888] ">
//                           Status Draft
//                         </button>
//                       </a>
//                       <a href="/">
//                         <button className="text-md rounded-full border-2 py-2 px-8 text-[#8D8888] ">
//                           Preview
//                         </button>
//                       </a>
//                     </div>
//                     <div className="mt-6 pl-5 pr-2 2xl:pr-32">
//                       <div className="flex justify-between  border-b-2 pl-2 pr-5">
//                         <h2 className="text-xl text-[#8D8888]">
//                           Status:
//                           <span className=" ml-1 font-bold">Draft</span>
//                         </h2>
//                         <EditIcon />
//                       </div>
//                     </div>
//                     <div className="mt-10 pl-5 pr-2 2xl:pr-32">
//                       <div className="flex justify-between  border-b-2 pl-2 pr-5">
//                         <h2 className="text-xl text-[#8D8888]">
//                           Visibility:
//                           <span className=" ml-1 font-bold">Public</span>
//                         </h2>
//                         <EditIcon />
//                       </div>
//                     </div>
//                     <div className="mt-10 pl-5 pr-2 2xl:pr-32">
//                       <div className="flex justify-between  border-b-2 pl-2 pr-5">
//                         <h2 className="text-xl text-[#8D8888]">
//                           Publish:
//                           <span className=" ml-1  font-bold">Immediately</span>
//                         </h2>
//                         <EditIcon />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between bg-[#E8E8E8] py-4 px-10">
//                     <a href="/">
//                       <button className="text-lg font-semibold text-[#CDA800] underline ">
//                         Delete
//                       </button>
//                     </a>
//                     <button
//                       className="rounded-full bg-gradient-to-b from-yellow-700 via-yellow-500 to-yellow-400 py-2 px-8 text-lg text-white"
//                       onClick={handlePublish}
//                     >
//                       Publish
//                     </button>
//                   </div>
//                   <div className=" py-8">
//                     <input
//                       type="text"
//                       placeholder="Format"
//                       className="py-2 px-6 w-full border-2 rounded-lg"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Categories"
//                       className="py-2 px-6 mt-4 w-full border-2 rounded-lg"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Tags"
//                       className="py-2 px-6 mt-4 w-full border-2 rounded-lg"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Featured Images"
//                       className="py-2 px-6 mt-4 w-full border-2 rounded-lg"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </CardBody>
//         </Card>
//       </div>
//     </MainLayout>
//   );
// };

// export default AddBlogs;

// components/AddBlogs.tsx
// "use client";

// import React, { FC, useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import MainLayout from "@/app/admin/components/Admin/MainLayout";
// import { Card, CardBody, CardHeader } from "@/app/ui/Card";
// import { EditIcon } from "@/icons";
// import Editor from "./Editor";

// interface Blog {
//   id: number;
//   title: string;
//   content: string;
//   image: string;
//   video: string;
//   Visibility: number;
//   Published: number;
//   length: number;
//   currentDateTime: any;
// }

// const AddBlogs: FC = () => {
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");
//   const [blog, setBlog] = useState<any>({ id });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [title, setTitle] = useState<string>("");
//   const [content, setContent] = useState<string>("");
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const handlePublish = async () => {
//     try {
//       // const currentDateTime = new Date().toLocaleString();
//       // console.log(currentDateTime);
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("content", content);
//       if (imageFile) formData.append("image", imageFile);
//       if (videoFile) formData.append("video", videoFile);
//       formData.append("visibility", "1");
//       formData.append("published", "1");
//       // formData.append("postedtime", currentDateTime);
//       const response = await fetch("/api/blog-table/sent-blog-data", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         console.log("Blog post created successfully!");
//       } else {
//         console.error("Failed to create a blog post.");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   };

//   const handleContentChange = (newContent: string) => {
//     const tempElement = document.createElement("div");
//     tempElement.innerHTML = newContent;
//     setContent(tempElement.innerText);
//   };

//   const handleImageUpload = (file: File) => {
//     setImageFile(file);
//   };

//   const handleVideoUpload = (file: File) => {
//     setVideoFile(file);
//   };

//   return (
//     <MainLayout>
//       <div className="m-4">
//         <Card className="my-4">
//           <CardHeader>Add New Blog</CardHeader>
//           <CardBody>
//             <div className="newblog">
//               <div className="grid grid-cols-12 gap-x-5">
//                 <div className="col-span-8">
//                   <input
//                     type="text"
//                     id="title"
//                     className="w-[20vw] rounded-md border border-[#BEBEBE] mb-5 px-2 py-2 text-lg text-[#BEBEBE] placeholder:font-semibold focus:outline-none"
//                     placeholder="Enter Title here"
//                     required
//                     value={blog.title}
//                     onChange={(e) => setTitle(e.target.value)}
//                   />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       if (e.target.files && e.target.files[0]) {
//                         handleImageUpload(e.target.files[0]);
//                       }
//                     }}
//                   />
//                   <input
//                     type="file"
//                     accept="video/*"
//                     onChange={(e) => {
//                       if (e.target.files && e.target.files[0]) {
//                         handleVideoUpload(e.target.files[0]);
//                       }
//                     }}
//                   />
//                   <Editor content={content} setContent={handleContentChange} />
//                 </div>
//                 <div className="col-span-4">
//                   <div className="status bg-[#F9F9F9] px-5 py-4">
//                     <h2 className="border-b-2 text-2xl font-semibold leading-10">
//                       Publish
//                     </h2>
//                     <div className="mt-6 flex justify-between">
//                       <a href="/">
//                         <button className="text-md rounded-full border-2 py-2 px-5 text-[#8D8888] ">
//                           Status Draft
//                         </button>
//                       </a>
//                       <a href="/">
//                         <button className="text-md rounded-full border-2 py-2 px-8 text-[#8D8888] ">
//                           Preview
//                         </button>
//                       </a>
//                     </div>
//                     <div className="mt-6 pl-5 pr-2 2xl:pr-32">
//                       <div className="flex justify-between  border-b-2 pl-2 pr-5">
//                         <h2 className="text-xl text-[#8D8888]">
//                           Status:
//                           <span className=" ml-1 font-bold">Draft</span>
//                         </h2>
//                         <EditIcon />
//                       </div>
//                     </div>
//                     <div className="mt-10 pl-5 pr-2 2xl:pr-32">
//                       <div className="flex justify-between  border-b-2 pl-2 pr-5">
//                         <h2 className="text-xl text-[#8D8888]">
//                           Visibility:
//                           <span className=" ml-1 font-bold">Public</span>
//                         </h2>
//                         <EditIcon />
//                       </div>
//                     </div>
//                     <div className="mt-10 pl-5 pr-2 2xl:pr-32">
//                       <div className="flex justify-between  border-b-2 pl-2 pr-5">
//                         <h2 className="text-xl text-[#8D8888]">
//                           Publish:
//                           <span className=" ml-1  font-bold">Immediately</span>
//                         </h2>
//                         <EditIcon />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between bg-[#E8E8E8] py-4 px-10">
//                     <a href="/">
//                       <button className="text-lg font-semibold text-[#CDA800] underline ">
//                         Delete
//                       </button>
//                     </a>
//                     <button
//                       className="rounded-full bg-gradient-to-b from-yellow-700 via-yellow-500 to-yellow-400 py-2 px-8 text-lg text-white"
//                       onClick={handlePublish}
//                     >
//                       Publish
//                     </button>
//                   </div>
//                   <div className=" py-8">
//                     <input
//                       type="text"
//                       placeholder="Format"
//                       className="py-2 px-6 w-full border-2 rounded-lg"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Categories"
//                       className="py-2 px-6 mt-4 w-full border-2 rounded-lg"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Tags"
//                       className="py-2 px-6 mt-4 w-full border-2 rounded-lg"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Featured Images"
//                       className="py-2 px-6 mt-4 w-full border-2 rounded-lg"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </CardBody>
//         </Card>
//       </div>
//     </MainLayout>
//   );
// };

// export default AddBlogs;

"use client";

import React, { FC, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import MainLayout from "@/app/admin/components/Admin/MainLayout";
import { Card, CardBody, CardHeader } from "@/app/ui/Card";
import { EditIcon } from "@/icons";
import Editor from "./Editor";
import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  Visibility: number;
  Published: number;
  length: number;
  currentDateTime: any;
}

const AddBlogs: FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [blog, setBlog] = useState<any>({ id });
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageBlob, setImageBlob] = useState<PutBlobResult | null>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);

  const handlePublish = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (imageBlob) formData.append("image", imageBlob.url);
      formData.append("visibility", "1");
      formData.append("published", "1");

      const response = await fetch("/api/blog-table/sent-blog-data", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Blog post created successfully!");
      } else {
        console.error("Failed to create a blog post.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleContentChange = (newContent: string) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = newContent;
    setContent(tempElement.innerText);
  };

  const handleFileUpload = async (file: File) => {
    try {
      const newBlob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/avatar/upload",
      });
      setImageBlob(newBlob);
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  return (
    <MainLayout>
      <div className="m-4">
        <Card className="my-4">
          <CardHeader>Add New Blog</CardHeader>
          <CardBody>
            <div className="newblog">
              <div className="grid grid-cols-12 gap-x-5">
                <div className="col-span-8">
                  <input
                    type="text"
                    id="title"
                    className="w-[20vw] rounded-md border border-[#BEBEBE] mb-5 px-2 py-2 text-lg text-[#BEBEBE] placeholder:font-semibold focus:outline-none"
                    placeholder="Enter Title here"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputImageRef}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />
                  <Editor content={content} setContent={handleContentChange} />
                </div>
                <div className="col-span-4">
                  <div className="status bg-[#F9F9F9] px-5 py-4">
                    <h2 className="border-b-2 text-2xl font-semibold leading-10">
                      Publish
                    </h2>
                    <div className="mt-6 flex justify-between">
                      <a href="/">
                        <button className="text-md rounded-full border-2 py-2 px-5 text-[#8D8888] ">
                          Status Draft
                        </button>
                      </a>
                      <a href="/">
                        <button className="text-md rounded-full border-2 py-2 px-8 text-[#8D8888] ">
                          Preview
                        </button>
                      </a>
                    </div>
                    <div className="mt-6 pl-5 pr-2 2xl:pr-32">
                      <div className="flex justify-between  border-b-2 pl-2 pr-5">
                        <h2 className="text-xl text-[#8D8888]">
                          Status:
                          <span className=" ml-1 font-bold">Draft</span>
                        </h2>
                        <EditIcon />
                      </div>
                    </div>
                    <div className="mt-10 pl-5 pr-2 2xl:pr-32">
                      <div className="flex justify-between  border-b-2 pl-2 pr-5">
                        <h2 className="text-xl text-[#8D8888]">
                          Visibility:
                          <span className=" ml-1 font-bold">Public</span>
                        </h2>
                        <EditIcon />
                      </div>
                    </div>
                    <div className="mt-10 pl-5 pr-2 2xl:pr-32">
                      <div className="flex justify-between  border-b-2 pl-2 pr-5">
                        <h2 className="text-xl text-[#8D8888]">
                          Publish:
                          <span className=" ml-1  font-bold">Immediately</span>
                        </h2>
                        <EditIcon />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-[#E8E8E8] py-4 px-10">
                    <a href="/">
                      <button className="text-lg font-semibold text-[#CDA800] underline ">
                        Delete
                      </button>
                    </a>
                    <button
                      className="rounded-full bg-gradient-to-b from-yellow-700 via-yellow-500 to-yellow-400 py-2 px-8 text-lg text-white"
                      onClick={handlePublish}
                    >
                      Publish
                    </button>
                  </div>
                  <div className=" py-8">
                    <input
                      type="text"
                      placeholder="Format"
                      className="py-2 px-6 w-full border-2 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Categories"
                      className="py-2 px-6 mt-4 w-full border-2 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Tags"
                      className="py-2 px-6 mt-4 w-full border-2 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Featured Images"
                      className="py-2 px-6 mt-4 w-full border-2 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AddBlogs;
