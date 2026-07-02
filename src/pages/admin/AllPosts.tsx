import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit2, Trash2, Search, PlusCircle } from 'lucide-react';
import { formatRelativeDate, formatViews } from '../../utils';

export const AllPosts: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filtered = posts.filter(p => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || p.category.slug === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white font-['Manrope']">All Posts</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{posts.length} total posts</p>
        </div>
        <Link to="/admin/create" className="flex items-center gap-2 bg-[#1E3A8A] hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          <PlusCircle size={16} /> New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:border-[#1E3A8A]" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm outline-none focus:border-[#1E3A8A]">
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
        </select>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
          className="px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm outline-none focus:border-[#1E3A8A]">
          <option value="all">All Categories</option>
          {[...new Set(posts.map(p => p.category.slug))].map(slug => (
            <option key={slug} value={slug}>{slug}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Post</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Category</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Author</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Views</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Date</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {filtered.map(post => (
                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={post.featuredImage} alt="" className="w-10 h-8 rounded object-cover flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1 max-w-xs">{post.title}</p>
                        <p className="text-xs text-gray-400">{post.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: post.category.color + '20', color: post.category.color }}>
                      {post.category.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img src={post.author.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">{post.author.name.split(' ')[0]}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      post.status === 'published' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                      post.status === 'draft' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' :
                      'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><Eye size={12} />{formatViews(post.views)}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{formatRelativeDate(post.publishedAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link to={`/article/${post.slug}`} target="_blank" className="p-1.5 text-gray-400 hover:text-[#1E3A8A] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors">
                        <Eye size={14} />
                      </Link>
                      <Link to={`/admin/edit/${post.id}`} className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded transition-colors">
                        <Edit2 size={14} />
                      </Link>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>No posts found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
