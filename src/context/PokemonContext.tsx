import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Pokemon, SortOption, FilterType } from "../types/pokemon";

interface PokemonContextType {
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
  sortPokemon: (pokemon: Pokemon[]) => Pokemon[];
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

const FAVORITES_KEY = "pokemon-favorites";

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [sortOption, setSortOption] = useState<SortOption>("id-asc");
  const [filterType, setFilterType] = useState<FilterType>("all");

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (id: number) => {
    setFavorites((prev) => [...prev, id]);
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((fav) => fav !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.includes(id);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const sortPokemon = (pokemon: Pokemon[]): Pokemon[] => {
    const sorted = [...pokemon];

    switch (sortOption) {
      case "id-asc":
        return sorted.sort((a, b) => a.id - b.id);
      case "id-desc":
        return sorted.sort((a, b) => b.id - a.id);
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites,
        sortOption,
        setSortOption,
        filterType,
        setFilterType,
        sortPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemonContext() {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemonContext must be used within PokemonProvider");
  }
  return context;
}
