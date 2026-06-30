"use client";

export function MeshBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="mesh-bg animate-mesh absolute inset-0" />
      <div className="grid-pattern absolute inset-0 opacity-60" />
      <div
        className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--primary-glow), transparent 70%)" }}
      />
      <div
        className="absolute right-0 bottom-0 h-[400px] w-[500px] rounded-full opacity-20 blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--secondary-glow), transparent 70%)" }}
      />
    </div>
  );
}
