import {
  AlertCircle,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  Clock,
  Eye,
  Heart,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { AdBanner } from "../components/ui/AdBanner";
import { ArticleCard } from "../components/ui/ArticleCard";
import Sidebar from "../components/ui/Sidebar";

import { supabase } from "@/lib/supabase";
import { useBookmarks } from "../hooks/useBookmarks";
import { Post } from "../types";
import { formatDate, formatViews } from "../utils";

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  /* ---------------- FETCH ARTICLE ---------------- */
  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      setLoading(true);

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching article:", error);
        setPost(null);
      } else {
        setPost(data);
        setLikeCount(data.likes || 0);

        /* Fetch Related Posts (same category) */
        const { data: relatedData } = await supabase
          .from("posts")
          .select("*")
          .eq("category", data.category)
          .neq("id", data.id)
          .limit(4);

        setRelated(relatedData || []);
      }

      setLoading(false);
      window.scrollTo(0, 0);
    };

    fetchPost();
  }, [slug]);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Loading article...</p>
      </div>
    );
  }

  /* ---------------- NOT FOUND ---------------- */
  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Article Not Found
        </h1>
        <button
          onClick={() => navigate("/")}
          className="bg-[#1E3A8A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
        >
          Go Home
        </button>
      </div>
    );
  }

  const bookmarked = isBookmarked(post.id);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((c) => c - 1);
    } else {
      setLiked(true);
      setLikeCount((c) => c + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link to="/">Home</Link>
        <ChevronRight size={12} />
        <span>{post.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ARTICLE CONTENT */}
        <article className="lg:col-span-2">
          <h1 className="text-3xl md:text-4xl font-black mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span>{formatDate(post.created_at)}</span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {post.readingTime || 3} min read
            </span>
            <span className="flex items-center gap-1">
              <Eye size={14} /> {formatViews(post.views || 0)}
            </span>
          </div>

          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl mb-6"
            />
          )}

          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Ad */}
          <div className="my-8">
            <AdBanner placement="in-article" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                liked ? "bg-red-600 text-white" : "bg-gray-100 dark:bg-gray-700"
              }`}
            >
              <Heart size={16} fill={liked ? "currentColor" : "none"} />
              {formatViews(likeCount)} Likes
            </button>

            <button
              onClick={() => toggleBookmark(post.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              {bookmarked ? (
                <BookmarkCheck size={16} />
              ) : (
                <Bookmark size={16} />
              )}
              {bookmarked ? "Saved" : "Save"}
            </button>
          </div>
        </article>

        {/* SIDEBAR */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </aside>
      </div>

      {/* RELATED POSTS */}
      {related.length > 0 && (
        <section className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((rel) => (
              <ArticleCard key={rel.id} post={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ArticlePage;
