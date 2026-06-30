"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const isDesktop = useMediaQuery("(pointer: fine)");

  useEffect(() => {
    if (isDesktop) {
      document.body.classList.add("custom-cursor");
      return () => document.body.classList.remove("custom-cursor");
    }
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9998] mix-blend-difference"
        animate={{ x: x - 8, y: y - 8 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className="h-4 w-4 rounded-full border-2 border-white" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-[9997]"
        animate={{ x: x - 20, y: y - 20 }}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.8 }}
      >
        <div
          className="h-10 w-10 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, var(--cursor-glow) 0%, transparent 70%)",
          }}
        />
      </motion.div>
    </>
  );
}
