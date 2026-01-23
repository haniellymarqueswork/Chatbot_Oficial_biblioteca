import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: 0,
        },

        background: {
          color: {
            value: "transparent",
          },
        },

        particles: {
          number: {
            value: 60,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: "rgb(255, 255, 255)",
          },
          links: {
            enable: true,
            color: "rgb(255, 255, 255)",
            opacity: 0.4,
            distance: 110,
          },
          move: {
            enable: true,
            speed: 1,
          },
        },
      }}
    />
  );
}
