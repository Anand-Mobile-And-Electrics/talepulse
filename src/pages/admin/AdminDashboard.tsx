import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  category: string;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
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

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-500 dark:text-gray-400">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5 transition">
          <h2 className="text-gray-500 dark:text-gray-400 text-sm">
            Total Posts
          </h2>
          <p className="text-3xl font-bold">{posts.length}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5 transition">
          <h2 className="text-gray-500 dark:text-gray-400 text-sm">
            Categories
          </h2>
          <p className="text-3xl font-bold">
            {new Set(posts.map((p) => p.category)).size}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5 transition">
          <h2 className="text-gray-500 dark:text-gray-400 text-sm">
            Latest Post
          </h2>
          <p className="text-sm font-semibold">
            {posts[0]?.title || "No posts yet"}
          </p>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5 transition">
        <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>

        {posts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No posts found.
          </p>
        ) : (
          <ul className="space-y-3">
            {posts.slice(0, 5).map((post) => (
              <li
                key={post.id}
                className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2"
              >
                <span>{post.title}</span>
                <Link
                  to={`/admin/edit/${post.id}`}
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;