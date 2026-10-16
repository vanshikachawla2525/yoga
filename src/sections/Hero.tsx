/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 01 — HERO: "Pause. Even for five minutes."
 */

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Clock, Sparkles } from "lucide-react";
import { Button } from "../components/Button";
import { SplitText } from "../components/SplitText";
import { IMAGES, SERVICES_DATA } from "../data/content";
import { useSession } from "../context/SessionContext";

export const Hero: React.FC = () => {
  const { scrollToBooking, scrollToSection } = useSession();
  const heroRef = useRef<HTMLElement>(null);
  const flashlightRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const arch1Ref = useRef<HTMLDivElement>(null);
  const arch2Ref = useRef<HTMLDivElement>(null);
  const arch3Ref = useRef<HTMLDivElement>(null);

  const [timerSeconds, setTimerSeconds] = useState(5);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    // 5-second countdown loop in the headline
    const timerInterval = setInterval(() => {
      setTimerSeconds((prev) => (prev <= 1 ? 5 : prev - 1));
    }, 1000);

    // Compute estimate open now: e.g. 09:00 - 21:30 IST
    const now = new Date();
    const currentHour = now.getHours();
    setIsOpenNow(currentHour >= 9 && currentHour < 21);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Flashlight effect following cursor on desktop
    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (flashlightRef.current) {
        gsap.to(flashlightRef.current, {
          x,
          y,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      // Subtle mouse parallax on the 3 arches
      const deltaX = (e.clientX / window.innerWidth - 0.5) * 2;
      const deltaY = (e.clientY / window.innerHeight - 0.5) * 2;

      if (arch1Ref.current) gsap.to(arch1Ref.current, { x: deltaX * 16, y: deltaY * 16, duration: 1.2 });
      if (arch2Ref.current) gsap.to(arch2Ref.current, { x: deltaX * -24, y: deltaY * -24, duration: 1.2 });
      if (arch3Ref.current) gsap.to(arch3Ref.current, { x: deltaX * 12, y: deltaY * 12, duration: 1.2 });
    };

    hero.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Rotate the circular scroll badge continuously and react to scroll
    let rotation = 0;
    const scrollBadgeTicker = () => {
      rotation += 0.4;
      if (badgeRef.current) {
        badgeRef.current.style.transform = `rotate(${rotation}deg)`;
      }
    };
    gsap.ticker.add(scrollBadgeTicker);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(scrollBadgeTicker);
    };
  }, []);

  return (
    <section
      id="hero-section"
      ref={heroRef}
      className="relative min-h-[100svh] w-full bg-[#111110] text-[#EFE9DF] flex flex-col justify-between pt-28 pb-10 px-6 md:px-12 overflow-hidden select-none"
    >
      {/* Dim spa flashlight ambient glow */}
      <div
        ref={flashlightRef}
        className="pointer-events-none absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle_at_center,rgba(200,164,93,0.12)_0%,rgba(17,17,16,0)_70%)] blur-2xl will-change-transform hidden md:block"
        style={{ transform: "translate3d(50vw, 50vh, 0)" }}
      />

      {/* Main Content & Arches Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Editorial Text */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Section Marker */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-xs font-mono text-[#C8A45D] tracking-widest">
              (01)
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C8A84] font-sans">
              Gurugram Sanctuary
            </span>
          </div>

          {/* Headline in huge serif with inline countdown ring */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-[#EFE9DF] mb-6">
            <span className="block">Pause.</span>
            <span className="block font-light italic text-[#EFE9DF]/90">
              Even for{" "}
              <span className="inline-flex items-baseline relative not-italic">
                <span className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 mx-1 rounded-full border border-[#C8A45D]/40 text-[#C8A45D] font-mono text-2xl md:text-3xl tabular-nums align-middle relative overflow-hidden bg-[#1B1A18]/50">
                  <span className="absolute inset-0 border border-[#C8A45D] rounded-full animate-ping opacity-20" />
                  {timerSeconds}
                </span>
              </span>
            </span>
            <span className="block text-[#C8A45D]">minutes.</span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-[#8C8A84] max-w-xl leading-relaxed mb-8 font-light">
            Short stress-reset sessions, acoustic sound therapy, and restorative bodywork designed for the relentless pace of Gurugram.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              magnetic={true}
              withArrow={true}
              onClick={scrollToBooking}
              className="text-xs py-3 px-8"
            >
              Book a Session
            </Button>

            <Button
              variant="secondary"
              onClick={() => scrollToSection("services-section")}
              className="text-xs py-3 px-6"
            >
              Explore Services
            </Button>

            {/* Rotating Circular Scroll Badge */}
            <div className="relative w-24 h-24 hidden sm:flex items-center justify-center ml-2">
              <div
                ref={badgeRef}
                className="w-full h-full will-change-transform flex items-center justify-center"
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                    fill="none"
                  />
                  <text className="text-[9.5px] uppercase font-sans tracking-[0.24em] fill-[#C8A45D]">
                    <textPath href="#circlePath">
                      SCROLL · BREATHE · SCROLL ·
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="absolute w-2 h-2 rounded-full bg-[#C8A45D]" />
            </div>
          </div>
        </div>

        {/* Right 3 Tall Arched Parallax Windows */}
        <div className="lg:col-span-5 relative flex items-end justify-center lg:justify-end gap-3 sm:gap-4 h-[380px] sm:h-[480px] lg:h-[540px]">
          {/* Arch 1 (Left - medium height) */}
          <div
            ref={arch1Ref}
            className="w-24 sm:w-32 lg:w-36 h-[75%] rounded-t-full rounded-b-xl overflow-hidden border border-[#C8A45D]/25 relative bg-[#1B1A18] shadow-2xl animate-[pulse_6s_ease-in-out_infinite]"
          >
            <img
              src={IMAGES.heroArch1}
              alt="Warm candle and smooth river stones"
              width={400}
              height={700}
              className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-transparent to-transparent opacity-70" />
          </div>

          {/* Arch 2 (Center - tallest focal arch) */}
          <div
            ref={arch2Ref}
            className="w-28 sm:w-40 lg:w-44 h-full rounded-t-full rounded-b-xl overflow-hidden border border-[#C8A45D]/50 relative bg-[#1B1A18] shadow-2xl z-10"
          >
            <img
              src={IMAGES.heroArch2}
              alt="Therapist hands performing rhythmic bodywork"
              width={450}
              height={800}
              className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C8A45D] px-2 py-0.5 bg-[#111110]/80 rounded-full border border-[#C8A45D]/20">
                Five Minutes
              </span>
            </div>
          </div>

          {/* Arch 3 (Right - medium-short height) */}
          <div
            ref={arch3Ref}
            className="w-24 sm:w-32 lg:w-36 h-[82%] rounded-t-full rounded-b-xl overflow-hidden border border-[#C8A45D]/25 relative bg-[#1B1A18] shadow-2xl animate-[pulse_7s_ease-in-out_infinite]"
          >
            <img
              src={IMAGES.heroArch3}
              alt="Hand-hammered singing bowl on slate"
              width={400}
              height={700}
              className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-transparent to-transparent opacity-70" />
          </div>
        </div>
      </div>

      {/* Bottom Edge: Service names strip & Live Hours Chip */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 mt-4 border-t border-[#C8A45D]/15 flex flex-wrap items-center justify-between gap-4">
        {/* Editorial service list */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-sans tracking-[0.16em] uppercase text-[#8C8A84]">
          <span>Chair Resets</span>
          <span className="text-[#C8A45D]/50">·</span>
          <span>Himalayan Sound</span>
          <span className="text-[#C8A45D]/50">·</span>
          <span>Ayurvedic Oil Touch</span>
          <span className="text-[#C8A45D]/50">·</span>
          <span>Vibroacoustic Lounge</span>
        </div>

        {/* Live Open / Closed Demo Chip */}
        <div className="flex items-center gap-2 text-xs font-sans">
          <span className="w-2 h-2 rounded-full bg-[#C8A45D]" />
          <span className="text-[#EFE9DF] font-medium">
            {isOpenNow ? "Open Today" : "Sanctuary Resting"}
          </span>
          <span className="text-[10px] text-[#8C8A84] font-serif italic">
            (Demo hours: 09:00 – 21:30)
          </span>
        </div>
      </div>
    </section>
  );
};
