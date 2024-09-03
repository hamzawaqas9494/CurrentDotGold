// // // // // "use client";
// // // // // import React, { useEffect, useState } from "react";
// // // // // import type { Metadata } from "next";
// // // // // import { Navebar, Footer } from "../ui";
// // // // // import { useRouter } from "next/navigation";
// // // // // const metadata: Metadata = {
// // // // //   title: "Blog - Gold Rate Pakistan",
// // // // // };
// // // // // interface Blog {
// // // // //   id: number;
// // // // //   title: string;
// // // // //   content: string;
// // // // //   image: string;
// // // // //   video: string;
// // // // //   Visibility: number;
// // // // //   Published: number;
// // // // //   length: number;
// // // // //   postedtime: string;
// // // // //   alldata: object;
// // // // // }

// // // // // const Blog: React.FC = () => {
// // // // //   const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
// // // // //   const [previousFiveBlogs, setPreviousFiveBlogs] = useState<Blog[]>([]);
// // // // //   const [loading, setLoading] = useState<boolean>(true);
// // // // //   const [error, setError] = useState<string | null>(null);
// // // // //   const [currentPage, setCurrentPage] = useState<number>(1);
// // // // //   const [pageGroup, setPageGroup] = useState<number>(1);
// // // // //   const blogsPerPage = 3;
// // // // //   const pagesPerGroup = 3;
// // // // //   const router = useRouter();
// // // // //   const handleUpdate = (id: number) => {
// // // // //     router.push(`/blog/readmore?id=${id}`);
// // // // //   };
// // // // //   useEffect(() => {
// // // // //     const fetchBlogs = async () => {
// // // // //       try {
// // // // //         const allBlogData = await fetch("../api/get-blogs");
// // // // //         const allBlogDataResponse = await allBlogData.json();
// // // // //         setAllBlogs(allBlogDataResponse.allDataReverseOrder);
// // // // //         setPreviousFiveBlogs(allBlogDataResponse.previousFive);
// // // // //         setLoading(false);
// // // // //       } catch (error: any) {
// // // // //         setError("Error fetching blogs.");
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchBlogs();
// // // // //   }, [currentPage]);
// // // // //   const indexOfLastBlog = currentPage * blogsPerPage;
// // // // //   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
// // // // //   const currentBlogs = allBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

// // // // //   const totalPages = Math.ceil(allBlogs.length / blogsPerPage);
// // // // //   const totalGroups = Math.ceil(totalPages / pagesPerGroup);

// // // // //   const getPageNumbers = () => {
// // // // //     const startPage = (pageGroup - 1) * pagesPerGroup + 1;
// // // // //     const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
// // // // //     return Array.from(
// // // // //       { length: endPage - startPage + 1 },
// // // // //       (_, i) => startPage + i
// // // // //     );
// // // // //   };

// // // // //   const handlePageChange = (pageNumber: number) => {
// // // // //     setCurrentPage(pageNumber);
// // // // //   };

// // // // //   const handleShuffleGroup = () => {
// // // // //     if (pageGroup < totalGroups) {
// // // // //       setPageGroup(pageGroup + 1);
// // // // //     } else {
// // // // //       setPageGroup(1);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <React.Fragment>
// // // // //       <Navebar className="bg-black text-white" />
// // // // //       <div className="container">
// // // // //         <div className="grid grid-cols-12 gap-x-0 xl:gap-x-20">
// // // // //           <div className=" col-span-12  xl:col-span-9 ">
// // // // //             {loading && <div>Loading...</div>}
// // // // //             {error && <div>Error: {error}</div>}
// // // // //             {!loading &&
// // // // //               !error &&
// // // // //               currentBlogs.map((blog) => (
// // // // //                 <div className="pt-10" key={blog.id}>
// // // // //                   <h2 className="text-center text-2xl font-semibold text-black sm:text-4xl">
// // // // //                     {blog.title}
// // // // //                   </h2>
// // // // //                   <p className="mt-10 text-center text-gray-400">
// // // // //                     {blog.postedtime}
// // // // //                   </p>
// // // // //                   {/* <img className="mt-10" src={blog.image} alt="ring blog" /> */}
// // // // //                   <img
// // // // //                     className="mt-10"
// // // // //                     src={`data:image/jpeg;base64,${blog.image}`}
// // // // //                     alt="ring blog"
// // // // //                   />

// // // // //                   <p className="mt-10 overflow-hidden text-ellipsis content-box">
// // // // //                     {blog.content}
// // // // //                   </p>
// // // // //                   <div className="flex items-center justify-between  border-b-2 py-10">
// // // // //                     <button
// // // // //                       onClick={() => handleUpdate(blog.id)}
// // // // //                       className="text-md rounded-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 py-2 px-4 text-white"
// // // // //                     >
// // // // //                       READ MORE {">>"}
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ))}
// // // // //             <div className="flex justify-center space-x-4 pt-10">
// // // // //               {getPageNumbers().map((pageNumber) => (
// // // // //                 <button
// // // // //                   key={pageNumber}
// // // // //                   onClick={() => handlePageChange(pageNumber)}
// // // // //                   className={`bg-gray-300 text-gray-700 py-2 px-4 rounded ${
// // // // //                     pageNumber === currentPage ? "bg-yellow-500 text-white" : ""
// // // // //                   }`}
// // // // //                 >
// // // // //                   {pageNumber}
// // // // //                 </button>
// // // // //               ))}
// // // // //               <button
// // // // //                 onClick={handleShuffleGroup}
// // // // //                 className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
// // // // //               >
// // // // //                 Shuffle
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //           <div className="col-span-3">
// // // // //             <div className="grid grid-cols-12 justify-center gap-x-4">
// // // // //               <div className="col-span-12">
// // // // //                 <p className="text-center w-full border-2 py-4 text-lg font-semibold">
// // // // //                   Recent Posts
// // // // //                 </p>
// // // // //               </div>
// // // // //               <div className=" col-span-12 sm:col-span-4 xl:col-span-12">
// // // // //                 {previousFiveBlogs.length > 0 ? (
// // // // //                   previousFiveBlogs.map((blog) => (
// // // // //                     <div
// // // // //                       key={blog.id}
// // // // //                       className="blogone flex flex-col items-center justify-center gap-y-2 border-b-2 py-5 sm:border-b-0  xl:border-b-2"
// // // // //                     >
// // // // //                       <img src="assets/rings.png" alt="ring circle" />
// // // // //                       <p className="text-center">ID: {blog.id}</p>
// // // // //                       <h2 className="text-md text-center font-semibold">
// // // // //                         {blog.title}
// // // // //                       </h2>
// // // // //                       <p className="text-center text-xs text-gray-300">
// // // // //                         NOVEMBER 21, 2019
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   ))
// // // // //                 ) : (
// // // // //                   <div>No Recent Posts Available</div>
// // // // //                 )}
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //       <Footer />
// // // // //     </React.Fragment>
// // // // //   );
// // // // // };

// // // // // export default Blog;
// // // // "use client";
// // // // import React, { useEffect, useState } from "react";
// // // // import type { Metadata } from "next";
// // // // import { Navebar, Footer } from "../ui";
// // // // import { useRouter } from "next/navigation";
// // // // const metadata: Metadata = {
// // // //   title: "Blog - Gold Rate Pakistan",
// // // // };
// // // // interface Blog {
// // // //   id: number;
// // // //   title: string;
// // // //   content: string;
// // // //   image: string;
// // // //   video: string;
// // // //   Visibility: number;
// // // //   Published: number;
// // // //   length: number;
// // // //   postedtime: string;
// // // //   alldata: object;
// // // // }

// // // // const Blog: React.FC = () => {
// // // //   const [blogs, setBlogs] = useState<Blog[]>([]);
// // // //   const [loading, setLoading] = useState<boolean>(true);
// // // //   const [error, setError] = useState<string | null>(null);
// // // //   const [currentPage, setCurrentPage] = useState<number>(1);
// // // //   const [totalBlogs, setTotalBlogs] = useState<number>(0);
// // // //   const blogsPerPage = 3;
// // // //   const router = useRouter();

// // // //   useEffect(() => {
// // // //     const fetchBlogs = async () => {
// // // //       setLoading(true);
// // // //       try {
// // // //         const response = await fetch(
// // // //           `../api/get-blogs?page=${currentPage}&blogsPerPage=${blogsPerPage}`
// // // //         );
// // // //         const data = await response.json();
// // // //         setBlogs(data.blogs);
// // // //         setTotalBlogs(data.totalBlogs);
// // // //         setLoading(false);
// // // //       } catch (error: any) {
// // // //         setError("Error fetching blogs.");
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     fetchBlogs();
// // // //   }, [currentPage]);

// // // //   const totalPages = Math.ceil(totalBlogs / blogsPerPage);

// // // //   const handlePageChange = (pageNumber: number) => {
// // // //     setCurrentPage(pageNumber);
// // // //   };

// // // //   return (
// // // //     <React.Fragment>
// // // //       <Navebar className="bg-black text-white" />
// // // //       <div className="container">
// // // //         <div className="grid grid-cols-12 gap-x-0 xl:gap-x-20">
// // // //           <div className="col-span-12 xl:col-span-9">
// // // //             {loading && <div>Loading...</div>}
// // // //             {error && <div>Error: {error}</div>}
// // // //             {!loading &&
// // // //               !error &&
// // // //               blogs.map((blog) => (
// // // //                 <div className="pt-10" key={blog.id}>
// // // //                   <h2 className="text-center text-2xl font-semibold text-black sm:text-4xl">
// // // //                     {blog.title}
// // // //                   </h2>
// // // //                   <p className="mt-10 text-center text-gray-400">
// // // //                     {blog.postedtime}
// // // //                   </p>
// // // //                   <img
// // // //                     className="mt-10"
// // // //                     src={`data:image/jpeg;base64,${blog.image}`}
// // // //                     alt="ring blog"
// // // //                   />
// // // //                   <p className="mt-10 overflow-hidden text-ellipsis content-box">
// // // //                     {blog.content}
// // // //                   </p>
// // // //                   <div className="flex items-center justify-between border-b-2 py-10">
// // // //                     <button
// // // //                       onClick={() =>
// // // //                         router.push(`/blog/readmore?id=${blog.id}`)
// // // //                       }
// // // //                       className="text-md rounded-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 py-2 px-4 text-white"
// // // //                     >
// // // //                       READ MORE {">>"}
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             <div className="flex justify-center space-x-4 pt-10">
// // // //               {Array.from({ length: totalPages }, (_, i) => i + 1).map(
// // // //                 (pageNumber) => (
// // // //                   <button
// // // //                     key={pageNumber}
// // // //                     onClick={() => handlePageChange(pageNumber)}
// // // //                     className={`bg-gray-300 text-gray-700 py-2 px-4 rounded ${
// // // //                       pageNumber === currentPage
// // // //                         ? "bg-yellow-500 text-white"
// // // //                         : ""
// // // //                     }`}
// // // //                   >
// // // //                     {pageNumber}
// // // //                   </button>
// // // //                 )
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //       <Footer />
// // // //     </React.Fragment>
// // // //   );
// // // // };

// // // // export default Blog;
// // // "use client";
// // // import React, { useEffect, useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { Navebar, Footer } from "../ui";

// // // interface Blog {
// // //   id: number;
// // //   title: string;
// // //   content: string;
// // //   image: string;
// // //   video: string;
// // //   Visibility: number;
// // //   Published: number;
// // //   postedtime: string;
// // //   alldata: object;
// // // }

// // // const Blog: React.FC = () => {
// // //   const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
// // //   const [previousFiveBlogs, setPreviousFiveBlogs] = useState<Blog[]>([]);
// // //   const [loading, setLoading] = useState<boolean>(true);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [currentPage, setCurrentPage] = useState<number>(1);
// // //   const [totalBlogs, setTotalBlogs] = useState<number>(0);
// // //   const blogsPerPage = 3;
// // //   const router = useRouter();

// // //   const handleUpdate = (id: number) => {
// // //     router.push(`/blog/readmore?id=${id}`);
// // //   };

// // //   useEffect(() => {
// // //     const fetchBlogs = async () => {
// // //       try {
// // //         const response = await fetch(
// // //           `../api/get-blogs?page=${currentPage}&blogsPerPage=${blogsPerPage}`
// // //         );
// // //         const data = await response.json();
// // //         setAllBlogs(data.paginatedBlogs);
// // //         setPreviousFiveBlogs(data.previousFive);
// // //         setTotalBlogs(data.totalBlogs);
// // //         setLoading(false);
// // //       } catch (error: any) {
// // //         setError("Error fetching blogs.");
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchBlogs();
// // //   }, [currentPage]);

// // //   const totalPages = Math.ceil(totalBlogs / blogsPerPage);

// // //   const handlePageChange = (pageNumber: number) => {
// // //     setCurrentPage(pageNumber);
// // //   };

// // //   return (
// // //     <React.Fragment>
// // //       <Navebar className="bg-black text-white" />
// // //       <div className="container">
// // //         <div className="grid grid-cols-12 gap-x-0 xl:gap-x-20">
// // //           <div className=" col-span-12  xl:col-span-9 ">
// // //             {loading && <div>Loading...</div>}
// // //             {error && <div>Error: {error}</div>}
// // //             {!loading &&
// // //               !error &&
// // //               allBlogs.map((blog) => (
// // //                 <div className="pt-10" key={blog.id}>
// // //                   <h2 className="text-center text-2xl font-semibold text-black sm:text-4xl">
// // //                     {blog.title}
// // //                   </h2>
// // //                   <p className="mt-10 text-center text-gray-400">
// // //                     {blog.postedtime}
// // //                   </p>
// // //                   <img
// // //                     className="mt-10"
// // //                     src={`data:image/jpeg;base64,${blog.image}`}
// // //                     alt="ring blog"
// // //                   />
// // //                   <p className="mt-10 overflow-hidden text-ellipsis content-box">
// // //                     {blog.content}
// // //                   </p>
// // //                   <div className="flex items-center justify-between  border-b-2 py-10">
// // //                     <button
// // //                       onClick={() => handleUpdate(blog.id)}
// // //                       className="text-md rounded-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 py-2 px-4 text-white"
// // //                     >
// // //                       READ MORE {">>"}
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             <div className="flex justify-center space-x-4 pt-10">
// // //               {Array.from({ length: totalPages }, (_, i) => i + 1).map(
// // //                 (pageNumber) => (
// // //                   <button
// // //                     key={pageNumber}
// // //                     onClick={() => handlePageChange(pageNumber)}
// // //                     className={`bg-gray-300 text-gray-700 py-2 px-4 rounded ${
// // //                       pageNumber === currentPage
// // //                         ? "bg-yellow-500 text-white"
// // //                         : ""
// // //                     }`}
// // //                   >
// // //                     {pageNumber}
// // //                   </button>
// // //                 )
// // //               )}
// // //             </div>
// // //           </div>
// // //           <div className="col-span-3">
// // //             <div className="grid grid-cols-12 justify-center gap-x-4">
// // //               <div className="col-span-12">
// // //                 <p className="text-center w-full border-2 py-4 text-lg font-semibold">
// // //                   Recent Posts
// // //                 </p>
// // //               </div>
// // //               <div className=" col-span-12 sm:col-span-4 xl:col-span-12">
// // //                 {previousFiveBlogs.length > 0 ? (
// // //                   previousFiveBlogs.map((blog) => (
// // //                     <div
// // //                       key={blog.id}
// // //                       className="blogone flex flex-col items-center justify-center gap-y-2 border-b-2 py-5 sm:border-b-0  xl:border-b-2"
// // //                     >
// // //                       <img src="assets/rings.png" alt="ring circle" />
// // //                       <p className="text-center">ID: {blog.id}</p>
// // //                       <h2 className="text-md text-center font-semibold">
// // //                         {blog.title}
// // //                       </h2>
// // //                       <p className="text-center text-xs text-gray-300">
// // //                         NOVEMBER 21, 2019
// // //                       </p>
// // //                     </div>
// // //                   ))
// // //                 ) : (
// // //                   <div>No Recent Posts Available</div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //       <Footer />
// // //     </React.Fragment>
// // //   );
// // // };

// // // export default Blog;
// // // "use client";
// // // import React, { useEffect, useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { Navebar, Footer } from "../ui";
// // // import currentdate from "../components/Home/Date&Time";

// // // interface Blog {
// // //   id: number;
// // //   title: string;
// // //   content: string;
// // //   image: string;
// // //   video: string;
// // //   Visibility: number;
// // //   Published: number;
// // //   postedtime: string;
// // //   alldata: object;
// // // }

// // // const Blog: React.FC = () => {
// // //   const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
// // //   const [previousFiveBlogs, setPreviousFiveBlogs] = useState<Blog[]>([]);
// // //   const [loading, setLoading] = useState<boolean>(true);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [currentPage, setCurrentPage] = useState<number>(1);
// // //   const [totalBlogs, setTotalBlogs] = useState<number>(0);
// // //   const blogsPerPage = 3;
// // //   const router = useRouter();

// // //   const handleUpdate = (id: number) => {
// // //     router.push(`/blog/readmore?id=${id}`);
// // //   };

// // //   const fetchBlogs = async (page: number) => {
// // //     setLoading(true); // Set loading to true when starting the fetch
// // //     try {
// // //       const response = await fetch(
// // //         `../api/blog-table/all-pagination-blog?page=${page}&blogsPerPage=${blogsPerPage}`
// // //       );
// // //       const data = await response.json();
// // //       console.log(data);
// // //       setAllBlogs(data.paginatedBlogs);
// // //       setPreviousFiveBlogs(data.previousFive);
// // //       setTotalBlogs(data.totalBlogs);
// // //       setLoading(false); // Set loading to false when fetch is complete
// // //     } catch (error: any) {
// // //       setError("Error fetching blogs.");
// // //       setLoading(false); // Set loading to false if there's an error
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchBlogs(currentPage);
// // //   }, [currentPage]);

// // //   const totalPages = Math.ceil(totalBlogs / blogsPerPage);

// // //   const handlePageChange = (pageNumber: number) => {
// // //     setCurrentPage(pageNumber);
// // //   };

// // //   return (
// // //     <React.Fragment>
// // //       <Navebar className="bg-black text-white" />
// // //       <div className="container">
// // //         <div className="grid grid-cols-12 gap-x-0 xl:gap-x-20">
// // //           <div className=" col-span-12  xl:col-span-9 ">
// // //             {loading && <div>Loading...</div>} {/* Show loading indicator */}
// // //             {error && <div>Error: {error}</div>}
// // //             {!loading &&
// // //               allBlogs.map((blog) => (
// // //                 <div className="pt-10" key={blog.id}>
// // //                   <h2 className="text-center text-2xl font-semibold text-black sm:text-4xl">
// // //                     {blog.title}
// // //                   </h2>
// // //                   <p className="mt-10 text-center text-gray-400">
// // //                     {blog.postedtime}
// // //                   </p>
// // //                   <img
// // //                     className="mt-10"
// // //                     src={`data:image/jpeg;base64,${blog.image}`}
// // //                     alt="ring blog"
// // //                   />
// // //                   <p className="mt-10 overflow-hidden text-ellipsis content-box">
// // //                     {blog.content}
// // //                   </p>
// // //                   <div className="flex items-center justify-between  border-b-2 py-10">
// // //                     <button
// // //                       onClick={() => handleUpdate(blog.id)}
// // //                       className="text-md rounded-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 py-2 px-4 text-white"
// // //                     >
// // //                       READ MORE {">>"}
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             <div className="flex justify-center space-x-4 pt-10">
// // //               {Array.from({ length: totalPages }, (_, i) => i + 1).map(
// // //                 (pageNumber) => (
// // //                   <button
// // //                     key={pageNumber}
// // //                     onClick={() => handlePageChange(pageNumber)}
// // //                     className={`bg-gray-300 text-gray-700 py-2 px-4 rounded ${
// // //                       pageNumber === currentPage
// // //                         ? "bg-yellow-500 text-white"
// // //                         : ""
// // //                     }`}
// // //                   >
// // //                     {pageNumber}
// // //                   </button>
// // //                 )
// // //               )}
// // //             </div>
// // //           </div>
// // //           <div className="col-span-3">
// // //             <div className="grid grid-cols-12 justify-center gap-x-4">
// // //               <div className="col-span-12">
// // //                 <p className="text-center w-full border-2 py-4 text-lg font-semibold">
// // //                   Recent Posts
// // //                 </p>
// // //               </div>
// // //               <div className=" col-span-12 sm:col-span-4 xl:col-span-12">
// // //                 {previousFiveBlogs.length > 0 ? (
// // //                   previousFiveBlogs.map((blog) => (
// // //                     <div
// // //                       key={blog.id}
// // //                       className="blogone flex flex-col items-center justify-center gap-y-2 border-b-2 py-5 sm:border-b-0  xl:border-b-2"
// // //                     >
// // //                       <img src="assets/rings.png" alt="ring circle" />
// // //                       <p className="text-center">ID: {blog.id}</p>
// // //                       <h2 className="text-md text-center font-semibold">
// // //                         {blog.title}
// // //                       </h2>
// // //                       <p className="text-center text-xs text-gray-300">
// // //                         NOVEMBER 21, 2019
// // //                       </p>
// // //                     </div>
// // //                   ))
// // //                 ) : (
// // //                   <div>No Recent Posts Available</div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //       <Footer />
// // //     </React.Fragment>
// // //   );
// // // };

// // // export default Blog;
// // "use client";
// // import React, { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { Navebar, Footer } from "../ui";

// // interface Blog {
// //   id: number;
// //   title: string;
// //   content: string;
// //   image: string;
// //   video: string;
// //   Visibility: number;
// //   Published: number;
// //   postedtime: string;
// //   alldata: object;
// // }

// // const Blog: React.FC = () => {
// //   const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
// //   const [previousFiveBlogs, setPreviousFiveBlogs] = useState<Blog[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [currentPage, setCurrentPage] = useState<number>(1);
// //   const [totalBlogs, setTotalBlogs] = useState<number>(0);
// //   const blogsPerPage = 3;
// //   const router = useRouter();

// //   const handleUpdate = (id: number) => {
// //     router.push(`/blog/readmore?id=${id}`);
// //   };

// //   const fetchBlogs = async (page: number) => {
// //     setLoading(true);
// //     try {
// //       const response = await fetch(
// //         `../api/blog-table/all-pagination-blog?page=${page}&blogsPerPage=${blogsPerPage}`
// //       );
// //       const data = await response.json();
// //       setAllBlogs(data.paginatedBlogs);
// //       setPreviousFiveBlogs(data.previousFive);
// //       setTotalBlogs(data.totalBlogs);
// //       setLoading(false);
// //     } catch (error: any) {
// //       setError("Error fetching blogs.");
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchBlogs(currentPage);
// //   }, [currentPage]);

// //   const totalPages = Math.ceil(totalBlogs / blogsPerPage);
// //   const maxPageButtons = 3;
// //   const startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
// //   const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

// //   const handlePageChange = (pageNumber: number) => {
// //     setCurrentPage(pageNumber);
// //   };

// //   const handleNextPage = () => {
// //     if (currentPage < totalPages) {
// //       setCurrentPage(currentPage + 1);
// //     }
// //   };

// //   const handlePreviousPage = () => {
// //     if (currentPage > 1) {
// //       setCurrentPage(currentPage - 1);
// //     }
// //   };

// //   return (
// //     <React.Fragment>
// //       <Navebar className="bg-black text-white" />
// //       <div className="container">
// //         <div className="grid grid-cols-12 gap-x-0 xl:gap-x-20">
// //           <div className="col-span-12 xl:col-span-9">
// //             {loading && <div>Loading...</div>}
// //             {error && <div>Error: {error}</div>}
// //             {!loading &&
// //               allBlogs.map((blog) => (
// //                 <div className="pt-10" key={blog.id}>
// //                   <h2 className="text-center text-2xl font-semibold text-black sm:text-4xl">
// //                     {blog.title}
// //                   </h2>
// //                   <p className="mt-10 text-center text-gray-400">
// //                     {blog.postedtime}
// //                   </p>
// //                   <img
// //                     className="mt-10"
// //                     src={`data:image/jpeg;base64,${blog.image}`}
// //                     alt="ring blog"
// //                   />
// //                   <p className="mt-10 overflow-hidden text-ellipsis content-box">
// //                     {blog.content}
// //                   </p>
// //                   <div className="flex items-center justify-between border-b-2 py-10">
// //                     <button
// //                       onClick={() => handleUpdate(blog.id)}
// //                       className="text-md rounded-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 py-2 px-4 text-white"
// //                     >
// //                       READ MORE {">>"}
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))}
// //             <div className="flex justify-center space-x-4 pt-10">
// //               <button
// //                 onClick={handlePreviousPage}
// //                 disabled={currentPage === 1}
// //                 className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
// //               >
// //                 Previous
// //               </button>
// //               {Array.from(
// //                 { length: endPage - startPage + 1 },
// //                 (_, i) => startPage + i
// //               ).map((pageNumber) => (
// //                 <button
// //                   key={pageNumber}
// //                   onClick={() => handlePageChange(pageNumber)}
// //                   className={`bg-gray-300 text-gray-700 py-2 px-4 rounded ${
// //                     pageNumber === currentPage ? "bg-yellow-500 text-white" : ""
// //                   }`}
// //                 >
// //                   {pageNumber}
// //                 </button>
// //               ))}
// //               <button
// //                 onClick={handleNextPage}
// //                 disabled={currentPage === totalPages}
// //                 className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
// //               >
// //                 Next
// //               </button>
// //             </div>
// //           </div>
// //           <div className="col-span-3">
// //             <div className="grid grid-cols-12 justify-center gap-x-4">
// //               <div className="col-span-12">
// //                 <p className="text-center w-full border-2 py-4 text-lg font-semibold">
// //                   Recent Posts
// //                 </p>
// //               </div>
// //               <div className="col-span-12 sm:col-span-4 xl:col-span-12">
// //                 {previousFiveBlogs.length > 0 ? (
// //                   previousFiveBlogs.map((blog) => (
// //                     <div
// //                       key={blog.id}
// //                       className="blogone flex flex-col items-center justify-center gap-y-2 border-b-2 py-5 sm:border-b-0 xl:border-b-2"
// //                     >
// //                       <img src="assets/rings.png" alt="ring circle" />
// //                       <p className="text-center">ID: {blog.id}</p>
// //                       <h2 className="text-md text-center font-semibold">
// //                         {blog.title}
// //                       </h2>
// //                       <p className="text-center text-xs text-gray-300">
// //                         NOVEMBER 21, 2019
// //                       </p>
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <div>No Recent Posts Available</div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <Footer />
// //     </React.Fragment>
// //   );
// // };

// // export default Blog;
// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Navebar, Footer } from "../ui";

// interface Blog {
//   id: number;
//   title: string;
//   content: string;
//   image: string;
//   video: string;
//   Visibility: number;
//   Published: number;
//   postedtime: string;
//   alldata: object;
// }

// const Blog: React.FC = () => {
//   const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
//   const [previousFiveBlogs, setPreviousFiveBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalBlogs, setTotalBlogs] = useState<number>(0);
//   const blogsPerPage = 3;
//   const router = useRouter();

//   const handleUpdate = (id: number) => {
//     router.push(`/blog/readmore?id=${id}`);
//   };

//   const fetchBlogs = async (page: number) => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `../api/blog-table/all-pagination-blog?page=${page}&blogsPerPage=${blogsPerPage}`
//       );
//       const data = await response.json();
//       setAllBlogs(data.paginatedBlogs);
//       setPreviousFiveBlogs(data.previousFive);
//       setTotalBlogs(data.totalBlogs);
//       setLoading(false);
//     } catch (error: any) {
//       setError("Error fetching blogs.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs(currentPage);
//   }, [currentPage]);

//   const totalPages = Math.ceil(totalBlogs / blogsPerPage);
//   const maxPageButtons = 3;

//   // Determine the range of page numbers to display
//   const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
//   const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

//   // Adjust startPage if there are fewer pages than maxPageButtons
//   const adjustedStartPage = Math.max(1, endPage - maxPageButtons + 1);

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <React.Fragment>
//       <Navebar className="bg-black text-white" />
//       <div className="container">
//         <div className="grid grid-cols-12 gap-x-0 xl:gap-x-20">
//           <div className="col-span-12 xl:col-span-9">
//             {loading && <div>Loading...</div>}
//             {error && <div>Error: {error}</div>}
//             {!loading &&
//               allBlogs.map((blog) => (
//                 <div className="pt-10" key={blog.id}>
//                   <h2 className="text-center text-2xl font-semibold text-black sm:text-4xl">
//                     {blog.title}
//                   </h2>
//                   <p className="mt-10 text-center text-gray-400">
//                     {blog.postedtime}
//                   </p>
//                   <img
//                     className="mt-10"
//                     src={`data:image/jpeg;base64,${blog.image}`}
//                     alt="ring blog"
//                   />
//                   <p className="mt-10 overflow-hidden text-ellipsis content-box">
//                     {blog.content}
//                   </p>
//                   <div className="flex items-center justify-between border-b-2 py-10">
//                     <button
//                       onClick={() => handleUpdate(blog.id)}
//                       className="text-md rounded-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 py-2 px-4 text-white"
//                     >
//                       READ MORE {">>"}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             <div className="flex justify-center space-x-4 pt-10">
//               <button
//                 onClick={handlePreviousPage}
//                 disabled={currentPage === 1}
//                 className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
//               >
//                 Previous
//               </button>
//               {Array.from(
//                 { length: Math.min(maxPageButtons, totalPages) },
//                 (_, i) => adjustedStartPage + i
//               ).map((pageNumber) => (
//                 <button
//                   key={pageNumber}
//                   onClick={() => handlePageChange(pageNumber)}
//                   className={`bg-gray-300 text-gray-700 py-2 px-4 rounded ${
//                     pageNumber === currentPage ? "bg-yellow-500 text-white" : ""
//                   }`}
//                 >
//                   {pageNumber}
//                 </button>
//               ))}
//               <button
//                 onClick={handleNextPage}
//                 disabled={currentPage === totalPages}
//                 className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//           <div className="col-span-3">
//             <div className="grid grid-cols-12 justify-center gap-x-4">
//               <div className="col-span-12">
//                 <p className="text-center w-full border-2 py-4 text-lg font-semibold">
//                   Recent Posts
//                 </p>
//               </div>
//               <div className="col-span-12 sm:col-span-4 xl:col-span-12">
//                 {previousFiveBlogs.length > 0 ? (
//                   previousFiveBlogs.map((blog) => (
//                     <div
//                       key={blog.id}
//                       className="blogone flex flex-col items-center justify-center gap-y-2 border-b-2 py-5 sm:border-b-0 xl:border-b-2"
//                     >
//                       <img src="assets/rings.png" alt="ring circle" />
//                       <p className="text-center">ID: {blog.id}</p>
//                       <h2 className="text-md text-center font-semibold">
//                         {blog.title}
//                       </h2>
//                       <p className="text-center text-xs text-gray-300">
//                         NOVEMBER 21, 2019
//                       </p>
//                     </div>
//                   ))
//                 ) : (
//                   <div>No Recent Posts Available</div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </React.Fragment>
//   );
// };

// export default Blog;
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navebar, Footer } from "../ui";

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  video: string;
  Visibility: number;
  Published: number;
  postedtime: string;
  alldata: object;
}

const Blog: React.FC = () => {
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [previousFiveBlogs, setPreviousFiveBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalBlogs, setTotalBlogs] = useState<number>(0);
  const blogsPerPage = 3;
  const router = useRouter();

  const handleUpdate = (id: number) => {
    router.push(`/blog/readmore?id=${id}`);
  };

  const fetchBlogs = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `../api/blog-table/all-pagination-blog?page=${page}&blogsPerPage=${blogsPerPage}`
      );

      const data = await response.json();

      setAllBlogs(data.paginatedBlogs);
      setPreviousFiveBlogs(data.previousFive);
      setTotalBlogs(data.totalBlogs);
      setLoading(false);
    } catch (error: any) {
      setError("Error fetching blogs.");
      setLoading(false);
    }
  };
  console.log(allBlogs);

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalBlogs / blogsPerPage);
  const pagesPerSet = 3;

  // Determine the current set of page numbers
  const currentSet = Math.ceil(currentPage / pagesPerSet);
  const startPage = (currentSet - 1) * pagesPerSet + 1;
  const endPage = Math.min(startPage + pagesPerSet - 1, totalPages);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNextSet = () => {
    if (endPage < totalPages) {
      setCurrentPage(endPage + 1);
    }
  };

  const handlePreviousSet = () => {
    if (startPage > 1) {
      setCurrentPage(startPage - pagesPerSet);
    }
  };

  return (
    <React.Fragment>
      <Navebar className="bg-black text-white" />
      <div className="container">
        <div className="grid grid-cols-12 gap-x-0 xl:gap-x-20">
          <div className="col-span-12 xl:col-span-9">
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!loading &&
              allBlogs.map((blog) => (
                <div className="pt-10" key={blog.id}>
                  <h2 className="text-center text-2xl font-semibold text-black sm:text-4xl">
                    {blog.title}
                  </h2>
                  <p className="mt-10 text-center text-gray-400">
                    {blog.postedtime}
                  </p>
                  <img
                    className="mt-10"
                    src={`data:image/jpeg;base64,${blog.image}`}
                    alt="ring blog"
                  />
                  <p className="mt-10 overflow-hidden text-ellipsis content-box">
                    {blog.content}
                  </p>
                  <div className="flex items-center justify-between border-b-2 py-10">
                    <button
                      onClick={() => handleUpdate(blog.id)}
                      className="text-md rounded-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 py-2 px-4 text-white"
                    >
                      READ MORE {">>"}
                    </button>
                  </div>
                </div>
              ))}
            <div className="flex justify-center space-x-4 pt-10">
              <button
                onClick={handlePreviousSet}
                disabled={startPage === 1}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
              >
                Previous
              </button>
              {Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => startPage + i
              ).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`bg-gray-300 text-gray-700 py-2 px-4 rounded ${
                    pageNumber === currentPage ? "bg-yellow-500 text-white" : ""
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                onClick={handleNextSet}
                disabled={endPage === totalPages}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
              >
                Next
              </button>
            </div>
          </div>
          <div className="col-span-3">
            <div className="grid grid-cols-12 justify-center gap-x-4">
              <div className="col-span-12">
                <p className="text-center w-full border-2 py-4 text-lg font-semibold">
                  Recent Posts
                </p>
              </div>
              <div className="col-span-12 sm:col-span-4 xl:col-span-12">
                {previousFiveBlogs.length > 0 ? (
                  previousFiveBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="blogone flex flex-col items-center justify-center gap-y-2 border-b-2 py-5 sm:border-b-0 xl:border-b-2"
                    >
                      <img src="assets/rings.png" alt="ring circle" />
                      <p className="text-center">ID: {blog.id}</p>
                      <h2 className="text-md text-center font-semibold">
                        {blog.title}
                      </h2>
                      <p className="text-center text-xs text-gray-300">
                        NOVEMBER 21, 2019
                      </p>
                    </div>
                  ))
                ) : (
                  <div>No Recent Posts Available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Blog;
