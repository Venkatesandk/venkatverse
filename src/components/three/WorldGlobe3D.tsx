"use client";

import {
  useRef,
  useMemo,
  Suspense,
  useState,
  useEffect,
  useCallback,
  Component,
  type ReactNode,
  type RefObject,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { latLngToVector3 } from "@/lib/geo";
import {
  ZoomIn,
  ZoomOut,
  Home,
  Pause,
  Play,
  Maximize2,
  Minimize2,
} from "lucide-react";

export interface GlobePin {
  id: string;
  type: "visit" | "download";
  lat: number;
  lng: number;
  label?: string;
  country?: string;
  state?: string;
  district?: string;
}

const RADIUS = 1.45;
const MIN_ZOOM = 2.05;
const MAX_ZOOM = 5.5;
const DEFAULT_ZOOM = 2.95;
/** Default camera faces South Asia so India pins are readable on first view */
const DEFAULT_CAM = latLngToVector3(20, 78, DEFAULT_ZOOM);
const EARTH_TEXTURE = "/globe/earth-blue-marble.jpg";
const BUMP_TEXTURE = "/globe/earth-topology.png";
const CLOUD_TEXTURE = "/globe/earth-clouds.png";

if (typeof window !== "undefined") {
  useTexture.preload(EARTH_TEXTURE);
  useTexture.preload(BUMP_TEXTURE);
  useTexture.preload(CLOUD_TEXTURE);
}

function pinPosition(pin: GlobePin, radius: number) {
  const v = latLngToVector3(pin.lat, pin.lng, radius);
  return new THREE.Vector3(v.x, v.y, v.z);
}

function PinMarker({
  pin,
  radius,
  active,
  onSelect,
}: {
  pin: GlobePin;
  radius: number;
  active: boolean;
  onSelect: (pin: GlobePin) => void;
}) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => pinPosition(pin, radius), [pin, radius]);
  const color = pin.type === "download" ? "#f59e0b" : "#22d3ee";
  const normal = useMemo(() => pos.clone().normalize(), [pos]);
  const alignQuat = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal),
    [normal]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime + pin.lat * 0.1;
    if (coreRef.current) {
      const pulse = active ? 1.35 + Math.sin(t * 5) * 0.2 : 1 + Math.sin(t * 3.5) * 0.22;
      coreRef.current.scale.setScalar(pulse);
    }
    if (ringRef.current) {
      const wave = (Math.sin(t * 2.2) + 1) * 0.5;
      const scale = 1.4 + wave * (active ? 1.2 : 0.8);
      ringRef.current.scale.setScalar(scale);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = active ? 0.55 - wave * 0.2 : 0.35 - wave * 0.15;
    }
  });

  return (
    <group position={pos}>
      <mesh ref={ringRef} quaternion={alignQuat}>
        <ringGeometry args={[0.055, 0.075, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      <mesh
        ref={coreRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(pin);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[active ? 0.048 : 0.04, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 2.2 : 1.5}
          toneMapped={false}
        />
      </mesh>

      {active && (
        <mesh quaternion={alignQuat}>
          <cylinderGeometry args={[0.004, 0.001, 0.18, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.7} />
        </mesh>
      )}
    </group>
  );
}

function AnimatedAtmosphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
    ref.current.scale.setScalar(1.04 + Math.sin(state.clock.elapsedTime * 0.5) * 0.008);
  });

  return (
    <mesh ref={ref} scale={1.04}>
      <sphereGeometry args={[RADIUS, 48, 48]} />
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.12} side={THREE.BackSide} />
    </mesh>
  );
}

function ProceduralClouds() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.06 + Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
  });

  return (
    <mesh ref={ref} scale={1.018}>
      <sphereGeometry args={[RADIUS, 48, 48]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.07} depthWrite={false} />
    </mesh>
  );
}

function CloudLayer() {
  const ref = useRef<THREE.Mesh>(null);
  const cloudMap = useTexture(CLOUD_TEXTURE);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.025;
  });

  return (
    <mesh ref={ref} scale={1.015}>
      <sphereGeometry args={[RADIUS, 40, 40]} />
      <meshStandardMaterial
        map={cloudMap}
        transparent
        opacity={0.22}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function CloudLayerSafe() {
  return (
    <TextureErrorBoundary fallback={<ProceduralClouds />}>
      <Suspense fallback={<ProceduralClouds />}>
        <CloudLayer />
      </Suspense>
    </TextureErrorBoundary>
  );
}

class TextureErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

function ProceduralEarthMesh() {
  return (
    <mesh>
      <sphereGeometry args={[RADIUS, 48, 48]} />
      <meshStandardMaterial
        color="#1d4ed8"
        emissive="#0c1929"
        emissiveIntensity={0.35}
        roughness={0.82}
        metalness={0.06}
      />
    </mesh>
  );
}

function GlobeBody({
  pins,
  focusPinId,
  onPinSelect,
  autoRotate,
  earthMesh,
}: {
  pins: GlobePin[];
  focusPinId?: string | null;
  onPinSelect?: (pin: GlobePin | null) => void;
  autoRotate: boolean;
  earthMesh: ReactNode;
}) {
  const globeRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (globeRef.current && autoRotate && !focusPinId) {
      globeRef.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group ref={globeRef}>
      {earthMesh}
      <CloudLayerSafe />
      <AnimatedAtmosphere />
      {pins.map((pin) => (
        <PinMarker
          key={pin.id}
          pin={pin}
          radius={RADIUS * 1.012}
          active={focusPinId === pin.id}
          onSelect={(p) => onPinSelect?.(p)}
        />
      ))}
    </group>
  );
}

function GlobeTextured({
  pins,
  focusPinId,
  onPinSelect,
  autoRotate,
}: {
  pins: GlobePin[];
  focusPinId?: string | null;
  onPinSelect?: (pin: GlobePin | null) => void;
  autoRotate: boolean;
}) {
  const [colorMap, bumpMap] = useTexture([EARTH_TEXTURE, BUMP_TEXTURE]);

  return (
    <GlobeBody
      pins={pins}
      focusPinId={focusPinId}
      onPinSelect={onPinSelect}
      autoRotate={autoRotate}
      earthMesh={
        <mesh>
          <sphereGeometry args={[RADIUS, 48, 48]} />
          <meshStandardMaterial
            map={colorMap}
            bumpMap={bumpMap}
            bumpScale={0.04}
            roughness={0.85}
            metalness={0.08}
          />
        </mesh>
      }
    />
  );
}

function GlobeProcedural({
  pins,
  focusPinId,
  onPinSelect,
  autoRotate,
}: {
  pins: GlobePin[];
  focusPinId?: string | null;
  onPinSelect?: (pin: GlobePin | null) => void;
  autoRotate: boolean;
}) {
  return (
    <GlobeBody
      pins={pins}
      focusPinId={focusPinId}
      onPinSelect={onPinSelect}
      autoRotate={autoRotate}
      earthMesh={<ProceduralEarthMesh />}
    />
  );
}

function GlobeSafe({
  pins,
  focusPinId,
  onPinSelect,
  autoRotate,
}: {
  pins: GlobePin[];
  focusPinId?: string | null;
  onPinSelect?: (pin: GlobePin | null) => void;
  autoRotate: boolean;
}) {
  return (
    <TextureErrorBoundary
      fallback={
        <GlobeProcedural
          pins={pins}
          focusPinId={focusPinId}
          onPinSelect={onPinSelect}
          autoRotate={autoRotate}
        />
      }
    >
      <Suspense
        fallback={
          <GlobeProcedural
            pins={pins}
            focusPinId={focusPinId}
            onPinSelect={onPinSelect}
            autoRotate={autoRotate}
          />
        }
      >
        <GlobeTextured
          pins={pins}
          focusPinId={focusPinId}
          onPinSelect={onPinSelect}
          autoRotate={autoRotate}
        />
      </Suspense>
    </TextureErrorBoundary>
  );
}

function CameraFocus({
  focusPin,
  controlsRef,
  zoomLevel,
}: {
  focusPin: GlobePin | null;
  controlsRef: RefObject<OrbitControlsImpl | null>;
  zoomLevel: number;
}) {
  const { camera } = useThree();
  const animating = useRef(false);
  const targetCam = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (!focusPin) {
      animating.current = false;
      return;
    }
    const surface = pinPosition(focusPin, RADIUS);
    targetCam.current = surface.clone().normalize().multiplyScalar(Math.max(MIN_ZOOM, zoomLevel * 0.85));
    targetLook.current.set(0, 0, 0);
    animating.current = true;
    if (controlsRef.current) controlsRef.current.autoRotate = false;
  }, [focusPin, controlsRef, zoomLevel]);

  useFrame(() => {
    if (!animating.current || !focusPin) return;
    camera.position.lerp(targetCam.current, 0.06);
    camera.lookAt(targetLook.current);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLook.current, 0.08);
      controlsRef.current.update();
    }
    if (camera.position.distanceTo(targetCam.current) < 0.02) {
      animating.current = false;
    }
  });

  return null;
}

function GlobeScene({
  pins,
  focusPinId,
  onPinSelect,
  autoRotate,
  controlsRef,
  zoomLevel,
}: {
  pins: GlobePin[];
  focusPinId?: string | null;
  onPinSelect?: (pin: GlobePin | null) => void;
  autoRotate: boolean;
  controlsRef: RefObject<OrbitControlsImpl | null>;
  zoomLevel: number;
}) {
  const focusPin = pins.find((p) => p.id === focusPinId) ?? null;

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 3, 5]} intensity={1.35} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={0.45} color="#22d3ee" />
      <pointLight position={[2, -3, -2]} intensity={0.25} color="#f59e0b" />
      <Stars radius={60} depth={40} count={400} factor={2.5} saturation={0} fade speed={0.45} />
      <GlobeSafe
        pins={pins}
        focusPinId={focusPinId}
        onPinSelect={onPinSelect}
        autoRotate={autoRotate}
      />
      <CameraFocus focusPin={focusPin} controlsRef={controlsRef} zoomLevel={zoomLevel} />
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        /* Wheel/pinch zoom off so the page can scroll; use toolbar zoom buttons */
        enableZoom={false}
        minDistance={MIN_ZOOM}
        maxDistance={MAX_ZOOM}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.45}
        autoRotate={autoRotate && !focusPinId}
        autoRotateSpeed={0.55}
        dampingFactor={0.06}
        enableDamping
        rotateSpeed={0.65}
      />
    </>
  );
}

interface WorldGlobe3DProps {
  pins: GlobePin[];
  className?: string;
  focusPinId?: string | null;
  onPinSelect?: (pin: GlobePin | null) => void;
  compact?: boolean;
}

export function WorldGlobe3D({
  pins,
  className = "",
  focusPinId,
  onPinSelect,
  compact = false,
}: WorldGlobe3DProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM);

  const zoomIn = useCallback(() => {
    const ctrl = controlsRef.current;
    if (!ctrl) return;
    ctrl.enableZoom = true;
    ctrl.dollyIn(1.25);
    ctrl.enableZoom = false;
    ctrl.update();
    setZoomLevel((z) => Math.max(MIN_ZOOM, z * 0.82));
  }, []);

  const zoomOut = useCallback(() => {
    const ctrl = controlsRef.current;
    if (!ctrl) return;
    ctrl.enableZoom = true;
    ctrl.dollyOut(1.25);
    ctrl.enableZoom = false;
    ctrl.update();
    setZoomLevel((z) => Math.min(MAX_ZOOM, z * 1.18));
  }, []);

  const resetView = useCallback(() => {
    const ctrl = controlsRef.current;
    if (ctrl) {
      ctrl.object.position.set(DEFAULT_CAM.x, DEFAULT_CAM.y, DEFAULT_CAM.z);
      ctrl.target.set(0, 0, 0);
      ctrl.autoRotate = autoRotate;
      ctrl.update();
    }
    setZoomLevel(DEFAULT_ZOOM);
    onPinSelect?.(null);
  }, [autoRotate, onPinSelect]);

  const toggleRotate = useCallback(() => {
    setAutoRotate((r) => {
      const next = !r;
      if (controlsRef.current) controlsRef.current.autoRotate = next && !focusPinId;
      return next;
    });
  }, [focusPinId]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate && !focusPinId;
    }
  }, [autoRotate, focusPinId]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => {
      window.dispatchEvent(new Event("resize"));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`group/globe relative h-full w-full overflow-hidden touch-pan-y ${compact ? "min-h-0" : "min-h-[140px]"} ${expanded ? "fixed inset-0 z-[80] !min-h-0 bg-black/90" : ""} ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      <div className="absolute inset-0">
        <Canvas
        camera={{ position: [DEFAULT_CAM.x, DEFAULT_CAM.y, DEFAULT_CAM.z], fov: compact ? 38 : 42 }}
        dpr={[1, compact ? 1.25 : 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance", stencil: false }}
        style={{ touchAction: "pan-y", width: "100%", height: "100%" }}
        onCreated={({ gl, set }) => {
          gl.setClearColor("#020617", 1);
          set({ frameloop: "always" });
        }}
      >
        <color attach="background" args={["#020617"]} />
        <GlobeScene
          pins={pins}
          focusPinId={focusPinId}
          onPinSelect={onPinSelect}
          autoRotate={autoRotate}
          controlsRef={controlsRef}
          zoomLevel={zoomLevel}
        />
      </Canvas>
      </div>

      {/* Toolbar */}
      <div className={`absolute right-1.5 top-1.5 flex flex-col gap-0.5 ${compact ? "opacity-70" : "opacity-90"} transition-opacity group-hover/globe:opacity-100`}>
        <GlobeToolBtn label="Zoom in" onClick={zoomIn} compact={compact}>
          <ZoomIn size={compact ? 12 : 14} />
        </GlobeToolBtn>
        <GlobeToolBtn label="Zoom out" onClick={zoomOut} compact={compact}>
          <ZoomOut size={compact ? 12 : 14} />
        </GlobeToolBtn>
        <GlobeToolBtn label={autoRotate ? "Pause rotation" : "Auto rotate"} onClick={toggleRotate} compact={compact}>
          {autoRotate ? <Pause size={compact ? 12 : 14} /> : <Play size={compact ? 12 : 14} />}
        </GlobeToolBtn>
        <GlobeToolBtn label="Reset view" onClick={resetView} compact={compact}>
          <Home size={compact ? 12 : 14} />
        </GlobeToolBtn>
        <GlobeToolBtn label={expanded ? "Exit fullscreen" : "Fullscreen"} onClick={() => setExpanded((e) => !e)} compact={compact}>
          {expanded ? <Minimize2 size={compact ? 12 : 14} /> : <Maximize2 size={compact ? 12 : 14} />}
        </GlobeToolBtn>
      </div>

      {!compact && (
        <div className="pointer-events-none absolute bottom-2 left-2 rounded-lg bg-black/40 px-2 py-1 text-[9px] font-medium text-white/80 backdrop-blur-sm">
          Drag rotate · Click pin · Use +/− to zoom
        </div>
      )}

      <div className={`pointer-events-none absolute bottom-1.5 ${compact ? "left-1.5" : "right-2"} flex gap-2 rounded-md bg-black/40 px-1.5 py-0.5 text-[8px] font-medium text-white/80 backdrop-blur-sm`}>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
          Visit
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
          CV
        </span>
      </div>
    </div>
  );
}

function GlobeToolBtn({
  children,
  label,
  onClick,
  compact = false,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`flex items-center justify-center rounded-md border border-white/20 bg-black/50 text-white/90 backdrop-blur-sm transition hover:bg-primary/80 hover:text-white ${compact ? "h-6 w-6" : "h-7 w-7 rounded-lg"}`}
    >
      {children}
    </button>
  );
}
