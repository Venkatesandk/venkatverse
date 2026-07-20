/** Convert latitude/longitude to a point on a sphere (radius r). */
export function latLngToVector3(lat: number, lng: number, radius: number) {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  return {
    x: radius * Math.cos(latRad) * Math.cos(lngRad),
    y: radius * Math.sin(latRad),
    z: radius * Math.cos(latRad) * Math.sin(lngRad),
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
