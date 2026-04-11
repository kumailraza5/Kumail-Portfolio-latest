import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, useScroll, ScrollControls, Scroll } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 4) / 4;
    meshRef.current.rotation.y = Math.sin(t / 4) / 4;
    meshRef.current.rotation.z = Math.sin(t / 4) / 4;
    
    // Subtle bounce
    meshRef.current.position.y = Math.sin(t / 2) / 6;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.2, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color={isDark ? "#7c3aed" : "#6d28d9"}
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.6}
          roughness={0.2}
          emissive={isDark ? "#4c1d95" : "#5b21b6"}
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
}

function SceneContent({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    // Safety check for division by zero
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    const scroll = scrollMax > 0 ? window.scrollY / scrollMax : 0;
    
    groupRef.current.rotation.y = scroll * Math.PI * 2;
    groupRef.current.position.y = -scroll * 2;
  });

  return (
    <group ref={groupRef}>
      <FloatingShape isDark={isDark} />
      
      {/* Background ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshBasicMaterial color={isDark ? "#4c1d95" : "#c4b5fd"} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export function About3D({ isDark }: { isDark: boolean }) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7c3aed" />
        <spotLight position={[0, 5, 0]} intensity={1} angle={0.3} penumbra={1} />
        
        <SceneContent isDark={isDark} />
      </Canvas>
    </div>
  );
}
