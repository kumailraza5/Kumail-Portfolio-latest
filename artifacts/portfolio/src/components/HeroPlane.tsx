import { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

interface HeroPlaneProps {
  mouse: React.MutableRefObject<[number, number]>;
  scrollY: React.MutableRefObject<number>;
}

export function HeroPlane({ mouse, scrollY }: HeroPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useLoader(TextureLoader, "/kumail.jpg");

  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    const targetRotX = mouse.current[1] * 0.12;
    const targetRotY = mouse.current[0] * 0.12;

    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.05;

    const scroll = scrollY.current;
    meshRef.current.position.z = -scroll * 0.005;
    meshRef.current.position.y = scroll * 0.001 - 0.2;

    meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.005;
  });

  return (
    <mesh ref={meshRef} position={[0, -0.2, 0]}>
      <planeGeometry args={[3.2, 4.2, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        transparent
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
}
