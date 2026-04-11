import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

function Shard({ position, color, speed, scale }: { position: [number, number, number], color: string, speed: number, scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.01 * speed;
    meshRef.current.rotation.y += 0.012 * speed;
  });

  return (
    <Float speed={speed * 2} rotationIntensity={1.5} floatIntensity={2}>
      <Icosahedron ref={meshRef} position={position} scale={scale} args={[1, 0]}>
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.3}
          metalness={0.8}
        />
      </Icosahedron>
    </Float>
  );
}

function ShardScene({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const shards = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5,
      ] as [number, number, number],
      color: i % 2 === 0 ? "#7c3aed" : "#6366f1",
      speed: 0.5 + Math.random(),
      scale: 0.2 + Math.random() * 0.4,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    const scroll = scrollMax > 0 ? window.scrollY / scrollMax : 0;
    
    groupRef.current.rotation.x = scroll * 0.5;
    groupRef.current.position.y = scroll * 2;
  });

  return (
    <group ref={groupRef}>
      {shards.map((shard, i) => (
        <Shard key={i} {...shard} />
      ))}
    </group>
  );
}

export function Project3D({ isDark }: { isDark: boolean }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <ShardScene isDark={isDark} />
      </Canvas>
    </div>
  );
}
