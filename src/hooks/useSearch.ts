import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "../lib/api";
import type { Pokemon } from "../types/pokemon";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Pokemon[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchIdRef = useRef(0);

  const performSearch = useCallback(async (searchQuery: string) => {
    const currentSearchId = ++searchIdRef.current;

    if (!searchQuery.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    try {
      const data = await api.searchPokemon(searchQuery);

      if (currentSearchId === searchIdRef.current) {
        setResults(data);
        setIsSearching(false);
      }
    } catch (error) {
      console.error("Search error:", error);

      if (currentSearchId === searchIdRef.current) {
        setResults([]);
        setIsSearching(false);
      }
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, performSearch]);

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setIsSearching(false);
    searchIdRef.current = 0;
  }, []);

  return {
    query,
    setQuery,
    results,
    isSearching,
    clearSearch,
  };
}
