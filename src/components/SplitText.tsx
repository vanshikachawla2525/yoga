/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Reusable SplitText component without paid GSAP plugins:
 * - "lines": line mask rise inside overflow-hidden mask
 * - "chars": char cascade with slight rotateX and blur-to-sharp
 * - "scrub": scroll-scrub fill (15% to 100% opacity word-by-word)
 */

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  variant?: "lines" | "chars" | "scrub";
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
  triggerOnLoad?: boolean;
  delay?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({
  children,
  variant = "lines",
  className = "",
  tag: Tag = "div",
  triggerOnLoad = false,
  delay = 0,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => setFontsLoaded(true));
    } else {
      setFontsLoaded(true);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReduced || !fontsLoaded) return;

    let ctx = gsap.context(() => {
      if (variant === "lines") {
        const lineWrappers = el.querySelectorAll(".split-line-inner");
        const animation = gsap.fromTo(
          lineWrappers,
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power4.out",
            delay,
            paused: !triggerOnLoad
          }
        );

        if (!triggerOnLoad) {
          ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: () => animation.play()
          });
        }
      } else if (variant === "chars") {
        const chars = el.querySelectorAll(".split-char");
        const animation = gsap.fromTo(
          chars,
          {
            opacity: 0,
            yPercent: 40,
            rotateX: 45,
            filter: "blur(6px)"
          },
          {
            opacity: 1,
            yPercent: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.02,
            ease: "power3.out",
            delay,
            paused: !triggerOnLoad
          }
        );

        if (!triggerOnLoad) {
          ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: () => animation.play()
          });
        }
      } else if (variant === "scrub") {
        const words = el.querySelectorAll(".split-word");
        gsap.fromTo(
          words,
          { opacity: 0.18, color: "#8C8A84" },
          {
            opacity: 1,
            color: "#EFE9DF",
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              end: "bottom 35%",
              scrub: 0.6
            }
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [variant, triggerOnLoad, delay, prefersReduced, fontsLoaded, children]);

  if (prefersReduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  // Render variant structures
  if (variant === "lines") {
    // Split on newlines if present, or split words into wrapped line blocks
    const lines = children.split("\n");
    return (
      <Tag ref={containerRef as any} className={className}>
        {lines.map((line, idx) => (
          <span key={idx} className="block overflow-hidden pb-1">
            <span className="split-line-inner inline-block will-change-transform">
              {line}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  if (variant === "chars") {
    const chars = Array.from(children);
    return (
      <Tag ref={containerRef as any} className={`${className} perspective-500`}>
        {chars.map((char, idx) => (
          <span
            key={idx}
            className="split-char inline-block will-change-transform"
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </Tag>
    );
  }

  if (variant === "scrub") {
    const words = children.split(" ");
    return (
      <Tag ref={containerRef as any} className={className}>
        {words.map((word, idx) => (
          <span key={idx} className="split-word inline-block mr-[0.28em] transition-colors duration-150">
            {word}
          </span>
        ))}
      </Tag>
    );
  }

  return <Tag className={className}>{children}</Tag>;
};
