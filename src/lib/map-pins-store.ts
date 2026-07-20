import { appendFile, mkdir, readFile } from "fs/promises";
import path from "path";
import { getSeedDataDir, getWritableDataDir } from "@/lib/data-path";
import { isValidCoord, validCoords } from "@/lib/geo";
import { reverseGeocode } from "@/lib/reverse-geocode";

export interface MapPin {
  id: string;
  type: "visit" | "download";
  lat: number;
  lng: number;
  label?: string;
  country?: string;
  state?: string;
  district?: string;
  at: string;
}

const PINS_FILE = () => path.join(getWritableDataDir(), "map-pins.jsonl");
const SEED_FILE = () => path.join(process.cwd(), "src", "data", "map-pins.seed.json");

async function readSeedPins(): Promise<MapPin[]> {
  try {
    const raw = await readFile(SEED_FILE(), "utf8");
    const parsed = JSON.parse(raw) as MapPin[];
    return Array.isArray(parsed) ? parsed.filter((p) => isValidCoord(p.lat, p.lng)) : [];
  } catch {
    return [];
  }
}

async function readRuntimePins(limit = 80): Promise<MapPin[]> {
  try {
    const raw = await readFile(PINS_FILE(), "utf8");
    const lines = raw.trim().split("\n").filter(Boolean);
    const pins: MapPin[] = [];
    for (const line of lines.slice(-limit * 2)) {
      try {
        const p = JSON.parse(line) as MapPin;
        if (isValidCoord(p.lat, p.lng)) pins.push(p);
      } catch {
        /* skip */
      }
    }
    return pins.slice(-limit);
  } catch {
    return [];
  }
}

async function readDownloadPins(limit = 40): Promise<MapPin[]> {
  const dirs = [getWritableDataDir(), getSeedDataDir()];
  for (const dir of dirs) {
    try {
      const raw = await readFile(path.join(dir, "resume-leads.jsonl"), "utf8");
      const lines = raw.trim().split("\n").filter(Boolean);
      const pins: MapPin[] = [];
      for (const line of lines.slice(-limit * 2)) {
        try {
          const lead = JSON.parse(line) as {
            name?: string;
            downloadedAt?: string;
            meta?: { lat?: number | null; lng?: number | null };
          };
          const lat = lead.meta?.lat;
          const lng = lead.meta?.lng;
          const coords = validCoords(lat, lng);
          if (!coords) continue;
          pins.push({
            id: `dl_${lead.downloadedAt ?? Date.now()}`,
            type: "download",
            lat: coords.lat,
            lng: coords.lng,
            label: "Resume download",
            at: lead.downloadedAt ?? new Date().toISOString(),
          });
        } catch {
          /* skip */
        }
      }
      if (pins.length) return pins.slice(-limit);
    } catch {
      /* try next */
    }
  }
  return [];
}

export async function recordMapPin(input: Omit<MapPin, "id" | "at"> & { label?: string }) {
  if (!isValidCoord(input.lat, input.lng)) return null;

  let country = input.country;
  let state = input.state;
  let district = input.district;
  let label = input.label;

  if (!country && !state && !district) {
    const place = await reverseGeocode(input.lat, input.lng);
    if (place) {
      country = place.country;
      state = place.state;
      district = place.district;
      label = place.label;
    }
  }

  const pin: MapPin = {
    id: `${input.type}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    type: input.type,
    lat: input.lat,
    lng: input.lng,
    label,
    country,
    state,
    district,
    at: new Date().toISOString(),
  };

  try {
    const dir = getWritableDataDir();
    await mkdir(dir, { recursive: true });
    await appendFile(PINS_FILE(), JSON.stringify(pin) + "\n", "utf8");
  } catch (error) {
    console.warn("[map-pins] persist skipped:", error);
  }

  return pin;
}

/** Dedupe nearby pins — keep latest per ~0.5° cell */
function dedupePins(pins: MapPin[]): MapPin[] {
  const map = new Map<string, MapPin>();
  for (const p of pins) {
    const key = `${p.type}_${Math.round(p.lat * 2)}_${Math.round(p.lng * 2)}`;
    const existing = map.get(key);
    if (!existing || new Date(p.at) > new Date(existing.at)) {
      map.set(key, p);
    }
  }
  return [...map.values()].sort(
    (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()
  );
}

async function enrichMissingPlaces(pins: MapPin[], maxLookups = 8): Promise<MapPin[]> {
  const out: MapPin[] = [];
  let lookups = 0;

  for (const pin of pins) {
    if (pin.country || pin.state || pin.district) {
      out.push(pin);
      continue;
    }
    if (lookups >= maxLookups) {
      out.push(pin);
      continue;
    }
    lookups++;
    const place = await reverseGeocode(pin.lat, pin.lng);
    if (place) {
      out.push({
        ...pin,
        country: place.country,
        state: place.state,
        district: place.district,
        label: place.label,
      });
    } else {
      out.push(pin);
    }
  }

  return out;
}

export async function getMapPins(limit = 60) {
  const [seed, runtime, downloads] = await Promise.all([
    readSeedPins(),
    readRuntimePins(limit),
    readDownloadPins(limit),
  ]);

  const merged = dedupePins([...seed, ...runtime, ...downloads]).slice(0, limit);
  const enriched = await enrichMissingPlaces(merged);
  const visits = enriched.filter((p) => p.type === "visit").length;
  const dls = enriched.filter((p) => p.type === "download").length;

  return { pins: enriched, visits, downloads: dls, total: enriched.length };
}
