import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Zap,
  Star,
  ArrowRight,
  Clock,
  Eye,
} from "lucide-react";

import { BreakingNewsTicker } from "../components/ui/BreakingNewsTicker";
import { ArticleCard } from "../components/ui/ArticleCard";
import { Sidebar } from "../components/ui/Sidebar";
import { AdBanner } from "../components/ui/AdBanner";

import { supabase } from "@/lib/supabase";
import { formatRelativeDate, formatViews } from "../utils";

/* ---------------- SECTION HEADER ---------------- */
const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  href?: string;
  icon?: React.ReactNode;
  accent?: string;
}> = ({ title, subtitle, href, icon, accent = "bg-[#DC2626]" }) => (
  <div className="flex items-end justify-between mb-5">
    <div className="flex items-center gap-3">
      <div className={`w-1 h-8 ${accent} rounded-full`} />
      <div>
        <div className="flex items-center gap-2">
          {icon && <span className="text-[#DC2626]">{icon}</span>}
          <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white font-['Manrope']">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </div>

    {href && (
      <Link
        to={href}
        className="flex items-center gap-1.5 text-sm text-[#1E3A8A] font-semibold"
      >
        View All <ArrowRight size={15} />
      </Link>
    )}
  </div>
);

/* ---------------- HOME PAGE ---------------- */
export const Home: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* FETCH POSTS FROM SUPABASE */
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setPosts(data || []);
      } else {
        console.error("Supabase error:", error);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <main>
      {/* Breaking News */}
      <BreakingNewsTicker />

      {/* HERO SECTION */}
      <section className="bg-gray-50 dark:bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* MAIN HERO */}
            <div className="lg:col-span-2">
              {loading ? (
                <div className="h-[300px] bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />
              ) : posts[0] ? (
                <ArticleCard post={posts[0]} variant="hero" />
              ) : (
                <p>No posts found</p>
              )}
            </div>

            {/* SIDE LIST */}
            <div className="flex flex-col gap-4">
              {posts.slice(1, 4).map((post) => (
                <div
                  key={post.id}
                  className="flex gap-3 bg-white dark:bg-gray-800 p-3 rounded-xl"
                >
                  <div className="w-20 h-16 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={post.featuredImage}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-bold line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {formatRelativeDate(post.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AD */}
      <div className="max-w-7xl mx-auto px-4 my-6">
        <AdBanner placement="top-banner" />
      </div>

      {/* LATEST POSTS */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <SectionHeader
          title="Latest News"
          icon={<Zap size={20} />}
          href="/latest"
        />

        {loading ? (
          <p>Loading posts...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {posts.slice(0, 6).map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* TRENDING */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <SectionHeader
          title="Trending"
          icon={<TrendingUp size={20} />}
          accent="bg-[#DC2626]"
        />

        <div className="space-y-4">
          {posts.slice(0, 5).map((post, i) => (
            <div key={post.id} className="flex gap-4">
              <span className="text-3xl font-bold text-gray-300 w-10">
                {i + 1}
              </span>

              <div>
                <h3 className="font-bold">{post.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {post.excerpt}
                </p>

                <div className="text-xs text-gray-400 flex gap-3">
                  <span>
                    <Eye size={10} /> {formatViews(post.views || 0)}
                  </span>
                  <span>
                    <Clock size={10} /> {post.readingTime || 2} min
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SIDEBAR + ADS */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">{/* more sections later */}</div>

        <div>
          <Sidebar />
        </div>
      </div>
    </main>
  );
};