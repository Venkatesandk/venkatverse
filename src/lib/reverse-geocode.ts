import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { getWritableDataDir } from "@/lib/data-path";

export interface GeoPlace {
  country: string;
  state: string;
  district: string;
  label: string;
}

const CACHE_FILE = () => path.join(getWritableDataDir(), "geocode-cache.json");

type CacheMap = Record<string, GeoPlace>;

function cacheKey(lat: number, lng: number) {
  return `${lat.toFixed(2)}_${lng.toFixed(2)}`;
}

async function readCache(): Promise<CacheMap> {
  try {
    const raw = await readFile(CACHE_FILE(), "utf8");
    return JSON.parse(raw) as CacheMap;
  } catch {
    return {};
  }
}

async function writeCache(cache: CacheMap) {
  try {
    const dir = getWritableDataDir();
    await mkdir(dir, { recursive: true });
    await writeFile(CACHE_FILE(), JSON.stringify(cache), "utf8");
  } catch {
    /* skip */
  }
}

function parseNominatim(data: {
  address?: Record<string, string>;
}): GeoPlace | null {
  const a = data.address;
  if (!a) return null;

  const country = a.country ?? "";
  const state = a.state ?? a.region ?? a.province ?? "";
  const district =
    a.state_district ??
    a.county ??
    a.city_district ??
    a.district ??
    a.city ??
    a.town ??
    a.village ??
    "";

  if (!country && !state && !district) return null;

  const parts = [district, state, country].filter(Boolean);
  return {
    country,
    state,
    district,
    label: parts.join(", "),
  };
}

/** Reverse geocode lat/lng → country, state, district (cached + Nominatim). */
export async function reverseGeocode(lat: number, lng: number): Promise<GeoPlace | null> {
  const key = cacheKey(lat, lng);
  const cache = await readCache();
  if (cache[key]) return cache[key];

  try {
    const url = new URL("https://nominatim.openstreetmap.org/reverse");
    url.searchParams.set("lat", String(lat));
    url.searchParams.set("lon", String(lng));
    url.searchParams.set("format", "json");
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("zoom", "12");
    url.searchParams.set("accept-language", "en");

    const res = await fetch(url.toString(), {
      headers: {
        "User-Agent": "VenkatversePortfolio/1.0 (contact@venkatverse.com)",
        Accept: "application/json",
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) return null;

    const data = (await res.json()) as { address?: Record<string, string> };
    const place = parseNominatim(data);
    if (place) {
      cache[key] = place;
      await writeCache(cache);
    }
    return place;
  } catch {
    return null;
  }
}