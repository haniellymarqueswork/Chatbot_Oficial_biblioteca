import "./start.css";

export default function Start({ onStart }) {
  return (
    <div className="start-container">
      <h1 className="logo">
        <span className="index">Index</span>
        <span className="ia">IA</span>
      </h1>

      <button className="start-button" onClick={onStart}>
        INICIAR
      </button>
    </div>
  );
}

