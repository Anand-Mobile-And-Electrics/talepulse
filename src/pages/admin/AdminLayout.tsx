import React, { useState } from 'react';
import { Link, useLocation, Outlet, Navigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, PlusCircle, Tag, Users, MessageSquare,
  Settings, BarChart2, Megaphone, ChevronLeft, ChevronRight, Eye,
  Bell, Moon, Sun, LogOut, Search, BookOpen, Zap
} from 'lucide-react';
import { useDarkMode } from '../../hooks/useDarkMode';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: PlusCircle, label: 'Create Post', href: '/admin/create' },
  { icon: FileText, label: 'All Posts', href: '/admin/posts' },
  { icon: BookOpen, label: 'Stories', href: '/admin/stories' },
  { icon: Tag, label: 'Categories', href: '/admin/categories' },
  { icon: Zap, label: 'Tags', href: '/admin/tags' },
  { icon: Users, label: 'Authors', href: '/admin/authors' },
  { icon: MessageSquare, label: 'Comments', href: '/admin/comments' },
  { icon: Bell, label: 'Newsletter', href: '/admin/newsletter' },
  { icon: BarChart2, label: 'Analytics', href: '/admin/analytics' },
  { icon: Megaphone, label: 'Advertisements', href: '/admin/ads' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

const AdminLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 bg-[#DC2626] rounded-lg flex items-center justify-center">
      <svg width="14" height="10" viewBox="0 0 20 14" fill="none">
        <path d="M0 7 L3 7 L5 2 L7 12 L9 5 L11 9 L13 7 L20 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    </div>
    <div>
      <span className="text-sm font-black text-white font-['Manrope']">TalePulse</span>
      <span className="text-xs text-gray-400 block -mt-0.5">Admin Panel</span>
    </div>
  </div>
);

export const AdminLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAuthenticated] = useState(true); // Mock auth
  const location = useLocation();
  const { isDark, toggleDarkMode } = useDarkMode();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${isCollapsed ? 'w-16' : 'w-64'} flex-shrink-0 bg-[#1F2937] dark:bg-gray-900 flex flex-col transition-all duration-300 overflow-hidden`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
          {!isCollapsed && <AdminLogo />}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-white transition-colors p-1 ml-auto"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
            const isActive = location.pathname === href || (href !== '/admin' && location.pathname.startsWith(href));
            return (
              <Link
                key={href}
                to={href}
                title={isCollapsed ? label : ''}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all group ${
                  isActive
                    ? 'bg-[#1E3A8A] text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={18} className="flex-shrink-0" />
                {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
                {isActive && !isCollapsed && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-white/5 p-3 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            title={isCollapsed ? 'View Site' : ''}
          >
            <Eye size={18} className="flex-shrink-0" />
            {!isCollapsed && <span className="text-sm">View Site</span>}
          </Link>
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            title={isCollapsed ? 'Toggle Theme' : ''}
          >
            {isDark ? <Sun size={18} className="flex-shrink-0" /> : <Moon size={18} className="flex-shrink-0" />}
            {!isCollapsed && <span className="text-sm">{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors">
            <LogOut size={18} className="flex-shrink-0" />
            {!isCollapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts, users..."
                className="pl-9 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-[#1E3A8A] transition-colors w-64 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/create"
              className="flex items-center gap-2 bg-[#1E3A8A] hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <PlusCircle size={16} />
              New Post
            </Link>
            <button className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC2626] rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200 dark:border-gray-700">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=50&h=50&fit=crop&crop=face"
                alt="Admin"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Sarah Mitchell</p>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
