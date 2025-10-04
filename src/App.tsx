import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { PokemonProvider } from "./context/PokemonContext";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Home";

function App() {
  return (
    <PokemonProvider>
      <BrowserRouter>
        <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
          <nav
            style={{
              backgroundColor: "white",
              padding: "16px 32px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
                display: "flex",
                gap: "24px",
              }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#646cff",
                }}
              >
                Home
              </Link>
              <Link
                to="/favorites"
                style={{
                  textDecoration: "none",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#646cff",
                }}
              >
                Favorites
              </Link>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </BrowserRouter>
    </PokemonProvider>
  );
}

export default App;
