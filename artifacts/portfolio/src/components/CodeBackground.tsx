import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";

const CODE_SNIPPETS = [
  "const", "=>", "async", "await", "import", "export",
  "React", "useState", "useEffect", "TypeScript",
  "interface", "type", "Supabase", "Node.js", "{}",
  "[]", ".map()", ".then()", "return", "const app =",
  "npm run", "git push", "SELECT *", "firestore",
  "<Component/>", "props", "useRef", "fetch()",
  "try {", "catch", "Promise", "schema", "query",
  "router", "middleware", "jwt", "API", "REST",
  "true", "null", "string", "number", "boolean",
];

function FloatingCodeWord({ text, position, speed, color }: {
  text: string;
  position: [number, number, number];
  speed: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y += speed * 0.005;
      meshRef.current.position.x += Math.sin(t * 0.3 + offset) * 0.001;
      
      // New: add rotation and scale breathing
      meshRef.current.rotation.z = Math.sin(t * 0.2 + offset) * 0.1;
      meshRef.current.rotation.x = Math.cos(t * 0.15 + offset) * 0.05;
      meshRef.current.scale.setScalar(1 + Math.sin(t * 0.5 + offset) * 0.05);

      if (meshRef.current.position.y > 9) {
        meshRef.current.position.y = -9;
      }
    }
  });

  return (
    <Text
      ref={meshRef}
      position={position}
      fontSize={0.18}
      color={color}
      anchorX="center"
      anchorY="middle"
      font={undefined}
      fillOpacity={0.55}
    >
      {text}
    </Text>
  );
}

function DepthFog({ isDark, isMobile = false }: { isDark: boolean; isMobile?: boolean }) {
  const r1 = useRef<THREE.Mesh>(null!);
  const r2 = useRef<THREE.Mesh>(null!);
  const r3 = useRef<THREE.Mesh>(null!);
  const r4 = useRef<THREE.Mesh>(null!);
  const r5 = useRef<THREE.Mesh>(null!);
  const orb1 = useRef<THREE.Mesh>(null!);
  const orb2 = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // All rings rotate continuously on multiple axes
    if (r1.current) {
      r1.current.rotation.z = t * 0.12;
      r1.current.rotation.x = t * 0.05;
    }
    if (r2.current) {
      r2.current.rotation.z = -t * 0.09;
      r2.current.rotation.y = t * 0.07;
    }
    if (r3.current) {
      r3.current.rotation.y = t * 0.11;
      r3.current.rotation.x = -t * 0.06;
    }
    if (r4.current) {
      r4.current.rotation.z = t * 0.08;
      r4.current.rotation.y = -t * 0.05;
    }
    if (r5.current) {
      r5.current.rotation.x = t * 0.10;
      r5.current.rotation.z = t * 0.04;
    }

    // Pulsing orbs with slow drift
    if (orb1.current) {
      orb1.current.scale.setScalar(1 + Math.sin(t * 0.6) * 0.2);
    }
    if (orb2.current) {
      orb2.current.scale.setScalar(1 + Math.cos(t * 0.45) * 0.25);
    }
  });

  // Scale rings down on mobile
  const s = isMobile ? 0.55 : 1.0;

  return (
    <group scale={[s, s, s]}>
      {/* Ring 1 — large outer, violet */}
      <mesh ref={r1} position={[0, 0, -8]}>
        <torusGeometry args={[7.5, 0.018, 16, 140]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.28} />
      </mesh>

      {/* Ring 2 — mid, indigo */}
      <mesh ref={r2} position={[0.5, -0.5, -5]}>
        <torusGeometry args={[5.0, 0.014, 16, 110]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.22} />
      </mesh>

      {/* Ring 3 — inner, fuchsia */}
      <mesh ref={r3} position={[-0.5, 0.5, -3]}>
        <torusGeometry args={[3.2, 0.012, 16, 90]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.20} />
      </mesh>

      {/* Ring 4 — extra outer XL, darker */}
      <mesh ref={r4} position={[0, 0, -12]}>
        <torusGeometry args={[10, 0.020, 16, 160]} />
        <meshBasicMaterial color="#4f46e5" transparent opacity={0.15} />
      </mesh>

      {/* Ring 5 — small close accent */}
      <mesh ref={r5} position={[1, -1, -2]}>
        <torusGeometry args={[1.8, 0.010, 16, 70]} />
        <meshBasicMaterial color="#e879f9" transparent opacity={0.18} />
      </mesh>

      {/* Glow orb bottom-right */}
      <mesh ref={orb1} position={[3, -2, -7]}>
        <sphereGeometry args={[2.0, 32, 32]} />
        <meshBasicMaterial color="#4f46e5" transparent opacity={0.055} />
      </mesh>

      {/* Glow orb top-left */}
      <mesh ref={orb2} position={[-3, 2, -8]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.04} />
      </mesh>

      {/* Thin horizon accent line */}
      <mesh position={[0, -3.8, -4]}>
        <planeGeometry args={[30, 0.008]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export function CodeBackground({ isDark, isMobile = false }: { isDark: boolean; isMobile?: boolean }) {
  const words = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      text: CODE_SNIPPETS[i % CODE_SNIPPETS.length],
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        -4 - Math.random() * 6,
      ] as [number, number, number],
      speed: 0.2 + Math.random() * 0.8,
      color: isDark
        ? i % 3 === 0 ? "#a78bfa" : i % 3 === 1 ? "#818cf8" : "#c084fc"
        : i % 3 === 0 ? "#7c3aed" : i % 3 === 1 ? "#4338ca" : "#6d28d9",
    }));
  }, [isDark]);

  return (
    <>
      <DepthFog isDark={isDark} isMobile={isMobile} />
      {words.map((w) => (
        <FloatingCodeWord key={w.id} {...w} />
      ))}
    </>
  );
}
