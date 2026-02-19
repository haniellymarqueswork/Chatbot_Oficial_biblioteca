import { useEffect, useState } from "react";
import "./suggestions.css";

export default function Suggestions({ onSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  async function loadSuggestions() {
    try {
      setLoading(true);
      setErrorMsg("");

      const res = await fetch(
        "https://chatbot-biblioteca-backend.onrender.com/suggestions"
      );

      if (!res.ok) throw new Error("Erro ao carregar");

      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error(err);
      setErrorMsg(
        " Estamos iniciando o servidor... isso pode levar alguns segundos."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSuggestions();
  }, []);

  return (
    <aside className="suggestions">
      <h3>Pergunte-nos</h3>

      {loading && (
        <>
          <p className="suggestions-info">
            ⏳ Carregando sugestões...
          </p>

          {[1, 2, 3, 4].map((i) => (
            <button key={i} className="suggestion-btn skeleton" disabled>
              &nbsp;
            </button>
          ))}
        </>
      )}

      {!loading && errorMsg && (
        <div className="suggestions-info">
          <p>{errorMsg}</p>
          <button onClick={loadSuggestions} className="retry-btn">
            Tentar novamente
          </button>
        </div>
      )}

      {!loading && !errorMsg &&
        suggestions.map((q, i) => (
          <button
            key={i}
            onClick={() => onSelect(q)}
            className="suggestion-btn"
          >
            {q}
          </button>
        ))}
    </aside>
  );
}
