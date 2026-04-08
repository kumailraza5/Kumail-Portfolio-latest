import { Suspense, useState, useEffect, Component, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { HeroPlane } from "./HeroPlane";
import { Particles } from "./Particles";

interface HeroSceneProps {
  mouse: React.MutableRefObject<[number, number]>;
  scrollY: React.MutableRefObject<number>;
  isDark: boolean;
}

function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

function HeroFallback({ isDark }: { isDark: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: (Math.random() * 4 + 2).toFixed(1) + "px",
            height: (Math.random() * 4 + 2).toFixed(1) + "px",
            background: isDark ? "rgba(167,139,250,0.6)" : "rgba(99,102,241,0.5)",
            left: (Math.random() * 100).toFixed(1) + "%",
            top: (Math.random() * 100).toFixed(1) + "%",
            animation: `float ${(3 + Math.random() * 4).toFixed(1)}s ease-in-out infinite`,
            animationDelay: (Math.random() * 3).toFixed(1) + "s",
          }}
        />
      ))}
      <div
        className="relative w-60 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden"
        style={{
          boxShadow: isDark
            ? "0 0 60px rgba(124,58,237,0.45), 0 0 120px rgba(79,70,229,0.2)"
            : "0 0 60px rgba(124,58,237,0.25), 0 0 120px rgba(79,70,229,0.1)",
          transform: "perspective(1000px) rotateY(-3deg) rotateX(2deg)",
          transition: "transform 0.3s ease",
        }}
      >
        <img
          src="/kumail.jpg"
          alt="Kumail Raza"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, transparent 60%)"
              : "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, transparent 60%)",
          }}
        />
      </div>
    </div>
  );
}

class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }> {
  state = { hasError: false };
  componentDidCatch() {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export function HeroScene({ mouse, scrollY, isDark }: HeroSceneProps) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglSupported(isWebGLSupported());
  }, []);

  if (webglSupported === null) return null;

  if (!webglSupported) {
    return <HeroFallback isDark={isDark} />;
  }

  return (
    <ErrorBoundary fallback={<HeroFallback isDark={isDark} />}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ position: "absolute", inset: 0 }}
        gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
      >
        <ambientLight intensity={isDark ? 0.4 : 0.7} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={isDark ? 1.2 : 1.5}
          color={isDark ? "#c4b5fd" : "#ffffff"}
        />
        <pointLight
          position={[-3, 3, 3]}
          intensity={isDark ? 0.8 : 0.5}
          color={isDark ? "#7c3aed" : "#6366f1"}
        />
        <pointLight
          position={[3, -3, 2]}
          intensity={isDark ? 0.5 : 0.3}
          color={isDark ? "#4f46e5" : "#818cf8"}
        />
        <Suspense fallback={null}>
          <HeroPlane mouse={mouse} scrollY={scrollY} />
        </Suspense>
        <Particles isDark={isDark} />
      </Canvas>
    </ErrorBoundary>
  );
}
