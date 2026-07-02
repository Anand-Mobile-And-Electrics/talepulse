import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Tag, Users, Bell, ArrowRight } from 'lucide-react';
import { getTrendingPosts } from '../../data/mockData';
import { categories, tags, authors } from '../../data/mockData';
import { AdBanner } from './AdBanner';
import { formatViews } from '../../utils';

export const Sidebar: React.FC = () => {
  const trendingPosts = getTrendingPosts().slice(0, 5);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <aside className="space-y-6">
      {/* Sidebar Ad */}
      <AdBanner placement="sidebar" />

      {/* Trending */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center gap-2 p-4 border-b border-gray-100 dark:border-gray-700">
          <TrendingUp size={18} className="text-[#DC2626]" />
          <h3 className="font-bold text-gray-900 dark:text-white font-['Manrope']">Trending Now</h3>
        </div>
        <div className="p-4 space-y-4">
          {trendingPosts.map((post, i) => (
            <div key={post.id}>
              <div className="flex items-start gap-3 group">
                <span className="text-2xl font-black text-gray-200 dark:text-gray-700 font-['Manrope'] leading-none w-6 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <span className="text-xs font-bold text-[#DC2626] uppercase">{post.category.name}</span>
                  <Link to={`/article/${post.slug}`}>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {post.title}
                    </h4>
                  </Link>
                  <span className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <TrendingUp size={10} />{formatViews(post.views)} views
                  </span>
                </div>
              </div>
              {i < trendingPosts.length - 1 && <hr className="border-gray-100 dark:border-gray-700 mt-4" />}
            </div>
          ))}
        </div>
        <Link to="/trending" className="flex items-center justify-center gap-2 p-3 text-sm text-[#1E3A8A] dark:text-blue-400 font-medium border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          View All Trending <ArrowRight size={14} />
        </Link>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center gap-2 p-4 border-b border-gray-100 dark:border-gray-700">
          <Tag size={18} className="text-[#1E3A8A]" />
          <h3 className="font-bold text-gray-900 dark:text-white font-['Manrope']">Categories</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-2">
            {categories.slice(0, 8).map(cat => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
              >
                <span className="text-lg">{cat.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors">{cat.name}</p>
                  <p className="text-xs text-gray-400">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Widget */}
      <div className="bg-gradient-to-br from-[#1E3A8A] to-blue-700 rounded-xl p-5 text-white">
        <Bell size={20} className="mb-3 text-blue-300" />
        <h3 className="font-bold text-lg font-['Manrope']">Get Daily News</h3>
        <p className="text-blue-200 text-sm mt-1 mb-4">Top stories delivered to your inbox every morning.</p>
        {subscribed ? (
          <div className="bg-white/10 rounded-lg p-3 text-center text-sm">✓ You're subscribed!</div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email..."
              required
              className="w-full px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 text-sm outline-none focus:bg-white/20 transition-colors"
            />
            <button type="submit" className="w-full bg-[#DC2626] hover:bg-red-700 py-2.5 rounded-lg text-sm font-bold transition-colors">
              Subscribe Free
            </button>
          </form>
        )}
      </div>

      {/* Popular Tags */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
        <h3 className="font-bold text-gray-900 dark:text-white mb-3 font-['Manrope'] text-sm uppercase tracking-wider">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Link
              key={tag.id}
              to={`/tag/${tag.slug}`}
              className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-[#1E3A8A] hover:text-white dark:hover:bg-[#1E3A8A] transition-colors"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Authors */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center gap-2 p-4 border-b border-gray-100 dark:border-gray-700">
          <Users size={18} className="text-[#1E3A8A]" />
          <h3 className="font-bold text-gray-900 dark:text-white font-['Manrope']">Our Journalists</h3>
        </div>
        <div className="p-4 space-y-3">
          {authors.slice(0, 4).map(author => (
            <Link key={author.id} to={`/author/${author.slug}`} className="flex items-center gap-3 group">
              <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors truncate">{author.name}</p>
                <p className="text-xs text-gray-400 truncate">{author.role}</p>
              </div>
              <span className="ml-auto text-xs text-gray-400 flex-shrink-0">{author.articlesCount}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Second Ad */}
      <AdBanner placement="sidebar" />
    </aside>
  );
};
