import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search, Menu, X, Moon, Sun, Bookmark, Bell, ChevronDown,
  Globe, Zap, TrendingUp, BarChart2, Laptop, Tv, Heart,
  FlaskConical, Plane, BookOpen, Mic, MapPin
} from 'lucide-react';

import { useDarkMode } from '../../hooks/useDarkMode';
import { useSearch } from '../../hooks/useSearch';

const NAV_ITEMS = [
  { label: 'News', href: '/category/world' },
  { label: 'Politics', href: '/category/politics' },
  { label: 'Technology', href: '/category/technology' },
  { label: 'Business', href: '/category/business' },
  { label: 'Sports', href: '/category/sports' },
  { label: 'Entertainment', href: '/category/entertainment' },
  { label: 'More', href: '#' },
];

const MEGA_MENU_CATEGORIES = [
  { name: 'World News', href: '/category/world', icon: Globe, color: 'text-indigo-600' },
  { name: 'Politics', href: '/category/politics', icon: BarChart2, color: 'text-red-600' },
  { name: 'Technology', href: '/category/technology', icon: Laptop, color: 'text-blue-600' },
  { name: 'Business', href: '/category/business', icon: TrendingUp, color: 'text-green-600' },
  { name: 'Sports', href: '/category/sports', icon: Zap, color: 'text-yellow-600' },
  { name: 'Entertainment', href: '/category/entertainment', icon: Tv, color: 'text-purple-600' },
  { name: 'Health', href: '/category/health', icon: Heart, color: 'text-emerald-600' },
  { name: 'Science', href: '/category/science', icon: FlaskConical, color: 'text-cyan-600' },
  { name: 'Travel', href: '/category/travel', icon: Plane, color: 'text-teal-600' },
  { name: 'Education', href: '/category/education', icon: BookOpen, color: 'text-violet-600' },
  { name: 'Opinion', href: '/category/opinion', icon: Mic, color: 'text-amber-600' },
  { name: 'Local', href: '/category/local', icon: MapPin, color: 'text-rose-600' },
];

const categories = [
  { id: 1, name: 'World', slug: 'world', icon: '🌍' },
  { id: 2, name: 'Politics', slug: 'politics', icon: '🏛️' },
  { id: 3, name: 'Technology', slug: 'technology', icon: '💻' },
  { id: 4, name: 'Business', slug: 'business', icon: '💼' },
  { id: 5, name: 'Sports', slug: 'sports', icon: '⚽' },
  { id: 6, name: 'Entertainment', slug: 'entertainment', icon: '🎬' },
  { id: 7, name: 'Health', slug: 'health', icon: '🩺' },
  { id: 8, name: 'Science', slug: 'science', icon: '🔬' },
  { id: 9, name: 'Travel', slug: 'travel', icon: '✈️' },
  { id: 10, name: 'Education', slug: 'education', icon: '📚' },
];

const Logo = () => (
  <Link to="/" className="flex items-center gap-2">
    <div className="text-2xl font-black">
      <span className="text-[#1E3A8A]">Tale</span>
      <span className="text-[#DC2626]">Pulse</span>
    </div>
  </Link>
);

export const Navbar: React.FC = () => {
  const { isDark, toggleDarkMode } = useDarkMode();
  const { query, results, isLoading, search, clearSearch } = useSearch();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsMegaMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
        clearSearch();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [clearSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#1E3A8A] text-white text-xs py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <Globe size={12} /> Global Edition
            </span>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="text-xs">
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <header className={`sticky top-0 z-50 bg-white dark:bg-gray-900 ${
        isScrolled ? 'shadow-lg' : 'shadow-sm'
      }`}>

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Logo />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex gap-2">
              {NAV_ITEMS.map(item => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">

              {/* Search */}
              <div ref={searchRef} className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2"
                >
                  <Search size={18} />
                </button>

                {isSearchOpen && (
                  <div className="absolute right-0 top-10 w-80 bg-white dark:bg-gray-900 border rounded shadow-lg">

                    <form onSubmit={handleSearchSubmit} className="flex p-2 border-b">
                      <input
                        value={query}
                        onChange={(e) => search(e.target.value)}
                        placeholder="Search..."
                        className="flex-1 outline-none bg-transparent"
                      />
                      <button type="button" onClick={clearSearch}>
                        <X size={16} />
                      </button>
                    </form>

                    {isLoading && <p className="p-2 text-sm">Searching...</p>}

                    {!isLoading && results.map(post => (
                      <Link
                        key={post.id}
                        to={`/article/${post.slug}`}
                        className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setIsSearchOpen(false)}
                      >
                        <p className="text-sm">{post.title}</p>
                      </Link>
                    ))}

                  </div>
                )}
              </div>

              {/* Dark Mode */}
              <button onClick={toggleDarkMode}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Mobile Menu */}
              <button
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>

            </div>
          </div>

          {/* CATEGORY BAR (FIXED - NO categories ERROR) */}
          <div className="hidden md:flex gap-2 overflow-x-auto border-t py-2">
            {MEGA_MENU_CATEGORIES.slice(0, 8).map(cat => (
              <Link
                key={cat.name}
                to={cat.href}
                className="flex items-center gap-1 text-xs px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <cat.icon size={14} className={cat.color} />
                {cat.name}
              </Link>
            ))}
          </div>

        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t p-4 space-y-2">
            {MEGA_MENU_CATEGORIES.map(cat => (
              <Link
                key={cat.name}
                to={cat.href}
                className="flex items-center gap-2 p-2"
              >
                <cat.icon size={16} />
                {cat.name}
              </Link>
            ))}
          </div>
        )}

      </header>
    </>
  );
};