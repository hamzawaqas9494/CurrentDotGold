// pages/admin/update-blog.tsx
import React from "react";
import MainLayout from "@/app/admin/components/Admin/MainLayout";
import UpdateBlogForm from "@/app//admin/components/Admin/UpdateBlogForm";

const UpdateBlogPage: React.FC = () => {
  return (
    <MainLayout>
      <UpdateBlogForm />
    </MainLayout>
  );
};

export default UpdateBlogPage;
