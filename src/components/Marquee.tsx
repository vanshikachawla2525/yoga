/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number; // base speed in seconds per loop (default 22)
  reverse?: boolean;
  className?: string;
  outlineStyle?: boolean;
  pauseOnHover?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  speed = 24,
  reverse = false,
  className = "",
  outlineStyle = false,
  pauseOnHover = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReduced) return;

    // Seamless infinite animation
    const dir = reverse ? 1 : -1;
    const tl = gsap.to(track, {
      xPercent: dir * 50,
      ease: "none",
      duration: speed,
      repeat: -1,
    });

    // Reactive to scroll velocity
    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        // Boost timeScale proportionally to scroll velocity
        const speedMultiplier = 1 + Math.min(Math.abs(velocity) / 300, 3.5);
        // If scrolling opposite direction, temporarily reverse
        const scrollDir = velocity < 0 ? -1 : 1;
        gsap.to(tl, {
          timeScale: speedMultiplier * (scrollDir === -1 ? -1 : 1),
          duration: 0.3,
          overwrite: "auto",
          onComplete: () => {
            gsap.to(tl, { timeScale: 1, duration: 1.2, ease: "power2.out" });
          },
        });
      },
    });

    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const onEnter = () => tl.pause();
      const onLeave = () => tl.play();
      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);

      return () => {
        container.removeEventListener("mouseenter", onEnter);
        container.removeEventListener("mouseleave", onLeave);
        tl.kill();
        trigger.kill();
      };
    }

    return () => {
      tl.kill();
      trigger.kill();
    };
  }, [speed, reverse, pauseOnHover, prefersReduced]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden select-none whitespace-nowrap flex w-full ${className}`}
    >
      <div
        ref={trackRef}
        className={`flex shrink-0 will-change-transform items-center ${
          outlineStyle ? "font-serif text-transparent [-webkit-text-stroke:1px_rgba(200,164,93,0.35)]" : ""
        }`}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    </div>
  );
};
