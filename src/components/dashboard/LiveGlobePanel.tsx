"use client";

import { motion } from "framer-motion";
import { Globe, Users, WifiOff } from "lucide-react";
import { useLiveStats } from "@/hooks/useLiveStats";

type RegionId = "na" | "sa" | "eu" | "af" | "as" | "oc";

const COUNTRY_TO_REGION: Record<string, RegionId> = {
  // North America
  US: "na", CA: "na", MX: "na",
  // South America
  BR: "sa", AR: "sa", CL: "sa", CO: "sa", PE: "sa",
  // Europe
  GB: "eu", UK: "eu", DE: "eu", FR: "eu", NL: "eu", ES: "eu", IT: "eu",
  PL: "eu", SE: "eu", NO: "eu", FI: "eu", DK: "eu", CH: "eu", AT: "eu",
  BE: "eu", IE: "eu", PT: "eu", CZ: "eu", RO: "eu", UA: "eu",
  // Africa
  ZA: "af", NG: "af", KE: "af", EG: "af", MA: "af", GH: "af", ET: "af",
  // Oceania
  AU: "oc", NZ: "oc",
};

function regionForCountry(code: string): RegionId {
  return COUNTRY_TO_REGION[code.toUpperCase()] ?? "as";
}

function countryCodeToFlag(code: string): string {
  const upper = code.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(upper)) return "🌐";
  const offset = 127397;
  return String.fromCodePoint(upper.charCodeAt(0) + offset, upper.charCodeAt(1) + offset);
}

const regionDisplayNames =
  typeof Intl !== "undefined" && typeof Intl.DisplayNames === "function"
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

function formatCountryName(code: string): string {
  const upper = code.trim().toUpperCase();
  try {
    return regionDisplayNames?.of(upper) || upper;
  } catch {
    return upper;
  }
}

const CONTINENTS: Array<{ id: RegionId; label: string; d: string; cx: number; cy: number }> = [
  {
    id: "na",
    label: "North America",
    d: "M78,52 L145,42 L205,58 L220,92 L185,126 L160,154 L134,150 L118,122 L82,98 Z",
    cx: 148,
    cy: 95,
  },
  {
    id: "sa",
    label: "South America",
    d: "M172,162 L212,168 L234,205 L212,262 L184,274 L172,226 Z",
    cx: 202,
    cy: 214,
  },
  {
    id: "eu",
    label: "Europe",
    d: "M310,48 L382,42 L412,68 L398,104 L350,112 L316,96 Z",
    cx: 362,
    cy: 78,
  },
  {
    id: "af",
    label: "Africa",
    d: "M318,122 L384,122 L418,164 L394,234 L354,244 L330,192 L306,154 Z",
    cx: 364,
    cy: 178,
  },
  {
    id: "as",
    label: "Asia & Middle East",
    d: "M416,52 L560,46 L618,84 L596,142 L538,162 L494,148 L458,158 L416,120 Z",
    cx: 512,
    cy: 105,
  },
  {
    id: "oc",
    label: "Oceania",
    d: "M542,196 L608,196 L628,236 L584,254 L544,236 Z",
    cx: 584,
    cy: 224,
  },
];

export function LiveGlobePanel() {
  const { countries, online, isLoading, isError, isLive } = useLiveStats();

  const entries = Object.entries(countries)
    .map(([code, count]) => ({
      code,
      name: formatCountryName(code),
      flag: countryCodeToFlag(code),
      count,
      region: regionForCountry(code),
    }))
    .sort((a, b) => b.count - a.count);

  const totalCountryVisits = entries.reduce((sum, item) => sum + item.count, 0);
  const regionTotals = entries.reduce<Record<RegionId, number>>(
    (acc, item) => {
      acc[item.region] = (acc[item.region] ?? 0) + item.count;
      return acc;
    },
    { na: 0, sa: 0, eu: 0, af: 0, as: 0, oc: 0 }
  );

  return (
    <motion.div
      className="panel overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2.5 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <Globe size={15} className="shrink-0 text-primary" />
          <p className="truncate text-xs font-bold sm:text-sm">Live Visitor World Map</p>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-[11px] font-semibold">
          {isLive && (
            <span className="inline-flex items-center gap-1 text-emerald-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Live
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-muted">
            <Users size={12} className="text-primary" />
            {isError ? "—" : isLoading ? "…" : `${online ?? 0} online now`}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-[1.2fr_1fr]">
          <div className="h-[210px] animate-pulse rounded-xl bg-surface-2" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-9 animate-pulse rounded-lg bg-surface-2" />
            ))}
          </div>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center gap-2 px-4 py-10 text-center">
          <WifiOff size={20} className="text-muted" />
          <p className="text-sm font-semibold text-foreground">Visitor geography unavailable (—)</p>
          <p className="text-xs text-muted">
            Could not reach the stats service right now. Live numbers will resume automatically.
          </p>
        </div>
      ) : entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 px-4 py-10 text-center">
          <Globe size={24} className="text-primary/70" />
          <p className="text-sm font-semibold text-foreground">Waiting for first visitors</p>
          <p className="max-w-md text-xs text-muted">
            Country counts are recorded from real Vercel edge geolocation headers (`x-vercel-ip-country`) without mock coordinates.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr]">
          {/* Vector regional world map highlighting real visited regions */}
          <div className="relative flex items-center justify-center bg-slate-950/95 p-3 sm:p-4">
            <svg
              viewBox="0 0 680 310"
              role="img"
              aria-label="World regions with recorded portfolio visitors"
              className="h-[200px] w-full max-w-[540px] sm:h-[230px]"
            >
              <defs>
                <pattern id="vv-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path
                    d="M 24 0 L 0 0 0 24"
                    fill="none"
                    stroke="rgba(148,163,184,0.08)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="680" height="310" rx="12" fill="url(#vv-grid)" />
              {CONTINENTS.map((c) => {
                const count = regionTotals[c.id] ?? 0;
                const active = count > 0;
                return (
                  <g key={c.id}>
                    <path
                      d={c.d}
                      fill={active ? "rgba(34, 211, 238, 0.28)" : "rgba(148, 163, 184, 0.14)"}
                      stroke={active ? "#22d3ee" : "rgba(148, 163, 184, 0.28)"}
                      strokeWidth={active ? 1.8 : 1}
                    />
                    {active && (
                      <>
                        <circle cx={c.cx} cy={c.cy} r={11} fill="rgba(34, 211, 238, 0.22)" />
                        <circle cx={c.cx} cy={c.cy} r={4.5} fill="#22d3ee" />
                        <text
                          x={c.cx}
                          y={c.cy - 14}
                          textAnchor="middle"
                          className="fill-cyan-200 text-[10px] font-bold"
                        >
                          {count}
                        </text>
                      </>
                    )}
                  </g>
                );
              })}
            </svg>
            <span className="absolute bottom-2 right-3 text-[10px] text-slate-400">
              {entries.length} {entries.length === 1 ? "country" : "countries"} recorded
            </span>
          </div>

          {/* Real country breakdown */}
          <div className="flex max-h-[260px] flex-col border-t border-border md:border-t-0 md:border-l">
            <div className="shrink-0 border-b border-border px-3.5 py-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                Visitors by Country
              </p>
            </div>
            <ul className="min-h-0 flex-1 divide-y divide-border/60 overflow-y-auto">
              {entries.map((item) => {
                const pct =
                  totalCountryVisits > 0
                    ? Math.round((item.count / totalCountryVisits) * 100)
                    : 0;
                return (
                  <li key={item.code} className="px-3.5 py-2.5">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="flex min-w-0 items-center gap-2 font-semibold text-foreground">
                        <span aria-hidden>{item.flag}</span>
                        <span className="truncate">{item.name}</span>
                        <span className="text-[10px] font-normal text-muted">({item.code})</span>
                      </span>
                      <span className="shrink-0 tabular-nums font-bold text-primary">
                        {item.count.toLocaleString("en-IN")} · {pct}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${Math.max(4, pct)}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </motion.div>
  );
}
