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
      <div className="flex h-full min-h-[180px] items-center justify-center rounded-xl bg-surface-2">
        <Globe className="h-8 w-8 animate-pulse text-primary/40" />
      </div>
    ),
  }
);

function PlaceLines({ pin }: { pin: GlobePin }) {
  const district = pin.district || "—";
  const state = pin.state || "—";
  const country = pin.country || "—";

  return (
    <div className="mt-0.5 space-y-0.5 text-[10px] leading-snug text-muted">
      <p>
        <span className="font-semibold text-foreground/80">District:</span> {district}
      </p>
      <p>
        <span className="font-semibold text-foreground/80">State:</span> {state}
      </p>
      <p>
        <span className="font-semibold text-foreground/80">Country:</span> {country}
      </p>
    </div>
  );
}

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

  const recent = showAll ? pins.slice(0, 10) : pins.slice(0, 5);

  return (
    <motion.div
      className="panel overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col gap-0 lg:flex-row">
        <div className="min-h-[220px] flex-1 border-b border-border lg:min-h-[260px] lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between px-3 py-2 sm:px-4">
            <div className="flex items-center gap-2">
              <Globe size={15} className="text-primary" />
              <p className="text-xs font-bold">Live World Map</p>
            </div>
            <div className="flex gap-2 text-[10px] font-semibold">
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
          <WorldGlobe3D
            pins={pins}
            focusPinId={active?.id ?? null}
            onPinSelect={(pin) => setActive(pin)}
            className="h-[220px] lg:h-[260px]"
          />
        </div>

        <div className="flex w-full shrink-0 flex-col gap-2 p-3 sm:p-4 lg:w-[240px] xl:w-[260px]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
            Locations (Country · State · District)
          </p>
          {recent.length === 0 ? (
            <p className="text-[11px] text-muted">
              Seed locations load shortly. Allow browser location to add your live pin.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {recent.map((p) => {
                const isActive = active?.id === p.id;
                const title = formatPlaceLabel(p);
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setActive(isActive ? null : p);
                      }}
                      className={`flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left transition hover:bg-surface-2 ${isActive ? "bg-surface-2 ring-1 ring-primary/20" : ""}`}
                    >
                      {p.type === "download" ? (
                        <Download size={12} className="mt-0.5 shrink-0 text-amber-500" />
                      ) : (
                        <MapPin size={12} className="mt-0.5 shrink-0 text-cyan-500" />
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[11px] font-medium">
                          {p.type === "download" ? "CV Download" : "Visitor"} · {title}
                        </span>
                        {isActive && <PlaceLines pin={p} />}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {pins.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="text-left text-[10px] font-semibold text-primary hover:underline"
            >
              {showAll ? "Show less" : `View more (${pins.length - 5})`}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
