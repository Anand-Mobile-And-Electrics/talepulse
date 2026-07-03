import { ChevronRight, Eye, Flame, TrendingUp } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

import { ArticleCard } from "../components/ui/ArticleCard";
import Sidebar from "../components/ui/Sidebar";
import { formatRelativeDate, formatViews } from "../utils";

export const TrendingPage: React.FC = () => {
  const trending = getTrendingPosts();
  const breaking = getBreakingPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-[#1E3A8A] dark:hover:text-blue-400">
          Home
        </Link>
        <ChevronRight size={12} />
        <span>Trending</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Breaking */}
          {breaking.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-8 bg-[#DC2626] rounded-full" />
                <Flame size={20} className="text-[#DC2626]" />
                <h2 className="text-2xl font-black text-gray-900 dark:text-white font-['Manrope']">
                  Breaking News
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {breaking.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* Trending List */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-8 bg-[#1E3A8A] rounded-full" />
              <TrendingUp size={20} className="text-[#1E3A8A]" />
              <h2 className="text-2xl font-black text-gray-900 dark:text-white font-['Manrope']">
                Trending Stories
              </h2>
            </div>

            <div className="space-y-0">
              {trending.map((post, i) => (
                <div key={post.id}>
                  <div className="flex gap-5 py-5 group">
                    <div className="flex-shrink-0 w-12 text-center">
                      <span className="text-4xl font-black text-gray-100 dark:text-gray-800 font-['Manrope'] leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold text-[#DC2626] uppercase">
                          {post.category.name}
                        </span>
                        {post.isBreaking && (
                          <span className="bg-[#DC2626] text-white text-xs font-bold px-1.5 py-0.5 rounded animate-pulse">
                            BREAKING
                          </span>
                        )}
                        <div className="flex items-center gap-1 text-xs text-[#DC2626] bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">
                          <Flame size={10} /> HOT
                        </div>
                      </div>
                      <Link to={`/article/${post.slug}`}>
                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors font-['Manrope'] text-lg leading-snug">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        <img
                          src={post.author.avatar}
                          alt=""
                          className="w-5 h-5 rounded-full"
                        />
                        <span>{post.author.name}</span>
                        <span>·</span>
                        <span>{formatRelativeDate(post.publishedAt)}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Eye size={10} />
                          {formatViews(post.views)} views
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/article/${post.slug}`}
                      className="flex-shrink-0 hidden sm:block"
                    >
                      <img
                        src={post.image}
                        alt=""
                        className="w-28 h-20 object-cover rounded-lg"
                      />
                    </Link>
                  </div>
                  {i < trending.length - 1 && (
                    <hr className="border-gray-100 dark:border-gray-800" />
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};
