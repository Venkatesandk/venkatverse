"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** SSR-safe hydration check without setState-in-effect. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

