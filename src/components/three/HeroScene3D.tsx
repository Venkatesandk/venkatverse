"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Sparkles,
  PerspectiveCamera,
  MeshDistortMaterial,
  PresentationControls,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

type Quality = "low" | "high";

function GlowHalo() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.06;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.55, 32, 32]} />
      <meshBasicMaterial color="#0ea5e9" transparent opacity={0.06} side={THREE.BackSide} />
    </mesh>
  );
}

function TechCore() {
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.22;
      group.current.rotation.x = Math.sin(t * 0.35) * 0.12;
    }
    if (ringA.current) ringA.current.rotation.z = t * 0.55;
    if (ringB.current) ringB.current.rotation.x = t * -0.4;
  });

  return (
    <group ref={group}>
      <GlowHalo />

      <mesh>
        <icosahedronGeometry args={[1.05, 1]} />
        <MeshDistortMaterial
          color="#0c4a6e"
          emissive="#0ea5e9"
          emissiveIntensity={0.35}
          metalness={0.85}
          roughness={0.15}
          distort={0.28}
          speed={1.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[1.75, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1.2}
          transparent
          opacity={0.75}
        />
      </mesh>

      <mesh ref={ringB} rotation={[Math.PI / 3.2, 0.6, Math.PI / 5]}>
        <torusGeometry args={[2.05, 0.018, 12, 100]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.9}
          transparent
          opacity={0.55}
        />
      </mesh>
    </group>
  );
}

function OrbitNodes({ quality }: { quality: Quality }) {
  const group = useRef<THREE.Group>(null);
  const count = quality === "high" ? 6 : 3;

  const nodes = useMemo(() => {
    const palette = ["#0ea5e9", "#10b981", "#6366f1"];
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.35;
      return {
        position: [Math.cos(angle) * radius, Math.sin(i * 1.1) * 0.35, Math.sin(angle) * radius] as [
          number,
          number,
          number,
        ],
        color: palette[i % palette.length],
        phase: i * 0.9,
      };
    });
  }, [count]);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.12;
  });

  return (
    <group ref={group}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={1.5}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function ParticleHalo({ quality }: { quality: Quality }) {
  const count = quality === "high" ? 80 : 36;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.6 + (i % 3) * 0.15;
      const y = (Math.random() - 0.5) * 1.2;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#7dd3fc"
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Scene({ quality }: { quality: Quality }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 4, 6]} intensity={2.2} color="#0ea5e9" />
      <pointLight position={[-5, -3, 4]} intensity={1.4} color="#10b981" />
      <directionalLight position={[0, 6, 2]} intensity={0.6} color="#e0f2fe" />

      {quality === "high" && <Environment preset="city" environmentIntensity={0.35} />}

      <Sparkles
        count={quality === "high" ? 45 : 20}
        scale={6}
        size={2}
        speed={0.25}
        opacity={0.45}
        color="#38bdf8"
      />

      <PresentationControls
        global
        polar={[-0.35, 0.35]}
        azimuth={[-0.6, 0.6]}
        damping={0.22}
        speed={1.5}
      >
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
          <TechCore />
          <OrbitNodes quality={quality} />
        </Float>
      </PresentationControls>

      <ParticleHalo quality={quality} />
    </>
  );
}

interface HeroScene3DProps {
  quality?: Quality;
  className?: string;
}

export function HeroScene3D({ quality = "high", className = "" }: HeroScene3DProps) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.15),transparent_65%)]" />
      <Canvas
        dpr={quality === "high" ? [1, 2] : [1, 1.25]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%", touchAction: "none" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5.5]} fov={45} />
        <Scene quality={quality} />
      </Canvas>
    </div>
  );
}
