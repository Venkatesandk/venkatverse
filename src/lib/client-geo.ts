"use client";

export interface ClientGeo {
  lat: number | null;
  lng: number | null;
  accuracy: number | null;
  timezone?: string;
}

function getGeoLocation(): Promise<ClientGeo> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ lat: null, lng: null, accuracy: null });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      () =>
        resolve({
          lat: null,
          lng: null,
          accuracy: null,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      { enableHighAccuracy: false, timeout: 6000, maximumAge: 300_000 }
    );
  });
}

/** Best-effort visitor geo — non-blocking, cached per session. */
export async function collectClientGeo(): Promise<ClientGeo> {
  const cached = sessionStorage.getItem("vv_client_geo");
  if (cached) {
    try {
      return JSON.parse(cached) as ClientGeo;
    } catch {
      /* refresh */
    }
  }
  const geo = await getGeoLocation();
  sessionStorage.setItem("vv_client_geo", JSON.stringify(geo));
  return geo;
}
