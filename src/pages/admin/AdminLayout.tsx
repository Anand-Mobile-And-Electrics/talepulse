import React, { useState } from "react";
import { Link, useLocation, Outlet, Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Tag,
  Users,
  MessageSquare,
  Settings,
  BarChart2,
  Megaphone,
  ChevronLeft,
  ChevronRight,
  Eye,
  Bell,
  Moon,
  Sun,
  LogOut,
  Search,
  BookOpen,
  Zap,
} from "lucide-react";

import { useDarkMode } from "../../hooks/useDarkMode";
import { useAuth } from "@/context/AuthContext";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: PlusCircle, label: "Create Post", href: "/admin/create" },
  { icon: FileText, label: "All Posts", href: "/admin/posts" },
  { icon: BookOpen, label: "Stories", href: "/admin/stories" },
  { icon: Tag, label: "Categories", href: "/admin/categories" },
  { icon: Zap, label: "Tags", href: "/admin/tags" },
  { icon: Users, label: "Authors", href: "/admin/authors" },
  { icon: MessageSquare, label: "Comments", href: "/admin/comments" },
  { icon: Bell, label: "Newsletter", href: "/admin/newsletter" },
  { icon: BarChart2, label: "Analytics", href: "/admin/analytics" },
  { icon: Megaphone, label: "Advertisements", href: "/admin/ads" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { isDark, toggleDarkMode } = useDarkMode();
  const { user } = useAuth();

  // 🔐 AUTH GUARD
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950 overflow-hidden">
      {/* SIDEBAR */}
      <aside
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } bg-[#1F2937] dark:bg-gray-900 flex flex-col transition-all`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
          <div className="text-white font-bold">
            {!isCollapsed && "TalePulse"}
          </div>

          <button onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>

        <nav className="flex-1 py-4 px-2">
          {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
            const active =
              location.pathname === href ||
              location.pathname.startsWith(href);

            return (
              <Link
                key={href}
                to={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-1 ${
                  active
                    ? "bg-blue-700 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={18} />
                {!isCollapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/5">
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 text-gray-400"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            {!isCollapsed && "Theme"}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white dark:bg-gray-900 border-b flex items-center px-6">
          <div className="flex items-center gap-2">
            <Search size={16} />
            <input
              placeholder="Search..."
              className="bg-transparent outline-none"
            />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}