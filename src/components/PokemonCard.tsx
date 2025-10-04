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
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "20px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.05)",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
      }}
    >
      <button
        onClick={handleFavoriteClick}
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: favorite ? "linear-gradient(135deg, #f43f5e, #ec4899)" : "white",
          border: favorite ? "none" : "2px solid #e5e7eb",
          fontSize: "20px",
          cursor: "pointer",
          padding: "8px",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
          boxShadow: favorite ? "0 4px 12px rgba(236, 72, 153, 0.3)" : "0 2px 4px rgba(0,0,0,0.1)",
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {favorite ? "❤️" : "🤍"}
      </button>

      <div style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.02), transparent)",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "120px",
        borderRadius: "16px 16px 0 0",
      }} />

      <div style={{ 
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <div style={{
          width: "160px",
          height: "160px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "12px",
        }}>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "contain",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
            }}
            onError={(e) => {
              e.currentTarget.src = pokemon.sprites.front_default || '';
            }}
          />
        </div>

        <p
          style={{ 
            margin: "0 0 4px 0",
            color: "#94a3b8", 
            fontSize: "14px",
            fontWeight: "600",
            letterSpacing: "0.5px",
          }}
        >
          #{pokemon.id.toString().padStart(3, "0")}
        </p>

        <h3 style={{ 
          margin: "0 0 12px 0", 
          fontSize: "20px",
          fontWeight: "bold",
          color: "#1e293b",
          textAlign: "center",
        }}>
          {capitalize(pokemon.name)}
        </h3>

        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              style={{
                backgroundColor: getTypeColor(type.type.name),
                color: "white",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                boxShadow: `0 2px 8px ${getTypeColor(type.type.name)}40`,
              }}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}