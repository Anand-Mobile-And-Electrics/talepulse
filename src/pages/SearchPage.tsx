import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, ChevronRight } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { ArticleCard } from '../components/ui/ArticleCard';
import { Sidebar } from '../components/ui/Sidebar';
import { categories, tags } from '../data/mockData';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { query, results, isLoading, search, clearSearch } = useSearch();
  const urlQuery = searchParams.get('q') || '';

  useEffect(() => {
    if (urlQuery) search(urlQuery);
  }, [urlQuery]);

  const handleSearchChange = (value: string) => {
    search(value);
    if (value) setSearchParams({ q: value });
    else setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-[#1E3A8A] dark:hover:text-blue-400 transition-colors">Home</Link>
        <ChevronRight size={12} />
        <span>Search</span>
        {query && <><ChevronRight size={12} /><span>"{query}"</span></>}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white font-['Manrope'] mb-6">
            {query ? `Search Results for "${query}"` : 'Search TalePulse'}
          </h1>

          {/* Search Input */}
          <div className="relative mb-8">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="Search articles, stories, topics..."
              className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base outline-none focus:border-[#1E3A8A] dark:focus:border-blue-400 transition-colors"
              autoFocus
            />
            {query && (
              <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            )}
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                Found <strong className="text-gray-900 dark:text-white">{results.length}</strong> results
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {results.map(post => (
                  <ArticleCard key={post.id} post={post} showExcerpt />
                ))}
              </div>
            </>
          ) : query ? (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <Search size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Results Found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">We couldn't find any articles matching "{query}". Try different keywords.</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['AI', 'Politics', 'Business', 'Sports', 'Climate'].map(term => (
                  <button
                    key={term}
                    onClick={() => handleSearchChange(term)}
                    className="px-4 py-2 bg-[#1E3A8A] text-white rounded-full text-sm font-medium hover:bg-blue-800 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Browse by Category</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {categories.map(cat => (
                    <Link key={cat.id} to={`/category/${cat.slug}`}
                      className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-[#1E3A8A]/30 hover:shadow-sm transition-all group">
                      <span className="text-xl">{cat.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400">{cat.name}</p>
                        <p className="text-xs text-gray-400">{cat.count} articles</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag.id}
                      onClick={() => handleSearchChange(tag.name)}
                      className="text-sm px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A] transition-colors"
                    >
                      #{tag.name} <span className="text-xs opacity-60">({tag.count})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};
