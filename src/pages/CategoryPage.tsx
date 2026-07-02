import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, Grid3X3, List } from 'lucide-react';

import { ArticleCard } from '../components/ui/ArticleCard';
import { Sidebar } from '../components/ui/Sidebar';
import { AdBanner } from '../components/ui/AdBanner';

const POSTS_PER_PAGE = 9;

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const category = categories.find(c => c.slug === slug);
  const categoryPosts = slug ? getPostsByCategory(slug) : posts.filter(p => p.status === 'published');

  const totalPages = Math.ceil(categoryPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = categoryPosts.slice(0, page * POSTS_PER_PAGE);

  if (!category && slug) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Category Not Found</h1>
        <Link to="/" className="text-[#1E3A8A] dark:text-blue-400 mt-4 inline-block hover:underline">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Category Header */}
      {category && (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
              <Link to="/" className="hover:text-[#1E3A8A] dark:hover:text-blue-400 transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-gray-900 dark:text-white font-medium">{category.name}</span>
            </nav>
            <div className="flex items-center gap-4">
              <span className="text-5xl">{category.icon}</span>
              <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white font-['Manrope']">{category.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{category.description}</p>
                <p className="text-sm text-[#DC2626] font-semibold mt-2">{category.count} Articles</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Top Ad */}
            <AdBanner placement="top-banner" className="mb-6" />

            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{paginatedPosts.length}</span> of{' '}
                <span className="font-semibold text-gray-900 dark:text-white">{categoryPosts.length}</span> articles
              </p>
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-gray-400" />
                <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-[#1E3A8A] text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-[#1E3A8A] text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {paginatedPosts.map(post => (
                  <ArticleCard key={post.id} post={post} showExcerpt />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedPosts.map(post => (
                  <ArticleCard key={post.id} post={post} variant="horizontal" />
                ))}
              </div>
            )}

            {/* Load More */}
            {page < totalPages && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="bg-[#1E3A8A] hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Load More Articles
                </button>
              </div>
            )}

            {/* Feed Ad */}
            <AdBanner placement="feed" className="mt-8" />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
