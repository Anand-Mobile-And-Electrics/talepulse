import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  category: string;
  author: string;
  created_at: string;
}

const AllPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  /* ---------------- FETCH POSTS ---------------- */
  const fetchPosts = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  /* ---------------- DELETE POST ---------------- */
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    setDeletingId(id);

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Delete failed. Check RLS policies.");
    } else {
      setPosts((prev) => prev.filter((post) => post.id !== id));
    }

    setDeletingId(null);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Posts</h1>

          <Link
            to="/admin/create"
            className="bg-[#1E3A8A] hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            + Create Post
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            Loading posts...
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No posts found.
          </div>
        )}

        {/* Table */}
        {!loading && posts.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                  <th className="p-4 text-sm font-semibold">Title</th>
                  <th className="p-4 text-sm font-semibold">Category</th>
                  <th className="p-4 text-sm font-semibold">Author</th>
                  <th className="p-4 text-sm font-semibold">Date</th>
                  <th className="p-4 text-sm font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="p-4 font-medium">
                      {post.title}
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-600">
                        {post.category}
                      </span>
                    </td>

                    <td className="p-4">{post.author}</td>

                    <td className="p-4">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-4">
                        <Link
                          to={`/admin/edit/${post.id}`}
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={deletingId === post.id}
                          className="text-red-600 dark:text-red-400 hover:underline disabled:opacity-50"
                        >
                          {deletingId === post.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPosts;