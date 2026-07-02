import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Eye, Users, MessageSquare, TrendingUp, PlusCircle,
  ArrowUpRight, ArrowDownRight, Clock, Bookmark, Heart, Zap
} from 'lucide-react';
import { posts, authors } from '../../data/mockData';
import { formatViews, formatRelativeDate } from '../../utils';

const StatCard: React.FC<{
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, change, positive, icon, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
        <p className="text-2xl font-black text-gray-900 dark:text-white mt-1 font-['Manrope']">{value}</p>
        <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${positive ? 'text-green-500' : 'text-red-500'}`}>
          {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change} vs last month
        </div>
      </div>
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white`}>
        {icon}
      </div>
    </div>
  </div>
);

export const AdminDashboard: React.FC = () => {
  const publishedPosts = posts.filter(p => p.status === 'published');
  const totalViews = posts.reduce((acc, p) => acc + p.views, 0);
  const totalLikes = posts.reduce((acc, p) => acc + p.likes, 0);
  const totalBookmarks = posts.reduce((acc, p) => acc + p.bookmarks, 0);
  const recentPosts = [...posts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 6);

  const stats = [
    { title: 'Total Articles', value: posts.length.toString(), change: '+12.5%', positive: true, icon: <FileText size={22} />, color: 'bg-[#1E3A8A]' },
    { title: 'Total Views', value: formatViews(totalViews), change: '+18.2%', positive: true, icon: <Eye size={22} />, color: 'bg-[#DC2626]' },
    { title: 'Total Authors', value: authors.length.toString(), change: '+2', positive: true, icon: <Users size={22} />, color: 'bg-green-600' },
    { title: 'Comments', value: '248', change: '+5.1%', positive: true, icon: <MessageSquare size={22} />, color: 'bg-purple-600' },
    { title: 'Total Likes', value: formatViews(totalLikes), change: '+22.3%', positive: true, icon: <Heart size={22} />, color: 'bg-pink-500' },
    { title: 'Bookmarks', value: formatViews(totalBookmarks), change: '+9.8%', positive: true, icon: <Bookmark size={22} />, color: 'bg-amber-500' },
    { title: 'Subscribers', value: '52.4K', change: '+3.2%', positive: true, icon: <Zap size={22} />, color: 'bg-cyan-600' },
    { title: 'Published', value: publishedPosts.length.toString(), change: '+6', positive: true, icon: <TrendingUp size={22} />, color: 'bg-indigo-600' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white font-['Manrope']">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Welcome back, Sarah. Here's what's happening today.</p>
        </div>
        <Link
          to="/admin/create"
          className="flex items-center gap-2 bg-[#1E3A8A] hover:bg-blue-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          <PlusCircle size={16} />
          New Post
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(stat => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-bold text-gray-900 dark:text-white font-['Manrope']">Recent Posts</h2>
            <Link to="/admin/posts" className="text-sm text-[#1E3A8A] dark:text-blue-400 font-medium hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-700">
            {recentPosts.map(post => (
              <div key={post.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <img src={post.featuredImage} alt="" className="w-12 h-10 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{post.title}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                    <span className="text-[#DC2626] font-medium">{post.category.name}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock size={10} />{formatRelativeDate(post.publishedAt)}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    post.status === 'published' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                    post.status === 'draft' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' :
                    'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {post.status}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1 justify-end">
                    <Eye size={10} />{formatViews(post.views)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Link to={`/admin/edit/${post.id}`} className="p-1.5 text-gray-400 hover:text-[#1E3A8A] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors text-xs">Edit</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Top Authors */}
        <div className="space-y-5">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4 font-['Manrope']">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'New Article', href: '/admin/create', color: 'bg-[#1E3A8A] text-white', icon: '✏️' },
                { label: 'New Story', href: '/admin/stories', color: 'bg-purple-600 text-white', icon: '📖' },
                { label: 'Categories', href: '/admin/categories', color: 'bg-green-600 text-white', icon: '🏷️' },
                { label: 'Analytics', href: '/admin/analytics', color: 'bg-amber-500 text-white', icon: '📊' },
                { label: 'Comments', href: '/admin/comments', color: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white', icon: '💬' },
                { label: 'Settings', href: '/admin/settings', color: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white', icon: '⚙️' },
              ].map(action => (
                <Link key={action.label} to={action.href}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg text-center transition-opacity hover:opacity-90 ${action.color}`}>
                  <span className="text-xl">{action.icon}</span>
                  <span className="text-xs font-semibold">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Top Authors */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="font-bold text-gray-900 dark:text-white font-['Manrope'] text-sm">Top Authors</h2>
              <Link to="/admin/authors" className="text-xs text-[#1E3A8A] dark:text-blue-400 font-medium hover:underline">All</Link>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-700">
              {authors.slice(0, 4).map((author, i) => (
                <div key={author.id} className="flex items-center gap-3 p-3">
                  <span className="text-lg font-black text-gray-200 dark:text-gray-700 w-5 text-center font-['Manrope']">{i + 1}</span>
                  <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{author.name}</p>
                    <p className="text-xs text-gray-400">{author.articlesCount} articles</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4 font-['Manrope'] text-sm">Content by Type</h2>
            <div className="space-y-3">
              {[
                { label: 'News', count: posts.filter(p => p.type === 'news').length, color: 'bg-[#DC2626]' },
                { label: 'Articles', count: posts.filter(p => p.type === 'article').length, color: 'bg-[#1E3A8A]' },
                { label: 'Stories', count: posts.filter(p => p.type === 'story').length, color: 'bg-purple-600' },
                { label: 'Opinion', count: posts.filter(p => p.type === 'opinion').length, color: 'bg-amber-500' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{item.count}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.count / posts.length) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
