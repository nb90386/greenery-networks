"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * A small, lightweight stylized seedling-in-a-pot.
 * Built from primitives. No external models, no textures, fast first paint.
 * Idle rotation + soft float; paused when offscreen via IntersectionObserver.
 */
function PotAndSeedling() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.18;
  });

  return (
    <group ref={group} position={[0, -0.25, 0]}>
      {/* Terracotta pot. Gently tapered using two stacked cylinders */}
      <mesh position={[0, -0.55, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.72, 0.58, 0.55, 36, 1, false]} />
        <meshStandardMaterial
          color="#a86250"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>
      {/* Pot rim ring */}
      <mesh position={[0, -0.27, 0]} castShadow>
        <torusGeometry args={[0.7, 0.045, 16, 64]} />
        <meshStandardMaterial
          color="#bf7060"
          roughness={0.75}
          metalness={0.06}
        />
      </mesh>
      {/* Soil disc */}
      <mesh position={[0, -0.27, 0]} receiveShadow>
        <cylinderGeometry args={[0.66, 0.66, 0.08, 32]} />
        <meshStandardMaterial color="#3b2a1d" roughness={1} />
      </mesh>

      {/* Stem */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.06, 0.95, 16]} />
        <meshStandardMaterial color="#3e6b3d" roughness={0.7} />
      </mesh>

      {/* Two opposing low-poly leaves */}
      <Leaf rotation={[0, 0, Math.PI * 0.18]} position={[0.35, 0.35, 0]} scale={1.05} />
      <Leaf rotation={[0, Math.PI, -Math.PI * 0.22]} position={[-0.3, 0.55, 0]} scale={0.95} />

      {/* Tiny bloom. Accent color so the photo brand reads even at small size */}
      <mesh position={[0.05, 0.78, 0.2]} castShadow>
        <icosahedronGeometry args={[0.13, 0]} />
        <meshStandardMaterial
          color="#e98aa3"
          roughness={0.6}
          metalness={0.04}
          emissive="#f3d7da"
          emissiveIntensity={0.18}
        />
      </mesh>
      <mesh position={[-0.18, 0.65, 0.05]} castShadow>
        <icosahedronGeometry args={[0.09, 0]} />
        <meshStandardMaterial
          color="#f3d7da"
          roughness={0.7}
          emissive="#f3d7da"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
}

function Leaf({
  position,
  rotation,
  scale = 1,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale} castShadow>
      {/* A flattened sphere makes for a soft leaf silhouette */}
      <sphereGeometry args={[0.32, 16, 12]} />
      <meshStandardMaterial
        color="#5f8f5a"
        roughness={0.65}
        metalness={0.02}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function HeroSeedling3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setActive(!reduce && entry.isIntersecting);
      },
      { threshold: 0.02 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-full"
      aria-hidden
    >
      <Canvas
        frameloop={active ? "always" : "never"}
        camera={{ position: [1.4, 1.0, 2.2], fov: 38 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[3, 5, 4]}
          intensity={1.15}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-3, 2, -1]} intensity={0.35} color="#cfe0e8" />

        <Float speed={1.1} rotationIntensity={0.06} floatIntensity={0.35}>
          <PotAndSeedling />
        </Float>

        <ContactShadows
          position={[0, -0.83, 0]}
          opacity={0.32}
          scale={3.6}
          blur={2.6}
          far={2}
          color="#1e3a2b"
        />
      </Canvas>
    </div>
  );
}
