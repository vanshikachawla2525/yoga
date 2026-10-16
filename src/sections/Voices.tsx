/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 12 — VOICES (Sample Testimonials Carousel)
 * Draggable horizontal carousel, large quotation typography, auto-advance,
 * counter, and thin progress bar. All cards labelled "Sample review".
 */

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS_DATA } from "../data/content";

export const Voices: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const current = TESTIMONIALS_DATA[activeIndex];

  return (
    <section
      id="voices-section"
      className="relative py-28 px-6 md:px-12 bg-[#111110] text-[#EFE9DF] border-b border-[#C8A45D]/15 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-mono text-[#C8A45D] tracking-widest">
              (11)
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C8A84] font-sans">
              Echoes of Stillness
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#EFE9DF] tracking-tight">
            Voices from the Quiet
          </h2>

          <span className="text-[11px] text-[#8C8A84] mt-2 font-serif italic">
            Sample review placeholders pending owner verification.
          </span>
        </div>

        {/* Carousel Card Container */}
        <div
          data-cursor="drag"
          className="cursor-drag relative min-h-[300px] sm:min-h-[340px] rounded-3xl bg-[#1B1A18] border border-[#C8A45D]/25 p-8 sm:p-14 flex flex-col justify-between shadow-2xl"
        >
          {/* Top Row: Sample Review Badge & Counter */}
          <div className="flex items-center justify-between mb-8">
            <span className="px-3 py-1 rounded-full bg-[#111110] border border-[#C8A45D]/30 text-[10px] uppercase tracking-widest text-[#C8A45D]">
              Sample Review
            </span>

            <span className="text-xs font-mono text-[#8C8A84] tabular-nums">
              0{activeIndex + 1} / 0{TESTIMONIALS_DATA.length}
            </span>
          </div>

          {/* Quotation text */}
          <div className="relative my-auto">
            <Quote size={40} className="text-[#C8A45D]/20 absolute -top-8 -left-4 -z-0" />
            <blockquote className="relative z-10 font-serif text-xl sm:text-2xl md:text-3xl text-[#EFE9DF] leading-snug font-light italic">
              "{current.quote}"
            </blockquote>
          </div>

          {/* Author info */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-8 pt-6 border-t border-[#C8A45D]/15">
            <div>
              <p className="font-sans font-medium text-sm text-[#EFE9DF]">
                {current.author}
              </p>
              <p className="text-xs text-[#8C8A84]">
                {current.role} · {current.outletUsed}
              </p>
              <span className="text-[11px] text-[#C8A45D] font-mono mt-0.5 block">
                Session: {current.sessionTaken}
              </span>
            </div>

            {/* Nav Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1
                  )
                }
                className="w-10 h-10 rounded-full border border-[#C8A45D]/30 flex items-center justify-center text-[#EFE9DF] hover:border-[#C8A45D] hover:text-[#C8A45D] transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() =>
                  setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length)
                }
                className="w-10 h-10 rounded-full border border-[#C8A45D]/30 flex items-center justify-center text-[#EFE9DF] hover:border-[#C8A45D] hover:text-[#C8A45D] transition-colors"
                aria-label="Next review"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
