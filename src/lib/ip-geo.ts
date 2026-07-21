import { validCoords } from "@/lib/geo";

/** Extract client IP from common proxy headers. */
export function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return null;
}

function isPrivateIp(ip: string) {
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)
  );
}

/**
 * Approximate lat/lng from public IP when browser geolocation is unavailable.
 * Uses ipapi.co (no key). Returns null on private/local IPs or failures.
 */
export async function geoFromIp(ip: string | null): Promise<{ lat: number; lng: number } | null> {
  if (!ip || isPrivateIp(ip)) return null;

  try {
    const res = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(3500),
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { latitude?: number; longitude?: number; error?: boolean };
    if (data.error) return null;
    return validCoords(data.latitude, data.longitude);
  } catch {
    return null;
  }
}
