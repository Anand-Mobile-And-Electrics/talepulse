import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, Heart, Bookmark, BookmarkCheck } from 'lucide-react';
import { Post } from '../../types';
import { formatRelativeDate, formatViews } from '../../utils';
import { useBookmarks } from '../../hooks/useBookmarks';

interface ArticleCardProps {
  post: Post;
  variant?: 'default' | 'horizontal' | 'compact' | 'hero' | 'featured';
  className?: string;
  showExcerpt?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  post,
  variant = 'default',
  className = '',
  showExcerpt = false,
}) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(post.id);

  if (variant === 'hero') {
    return (
      <article className={`relative rounded-2xl overflow-hidden group cursor-pointer ${className}`}>
        <Link to={`/article/${post.slug}`}>
          <div className="relative h-[480px] md:h-[560px]">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              {post.isBreaking && (
                <span className="bg-[#DC2626] text-white text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider animate-pulse">
                  Breaking
                </span>
              )}
              <span className="text-xs font-semibold text-white bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded uppercase tracking-wider">
                {post.category.name}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3 font-['Manrope']">
              {post.title}
            </h2>
            <p className="text-gray-200 text-sm md:text-base line-clamp-2 mb-4 max-w-3xl">{post.excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 rounded-full border-2 border-white/30" />
                <span>{post.author.name}</span>
              </div>
              <span>·</span>
              <span>{formatRelativeDate(post.publishedAt)}</span>
              <span>·</span>
              <span>{post.readingTime} min read</span>
              <span className="flex items-center gap-1"><Eye size={12} />{formatViews(post.views)}</span>
            </div>
          </div>
        </Link>
        <button
          onClick={(e) => { e.preventDefault(); toggleBookmark(post.id); }}
          className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
        >
          {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className={`flex gap-4 group ${className}`}>
        <Link to={`/article/${post.slug}`} className="flex-shrink-0">
          <div className="w-28 h-20 sm:w-36 sm:h-24 rounded-lg overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold text-[#DC2626] uppercase tracking-wider">{post.category.name}</span>
          <Link to={`/article/${post.slug}`}>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mt-0.5 group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors leading-snug">
              {post.title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            <span>{formatRelativeDate(post.publishedAt)}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={10} />{post.readingTime}m</span>
            <span className="flex items-center gap-1"><Eye size={10} />{formatViews(post.views)}</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className={`group ${className}`}>
        <Link to={`/article/${post.slug}`} className="flex items-start gap-3">
          <span className="text-3xl font-black text-gray-200 dark:text-gray-700 font-['Manrope'] leading-none mt-0.5 w-7 flex-shrink-0">
            {String(parseInt(className?.match(/\d+/)?.[0] || '1')).padStart(2, '0')}
          </span>
          <div>
            <span className="text-xs font-bold text-[#DC2626] uppercase tracking-wider">{post.category.name}</span>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors leading-snug">
              {post.title}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 block">{formatRelativeDate(post.publishedAt)}</span>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'featured') {
    return (
      <article className={`relative rounded-xl overflow-hidden group ${className}`}>
        <Link to={`/article/${post.slug}`}>
          <div className="relative h-64">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
            <div className="absolute top-3 left-3 flex gap-2">
              {post.isBreaking && (
                <span className="bg-[#DC2626] text-white text-xs font-bold px-2 py-0.5 rounded">BREAKING</span>
              )}
              <span className="bg-[#1E3A8A] text-white text-xs font-bold px-2 py-0.5 rounded">{post.category.name}</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-base font-bold text-white line-clamp-2 font-['Manrope'] leading-tight">{post.title}</h3>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-300">
              <span>{formatRelativeDate(post.publishedAt)}</span>
              <span className="flex items-center gap-1"><Eye size={10} />{formatViews(post.views)}</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Default card
  return (
    <article className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group ${className}`}>
      <Link to={`/article/${post.slug}`}>
        <div className="relative overflow-hidden h-48">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {post.isBreaking && (
              <span className="bg-[#DC2626] text-white text-xs font-bold px-2 py-0.5 rounded animate-pulse">BREAKING</span>
            )}
            <span
              className="text-white text-xs font-bold px-2 py-0.5 rounded"
              style={{ backgroundColor: post.category.color }}
            >
              {post.category.name}
            </span>
          </div>
          {post.type === 'story' && (
            <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded">STORY</div>
          )}
          {post.type === 'opinion' && (
            <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded">OPINION</div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/article/${post.slug}`}>
          <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors leading-tight font-['Manrope'] text-base">
            {post.title}
          </h3>
        </Link>

        {showExcerpt && (
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-2">{post.excerpt}</p>
        )}

        <div className="flex items-center gap-2 mt-3">
          <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover" />
          <Link to={`/author/${post.author.slug}`} className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#1E3A8A] dark:hover:text-blue-400 transition-colors font-medium">
            {post.author.name}
          </Link>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <span className="text-xs text-gray-400">{formatRelativeDate(post.publishedAt)}</span>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Clock size={12} />{post.readingTime} min</span>
            <span className="flex items-center gap-1"><Eye size={12} />{formatViews(post.views)}</span>
            <span className="flex items-center gap-1"><Heart size={12} />{formatViews(post.likes)}</span>
          </div>
          <button
            onClick={() => toggleBookmark(post.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              bookmarked
                ? 'text-[#1E3A8A] bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-400 hover:text-[#1E3A8A] hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {bookmarked ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
          </button>
        </div>
      </div>
    </article>
  );
};
