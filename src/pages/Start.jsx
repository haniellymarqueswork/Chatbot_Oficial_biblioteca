export default function Start({ onStart }) {
  return (
    <div
      style={{
        background: "red",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <button
        onClick={onStart}
        style={{
          fontSize: "20px",
          padding: "12px 24px",
          cursor: "pointer",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#031d04ff",
          color: "white"
        }}
      >
        Iniciar
      </button>
    </div>
  );
}

