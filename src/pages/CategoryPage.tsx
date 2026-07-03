import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

import { ArticleCard } from "../components/ui/ArticleCard";
import Sidebar from "../components/ui/Sidebar";
import { supabase } from "@/lib/supabase";
import { Post } from "../types";

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      if (!slug) return;

      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .ilike("category", slug) // ✅ Case-insensitive match
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching category posts:", error);
        } else {
          setPosts(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }

      setLoading(false);
      window.scrollTo(0, 0);
    };

    fetchCategoryPosts();
  }, [slug]);

  /* ---------------- LOADING STATE ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
        Loading category...
      </div>
    );
  }

  /* ---------------- EMPTY STATE ---------------- */
  if (!posts.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-4">
        <AlertCircle size={48} className="text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          No posts found in this category
        </h1>
        <Link
          to="/"
          className="bg-[#1E3A8A] hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Go Home
        </Link>
      </div>
    );
  }

  /* ---------------- PAGE ---------------- */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <h1 className="text-3xl font-black mb-8 capitalize">
          {slug} News
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* POSTS */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>

          {/* SIDEBAR */}
          <aside>
            <div className="sticky top-20">
              <Sidebar />
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default CategoryPage;