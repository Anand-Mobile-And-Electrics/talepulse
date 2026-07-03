import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Eye, Calendar } from 'lucide-react';

import { ArticleCard } from '../components/ui/ArticleCard';
import Sidebar from '../components/ui/Sidebar';
import { formatDate, formatViews } from '../utils';

export const AuthorPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const author = authors.find(a => a.slug === slug);
  const authorPosts = posts.filter(p => p.author.slug === slug && p.status === 'published');
  const totalViews = authorPosts.reduce((acc, p) => acc + p.views, 0);

  if (!author) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Author Not Found</h1>
      <Link to="/" className="text-[#1E3A8A] dark:text-blue-400 mt-4 inline-block hover:underline">Go Home</Link>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Author Header */}
      <div className="bg-gradient-to-br from-[#1E3A8A] to-blue-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-xs text-blue-300 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/authors" className="hover:text-white transition-colors">Authors</Link>
            <ChevronRight size={12} />
            <span className="text-white">{author.name}</span>
          </nav>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-white/30 shadow-xl"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-[#DC2626] text-white text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                  {author.role}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white font-['Manrope']">{author.name}</h1>
              <p className="text-blue-200 mt-2 max-w-2xl leading-relaxed">{author.bio}</p>
              <div className="flex items-center gap-6 mt-4">
                <div className="text-center">
                  <p className="text-2xl font-black text-white font-['Manrope']">{author.articlesCount}</p>
                  <p className="text-xs text-blue-300 uppercase tracking-wider">Articles</p>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-center">
                  <p className="text-2xl font-black text-white font-['Manrope']">{formatViews(totalViews)}</p>
                  <p className="text-xs text-blue-300 uppercase tracking-wider">Total Views</p>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-center">
                  <p className="text-2xl font-black text-white font-['Manrope']">{new Date(author.joinedAt).getFullYear()}</p>
                  <p className="text-xs text-blue-300 uppercase tracking-wider">Joined</p>
                </div>
              </div>
              {(author.twitter || author.linkedin) && (
                <div className="flex items-center gap-3 mt-4">
                  {author.twitter && (
                    <a href={`https://twitter.com/${author.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-blue-200 hover:text-white transition-colors">
                      𝕏 {author.twitter}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-gray-900 dark:text-white font-['Manrope'] flex items-center gap-2">
                <BookOpen size={20} className="text-[#DC2626]" />
                Articles by {author.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{authorPosts.length} articles</p>
            </div>

            {authorPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {authorPosts.map(post => (
                  <ArticleCard key={post.id} post={post} showExcerpt />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <p className="text-gray-500 dark:text-gray-400">No articles found for this author.</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            {/* Author Stats Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 font-['Manrope']">Author Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2"><BookOpen size={14} />Published</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{authorPosts.length} articles</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2"><Eye size={14} />Total Views</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatViews(totalViews)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2"><Calendar size={14} />Member Since</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatDate(author.joinedAt)}</span>
                </div>
              </div>
            </div>

            <div className="sticky top-20">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
