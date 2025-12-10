import "./start.css"

export default function Start({ onStart }) {
  return (
    <div
      style={{
        background: "#7d7d7d",
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

      <h1 style={{fontSize:"42px", margin: 0}}>
        NEXUS
      </h1>
      <button
        onClick={onStart}
        style={{
          fontSize: "20px",
          padding: "10px",
          width:"150px",
          cursor: "pointer",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#034fc2ff",
          color: "white"
        }}
      >
        Iniciar
      </button>
    </div>
  );
}

