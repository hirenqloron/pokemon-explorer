import type { SortOption, FilterType } from "../types/pokemon";
import { usePokemonContext } from "../context/PokemonContext";
import { capitalize } from "../utils/helpers";

const types: FilterType[] = [
  "all",
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "id-asc", label: "ID (Low to High)" },
  { value: "id-desc", label: "ID (High to Low)" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
];

export function Filters() {
  const { sortOption, setSortOption, filterType, setFilterType } =
    usePokemonContext();

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        marginBottom: "24px",
      }}
    >
      <div style={{ flex: "1", minWidth: "200px" }}>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
        >
          Sort By
        </label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          style={{
            width: "100%",
            padding: "8px 12px",
            fontSize: "14px",
            border: "2px solid #ddd",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ flex: "1", minWidth: "200px" }}>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
        >
          Filter by Type
        </label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as FilterType)}
          style={{
            width: "100%",
            padding: "8px 12px",
            fontSize: "14px",
            border: "2px solid #ddd",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {capitalize(type)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}