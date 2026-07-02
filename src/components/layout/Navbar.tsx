import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search, Menu, X, Moon, Sun, Bookmark, Bell, ChevronDown,
  Globe, Zap, TrendingUp, BarChart2, Laptop, Tv, Heart,
  FlaskConical, Plane, BookOpen, Mic, MapPin
} from 'lucide-react';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useSearch } from '../../hooks/useSearch';
import { categories } from '../../data/mockData';

const NAV_ITEMS = [
  { label: 'News', href: '/category/world', hasDropdown: true },
  { label: 'Politics', href: '/category/politics' },
  { label: 'Technology', href: '/category/technology' },
  { label: 'Business', href: '/category/business' },
  { label: 'Sports', href: '/category/sports' },
  { label: 'Entertainment', href: '/category/entertainment' },
  { label: 'More', href: '#', hasDropdown: true },
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

const Logo = ({ className = '' }: { className?: string }) => (
  <Link to="/" className={`flex items-center gap-2 ${className}`}>
    <div className="flex items-center">
      <div className="relative">
        <span className="text-2xl font-black tracking-tight text-[#1E3A8A] dark:text-white font-['Manrope']">
          Tale
        </span>
        <span className="text-2xl font-black tracking-tight text-[#DC2626] font-['Manrope']">
          Pulse
        </span>
      </div>
      <div className="ml-1 flex items-end pb-1">
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" className="pulse-line">
          <path d="M0 7 L3 7 L5 2 L7 12 L9 5 L11 9 L13 7 L20 7" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>
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
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Globe size={11} />
              <span>Global Edition</span>
            </span>
            <span className="opacity-50">|</span>
            <Link to="/about" className="hover:text-blue-200 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-blue-200 transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-4">
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <div className="flex items-center gap-2">
              <a href="https://twitter.com/talepulse" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">𝕏</a>
              <a href="https://facebook.com/talepulse" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">f</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`sticky top-0 z-50 bg-white dark:bg-gray-900 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : 'shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative group">
                  {item.label === 'More' ? (
                    <button
                      onMouseEnter={() => setIsMegaMenuOpen(true)}
                      onMouseLeave={() => setIsMegaMenuOpen(false)}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-[#1E3A8A] dark:hover:text-blue-400 transition-colors rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-[#1E3A8A] dark:hover:text-blue-400 transition-colors rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div ref={searchRef} className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#1E3A8A] dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>

                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <form onSubmit={handleSearchSubmit} className="flex items-center p-3 border-b border-gray-100 dark:border-gray-700">
                      <Search size={18} className="text-gray-400 mr-2 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Search articles, stories..."
                        value={query}
                        onChange={(e) => search(e.target.value)}
                        className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none text-sm"
                        autoFocus
                      />
                      {query && (
                        <button type="button" onClick={clearSearch} className="text-gray-400 hover:text-gray-600">
                          <X size={16} />
                        </button>
                      )}
                    </form>

                    {isLoading && (
                      <div className="p-4 text-center text-gray-500 text-sm">Searching...</div>
                    )}

                    {!isLoading && results.length > 0 && (
                      <div className="max-h-80 overflow-y-auto">
                        {results.slice(0, 5).map(post => (
                          <Link
                            key={post.id}
                            to={`/article/${post.slug}`}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            onClick={() => { setIsSearchOpen(false); clearSearch(); }}
                          >
                            <img src={post.featuredImage} alt="" className="w-12 h-10 object-cover rounded flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{post.title}</p>
                              <p className="text-xs text-[#DC2626] mt-0.5">{post.category.name}</p>
                            </div>
                          </Link>
                        ))}
                        <Link
                          to={`/search?q=${encodeURIComponent(query)}`}
                          className="block p-3 text-center text-sm text-[#1E3A8A] dark:text-blue-400 font-medium border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          See all results for "{query}"
                        </Link>
                      </div>
                    )}

                    {!isLoading && query && results.length === 0 && (
                      <div className="p-4 text-center text-gray-500 text-sm">No results found for "{query}"</div>
                    )}

                    {!query && (
                      <div className="p-3">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Popular Searches</p>
                        {['Artificial Intelligence', 'Climate Change', 'Elections', 'Bitcoin', 'SpaceX'].map(term => (
                          <button
                            key={term}
                            onClick={() => { search(term); }}
                            className="flex items-center gap-2 w-full text-left p-2 text-sm text-gray-600 dark:text-gray-300 hover:text-[#1E3A8A] dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                          >
                            <TrendingUp size={14} className="text-gray-400" />
                            {term}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Dark Mode */}
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#1E3A8A] dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Bookmarks */}
              <Link
                to="/bookmarks"
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#1E3A8A] dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors hidden sm:flex"
                aria-label="Bookmarks"
              >
                <Bookmark size={20} />
              </Link>

              {/* Newsletter CTA */}
              <Link
                to="/newsletter"
                className="hidden md:flex items-center gap-2 bg-[#DC2626] hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <Bell size={15} />
                Subscribe
              </Link>

              {/* Admin Link */}
              <Link
                to="/admin"
                className="hidden lg:flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-[#1E3A8A] dark:hover:text-blue-400 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded-md transition-colors"
              >
                Admin
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Secondary Nav - Category Pills */}
          <div className="hidden md:flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide border-t border-gray-100 dark:border-gray-800 pt-1">
            {categories.slice(0, 10).map(cat => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-[#1E3A8A] dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-full whitespace-nowrap transition-colors"
              >
                <span>{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mega Menu */}
        {isMegaMenuOpen && (
          <div
            className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-2xl border-t border-gray-200 dark:border-gray-700 z-50"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="grid grid-cols-4 gap-4">
                {MEGA_MENU_CATEGORIES.map(({ name, href, icon: Icon, color }) => (
                  <Link
                    key={name}
                    to={href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <Icon size={20} className={`${color} group-hover:scale-110 transition-transform`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400">
                      {name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 overflow-y-auto max-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => search(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none text-gray-900 dark:text-white"
                />
              </form>

              <nav className="space-y-1">
                {MEGA_MENU_CATEGORIES.map(({ name, href, icon: Icon, color }) => (
                  <Link
                    key={name}
                    to={href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Icon size={18} className={color} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{name}</span>
                  </Link>
                ))}
              </nav>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-col gap-2">
                <Link to="/bookmarks" className="flex items-center gap-2 p-3 text-sm text-gray-600 dark:text-gray-300">
                  <Bookmark size={18} /> Bookmarks
                </Link>
                <Link to="/newsletter" className="flex items-center gap-2 p-3 bg-[#DC2626] text-white text-sm font-semibold rounded-lg">
                  <Bell size={18} /> Subscribe to Newsletter
                </Link>
                <Link to="/admin" className="flex items-center gap-2 p-3 text-sm text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg">
                  Admin Panel
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
