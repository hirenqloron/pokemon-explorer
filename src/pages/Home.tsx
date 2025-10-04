import { useState, useEffect } from 'react';
import { Pokemon } from '@/types/pokemon';
import { api } from '@/lib/api';
import { PokemonCard } from '@/components/PokemonCard';
import { SearchBar } from '@/components/SearchBar';
import { Filters } from '@/components/Filters';
import { PokemonDetail } from '@/components/PokemonDetail';
import { useSearch } from '@/hooks/useSearch';
import { usePokemonContext } from '@/context/PokemonContext';

export function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  
  const { query, setQuery, results, isSearching } = useSearch();
  const { sortPokemon, filterType } = usePokemonContext();

  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const data = await api.getPokemonList(offset, 20);
      const detailedPokemon = await Promise.all(
        data.results.map(p => api.getPokemon(p.name))
      );
      
      setPokemon(prev => [...prev, ...detailedPokemon]);
      setOffset(prev => prev + 20);
      setHasMore(data.next !== null);
    } catch (error) {
      console.error('Error loading pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && !loading && hasMore && !query) {
      loadPokemon();
    }
  };

  const displayPokemon = query ? results : pokemon;
  const filteredPokemon = filterType === 'all' 
    ? displayPokemon
    : displayPokemon.filter(p => p.types.some(t => t.type.name === filterType));
  const sortedPokemon = sortPokemon(filteredPokemon);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '32px' }}>Pokemon Explorer</h1>
      
      <div style={{ marginBottom: '24px' }}>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <Filters />

      {isSearching && (
        <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#666' }}>
          Searching...
        </div>
      )}

      {!isSearching && sortedPokemon.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#666' }}>
          No Pokemon found
        </div>
      )}

      <div
        onScroll={handleScroll}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
          maxHeight: '70vh',
          overflow: 'auto',
          padding: '10px',
        }}
      >
        {sortedPokemon.map((p) => (
          <PokemonCard
            key={p.id}
            pokemon={p}
            onClick={() => setSelectedPokemon(p)}
          />
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px', fontSize: '16px', color: '#666' }}>
          Loading more Pokemon...
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