"use client";

import { useCallback, useEffect, useState } from "react";

export function useAdminSession() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [configured, setConfigured] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/session");
      const data = await res.json();
      setIsAdmin(Boolean(data.admin));
      setConfigured(Boolean(data.configured));
    } catch {
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = async (secret: string) => {
    const res = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Login failed");
    setIsAdmin(true);
    return true;
  };

  const logout = async () => {
    await fetch("/api/admin/session", { method: "DELETE" });
    setIsAdmin(false);
  };

  return { isAdmin, configured, loading, login, logout, refresh };
}
