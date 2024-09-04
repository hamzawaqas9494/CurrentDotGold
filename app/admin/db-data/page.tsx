"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import MainLayout from "@/app/admin/components/Admin/MainLayout";
import { Card, CardHeader } from "@/app/ui/Card";

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  video: string;
  image_name: string;
  video_name: string;
  visibility: number;
  published: number;
  createdAt: string;
  postedtime: string;
}

const Page: React.FC = () => {
  const [allblogs, setAllblogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // const id = searchParams.get("id");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("../api/blog-table/get-all-db-blog");
        if (!response.ok) {
          throw new Error("Error fetching all blogs from database.");
        }
        const data = await response.json();
        console.log(data, "data");
        setAllblogs(data.allBlogs);
      } catch (error) {
        setError("Error fetching blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  const handleDelete = async (id: number) => {
    if (confirm("Do you want to delete this blog?")) {
      try {
        const response = await fetch(`../api/blog-table/delete-blog?id=${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setAllblogs(allblogs.filter((blog) => blog.id !== id));
        } else {
          setError("Error deleting blog.");
        }
      } catch (error) {
        setError("Error deleting blog.");
      }
    }
  };

  const handleUpdate = (id: number) => {
    router.push(`/admin/update-blog-form?id=${id}`);
    // router.push(`/admin/add-blog?id=${id}`);
  };
  if (loading) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    );
  }
  if (error) {
    return (
      <MainLayout>
        <p>{error}</p>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="m-4">
        <Card className="my-4">
          <CardHeader>DB-data</CardHeader>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Image_Name</th>
                <th>Video_Name</th>
                <th>Visibility</th>
                <th>Publish</th>
                <th>Time</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {allblogs?.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.id}</td>
                  <td>{blog.title}</td>
                  <td>{blog.content}</td>
                  <td>{blog.image_name}</td>
                  <td>{blog.video_name}</td>
                  <td>{blog.visibility}</td>
                  <td>{blog.published}</td>
                  <td>{blog.postedtime}</td>
                  <td>
                    <button onClick={() => handleDelete(blog.id)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleUpdate(blog.id)}>
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Page;
