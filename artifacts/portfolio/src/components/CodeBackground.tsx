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

function GridLines({ isDark }: { isDark: boolean }) {
  const gridRef = useRef<THREE.GridHelper>(null!);

  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.z = (clock.getElapsedTime() * 0.4) % 1;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[30, 30, isDark ? "#1e1b4b" : "#312e81", isDark ? "#312e81" : "#3730a3"]}
      position={[0, -5, -8]}
      rotation={[Math.PI / 2, 0, 0]}
    />
  );
}

export function CodeBackground({ isDark }: { isDark: boolean }) {
  const words = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      text: CODE_SNIPPETS[i % CODE_SNIPPETS.length],
      position: [
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 18,
        -3 - Math.random() * 4,
      ] as [number, number, number],
      speed: 0.3 + Math.random() * 0.6,
      color: isDark
        ? i % 3 === 0 ? "#7c3aed" : i % 3 === 1 ? "#4f46e5" : "#6366f1"
        : i % 3 === 0 ? "#7c3aed" : i % 3 === 1 ? "#4338ca" : "#6d28d9",
    }));
  }, [isDark]);

  return (
    <>
      <GridLines isDark={isDark} />
      {words.map((w) => (
        <FloatingCodeWord key={w.id} {...w} />
      ))}
    </>
  );
}
