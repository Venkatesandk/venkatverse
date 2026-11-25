"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import type { LiveStatsPayload } from "@/lib/redis-stats";

const SESSION_ID_KEY = "vv_live_session_id";
const VISITED_FLAG_KEY = "vv_stats_visited_v1";
const LIVE_FRESH_WINDOW_MS = 30_000;
const HEARTBEAT_INTERVAL_MS = 30_000;
const REFRESH_INTERVAL_MS = 15_000;

function getOrCreateSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_ID_KEY);
    if (!id || !/^[a-zA-Z0-9_-]{8,64}$/.test(id)) {
      id =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID().replace(/-/g, "")
          : `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`;
      sessionStorage.setItem(SESSION_ID_KEY, id);
    }
    return id;
  } catch {
    return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`;
  }
}

async function fetchStats(url: string): Promise<LiveStatsPayload> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Stats HTTP ${res.status}`);
  }
  return (await res.json()) as LiveStatsPayload;
}

/**
 * Shared SWR hook reading /api/stats every 15s so the Hero card,
 * Career Highlights, and World Map share one cached source of truth.
 */
export function useLiveStats() {
  const [lastSuccessAt, setLastSuccessAt] = useState<number | null>(null);
  const [nowMs, setNowMs] = useState<number>(0);

  const { data, error, isLoading, mutate } = useSWR<LiveStatsPayload>(
    "/api/stats",
    fetchStats,
    {
      refreshInterval: REFRESH_INTERVAL_MS,
      revalidateOnFocus: true,
      dedupingInterval: 5000,
      shouldRetryOnError: true,
      errorRetryCount: 2,
      onSuccess: () => {
        const ts = Date.now();
        setLastSuccessAt(ts);
        setNowMs(ts);
      },
    }
  );

  // Re-evaluate 30s freshness window cleanly every 5s
  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 5000);
    return () => window.clearInterval(id);
  }, []);

  // Revalidate immediately after verified resume download
  useEffect(() => {
    const onDownload = () => {
      void mutate();
    };
    window.addEventListener("resume-downloaded", onDownload);
    return () => window.removeEventListener("resume-downloaded", onDownload);
  }, [mutate]);

  const isError = Boolean(error);
  const isLive =
    !isError &&
    lastSuccessAt !== null &&
    nowMs > 0 &&
    nowMs - lastSuccessAt <= LIVE_FRESH_WINDOW_MS;

  return {
    data,
    total: isError ? null : (data?.total ?? null),
    today: isError ? null : (data?.today ?? null),
    online: isError ? null : (data?.online ?? null),
    downloads: isError ? null : (data?.downloads ?? null),
    countries: isError ? {} : (data?.countries ?? {}),
    isLoading: isLoading && !data && !error,
    isError,
    isLive,
    mutate,
  };
}

/**
 * Mount once at page root:
 * 1. Records a single visit per browser session via sessionStorage flag.
 * 2. Sends a heartbeat every 30s while document.visibilityState === 'visible'.
 */
export function LiveStatsTracker() {
  const { mutate } = useLiveStats();

  useEffect(() => {
    const sessionId = getOrCreateSessionId();

    const recordOnce = async () => {
      try {
        if (!sessionStorage.getItem(VISITED_FLAG_KEY)) {
          const res = await fetch("/api/stats/visit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
            cache: "no-store",
          });
          if (res.ok) {
            sessionStorage.setItem(VISITED_FLAG_KEY, "1");
            void mutate();
          }
        }
      } catch {
        /* ignore network errors */
      }
    };

    const sendHeartbeat = () => {
      if (document.visibilityState !== "visible") return;
      void fetch("/api/stats/heartbeat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
        cache: "no-store",
        keepalive: true,
      }).catch(() => {});
    };

    void recordOnce();
    sendHeartbeat();

    const interval = window.setInterval(sendHeartbeat, HEARTBEAT_INTERVAL_MS);
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        sendHeartbeat();
        void mutate();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [mutate]);

  return null;
}

