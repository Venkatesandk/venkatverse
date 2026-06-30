"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useGsapScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 90%" },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    });

    gsap.utils.toArray<HTMLElement>(".gsap-stagger").forEach((group) => {
      const children = group.querySelectorAll(".gsap-stagger-item");
      if (!children.length) return;
      gsap.from(children, {
        scrollTrigger: { trigger: group, start: "top 88%" },
        y: 24,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
}
