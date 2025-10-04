import type { Pokemon } from "../types/pokemon";
import { usePokemonContext } from "../context/PokemonContext";
import { capitalize, getTypeColor } from "../utils/helpers";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = usePokemonContext();
  const favorite = isFavorite(pokemon.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon.id);
    }
  };

  return (
    <div
      onClick={onClick}
      className="pokemon-card"
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <button
        onClick={handleFavoriteClick}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "none",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          padding: "4px",
        }}
      >
        {favorite ? "❤️" : "🤍"}
      </button>

      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        style={{ width: "100%", height: "150px", objectFit: "contain" }}
      />

      <h3 style={{ margin: "8px 0", textAlign: "center" }}>
        {capitalize(pokemon.name)}
      </h3>

      <p
        style={{ textAlign: "center", color: "#666", fontSize: "14px" }}
      >
        #{pokemon.id.toString().padStart(3, "0")}
      </p>

      <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
          marginTop: "8px",
        }}
      >
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            style={{
              backgroundColor: getTypeColor(type.type.name),
              color: "white",
              padding: "4px 12px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {capitalize(type.type.name)}
          </span>
        ))}
      </div>
    </div>
  );
}
