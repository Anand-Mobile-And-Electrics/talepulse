import { useState, useEffect } from 'react';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('talepulse_bookmarks');
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }
  }, []);

  const toggleBookmark = (postId: string) => {
    setBookmarks(prev => {
      const updated = prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId];
      localStorage.setItem('talepulse_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const isBookmarked = (postId: string) => bookmarks.includes(postId);

  return { bookmarks, toggleBookmark, isBookmarked };
};
