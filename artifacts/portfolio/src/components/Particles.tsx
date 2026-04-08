import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticlesProps {
  isDark: boolean;
}

export function Particles({ isDark }: ParticlesProps) {
  const mesh = useRef<THREE.Points>(null!);

  const { positions, velocities } = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
      velocities[i * 3] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = 0;
    }
    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < arr.length / 3; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      if (arr[i * 3] > 10) arr[i * 3] = -10;
      if (arr[i * 3] < -10) arr[i * 3] = 10;
      if (arr[i * 3 + 1] > 10) arr[i * 3 + 1] = -10;
      if (arr[i * 3 + 1] < -10) arr[i * 3 + 1] = 10;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={isDark ? "#a78bfa" : "#6366f1"}
        transparent
        opacity={isDark ? 0.7 : 0.5}
        sizeAttenuation
      />
    </points>
  );
}
