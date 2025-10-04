import type { Pokemon } from "../types/pokemon";
import { capitalize, getTypeColor } from "../utils/helpers";

interface PokemonDetailProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export function PokemonDetail({ pokemon, onClose }: PokemonDetailProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "32px",
          maxWidth: "600px",
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          ✕
        </button>

        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            style={{ width: "200px", height: "200px", objectFit: "contain" }}
          />
          <h2 style={{ margin: "16px 0", fontSize: "32px" }}>
            {capitalize(pokemon.name)}
          </h2>
          <p style={{ color: "#666", fontSize: "18px" }}>
            #{pokemon.id.toString().padStart(3, "0")}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              style={{
                backgroundColor: getTypeColor(type.type.name),
                color: "white",
                padding: "8px 16px",
                borderRadius: "16px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {capitalize(type.type.name)}
            </span>
          ))}
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ marginBottom: "12px" }}>Physical Attributes</h3>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
          >
            <div
              style={{
                padding: "12px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              <div style={{ fontSize: "12px", color: "#666" }}>Height</div>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                {(pokemon.height / 10).toFixed(1)} m
              </div>
            </div>
            <div
              style={{
                padding: "12px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              <div style={{ fontSize: "12px", color: "#666" }}>Weight</div>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                {(pokemon.weight / 10).toFixed(1)} kg
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ marginBottom: "12px" }}>Stats</h3>
          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name} style={{ marginBottom: "12px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span style={{ fontSize: "14px" }}>
                  {capitalize(stat.stat.name.replace("-", " "))}
                </span>
                <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                  {stat.base_stat}
                </span>
              </div>
              <div
                style={{
                  backgroundColor: "#e0e0e0",
                  borderRadius: "4px",
                  height: "8px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#646cff",
                    height: "100%",
                    width: `${Math.min((stat.base_stat / 255) * 100, 100)}%`,
                    transition: "width 0.3s",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 style={{ marginBottom: "12px" }}>Abilities</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {pokemon.abilities.map((ability) => (
              <span
                key={ability.ability.name}
                style={{
                  padding: "8px 12px",
                  backgroundColor: ability.is_hidden ? "#ff6b6b" : "#4ecdc4",
                  color: "white",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              >
                {capitalize(ability.ability.name.replace("-", " "))}
                {ability.is_hidden && " (Hidden)"}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}