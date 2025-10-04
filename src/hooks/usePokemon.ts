import useSWR from "swr";
import { api } from "../lib/api";
import type { Pokemon } from "../types/pokemon";

export function usePokemon(nameOrId: string | number | null) {
  const { data, error, isLoading } = useSWR(
    nameOrId ? `pokemon-${nameOrId}` : null,
    () => (nameOrId ? api.getPokemon(nameOrId) : null)
  );

  return {
    pokemon: data as Pokemon | undefined,
    isLoading,
    error,
  };
}

export function usePokemonList(offset: number, limit: number) {
  const { data, error, isLoading } = useSWR(
    `pokemon-list-${offset}-${limit}`,
    () => api.getPokemonList(offset, limit)
  );

  return {
    data,
    isLoading,
    error,
  };
}
