"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Torus } from "@react-three/drei";
import * as THREE from "three";

function CoreOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1.6, 64, 64]}>
        <MeshDistortMaterial
          color="#1a1810"
          distort={0.25}
          speed={1.5}
          roughness={0.15}
          metalness={0.9}
          emissive="#d4a853"
          emissiveIntensity={0.15}
        />
      </Sphere>
    </Float>
  );
}

function GoldRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.08;
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Torus args={[2.2, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#d4a853" emissive="#d4a853" emissiveIntensity={0.4} metalness={1} roughness={0.1} transparent opacity={0.6} />
      </Torus>
      <Torus args={[2.6, 0.015, 16, 100]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#5b8def" emissive="#5b8def" emissiveIntensity={0.3} metalness={1} roughness={0.1} transparent opacity={0.4} />
      </Torus>
    </group>
  );
}

function Particles() {
  const count = 40;
  const positions = Array.from({ length: count }, () => [
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 8,
  ]);

  return (
    <>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#d4a853" : "#5b8def"}
            emissive={i % 2 === 0 ? "#d4a853" : "#5b8def"}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </>
  );
}

export function HeroScene() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#d4a853" />
        <pointLight position={[-5, -3, 3]} intensity={0.6} color="#5b8def" />
        <CoreOrb />
        <GoldRings />
        <Particles />
      </Canvas>
    </div>
  );
}
