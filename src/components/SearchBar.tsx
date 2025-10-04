interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search Pokemon...",
}: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "12px 16px",
        fontSize: "16px",
        border: "2px solid #ddd",
        borderRadius: "8px",
        outline: "none",
        transition: "border-color 0.2s",
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "#646cff";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "#ddd";
      }}
    />
  );
}
