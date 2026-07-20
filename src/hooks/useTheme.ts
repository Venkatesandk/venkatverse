"use client";

import { useCallback, useEffect, useState } from "react";
import { applyThemeVars, DEFAULT_THEME_ID, getThemeById, THEME_PRESETS } from "@/lib/themes";

const STORAGE_KEY = "vv-theme";

export function useTheme() {
  const [themeId, setThemeIdState] = useState(DEFAULT_THEME_ID);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial = stored && getThemeById(stored) ? stored : DEFAULT_THEME_ID;
    setThemeIdState(initial);
    applyThemeVars(initial);
  }, []);

  const setThemeId = useCallback((id: string) => {
    const theme = getThemeById(id);
    setThemeIdState(theme.id);
    localStorage.setItem(STORAGE_KEY, theme.id);
    applyThemeVars(theme.id);
  }, []);

  /** Quick toggle between first light + first dark theme */
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
