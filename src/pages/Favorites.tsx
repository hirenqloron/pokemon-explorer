import { useState, useEffect } from "react";
import type { Pokemon } from "../types/pokemon";
import { api } from "../lib/api";
import { PokemonCard } from "../components/PokemonCard";
import { PokemonDetail } from "../components/PokemonDetail";
import { usePokemonContext } from "../context/PokemonContext";

export function Favorites() {
  const { favorites, clearFavorites } = usePokemonContext();
  const [favoritePokemon, setFavoritePokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    loadFavorites();
  }, [favorites]);

  const loadFavorites = async () => {
    if (favorites.length === 0) {
      setFavoritePokemon([]);
      return;
    }

    setLoading(true);
    try {
      const pokemon = await Promise.all(favorites.map((id) => api.getPokemon(id)));
      setFavoritePokemon(pokemon);
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all favorites?")) {
      clearFavorites();
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <h1>Favorite Pokemon ({favorites.length})</h1>
        {favorites.length > 0 && (
          <button
            onClick={handleClearAll}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff6b6b",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {loading && (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            fontSize: "18px",
            color: "#666",
          }}
        >
          Loading favorites...
        </div>
      )}

      {!loading && favoritePokemon.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            fontSize: "18px",
            color: "#666",
          }}
        >
          No favorite Pokemon yet. Add some from the home page!
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {favoritePokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} onClick={() => setSelectedPokemon(p)} />
        ))}
      </div>

      {selectedPokemon && (
        <PokemonDetail pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
      )}
    </div>
  );
}