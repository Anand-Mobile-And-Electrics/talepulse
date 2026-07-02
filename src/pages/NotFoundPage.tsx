import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => (
  <div className="min-h-[70vh] flex items-center justify-center px-4">
    <div className="text-center max-w-lg">
      {/* 404 Visual */}
      <div className="relative mb-8">
        <span className="text-[150px] font-black text-gray-100 dark:text-gray-800 font-['Manrope'] leading-none select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div>
            <div className="flex items-center justify-center mb-2">
              <span className="text-3xl font-black text-[#1E3A8A] dark:text-blue-400 font-['Manrope']">Tale</span>
              <span className="text-3xl font-black text-[#DC2626] font-['Manrope']">Pulse</span>
            </div>
            <svg width="60" height="28" viewBox="0 0 60 28" fill="none" className="mx-auto">
              <path d="M0 14 L10 14 L15 4 L20 24 L25 10 L30 18 L35 14 L60 14" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-black text-gray-900 dark:text-white font-['Manrope'] mb-3">
        Story Not Found
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
        The page you're looking for doesn't exist or has been moved. Perhaps the story has been updated or removed.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Home size={18} />
          Go to Homepage
        </Link>
        <Link
          to="/search"
          className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Search size={18} />
          Search Articles
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-6 py-3 rounded-lg font-semibold transition-colors border border-gray-200 dark:border-gray-700"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>

      <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
        <p className="text-sm text-gray-400 mb-4">Popular sections you might be looking for:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['Technology', 'Politics', 'Business', 'Sports', 'Health', 'Science'].map(cat => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase()}`}
              className="text-sm px-4 py-2 bg-blue-50 dark:bg-gray-800 text-[#1E3A8A] dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);
