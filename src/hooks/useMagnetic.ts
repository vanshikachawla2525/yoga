/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect } from "react";
import gsap from "gsap";

export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(strength = 0.35, radius = 80) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check pointer fine support
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (dist < radius) {
        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;
        xTo(deltaX);
        yTo(deltaY);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [strength, radius]);

  return ref;
}
