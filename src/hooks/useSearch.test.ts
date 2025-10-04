import { renderHook, waitFor } from '@testing-library/react';
import { useSearch } from './useSearch';
import { api } from '../lib/api';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/api');

describe('useSearch', () => {
  it('should initialize with empty query and results', () => {
    const { result } = renderHook(() => useSearch());
    
    expect(result.current.query).toBe('');
    expect(result.current.results).toEqual([]);
    expect(result.current.isSearching).toBe(false);
  });

  it('should update query when setQuery is called', () => {
    const { result } = renderHook(() => useSearch());
    
    result.current.setQuery('pikachu');
    
    expect(result.current.query).toBe('pikachu');
  });

  it('should call api.searchPokemon with debounced query', async () => {
    const mockResults = [
      { id: 25, name: 'pikachu', types: [], abilities: [], stats: [], sprites: { front_default: '', other: { 'official-artwork': { front_default: '' } } }, height: 4, weight: 60, base_experience: 112 }
    ];
    
    vi.mocked(api.searchPokemon).mockResolvedValue(mockResults);
    
    const { result } = renderHook(() => useSearch());
    
    result.current.setQuery('pikachu');
    
    await waitFor(() => {
      expect(result.current.results).toEqual(mockResults);
    }, { timeout: 500 });
  });
});