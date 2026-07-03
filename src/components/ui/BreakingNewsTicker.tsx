import React, { useEffect, useState } from "react";
import { Zap } from "lucide-react";

type NewsItem = {
  id: string;
  title: string;
};

const FALLBACK_NEWS: NewsItem[] = [
  { id: "1", title: "Global markets show mixed signals" },
  { id: "2", title: "AI adoption continues worldwide" },
  { id: "3", title: "Major sports updates announced" },
];

export const BreakingNewsTicker: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>(FALLBACK_NEWS);

  useEffect(() => {
    setNews(FALLBACK_NEWS);
  }, []);

  return (
    <div className="bg-red-600 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 py-2">
        <div className="flex items-center gap-2 font-bold text-xs uppercase">
          <Zap size={14} />
          Breaking
        </div>

        <div className="flex gap-8 whitespace-nowrap animate-pulse">
          {news.map((item) => (
            <span key={item.id}>• {item.title}</span>
          ))}
        </div>
      </div>
    </div>
  );
};