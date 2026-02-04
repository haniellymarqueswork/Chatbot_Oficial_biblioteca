import { useEffect, useState } from "react";
import "./suggestions.css";

export default function Suggestions({ onSelect }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/suggestions")
      .then(res => res.json())
      .then(data => setSuggestions(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <aside className="suggestions">
      <h3>Pergunte-nos</h3>

      {suggestions.map((q, i) => (
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
