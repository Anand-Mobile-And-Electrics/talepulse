import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ChevronRight, Trash2 } from 'lucide-react';
import { useBookmarks } from '../hooks/useBookmarks';
import { ArticleCard } from '../components/ui/ArticleCard';

export const BookmarksPage: React.FC = () => {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const bookmarkedPosts = posts.filter(p => bookmarks.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-[#1E3A8A] dark:hover:text-blue-400">Home</Link>
        <ChevronRight size={12} />
        <span>Bookmarks</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Bookmark size={24} className="text-[#1E3A8A]" />
          <h1 className="text-3xl font-black text-gray-900 dark:text-white font-['Manrope']">
            My Bookmarks
          </h1>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {bookmarkedPosts.length} saved {bookmarkedPosts.length === 1 ? 'article' : 'articles'}
        </span>
      </div>

      {bookmarkedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {bookmarkedPosts.map(post => (
            <div key={post.id} className="relative group">
              <ArticleCard post={post} showExcerpt />
              <button
                onClick={() => toggleBookmark(post.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-700 text-red-500 p-2 rounded-full shadow-lg z-10"
                title="Remove bookmark"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-2xl">
          <Bookmark size={60} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No bookmarks yet</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Start saving articles by clicking the bookmark icon on any article.</p>
          <Link to="/" className="bg-[#1E3A8A] hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Browse Articles
          </Link>
        </div>
      )}
    </div>
  );
};
