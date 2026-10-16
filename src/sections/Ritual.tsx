/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 04 — THE RESET RITUAL (horizontal pinned journey)
 * Pinned horizontal scroll with 4 panels: Arrive, Settle, Release, Return.
 * Breathing orb slows from 3s to 7s across the journey.
 * Clean responsive stacked layout for mobile.
 */

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ParallaxImage } from "../components/ParallaxImage";
import { IMAGES } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

const RITUAL_STEPS = [
  {
    step: "01",
    title: "Arrive",
    subtitle: "The threshold of silence",
    desc: "Leave the sirens and email chimes behind. Footwear traded for organic cotton slippers, senses grounded with sandalwood mist.",
    image: IMAGES.teaLounge,
    tone: "#1E1C19",
    breathRate: "3s"
  },
  {
    step: "02",
    title: "Settle",
    subtitle: "Acoustic frequency calibration",
    desc: "Recline into weighted zero-gravity linen. Handcrafted Himalayan bronze bowls sound first overtone to down-regulate your nervous system.",
    image: IMAGES.heroArch3,
    tone: "#191816",
    breathRate: "4.5s"
  },
  {
    step: "03",
    title: "Release",
    subtitle: "Targeted neuromuscular unburdening",
    desc: "Sub-occipital release, shoulder trapezius unwinding, and vibrational waves channelling tension out of deep spinal tissues.",
    image: IMAGES.heroArch2,
    tone: "#141312",
    breathRate: "6s"
  },
  {
    step: "04",
    title: "Return",
    subtitle: "Re-entering the world grounded",
    desc: "Sip an unhurried warm tulsi-cinnamon infusion. Feel your chest expand fully. Step back into Gurugram restored.",
    image: IMAGES.ritualLounge,
    tone: "#111110",
    breathRate: "7.5s"
  }
];

export const Ritual: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Only apply horizontal pin on screens >= 900px
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      const panels = track.querySelectorAll(".ritual-panel");
      const totalWidth = (panels.length - 1) * 100;

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 0.8,
          snap: 1 / (panels.length - 1),
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          onUpdate: (self) => {
            const index = Math.min(
              panels.length - 1,
              Math.floor(self.progress * panels.length)
            );
            setActiveStep(index);
          }
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="ritual-section"
      ref={containerRef}
      className="relative bg-[#111110] text-[#EFE9DF] overflow-hidden select-none"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8A45D]/15">
        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-mono text-[#C8A45D] tracking-widest">
              (03)
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C8A84] font-sans">
              The Journey
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#EFE9DF] tracking-tight">
            The Reset Ritual
          </h2>
        </div>

        {/* Persistent Step Dots and Step Indicators */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            {RITUAL_STEPS.map((s, idx) => (
              <span
                key={s.step}
                className={`transition-all duration-300 rounded-full ${
                  activeStep === idx
                    ? "w-8 h-1 bg-[#C8A45D]"
                    : "w-2 h-1 bg-[#8C8A84]/40"
                }`}
              />
            ))}
          </div>

          <span className="text-xs font-mono text-[#C8A45D] uppercase tracking-wider">
            Step {RITUAL_STEPS[activeStep].step} / 04
          </span>
        </div>
      </div>

      {/* Panels Track (Horizontal on desktop, stacked on mobile) */}
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row w-full lg:w-[400vw] lg:h-[80vh] items-stretch"
      >
        {RITUAL_STEPS.map((item, index) => (
          <div
            key={item.step}
            className="ritual-panel w-full lg:w-[100vw] lg:h-full flex items-center justify-center p-6 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#C8A45D]/15 transition-colors duration-700"
            style={{ backgroundColor: item.tone }}
          >
            <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Left Details */}
              <div className="md:col-span-6 flex flex-col items-start">
                <span className="font-serif text-7xl sm:text-8xl md:text-9xl text-[#C8A45D]/20 leading-none font-light">
                  {item.step}
                </span>

                <span className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-sans mt-2 mb-1">
                  {item.subtitle}
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#EFE9DF] tracking-tight mb-4">
                  {item.title}
                </h3>

                <p className="font-sans text-sm sm:text-base text-[#8C8A84] leading-relaxed max-w-md font-light mb-6">
                  {item.desc}
                </p>

                {/* Rhythm / Breath Indicator */}
                <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#111110]/60 border border-[#C8A45D]/20">
                  <div
                    className="w-3 h-3 rounded-full bg-[#C8A45D] animate-ping"
                    style={{ animationDuration: item.breathRate }}
                  />
                  <span className="text-[11px] font-sans tracking-widest uppercase text-[#EFE9DF]/80">
                    Breath Cadence: {item.breathRate}
                  </span>
                </div>
              </div>

              {/* Right Image in Arch Frame */}
              <div className="md:col-span-6 flex justify-center md:justify-end">
                <div className="w-full max-w-sm sm:max-w-md aspect-[3/4] rounded-t-full rounded-b-2xl overflow-hidden border border-[#C8A45D]/30 shadow-2xl relative bg-[#111110]">
                  <img
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={667}
                    className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111110]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
