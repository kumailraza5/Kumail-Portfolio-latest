import { Suspense, useState, useEffect, Component, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
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
    "useCallback", "useMemo", ".env", "zod.object()",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {snippets.map((s, i) => (
        <span
          key={i}
          className="absolute text-xs font-mono whitespace-nowrap"
          style={{
            color: i % 4 === 0 ? "rgba(124,58,237,0.5)"
              : i % 4 === 1 ? "rgba(99,102,241,0.42)"
              : i % 4 === 2 ? "rgba(167,139,250,0.38)"
              : "rgba(79,70,229,0.33)",
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

export function HeroImageFallback({ isDark }: { isDark: boolean }) {
  return (
    <>
      <CSSCodeRain isDark={isDark} />
      {[...Array(22)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: (Math.random() * 3 + 2).toFixed(1) + "px",
            height: (Math.random() * 3 + 2).toFixed(1) + "px",
            background: "rgba(167,139,250,0.5)",
            left: (Math.random() * 100).toFixed(1) + "%",
            top: (Math.random() * 100).toFixed(1) + "%",
            animation: `float ${(3 + Math.random() * 4).toFixed(1)}s ease-in-out infinite`,
            animationDelay: (Math.random() * 3).toFixed(1) + "s",
          }}
        />
      ))}
    </>
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

export function HeroScene({ isDark }: HeroSceneProps) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglSupported(isWebGLSupported());
  }, []);

  if (webglSupported === null) return null;

  const fallbackBg = <HeroImageFallback isDark={isDark} />;

  if (!webglSupported) return fallbackBg;

  return (
    <ErrorBoundary fallback={fallbackBg}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ position: "absolute", inset: 0 }}
        gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
      >
        <ambientLight intensity={isDark ? 0.5 : 0.8} />
        <pointLight position={[-3, 3, 3]} intensity={0.9} color="#7c3aed" />
        <Suspense fallback={null}>
          <CodeBackground isDark={isDark} />
        </Suspense>
        <Particles isDark={isDark} />
      </Canvas>
    </ErrorBoundary>
  );
}
