/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
  speed?: number; // default 0.2
  archStyle?: boolean;
  caption?: string;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  width = 800,
  height = 1000,
  className = "",
  aspectRatio = "aspect-[3/4]",
  priority = false,
  speed = 0.2,
  archStyle = false,
  caption,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img || prefersReduced) return;

    const ctx = gsap.context(() => {
      // Scrub parallax translation -10% to +10%
      gsap.fromTo(
        img,
        { yPercent: -speed * 50 },
        {
          yPercent: speed * 50,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Clip path reveal on first view
      gsap.fromTo(
        container,
        { clipPath: "inset(12% 0% 12% 0%)", opacity: 0.8 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [speed, prefersReduced]);

  return (
    <div className={`relative group ${className}`}>
      <div
        ref={containerRef}
        data-cursor="view"
        className={`relative overflow-hidden w-full ${aspectRatio} ${
          archStyle ? "rounded-t-full rounded-b-xl" : "rounded-lg"
        } bg-[#1B1A18] border border-gold-hairline transition-all duration-500`}
      >
        {/* Subtle decorative gold hairline hover frame */}
        <div className="absolute inset-0 border border-[#C8A45D]/0 group-hover:border-[#C8A45D]/40 transition-colors duration-500 z-10 pointer-events-none rounded-[inherit]" />

        {/* Ambient warm gradient fallback container if image error */}
        {hasError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1B1A18] via-[#2A2621] to-[#111110]">
            <div className="w-10 h-10 rounded-full border border-[#C8A45D]/30 flex items-center justify-center mb-3 text-[#C8A45D]">
              <span className="font-serif italic text-lg">§</span>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#C8A45D]/80 font-sans">
              Sanctuary Atmosphere
            </p>
            <span className="text-[11px] text-[#8C8A84] mt-1 italic font-serif">
              {alt}
            </span>
          </div>
        ) : (
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? "eager" : "lazy"}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-[120%] object-cover -mt-[10%] will-change-transform transition-all duration-700 ease-out group-hover:scale-105 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Subtle vignette sheen */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111110]/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {caption && (
        <p className="mt-2 text-xs font-serif italic text-[#8C8A84] tracking-wide">
          {caption}
        </p>
      )}
    </div>
  );
};
