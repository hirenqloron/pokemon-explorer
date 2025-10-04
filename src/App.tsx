import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { PokemonProvider } from "./context/PokemonContext";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";

function App() {
  return (
    <PokemonProvider>
      <BrowserRouter>
        <div style={{ 
          minHeight: "100vh", 
          backgroundColor: "#f0f2f5",
          margin: 0,
          padding: 0,
        }}>
          <nav
            style={{
              backgroundColor: "white",
              padding: "0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              position: "sticky",
              top: 0,
              zIndex: 100,
            }}
          >
            <div
              style={{
                maxWidth: "1400px",
                margin: "0 auto",
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                gap: "32px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "24px" }}>🔴</span>
                <h1 style={{ 
                  margin: 0, 
                  fontSize: "24px", 
                  fontWeight: "bold",
                  color: "#2d3748"
                }}>
                  Pokédex
                </h1>
              </div>
              
              <div style={{ display: "flex", gap: "24px", marginLeft: "48px" }}>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: window.location.pathname === "/" ? "#ef4444" : "#64748b",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    transition: "all 0.2s",
                    backgroundColor: window.location.pathname === "/" ? "#fee2e2" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (window.location.pathname !== "/") {
                      e.currentTarget.style.backgroundColor = "#f1f5f9";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (window.location.pathname !== "/") {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  Home
                </Link>
                <Link
                  to="/favorites"
                  style={{
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: window.location.pathname === "/favorites" ? "#ef4444" : "#64748b",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    transition: "all 0.2s",
                    backgroundColor: window.location.pathname === "/favorites" ? "#fee2e2" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (window.location.pathname !== "/favorites") {
                      e.currentTarget.style.backgroundColor = "#f1f5f9";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (window.location.pathname !== "/favorites") {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  Favorites
                </Link>
              </div>
            </div>
          </nav>

          <main style={{ 
            width: "100%", 
            maxWidth: "1400px", 
            margin: "0 auto",
            padding: "24px",
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </PokemonProvider>
  );
}

export default App;