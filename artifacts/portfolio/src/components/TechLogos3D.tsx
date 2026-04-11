import { useRef, useMemo, Suspense } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Float, Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface LogoConfig {
  name: string;
  color: string;
  uv: [number, number];
  phase: number; // radians offset around the orbit
}

// 6 logos evenly distributed: 360° / 6 = 60° apart
const LOGOS: LogoConfig[] = [
  { name: "React",      color: "#61dafb", uv: [0,    0.66], phase: 0 },
  { name: "Node.js",   color: "#339933", uv: [0.33, 0.66], phase: Math.PI / 3 },
  { name: "Tailwind",  color: "#06b6d4", uv: [0.66, 0.66], phase: (2 * Math.PI) / 3 },
  { name: "TypeScript",color: "#3178c6", uv: [0,    0.33], phase: Math.PI },
  { name: "Supabase",  color: "#3ecf8e", uv: [0.33, 0.33], phase: (4 * Math.PI) / 3 },
  { name: "Firestore", color: "#ffa611", uv: [0.66, 0.33], phase: (5 * Math.PI) / 3 },
];

const ORBIT_SPEED = 0.04; // radians per second — ultra-slow elegant orbit

interface BadgeProps {
  config: LogoConfig;
  texture: THREE.Texture;
  isMobile: boolean;
}

function OrbitingBadge({ config, texture, isMobile }: BadgeProps) {
  const groupRef = useRef<THREE.Group>(null!);

  const iconTex = useMemo(() => {
    const t = texture.clone();
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.repeat.set(0.33, 0.33);
    t.offset.set(config.uv[0], config.uv[1]);
    t.needsUpdate = true;
    return t;
  }, [texture, config.uv]);

  const orbitRadius = isMobile ? 1.7 : 3.5;
  // Slight tilt so the orbit looks 3D, not flat
  const tiltY = isMobile ? 0.15 : 0.25; // how much z varies per revolution

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() * ORBIT_SPEED + config.phase;

    if (isMobile) {
      // Mobile: compact ellipse around center
      groupRef.current.position.x = 1.7 * Math.cos(t);
      groupRef.current.position.y = 1.7 * Math.sin(t) * 0.55;
      groupRef.current.position.z = 0.15 * Math.sin(t);
    } else {
      // Desktop: flat ring orbiting around the center (like mobile, but larger)
      groupRef.current.position.x = 3.2 * Math.cos(t);
      groupRef.current.position.y = 3.2 * Math.sin(t) * 0.55;
      groupRef.current.position.z = 0.5 * Math.sin(t); // 3D depth pulse
    }
  });

  if (isMobile) {
    // Compact glowing square badge
    return (
      <group ref={groupRef}>
        <Float speed={3} floatIntensity={0.5} rotationIntensity={0.4}>
          {/* Square glassy back */}
          <RoundedBox args={[0.75, 0.75, 0.07]} radius={0.06} smoothness={4}>
            <meshStandardMaterial color="#ffffff" transparent opacity={0.18}
              metalness={0.9} roughness={0.1} emissive={config.color} emissiveIntensity={0.35} />
          </RoundedBox>
          {/* Glow border */}
          <RoundedBox args={[0.79, 0.79, 0.09]} radius={0.06} smoothness={4}>
            <meshBasicMaterial color={config.color} wireframe transparent opacity={0.65} />
          </RoundedBox>
          {/* Icon centered */}
          <mesh position={[0, 0.06, 0.09]}>
            <planeGeometry args={[0.42, 0.42]} />
            <meshBasicMaterial map={iconTex} transparent opacity={0.95} side={THREE.DoubleSide} />
          </mesh>
          {/* Name below */}
          <Suspense fallback={null}>
            <Text position={[0, -0.3, 0.09]} fontSize={0.12} color="white"
              fontWeight="bold" anchorX="center" anchorY="middle">
              {config.name}
            </Text>
          </Suspense>
        </Float>
      </group>
    );
  }

  // Desktop square badge (same style as mobile, just larger)
  return (
    <group ref={groupRef}>
      <Float speed={1.5} floatIntensity={0.4} rotationIntensity={0.3}>
        {/* Square glassy back */}
        <RoundedBox args={[1.1, 1.1, 0.09]} radius={0.07} smoothness={4}>
          <meshStandardMaterial color="#ffffff" transparent opacity={0.20}
            metalness={0.9} roughness={0.1} emissive={config.color} emissiveIntensity={0.25} />
        </RoundedBox>
        {/* Glow border */}
        <RoundedBox args={[1.15, 1.15, 0.11]} radius={0.07} smoothness={4}>
          <meshBasicMaterial color={config.color} wireframe transparent opacity={0.55} />
        </RoundedBox>
        {/* Icon centered */}
        <mesh position={[0, 0.1, 0.1]}>
          <planeGeometry args={[0.58, 0.58]} />
          <meshBasicMaterial map={iconTex} transparent opacity={0.95} side={THREE.DoubleSide} />
        </mesh>
        {/* Name below icon */}
        <Suspense fallback={null}>
          <Text position={[0, -0.42, 0.1]} fontSize={0.16} color="white"
            fontWeight="bold" anchorX="center" anchorY="middle">
            {config.name}
          </Text>
        </Suspense>
      </Float>
    </group>
  );
}

interface TechLogos3DProps { isMobile?: boolean; }

export function TechLogos3D({ isMobile = false }: TechLogos3DProps) {
  const texture = useLoader(THREE.TextureLoader, "/tech-logos.png");

  return (
    <group>
      {LOGOS.map((config) => (
        <OrbitingBadge key={config.name} config={config} texture={texture} isMobile={isMobile} />
      ))}
    </group>
  );
}
