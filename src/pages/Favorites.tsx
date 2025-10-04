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
    <div style={{ 
      width: '100%',
      maxWidth: '100%',
      margin: '0',
      padding: '0',
    }}>
      <div style={{
        background: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
        borderRadius: "16px",
        padding: "32px",
        marginBottom: "32px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 10px 30px rgba(236, 72, 153, 0.2)",
      }}>
        <div>
          <h1 style={{ 
            margin: "0 0 8px 0",
            fontSize: "36px",
            fontWeight: "bold",
          }}>
            Favorite Pokémon
          </h1>
          <p style={{ 
            margin: 0, 
            opacity: 0.95,
            fontSize: "18px",
          }}>
            {favorites.length} {favorites.length === 1 ? "Pokémon" : "Pokémon"} in your collection
          </p>
        </div>
        
        {favorites.length > 0 && (
          <button
            onClick={handleClearAll}
            style={{
              padding: "12px 24px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              color: "white",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "600",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Clear All Favorites
          </button>
        )}
      </div>

      {loading && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            fontSize: "18px",
            color: "#64748b",
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{
            display: "inline-block",
            width: "48px",
            height: "48px",
            border: "4px solid #f0f0f0",
            borderTop: "4px solid #ec4899",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginBottom: "16px",
          }}></div>
          <div>Loading your favorites...</div>
        </div>
      )}

      {!loading && favoritePokemon.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>💔</div>
          <h2 style={{ 
            fontSize: "24px",
            color: "#1e293b",
            marginBottom: "8px",
          }}>
            No favorites yet
          </h2>
          <p style={{
            fontSize: "16px",
            color: "#64748b",
            marginBottom: "24px",
          }}>
            Start building your collection by adding Pokémon from the home page!
          </p>
          <a 
            href="/"
            style={{
              display: "inline-block",
              padding: "12px 32px",
              backgroundColor: "#667eea",
              color: "white",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "16px",
              transition: "all 0.2s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#5a67d8";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#667eea";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Browse Pokémon
          </a>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
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