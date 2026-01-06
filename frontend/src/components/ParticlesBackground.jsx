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
            value: "#ffffffff",
          },
          links: {
            enable: true,
            opacity: 0.3,
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
