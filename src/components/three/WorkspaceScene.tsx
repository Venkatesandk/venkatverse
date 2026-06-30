"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Float, Text } from "@react-three/drei";
import * as THREE from "three";

function Workspace() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Desk */}
      <Box args={[3, 0.1, 1.5]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#1a1a3e" metalness={0.8} roughness={0.2} />
      </Box>
      {/* Monitor */}
      <Float speed={1} floatIntensity={0.5}>
        <group position={[0, 0.3, -0.3]}>
          <Box args={[1.2, 0.8, 0.05]}>
            <meshStandardMaterial
              color="#d4a853"
              emissive="#d4a853"
              emissiveIntensity={0.2}
              metalness={0.9}
              roughness={0.1}
            />
          </Box>
          <Text position={[0, 0, 0.04]} fontSize={0.08} color="#ffffff" anchorX="center">
            {"</>"}
          </Text>
        </group>
      </Float>
      {/* Keyboard */}
      <Box args={[0.8, 0.03, 0.3]} position={[0, -0.35, 0.3]}>
        <meshStandardMaterial color="#2a2a5e" metalness={0.7} roughness={0.3} />
      </Box>
      {/* Coffee cup */}
      <Float speed={2} floatIntensity={1}>
        <mesh position={[1.2, -0.2, 0.2]}>
          <cylinderGeometry args={[0.1, 0.08, 0.2, 16]} />
          <meshStandardMaterial color="#ff6600" emissive="#ff6600" emissiveIntensity={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

export function WorkspaceScene() {
  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [3, 2, 4], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#d4a853" />
        <pointLight position={[-3, 2, -3]} intensity={0.3} color="#5b8def" />
        <Workspace />
      </Canvas>
    </div>
  );
}
