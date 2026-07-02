import React from 'react';
import { Eye, TrendingUp, Users, ArrowUpRight, BarChart2 } from 'lucide-react';
import { formatViews } from '../../utils';

export const Analytics: React.FC = () => {
  const totalViews = posts.reduce((acc, p) => acc + p.views, 0);
  const topPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 8);

  const monthlyData = [
    { month: 'Jun', views: 820000 },
    { month: 'Jul', views: 940000 },
    { month: 'Aug', views: 880000 },
    { month: 'Sep', views: 1020000 },
    { month: 'Oct', views: 1150000 },
    { month: 'Nov', views: 1380000 },
  ];
  const maxViews = Math.max(...monthlyData.map(d => d.views));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white font-['Manrope']">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Performance overview for TalePulse</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Views', value: formatViews(totalViews), change: '+18.2%', icon: Eye, color: 'bg-blue-500' },
          { label: 'Monthly Users', value: '10.4M', change: '+12.5%', icon: Users, color: 'bg-green-500' },
          { label: 'Avg. Session', value: '4m 32s', change: '+8.1%', icon: TrendingUp, color: 'bg-purple-500' },
          { label: 'Bounce Rate', value: '32.4%', change: '-3.2%', icon: BarChart2, color: 'bg-amber-500' },
        ].map(({ label, value, change, icon: Icon, color }) => (
          <div key={label} className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
                <Icon size={18} className="text-white" />
              </div>
              <div className="flex items-center gap-1 text-xs text-green-500 font-medium">
                <ArrowUpRight size={12} /> {change}
              </div>
            </div>
            <p className="text-2xl font-black text-gray-900 dark:text-white font-['Manrope']">{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white mb-5 font-['Manrope']">Monthly Views</h3>
          <div className="flex items-end gap-2 h-40">
            {monthlyData.map(({ month, views }) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">{formatViews(views)}</span>
                <div className="w-full rounded-t-lg bg-[#1E3A8A] transition-all hover:bg-[#DC2626]"
                  style={{ height: `${(views / maxViews) * 100}%` }} />
                <span className="text-xs text-gray-400">{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white mb-5 font-['Manrope']">Traffic Sources</h3>
          <div className="space-y-4">
            {[
              { source: 'Organic Search', percent: 48, color: 'bg-[#1E3A8A]' },
              { source: 'Social Media', percent: 28, color: 'bg-[#DC2626]' },
              { source: 'Direct', percent: 15, color: 'bg-green-500' },
              { source: 'Referral', percent: 7, color: 'bg-amber-500' },
              { source: 'Newsletter', percent: 2, color: 'bg-purple-500' },
            ].map(({ source, percent, color }) => (
              <div key={source}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">{source}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{percent}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Posts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white font-['Manrope']">Top Performing Articles</h3>
          <span className="text-xs text-gray-400">Last 30 days</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-5 py-3">#</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Article</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Category</th>
                <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Views</th>
                <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Likes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {topPosts.map((post, i) => (
                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-5 py-3 text-sm font-bold text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1 max-w-xs">{post.title}</p>
                    <p className="text-xs text-gray-400">{post.author.name}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: post.category.color + '20', color: post.category.color }}>
                      {post.category.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatViews(post.views)}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatViews(post.likes)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
