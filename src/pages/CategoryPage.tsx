import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

import { ArticleCard } from "../components/ui/ArticleCard";
import Sidebar from "../components/ui/Sidebar";
import { supabase } from "@/lib/supabase";
import { Post } from "../types";

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      if (!slug) return;

      setLoading(true);

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("category", slug)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching category posts:", error);
      } else {
        setPosts(data || []);
      }

      setLoading(false);
      window.scrollTo(0, 0);
    };

    fetchCategoryPosts();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p>Loading category...</p>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold mb-2">
          No posts found in this category
        </h1>
        <Link
          to="/"
          className="bg-[#1E3A8A] text-white px-6 py-3 rounded-lg font-semibold"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
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
  );
};

export default CategoryPage;