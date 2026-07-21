/** Convert latitude/longitude to a Three.js SphereGeometry UV-aligned point.
 * Equirectangular textures (NASA Blue Marble style): u=0 at lon=-180 (−X), u=0.5 at lon=0 (+X).
 */
export function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = ((90 - lat) * Math.PI) / 180; // polar angle from +Y
  const theta = ((lng + 180) * Math.PI) / 180; // azimuth matching SphereGeometry UVs

  return {
    x: -radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
}

export function isValidCoord(lat?: number | null, lng?: number | null): lat is number {
  return (
    typeof lat === "number" &&
    typeof lng === "number" &&
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

/** Returns validated coordinates when both lat and lng are in range. */
export function validCoords(
  lat?: number | null,
  lng?: number | null
): { lat: number; lng: number } | null {
  if (
    typeof lat !== "number" ||
    typeof lng !== "number" ||
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    lat < -90 ||
    lat > 90 ||
    lng < -180 ||
    lng > 180
  ) {
    return null;
  }
  return { lat, lng };
}

export function formatPlaceLabel(pin: {
  country?: string;
  state?: string;
  district?: string;
  label?: string;
  lat: number;
  lng: number;
}) {
  if (pin.district || pin.state || pin.country) {
    return [pin.district, pin.state, pin.country].filter(Boolean).join(", ");
  }
  if (pin.label && !pin.label.includes("°")) return pin.label;
  return `${pin.lat.toFixed(2)}°, ${pin.lng.toFixed(2)}°`;
}
