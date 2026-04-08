import { Suspense, useState, useEffect, Component, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { HeroPlane } from "./HeroPlane";
import { Particles } from "./Particles";
import { CodeBackground } from "./CodeBackground";

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
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    return !!gl;
  } catch {
    return false;
  }
}

function CSSCodeRain({ isDark }: { isDark: boolean }) {
  const snippets = [
    "const App = () =>", "useEffect(()=>{}", "import React",
    "useState<T>()", "async/await", "interface Props",
    "Supabase.from()", "firestore.doc()", "Node.js",
    "TypeScript", "npm run dev", "git commit",
    "SELECT * FROM", "router.get()", "middleware",
    "React.FC<Props>", ".tsx", "Promise<void>",
    "export default", "type User =", "const [x, setX]",
    "fetch(url)", "res.json()", "schema.parse()",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {snippets.map((s, i) => (
        <span
          key={i}
          className="absolute text-xs font-mono whitespace-nowrap"
          style={{
            color: isDark
              ? i % 4 === 0 ? "rgba(124,58,237,0.45)"
              : i % 4 === 1 ? "rgba(99,102,241,0.38)"
              : i % 4 === 2 ? "rgba(167,139,250,0.35)"
              : "rgba(79,70,229,0.3)"
              : i % 4 === 0 ? "rgba(124,58,237,0.35)"
              : i % 4 === 1 ? "rgba(99,102,241,0.28)"
              : i % 4 === 2 ? "rgba(109,40,217,0.3)"
              : "rgba(67,56,202,0.25)",
            left: `${(i * 4.3 + 1) % 100}%`,
            top: `${(i * 7.7 + 5) % 100}%`,
            animation: `float ${4 + (i % 5)}s ease-in-out infinite`,
            animationDelay: `${(i * 0.3) % 3}s`,
            transform: `rotate(${(i % 3 - 1) * 8}deg)`,
          }}
        >
          {s}
        </span>
      ))}
    </div>
  );
}

function HeroFallback({ isDark }: { isDark: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <CSSCodeRain isDark={isDark} />

      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: (Math.random() * 4 + 2).toFixed(1) + "px",
            height: (Math.random() * 4 + 2).toFixed(1) + "px",
            background: isDark ? "rgba(167,139,250,0.55)" : "rgba(99,102,241,0.45)",
            left: (Math.random() * 100).toFixed(1) + "%",
            top: (Math.random() * 100).toFixed(1) + "%",
            animation: `float ${(3 + Math.random() * 4).toFixed(1)}s ease-in-out infinite`,
            animationDelay: (Math.random() * 3).toFixed(1) + "s",
          }}
        />
      ))}

      <div
        className="relative z-10"
        style={{
          transform: "perspective(1000px) rotateY(-3deg) rotateX(2deg)",
          filter: isDark
            ? "drop-shadow(0 0 40px rgba(124,58,237,0.5)) drop-shadow(0 0 80px rgba(79,70,229,0.25))"
            : "drop-shadow(0 0 40px rgba(124,58,237,0.3)) drop-shadow(0 0 60px rgba(79,70,229,0.15))",
        }}
      >
        <img
          src="/kumail.png"
          alt="Kumail Raza"
          className="h-[460px] md:h-[520px] w-auto object-contain"
          style={{ maxWidth: "340px" }}
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
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ position: "absolute", inset: 0 }}
        gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
      >
        <ambientLight intensity={isDark ? 0.5 : 0.8} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={isDark ? 1.2 : 1.6}
          color={isDark ? "#c4b5fd" : "#ffffff"}
        />
        <pointLight
          position={[-3, 3, 3]}
          intensity={isDark ? 0.9 : 0.6}
          color={isDark ? "#7c3aed" : "#6366f1"}
        />
        <pointLight
          position={[3, -3, 2]}
          intensity={isDark ? 0.5 : 0.3}
          color={isDark ? "#4f46e5" : "#818cf8"}
        />
        <Suspense fallback={null}>
          <CodeBackground isDark={isDark} />
          <HeroPlane mouse={mouse} scrollY={scrollY} />
        </Suspense>
        <Particles isDark={isDark} />
      </Canvas>
    </ErrorBoundary>
  );
}
