import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { ArticleCard } from "../components/ui/ArticleCard";
import { Post } from "../types";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .or(
            `title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`
          )
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Search error:", error);
        } else {
          setPosts(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }

      setLoading(false);
    };

    fetchResults();
  }, [query]);

  if (!query) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Please enter a search query.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <h1 className="text-3xl font-bold mb-6">
          Search Results for "{query}"
        </h1>

        {loading && (
          <p className="text-gray-500">Searching...</p>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-gray-500">No results found.</p>
        )}

        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchPage;