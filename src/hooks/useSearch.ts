import { useState, useCallback } from 'react';
import { Post } from '../types';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setResults(searchPosts(searchQuery));
      setIsLoading(false);
    }, 300);
  }, []);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return { query, results, isLoading, search, clearSearch };
};
