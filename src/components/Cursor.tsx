/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>("");
  const [cursorState, setCursorState] = useState<"default" | "hover" | "view" | "drag" | "book" | "text">("default");
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // Only enable on fine pointer desktop devices
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // QuickTo for smooth lag
    const ringXTo = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ringYTo = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      // Instant dot
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      // Lagging ring
      ringXTo(e.clientX);
      ringYTo(e.clientY);

      // Contextual detection from element attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const closestInteractive = target.closest("button, a, input, select, [role='button']");
      const closestImage = target.closest("[data-cursor='view'], .cursor-view");
      const closestDrag = target.closest("[data-cursor='drag'], .cursor-drag");
      const closestBook = target.closest("[data-cursor='book'], .cursor-book");
      const isSelectingText = window.getSelection()?.toString().length ?? 0 > 0;

      if (isSelectingText) {
        setCursorState("text");
        setCursorText("");
      } else if (closestBook) {
        setCursorState("book");
        setCursorText("BOOK");
      } else if (closestDrag) {
        setCursorState("drag");
        setCursorText("DRAG");
      } else if (closestImage) {
        setCursorState("view");
        setCursorText("VIEW");
      } else if (closestInteractive) {
        setCursorState("hover");
        setCursorText("");
      } else {
        setCursorState("default");
        setCursorText("");
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 700);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      gsap.killTweensOf(ring);
    };
  }, []);

  return (
    <>
      {/* Click ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="fixed pointer-events-none rounded-full border border-[#C8A45D] z-[9990] animate-[ping_0.7s_cubic-bezier(0,0,0.2,1)_forwards]"
          style={{
            left: r.x,
            top: r.y,
            width: 24,
            height: 24,
            transform: "translate(-50%, -50%)"
          }}
        />
      ))}

      {/* Immediate small dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#C8A45D] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />

      {/* Lagging ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-sans uppercase font-medium tracking-widest transition-all duration-300 ease-out hidden md:flex ${
          cursorState === "hover"
            ? "w-[72px] h-[72px] bg-[#C8A45D]/15 border border-[#C8A45D]/60 mix-blend-difference"
            : cursorState === "view"
            ? "w-[96px] h-[96px] bg-[#111110]/85 border border-[#C8A45D] text-[11px] text-[#C8A45D] backdrop-blur-sm"
            : cursorState === "drag"
            ? "w-[80px] h-[80px] bg-[#111110]/85 border border-[#C8A45D] text-[10px] text-[#C8A45D] backdrop-blur-sm"
            : cursorState === "book"
            ? "w-[84px] h-[84px] bg-[#C8A45D] text-[#111110] font-bold text-[11px] shadow-lg shadow-[#C8A45D]/30"
            : cursorState === "text"
            ? "w-4 h-4 border border-[#C8A45D]/40"
            : "w-9 h-9 border border-[#C8A45D]/50"
        }`}
      >
        {cursorText && (
          <span className="select-none pointer-events-none scale-100 animate-in fade-in zoom-in-95 duration-200">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};
