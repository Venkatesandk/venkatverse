"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { applyThemeVars, DEFAULT_THEME_ID, getThemeById, THEME_PRESETS } from "@/lib/themes";
import { useMounted } from "@/hooks/useMounted";

const STORAGE_KEY = "vv-theme";
const THEME_EVENT = "vv-theme-change";

function subscribeTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

function getThemeSnapshot(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? getThemeById(stored).id : DEFAULT_THEME_ID;
  } catch {
    return DEFAULT_THEME_ID;
  }
}

export function useTheme() {
  const mounted = useMounted();
  const themeId = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    () => DEFAULT_THEME_ID
  );

  useEffect(() => {
    applyThemeVars(themeId);
  }, [themeId]);

  const setThemeId = useCallback((id: string) => {
    const theme = getThemeById(id);
    try {
      localStorage.setItem(STORAGE_KEY, theme.id);
    } catch {
      /* ignore storage errors */
    }
    applyThemeVars(theme.id);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  /** Quick toggle between default light + default dark theme */
  const toggleTheme = useCallback(() => {
    const darkIds = THEME_PRESETS.filter((t) => t.category === "dark").map((t) => t.id);
    const isDark = darkIds.includes(themeId);
    setThemeId(isDark ? DEFAULT_THEME_ID : darkIds[0] ?? "cyan-dark");
  }, [themeId, setThemeId]);

  const current = getThemeById(themeId);
  const isDark = current.category === "dark";

  return {
    themeId,
    setThemeId,
    toggleTheme,
    themes: THEME_PRESETS,
    current,
    isDark,
    mounted,
    /** @deprecated use isDark */
    theme: isDark ? ("dark" as const) : ("light" as const),
  };
}
