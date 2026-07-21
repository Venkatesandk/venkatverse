"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls, Torus, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Mesh } from "three";

function OrbitingCards() {
  const cards = useMemo(
    () => [
      { label: "ERP", color: "#3b82f6", angle: 0 },
      { label: "AI", color: "#06b6d4", angle: Math.PI * 0.66 },
      { label: "APIs", color: "#14b8a6", angle: Math.PI * 1.33 },
    ],
    []
  );

  const groupRef = useRef<Mesh>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.35;
  });

  return (
    <group ref={groupRef as any}>
      {cards.map((card) => {
        const x = Math.cos(card.angle) * 2.35;
        const z = Math.sin(card.angle) * 2.35;
        return (
          <Float key={card.label} speed={1.8} rotationIntensity={0.45} floatIntensity={0.7}>
            <group position={[x, 0, z]} rotation={[0, -card.angle + Math.PI / 2, 0]}>
              <RoundedBox args={[1.3, 0.75, 0.08]} radius={0.06} smoothness={4}>
                <meshStandardMaterial color={card.color} metalness={0.4} roughness={0.2} />
              </RoundedBox>
              <Html center distanceFactor={8}>
                <span className="select-none rounded bg-black/35 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur">
                  {card.label}
                </span>
              </Html>
            </group>
          </Float>
        );
      })}
    </group>
  );
}

function AnimatedCore() {
  const coreRef = useRef<Mesh>(null);
  useFrame((state) => {
    if (!coreRef.current) return;
    coreRef.current.rotation.x = state.clock.getElapsedTime() * 0.6;
    coreRef.current.rotation.z = state.clock.getElapsedTime() * 0.45;
  });

  return (
    <group>
      <mesh ref={coreRef as any}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial color="#60a5fa" emissive="#2563eb" emissiveIntensity={0.25} />
      </mesh>
      <Torus args={[1.55, 0.045, 32, 180]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#38bdf8" metalness={0.6} roughness={0.2} />
      </Torus>
      <Torus args={[1.2, 0.035, 24, 150]} rotation={[Math.PI / 4, Math.PI / 3, 0]}>
        <meshStandardMaterial color="#22d3ee" metalness={0.55} roughness={0.18} />
      </Torus>
    </group>
  );
}

export function ProfessionalShowcase3D() {
  return (
    <div className="relative h-[250px] w-full overflow-hidden rounded-xl border border-border/70 bg-surface-2/40">
      <Canvas camera={{ position: [0, 0, 5.4], fov: 47 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 2.5, 3]} intensity={1.1} />
        <pointLight position={[-3, -2, -2]} intensity={0.65} color="#0ea5e9" />
        <AnimatedCore />
        <OrbitingCards />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.55} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-2 text-center text-[11px] font-medium text-muted">
        Enterprise Architecture · AI · API Systems
      </div>
    </div>
  );
}
