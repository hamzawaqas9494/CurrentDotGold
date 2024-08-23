import React from "react";
import type { NextPage, Metadata } from "next";
import AddBlogs from "./AddBlogs";

export const metadata: Metadata = {
  title: "Add new blog - Gold Rate Pakistan",
};

const AddBlog: NextPage = () => {
  return <AddBlogs />;
};

export default AddBlog;
