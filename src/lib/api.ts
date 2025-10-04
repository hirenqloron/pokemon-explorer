import axios, { type CancelTokenSource } from "axios";
import type { Pokemon, PokemonListResponse } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";
const cache = new Map<string, unknown>();

let cancelTokenSource: CancelTokenSource | null = null;

export const api = {
  async getPokemonList(
    offset: number = 0,
    limit: number = 20
  ): Promise<PokemonListResponse> {
    const cacheKey = `list-${offset}-${limit}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey) as PokemonListResponse;
    }

    try {
      const response = await axios.get<PokemonListResponse>(
        `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
      );

      cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching pokemon list:", error);
      throw error;
    }
  },

  async getPokemon(nameOrId: string | number): Promise<Pokemon> {
    const cacheKey = `pokemon-${nameOrId}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey) as Pokemon;
    }

    try {
      const response = await axios.get<Pokemon>(
        `${BASE_URL}/pokemon/${nameOrId}`
      );

      cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching pokemon ${nameOrId}:`, error);
      throw error;
    }
  },

  async searchPokemon(query: string): Promise<Pokemon[]> {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("New search initiated");
    }

    cancelTokenSource = axios.CancelToken.source();

    try {
      if (!query.trim()) {
        return [];
      }

      const cacheKey = `search-${query.toLowerCase()}`;

      if (cache.has(cacheKey)) {
        return cache.get(cacheKey) as Pokemon[];
      }

      const limit = 200;
      const allPokemonResponse = await axios.get<PokemonListResponse>(
        `${BASE_URL}/pokemon?limit=${limit}`,
        { cancelToken: cancelTokenSource.token }
      );

      const filtered = allPokemonResponse.data.results.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );

      const limited = filtered.slice(0, 20);

      const promises = limited.map((p) => this.getPokemon(p.name));
      const results = await Promise.allSettled(promises);

      const successfulResults = results
        .filter(
          (r): r is PromiseFulfilledResult<Pokemon> => r.status === "fulfilled"
        )
        .map((r) => r.value);

      cache.set(cacheKey, successfulResults);
      return successfulResults;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Search request cancelled");
        return [];
      }
      console.error("Search error:", error);
      return [];
    }
  },

  async getPokemonByType(type: string): Promise<Pokemon[]> {
    const cacheKey = `type-${type}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey) as Pokemon[];
    }

    try {
      const response = await axios.get(`${BASE_URL}/type/${type}`);
      const pokemonList = response.data.pokemon.slice(0, 20);

      const promises = pokemonList.map((p: { pokemon: { name: string } }) =>
        this.getPokemon(p.pokemon.name)
      );

      const results = await Promise.allSettled(promises);
      const successfulResults = results
        .filter(
          (r): r is PromiseFulfilledResult<Pokemon> => r.status === "fulfilled"
        )
        .map((r) => r.value);

      cache.set(cacheKey, successfulResults);
      return successfulResults;
    } catch (error) {
      console.error(`Error fetching pokemon by type ${type}:`, error);
      return [];
    }
  },

  clearCache() {
    cache.clear();
  },
};
