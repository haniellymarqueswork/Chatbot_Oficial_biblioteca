import ParticlesBackground from "../../components/ParticlesBackground";
import Button from "../../components/button";
import "./start.css";


export default function Start({ onStart }) {
  
  return (
    <div className="start-container">
      <ParticlesBackground />

      <h1 className="titulo">
        <span className="index">Index</span>
        <span className="ia">IA</span>
      </h1>

      <Button onClick={onStart}>
        
      </Button>
    </div>
  );
}

