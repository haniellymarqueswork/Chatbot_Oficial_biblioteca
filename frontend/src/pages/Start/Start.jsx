export default function Start({ onStart }) {
  return (
    <div
      style={{
        background: "white",
        width: "90vw",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}

      
    >
      <button
        onClick={onStart}
        style={{
          fontSize: "20px",
          padding: "10px",
          width:"150px",
          cursor: "pointer",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#fa0000ff",
          color: "white"
        }}
      >
        Iniciar
      </button>
    </div>
  );
}

