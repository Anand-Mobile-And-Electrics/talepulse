import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ChevronRight } from 'lucide-react';
import { breakingNews } from '../../data/mockData';

export const BreakingNewsTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % breakingNews.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#DC2626] text-white py-2.5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3">
          {/* Breaking Label */}
          <div className="flex items-center gap-1.5 flex-shrink-0 bg-white/20 px-3 py-0.5 rounded-sm">
            <Zap size={13} className="animate-pulse" fill="currentColor" />
            <span className="text-xs font-black uppercase tracking-widest whitespace-nowrap">Breaking</span>
          </div>

          {/* Divider */}
          <div className="w-px h-4 bg-white/30 flex-shrink-0" />

          {/* Ticker content */}
          <div className="flex-1 overflow-hidden relative">
            <p className={`text-sm font-medium truncate transition-all duration-300 ${
              isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}>
              {breakingNews[currentIndex]}
            </p>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {breakingNews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === currentIndex ? 'bg-white w-3' : 'bg-white/40'
                }`}
              />
            ))}
          </div>

          <Link to="/breaking" className="flex items-center gap-1 text-xs font-semibold whitespace-nowrap hover:text-red-100 transition-colors ml-2 flex-shrink-0">
            More <ChevronRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};
