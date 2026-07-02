import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Eye } from 'lucide-react';
import { authors, posts } from '../data/mockData';
import { formatViews } from '../utils';

export const AuthorsListPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-[#1E3A8A] dark:hover:text-blue-400">Home</Link>
        <ChevronRight size={12} />
        <span>Our Journalists</span>
      </nav>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white font-['Manrope']">Our Journalists</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
          World-class reporters and editors covering every story that matters, from every corner of the globe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map(author => {
          const authorPosts = posts.filter(p => p.author.id === author.id && p.status === 'published');
          const totalViews = authorPosts.reduce((acc, p) => acc + p.views, 0);

          return (
            <Link key={author.id} to={`/author/${author.slug}`} className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all hover:border-[#1E3A8A]/30">
                {/* Header banner */}
                <div className="h-24 bg-gradient-to-r from-[#1E3A8A] to-blue-700 relative">
                  <div className="absolute -bottom-8 left-6">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                    />
                  </div>
                </div>

                <div className="pt-10 pb-6 px-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors font-['Manrope']">
                      {author.name}
                    </h3>
                    <p className="text-xs text-[#DC2626] font-semibold uppercase tracking-wider">{author.role}</p>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 line-clamp-2 leading-relaxed">
                    {author.bio}
                  </p>

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <BookOpen size={13} className="text-[#1E3A8A]" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{authorPosts.length}</span> articles
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <Eye size={13} className="text-[#DC2626]" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{formatViews(totalViews)}</span> views
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
