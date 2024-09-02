"use client";
import React, { FC, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Navebar, Footer } from "../../ui";
import {
  EllipsisHorizontalIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface SingleBlog {
  id: number;
  title: string;
  content: string;
  image: string;
  video: string;
  Visibility: number;
  Published: number;
  postedtime: string;
}

interface Comment {
  id: number;
  commenter_name: string;
  comment_content: string;
  comment_date: string;
  comment_token: string;
}

const Read: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isupdateEditing, setIsupdateEditing] = useState<boolean>(false);
  const [singleBlog, setSingleBlog] = useState<SingleBlog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>("");
  const [commentatorName, setCommentatorName] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const [showButtonsForCommentId, setShowButtonsForCommentId] = useState<
    number | null
  >(null);
  isupdateEditing;
  const [commentupdate, setCommentupdate] = useState<string>("");
  const [selectedCommentIdupdate, setSelectedCommentIdupdate] = useState<
    number | null
  >(null);
  const [selectedCommentTokenupdate, setSelectedCommentTokenupdate] =
    useState<string>("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const inputRef = useRef<HTMLInputElement>(null);
  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleString("en-US", {
    hour12: true, // Use 12-hour format
    year: "numeric",
    month: "long", // Full month name in English
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  ////////////////////////////////////////////////////////fetchBlogData//////////////////////////////////
  useEffect(() => {
    const fetchBlogData = async () => {
      if (!id) {
        setError("No blog ID provided.");
        setLoading(false);
        return;
      }

      try {
        const blogResponse = await fetch(`/api/single?id=${id}`);
        if (!blogResponse.ok) {
          throw new Error("Failed to fetch blog data.");
        }
        const blogData = await blogResponse.json();
        console.log(blogData, "blogData hamza");
        setSingleBlog(blogData.specificBlogResult[0]);
      } catch (error: any) {
        setError("Error fetching blog data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);
  ////////////////////////////////////////////////////////fetchCommentsData//////////////////////////////////
  const fetchCommentsData = async () => {
    if (!id) {
      setError("No blog ID provided.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const commentsResponse = await fetch(
        `/api/blog-comment-section/get-blog-comment?post_id=${id}`
      );
      if (!commentsResponse.ok) {
        throw new Error("Failed to fetch comments data.");
      }
      const commentsData = await commentsResponse.json();
      setComments(commentsData.comments);
    } catch (error: any) {
      setError("Error fetching comments data.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCommentsData();
  }, [id]);
  ////////////////////////////////////////////////////////handleAddComment//////////////////////////////////
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentatorName.trim() || !comment.trim()) {
      setModalMessage("Please fill in both fields.");
      setShowModal(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("commenter_name", commentatorName);
      formData.append("comment_content", comment);
      formData.append("comment_date", formattedDate);
      formData.append("post_id", id || "");

      const response = await fetch(
        "/api/blog-comment-section/sent-blog-comment",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to add comment.");

      // Clear the form fields and reset UI state
      setComment("");
      setCommentatorName("");
      setShowButtons(false);
      setModalMessage("Your comment has been added successfully!");
      setShowModal(true);

      // Re-fetch comments after adding the new one
      fetchCommentsData();
    } catch (error: any) {
      setModalMessage("Error adding comment.");
      setShowModal(true);
    }
  };
  ////////////////////////////////////////////////////////handleEditComment//////////////////////////////////

  const handleEditComment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedCommentIdupdate === null || !commentupdate.trim()) {
      setModalMessage("Please select a comment and enter new content.");
      setShowModal(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("comment_content", commentupdate);
      formData.append("comment_date", formattedDate);
      formData.append("id", selectedCommentIdupdate.toString());
      formData.append("comment_token", selectedCommentTokenupdate);

      const response = await fetch(
        "/api/blog-comment-section/update-blog-comment",
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to update comment.");

      const data = await response.json();

      setComments((prevComments) =>
        prevComments.map((c) =>
          c.id === selectedCommentIdupdate
            ? { ...c, comment_content: commentupdate }
            : c
        )
      );
      // Re-fetch comments after adding the new one
      fetchCommentsData();
      setIsupdateEditing(false);
      setModalMessage("Comment updated successfully!");
      setShowModal(true);
    } catch (error: any) {
      setModalMessage("Error updating comment.");
      setShowModal(true);
    }
  };

  ////////////////////////////////////////////////////////handleDeleteComment//////////////////////////////////
  const handleDeleteComment = async (
    commentId: number,
    commentToken: string
  ) => {
    try {
      const response = await fetch(
        "/api/blog-comment-section/delete-blog-comment",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: commentId,
            commentToken: commentToken,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to delete comment.");

      const data = await response.json();
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
      setModalMessage("Comment deleted successfully!");
      setShowModal(true);
    } catch (error: any) {
      setModalMessage("Error deleting comment.");
      setShowModal(true);
    }
  };

  ////////////////////////////////////////////////////////some general function//////////////////////////////////
  const handleToggleButtons = (id: number) => {
    setShowButtonsForCommentId((prevId) => (prevId === id ? null : id));
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFocus = () => {
    setShowButtons(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleAddComment(e);
  };
  const handleupdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleEditComment(e);
  };
  const handleEditClick = (id: number, token: string, content: string) => {
    setSelectedCommentIdupdate(id);
    setSelectedCommentTokenupdate(token);
    setCommentupdate(content);

    setIsupdateEditing(true);
  };
  const handleCancel = () => {
    setCommentatorName("");
    setComment("");
    setShowButtons(false);
  };
  const handleUpdateCancel = () => {
    setIsupdateEditing(false);
  };

  return (
    <React.Fragment>
      <Navebar className="bg-black text-white" />
      <div className="relative bg-no-repeat bg-cover h-[calc(100vh-15vh)] bg-[url('/assets/blog-bgimage.png')]">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-bold text-white text-2xl">Loading...</p>
          </div>
        ) : singleBlog ? (
          <div className="w-full absolute m-0 -translate-x-1/2 left-1/2 top-2/4">
            <div className="container">
              <div className="relative text-white text-center">
                <div className="absolute w-full h-full bg-black opacity-[.40] -z-10"></div>
                <span className="opacity-[70] text-lg pt-5 pb-2 block">
                  {singleBlog.postedtime}
                </span>
                <h2 className="text-2xl md:text-5xl pb-10 font-semibold leading-[30px] md:leading-[60px]">
                  {singleBlog.title}
                </h2>
              </div>
              <div className="content bg-white p-20">
                <p>{singleBlog.content}</p>
                {singleBlog.image && (
                  <img
                    className="mt-10"
                    src={`data:image/jpeg;base64,${singleBlog.image}`}
                    alt="blog image"
                  />
                )}
                <form className="mt-10" onSubmit={handleSubmit}>
                  <div className="relative">
                    <input
                      id="commentatorName"
                      type="text"
                      ref={inputRef}
                      value={commentatorName}
                      onChange={(e) => setCommentatorName(e.target.value)}
                      onFocus={handleFocus}
                      placeholder="Commentator Name"
                      autoComplete="off"
                      className="peer h-full w-full border-b-2 border-gray-200 bg-transparent p-2 text-lg font-normal transition-all duration-500 ease-in-out placeholder-shown:border-gray-200 placeholder:opacity-0 focus:placeholder:opacity-100"
                    />
                    <label
                      className="after:content[''] pointer-events-none absolute left-2 -top-3 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal text-gray-500 transition-all
    after:absolute after:-bottom-3 after:-left-2 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-yellow-500 after:duration-500 after:ease-in-out after:transition-transform
    peer-placeholder-shown:text-lg peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:after:scale-x-100 peer-focus:after:border-gray-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500"
                    >
                      Commentator Name
                    </label>
                  </div>

                  <div className="relative mt-10">
                    <input
                      id="comment"
                      type="text"
                      ref={inputRef}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      onFocus={handleFocus}
                      placeholder="Leave Comment"
                      autoComplete="off"
                      className="peer h-full w-full border-b-2 border-gray-200 bg-transparent p-2 text-lg font-normal transition-all duration-500 ease-in-out placeholder-shown:border-gray-200 placeholder:opacity-0 focus:placeholder:opacity-100 "
                    />
                    <label
                      className="after:content[''] pointer-events-none absolute left-2 -top-3 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal text-gray-500 transition-all
    after:absolute after:-bottom-3 after:-left-2 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-yellow-500 after:duration-500 after:ease-in-out after:transition-transform
    peer-placeholder-shown:text-lg peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:after:scale-x-100 peer-focus:after:border-gray-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500"
                    >
                      Leave Comment
                    </label>
                  </div>

                  {showButtons && (
                    <div className="flex justify-center space-x-4 mt-10">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        Add Comment
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-500 text-white p-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
                <div className="mt-10">
                  {comments.length > 0 ? (
                    <h3 className="text-xl font-bold">
                      <span className="pr-2">{comments.length}</span>Comments:
                    </h3>
                  ) : (
                    <h3 className="text-lg font-semibold">No comments.</h3>
                  )}
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="relative flex items-baseline mt-5"
                    >
                      <div className="w-full flex py-3">
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
                          {comment.commenter_name
                            .split(" ")
                            .map((name) => name.charAt(0).toUpperCase())
                            .join("")}
                        </div>
                        <div className="w-full ml-5">
                          <p className="text-lg font-semibold">
                            {comment.commenter_name}
                            <span className="text-gray-500 text-xs ml-2">
                              {comment.comment_date}
                            </span>
                          </p>

                          {isupdateEditing &&
                          selectedCommentIdupdate === comment.id ? (
                            <form className="" onSubmit={handleupdateSubmit}>
                              <div className="relative mt-3">
                                <input
                                  id="comment1"
                                  type="text"
                                  ref={inputRef}
                                  value={commentupdate}
                                  onChange={(e) =>
                                    setCommentupdate(e.target.value)
                                  }
                                  placeholder="update comment"
                                  autoComplete="off"
                                  className="peer h-full w-full border-b-2 border-gray-200 bg-transparent p-2 text-lg font-normal transition-all duration-500 ease-in-out placeholder-shown:border-gray-200 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  className="after:content[''] pointer-events-none absolute left-2 -top-3 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal text-gray-500 transition-all
              after:absolute after:-bottom-3 after:-left-2 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-yellow-500 after:duration-500 after:ease-in-out after:transition-transform
              peer-placeholder-shown:text-lg peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:after:scale-x-100 peer-focus:after:border-gray-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500"
                                >
                                  update comment
                                </label>
                              </div>

                              <div className="flex justify-center space-x-4 mt-10">
                                <button
                                  type="submit"
                                  className="bg-blue-500 text-white p-2 rounded"
                                >
                                  Update
                                </button>
                                <button
                                  type="button"
                                  onClick={handleUpdateCancel}
                                  className="bg-gray-500 text-white p-2 rounded"
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          ) : (
                            <p>{comment.comment_content}</p>
                          )}
                        </div>
                      </div>

                      <div
                        onClick={() => handleToggleButtons(comment.id)}
                        className="relative flex items-center justify-center cursor-pointer"
                      >
                        <EllipsisHorizontalIcon className="h-6 w-6 text-gray-500 transform rotate-90" />
                        {showButtonsForCommentId === comment.id && (
                          <div className="py-3 flex flex-col absolute right-0 z-20 top-full bg-white rounded-lg shadow-2xl">
                            <button
                              className="hover:bg-gray-200 text-black px-5 py-2 flex items-center space-x-3"
                              onClick={() =>
                                handleDeleteComment(
                                  comment.id,
                                  comment.comment_token
                                )
                              }
                            >
                              <TrashIcon className="h-5 w-5" />
                              <span>Delete</span>
                            </button>
                            <button
                              className="hover:bg-gray-200 text-black px-5 py-2 flex items-center space-x-3"
                              onClick={() =>
                                handleEditClick(
                                  comment.id,
                                  comment.comment_token,
                                  comment.comment_content
                                )
                              }
                            >
                              <PencilSquareIcon className="h-5 w-5" />
                              <span>Edit</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full text-white">
            <p className="text-bold text-white text-2xl">Loading...</p>
          </div>
        )}
      </div>
      {/* <Footer /> */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded flex flex-col items-center justify-center">
            <p>{modalMessage}</p>
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 text-white p-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Read;
