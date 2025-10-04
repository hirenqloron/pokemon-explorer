interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search Pokémon by name...",
}: SearchBarProps) {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "20px",
          color: "#94a3b8",
        }}
      >
        🔍
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "14px 16px 14px 48px",
          fontSize: "16px",
          border: "2px solid #e2e8f0",
          borderRadius: "12px",
          outline: "none",
          transition: "all 0.2s",
          backgroundColor: "#f8fafc",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#667eea";
          e.currentTarget.style.backgroundColor = "white";
          e.currentTarget.style.boxShadow =
            "0 0 0 3px rgba(102, 126, 234, 0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#e2e8f0";
          e.currentTarget.style.backgroundColor = "#f8fafc";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            backgroundColor: "#e2e8f0",
            color: "#64748b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            transition: "all 0.2s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#cbd5e1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#e2e8f0";
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
