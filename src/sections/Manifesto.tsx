/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 03 — MANIFESTO (scroll-scrub text)
 * Warm Bone section with word-by-word scroll fill,
 * floating parallax photos, and "Meet the reset →" CTA.
 */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { IMAGES } from "../data/content";
import { useSession } from "../context/SessionContext";

gsap.registerPlugin(ScrollTrigger);

export const Manifesto: React.FC = () => {
  const { scrollToSection } = useSession();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);
  const photo3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    const ctx = gsap.context(() => {
      // Word scrub fill
      const words = textEl.querySelectorAll(".manifesto-word");
      gsap.fromTo(
        words,
        { opacity: 0.16, color: "#8C8A84" },
        {
          opacity: 1,
          color: "#111110",
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        }
      );

      // Parallax floats for the 3 side photos
      if (photo1Ref.current) {
        gsap.fromTo(
          photo1Ref.current,
          { y: 80, rotate: -3 },
          {
            y: -120,
            rotate: 2,
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
          }
        );
      }

      if (photo2Ref.current) {
        gsap.fromTo(
          photo2Ref.current,
          { y: 140, rotate: 4 },
          {
            y: -80,
            rotate: -2,
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.4 },
          }
        );
      }

      if (photo3Ref.current) {
        gsap.fromTo(
          photo3Ref.current,
          { y: 60, scale: 0.95 },
          {
            y: -140,
            scale: 1.05,
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.8 },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const rawText =
    "Modern work does not break you with a single catastrophic event. It wears you down in the imperceptible hum: seventy-two unread notifications, back-to-back video calls, the constant posture of alertness. We believe you do not always need a two-week retreat in the Himalayas to reclaim your mind. You need five minutes of deliberate, sacred quiet right here in the pulse of Gurugram. When you step into our space, the clock stops ticking for the outside world. Sound slows down your pulse. Skilled touch unwinds your neck. You take a full, unobstructed breath. And you return to your life grounded.";

  const words = rawText.split(" ");

  return (
    <section
      id="manifesto-section"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 md:px-12 bg-[#EFE9DF] text-[#111110] overflow-hidden select-none"
    >
      {/* Floating Photo 1 (Top Left) */}
      <div
        ref={photo1Ref}
        className="absolute -left-6 top-16 w-36 sm:w-48 md:w-56 aspect-[3/4] rounded-2xl overflow-hidden border border-[#B5845A]/30 shadow-xl hidden sm:block pointer-events-none opacity-85"
      >
        <img
          src={IMAGES.teaLounge}
          alt="Quiet tea sanctuary"
          className="w-full h-full object-cover filter sepia-[0.2]"
        />
      </div>

      {/* Floating Photo 2 (Right Mid) */}
      <div
        ref={photo2Ref}
        className="absolute -right-8 top-1/3 w-40 sm:w-52 md:w-60 aspect-[4/5] rounded-2xl overflow-hidden border border-[#C8A45D]/30 shadow-xl hidden sm:block pointer-events-none opacity-85"
      >
        <img
          src={IMAGES.candleStones}
          alt="Warm river stone texture"
          className="w-full h-full object-cover filter contrast-105"
        />
      </div>

      {/* Floating Photo 3 (Bottom Left) */}
      <div
        ref={photo3Ref}
        className="absolute left-8 bottom-12 w-32 sm:w-44 aspect-square rounded-2xl overflow-hidden border border-[#B5845A]/20 shadow-lg hidden md:block pointer-events-none opacity-80"
      >
        <img
          src={IMAGES.herbalHerbs}
          alt="Ayurvedic botanicals"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Central Manifesto Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Section Label */}
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="text-xs font-mono text-[#B5845A] tracking-widest">
            (02)
          </span>
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C8A84] font-sans">
            The Philosophy
          </span>
        </div>

        {/* Word by word scrub paragraph */}
        <p
          ref={textRef}
          className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.35] tracking-tight text-[#111110] font-light max-w-3xl"
        >
          {words.map((word, idx) => {
            const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
            const isHighlight =
              cleanWord === "quiet" ||
              cleanWord === "reset" ||
              cleanWord === "breathe" ||
              cleanWord === "five" ||
              cleanWord === "minutes";

            return (
              <span
                key={idx}
                className={`manifesto-word inline-block mr-[0.26em] ${
                  isHighlight ? "!text-[#B5845A] italic font-normal" : ""
                }`}
              >
                {word}
              </span>
            );
          })}
        </p>

        {/* Meeting CTA */}
        <button
          onClick={() => scrollToSection("ritual-section")}
          className="mt-14 inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#111110]/20 hover:border-[#111110] text-xs font-sans uppercase tracking-[0.2em] text-[#111110] transition-all hover:bg-[#111110] hover:text-[#EFE9DF] group"
        >
          <span>Meet the reset ritual</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
