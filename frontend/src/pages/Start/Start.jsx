import "./start.css"

export default function Start({ onStart }) {
  return (
    <div
      style={{
        background: "#cacacaff",
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        gap:"60px"

      }}
      
    >

      <h1 style={{fontSize:"40px", margin: 0, color:"#850107ff", fontFamily: "DejaVu Sans Mono, monospaceNew Century Schoolbook, TeX Gyre Schola, serif"}}>
        INDEXIA 
      </h1>
      <button
        onClick={onStart}
        style={{
          fontSize: "20px",
          padding: "10px ",
          width:"160px",
          cursor: "pointer",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#850107ff",
          color: "white"
        }}
      >
        Iniciar
      </button>
    </div>
  );
}

