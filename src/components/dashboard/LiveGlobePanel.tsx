"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, MapPin, Download } from "lucide-react";
import { formatPlaceLabel } from "@/lib/geo";
import type { GlobePin } from "@/components/three/WorldGlobe3D";

const WorldGlobe3D = dynamic(
  () => import("@/components/three/WorldGlobe3D").then((m) => m.WorldGlobe3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center bg-[#020617]">
        <Globe className="h-7 w-7 animate-pulse text-primary/50" />
      </div>
    ),
  }
);

export function LiveGlobePanel() {
  const [pins, setPins] = useState<GlobePin[]>([]);
  const [stats, setStats] = useState({ visits: 0, downloads: 0, total: 0 });
  const [active, setActive] = useState<GlobePin | null>(null);
  const [showAll, setShowAll] = useState(false);

  const load = () => {
    fetch("/api/map-pins")
      .then((r) => r.json())
      .then((d) => {
        setPins(Array.isArray(d.pins) ? d.pins : []);
        setStats({
          visits: d.visits ?? 0,
          downloads: d.downloads ?? 0,
          total: d.total ?? 0,
        });
      })
      .catch(() => {});
  };

  useEffect(() => {
    load();
    window.addEventListener("visit-recorded", load);
    window.addEventListener("resume-downloaded", load);
    return () => {
      window.removeEventListener("visit-recorded", load);
      window.removeEventListener("resume-downloaded", load);
    };
  }, []);

  const recent = showAll ? pins.slice(0, 8) : pins.slice(0, 5);

  return (
    <motion.div
      className="panel overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <Globe size={15} className="shrink-0 text-primary" />
          <p className="truncate text-xs font-bold sm:text-sm">Live World Map</p>
        </div>
        <div className="flex shrink-0 gap-2.5 text-[10px] font-semibold sm:text-[11px]">
          <span className="flex items-center gap-1 text-cyan-600">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            {stats.visits} visits
          </span>
          <span className="flex items-center gap-1 text-amber-600">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            {stats.downloads} CV
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_min(34%,260px)]">
        <div className="relative h-[220px] overflow-hidden bg-[#020617] sm:h-[250px] lg:h-[270px]">
          <WorldGlobe3D
            pins={pins}
            focusPinId={active?.id}
            onPinSelect={setActive}
            className="!min-h-0 h-full"
          />
        </div>

        <div className="flex max-h-[220px] flex-col border-t border-border md:max-h-[250px] md:border-t-0 md:border-l lg:max-h-[270px]">
          <div className="shrink-0 border-b border-border px-3 py-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wide text-muted">
              Locations (Country · State · District)
            </p>
          </div>
          <ul className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {recent.length === 0 && (
              <li className="px-3 py-5 text-center text-xs text-muted">No pins yet</li>
            )}
            {recent.map((pin) => (
              <li key={pin.id}>
                <button
                  type="button"
                  onClick={() => setActive(pin)}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left transition hover:bg-surface-2 ${
                    active?.id === pin.id ? "bg-primary/5" : ""
                  }`}
                >
                  {pin.type === "download" ? (
                    <Download size={13} className="shrink-0 text-amber-500" />
                  ) : (
                    <MapPin size={13} className="shrink-0 text-cyan-500" />
                  )}
                  <span className="min-w-0 flex-1 truncate text-[11px] font-medium leading-tight text-foreground sm:text-xs">
                    {formatPlaceLabel(pin)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {pins.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="shrink-0 border-t border-border px-3 py-1.5 text-[11px] font-semibold text-primary"
            >
              {showAll ? "Show less" : `View more (${Math.min(pins.length, 8)})`}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
