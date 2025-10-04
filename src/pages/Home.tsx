import { useState, useEffect, useRef, useCallback } from 'react';
import type { Pokemon } from "../types/pokemon";
import { api } from '../lib/api';
import { PokemonCard } from '../components/PokemonCard';
import { SearchBar } from '../components/SearchBar';
import { Filters } from '../components/Filters';
import { PokemonDetail } from '../components/PokemonDetail';
import { useSearch } from '../hooks/useSearch';
import { usePokemonContext } from '../context/PokemonContext';

export function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  
  const loadingRef = useRef(false);
  const loadedIdsRef = useRef(new Set<number>());
  const initialLoadDone = useRef(false);
  
  const { query, setQuery, results, isSearching } = useSearch();
  const { sortPokemon, filterType } = usePokemonContext();

  const loadPokemon = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    
    loadingRef.current = true;
    setLoading(true);
    
    try {
      const data = await api.getPokemonList(offset, 20);
      const detailedPokemon = await Promise.all(
        data.results.map((p: { name: string | number; }) => api.getPokemon(p.name))
      );

      const uniquePokemon = detailedPokemon.filter(p => {
        if (loadedIdsRef.current.has(p.id)) {
          return false;
        }
        loadedIdsRef.current.add(p.id);
        return true;
      });
      
      if (uniquePokemon.length > 0) {
        setPokemon(prev => [...prev, ...uniquePokemon]);
        setOffset(prev => prev + uniquePokemon.length);
      }
      
      setHasMore(data.next !== null);
    } catch (error) {
      console.error('Error loading pokemon:', error);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [offset, hasMore]);

  useEffect(() => {
    if (!initialLoadDone.current) {
      initialLoadDone.current = true;
      loadPokemon();
    }
  }, []); 

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = window.innerHeight;
        
        if (scrollHeight - scrollTop <= clientHeight * 1.5 && !loadingRef.current && hasMore && !query) {
          loadPokemon();
        }
      }, 100); 
    };

    if (!query) {
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, query, loadPokemon]);

  useEffect(() => {
    if (query) {
      loadedIdsRef.current.clear();
    }
  }, [query]);

  const displayPokemon = query ? results : pokemon;
  const filteredPokemon = filterType === 'all' 
    ? displayPokemon
    : displayPokemon.filter(p => p.types.some(t => t.type.name === filterType));
  const sortedPokemon = sortPokemon(filteredPokemon);

  return (
    <div style={{ 
      width: '100%',
      maxWidth: '100%',
      margin: '0',
      padding: '0',
    }}>
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '32px',
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        color: 'white',
      }}>
        <h1 style={{ 
          margin: '0 0 8px 0',
          fontSize: '36px',
          fontWeight: 'bold',
        }}>
          Pokémon Explorer
        </h1>
        <p style={{ margin: 0, opacity: 0.9 }}>
          Discover and explore your favorite Pokémon
        </p>
      </div>
      
      <div style={{ 
        marginBottom: '24px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}>
        <SearchBar value={query} onChange={setQuery} />
        <div style={{ marginTop: '16px' }}>
          <Filters />
        </div>
      </div>

      {isSearching && (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px', 
          fontSize: '18px', 
          color: '#64748b',
          backgroundColor: 'white',
          borderRadius: '12px',
          marginBottom: '24px',
        }}>
          <div style={{
            display: 'inline-block',
            width: '48px',
            height: '48px',
            border: '4px solid #f0f0f0',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '16px',
          }}></div>
          <div>Searching Pokémon...</div>
        </div>
      )}

      {!isSearching && sortedPokemon.length === 0 && !loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px', 
          fontSize: '18px', 
          color: '#64748b',
          backgroundColor: 'white',
          borderRadius: '12px',
          marginBottom: '24px',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <div>No Pokémon found</div>
          <p style={{ fontSize: '14px', marginTop: '8px', opacity: 0.7 }}>
            Try adjusting your search or filters
          </p>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '20px',
          width: '100%',
          marginBottom: '40px',
        }}
      >
        {sortedPokemon.map((p) => (
          <PokemonCard
            key={`pokemon-${p.id}`}
            pokemon={p}
            onClick={() => setSelectedPokemon(p)}
          />
        ))}
      </div>

      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px', 
          fontSize: '16px', 
          color: '#64748b',
          backgroundColor: 'white',
          borderRadius: '12px',
          margin: '0 0 40px 0',
        }}>
          <div style={{
            display: 'inline-block',
            width: '32px',
            height: '32px',
            border: '3px solid #f0f0f0',
            borderTop: '3px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '12px',
          }}></div>
          <div>Loading more Pokémon...</div>
        </div>
      )}

      {selectedPokemon && (
        <PokemonDetail
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}