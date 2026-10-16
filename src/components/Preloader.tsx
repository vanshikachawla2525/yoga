/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Preloader: "The Exhale"
 * Full-screen ink background, breathing gold circle, 0-100 serif counter,
 * cycling breath guidance, and vertical curtain split reveal.
 */

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useSession } from "../context/SessionContext";

const BREATH_STEPS = ["Breathe in", "Hold", "Breathe out"];

export const Preloader: React.FC = () => {
  const { isPreloaderFinished, setIsPreloaderFinished } = useSession();
  const [progress, setProgress] = useState(0);
  const [breathIndex, setBreathIndex] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (isPreloaderFinished) return;

    // Show skip after 1s
    const skipTimer = setTimeout(() => setShowSkip(true), 1000);

    // Cycle breath text every 700ms
    const breathInterval = setInterval(() => {
      setBreathIndex((prev) => (prev + 1) % BREATH_STEPS.length);
    }, 700);

    // Counter 0 to 100
    const counterObj = { val: 0 };
    const counterTween = gsap.to(counterObj, {
      val: 100,
      duration: 2.8,
      ease: "power2.inOut",
      onUpdate: () => {
        setProgress(Math.round(counterObj.val));
      },
      onComplete: () => {
        finishSequence();
      }
    });

    return () => {
      clearTimeout(skipTimer);
      clearInterval(breathInterval);
      counterTween.kill();
    };
  }, [isPreloaderFinished]);

  const finishSequence = () => {
    if (isPreloaderFinished) return;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("sbs_preloader_seen", "true");
        setIsPreloaderFinished(true);
      }
    });

    // Expand circle then split curtains vertically
    tl.to(circleRef.current, {
      scale: 25,
      opacity: 0,
      duration: 0.7,
      ease: "power3.in"
    })
    .to([topCurtainRef.current, bottomCurtainRef.current], {
      yPercent: (index) => (index === 0 ? -100 : 100),
      duration: 0.9,
      ease: "expo.inOut",
      stagger: 0.05
    });
  };

  const handleSkip = () => {
    sessionStorage.setItem("sbs_preloader_seen", "true");
    setIsPreloaderFinished(true);
  };

  if (isPreloaderFinished) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] pointer-events-auto flex flex-col justify-between overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome breath ritual"
    >
      {/* Top and Bottom Curtains */}
      <div
        ref={topCurtainRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#111110] border-b border-[#C8A45D]/10"
      />
      <div
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#111110] border-t border-[#C8A45D]/10"
      />

      {/* Center Breathing Orb & Text */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pointer-events-none select-none">
        <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background thin track */}
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="rgba(200, 164, 93, 0.15)"
              strokeWidth="1"
            />
            {/* Breathing dynamic stroke */}
            <circle
              ref={circleRef}
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#C8A45D"
              strokeWidth="1.5"
              strokeDasharray="276"
              strokeDashoffset={276 - (276 * progress) / 100}
              className="transition-all duration-300 ease-out origin-center animate-[pulse_4s_ease-in-out_infinite]"
            />
          </svg>

          {/* Central Breath Command */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C8A45D]/70 font-sans mb-1">
              Ritual
            </span>
            <span className="text-xl sm:text-2xl font-serif italic text-[#EFE9DF] transition-opacity duration-300">
              {BREATH_STEPS[breathIndex]}
            </span>
          </div>
        </div>

        <p className="mt-8 text-xs font-sans tracking-[0.2em] uppercase text-[#8C8A84] max-w-xs text-center">
          Calibrating quiet for Gurugram
        </p>
      </div>

      {/* Bottom Counter & Skip Button */}
      <div className="relative z-10 px-8 py-8 flex items-end justify-between select-none">
        <div>
          <span className="block text-[11px] font-sans tracking-[0.25em] uppercase text-[#8C8A84] mb-1">
            Settling
          </span>
          <span className="text-5xl sm:text-7xl font-serif text-[#C8A45D] tracking-tight tabular-nums">
            {String(progress).padStart(2, "0")}
            <span className="text-2xl text-[#8C8A84]/60 font-sans ml-1">%</span>
          </span>
        </div>

        {showSkip && (
          <button
            onClick={handleSkip}
            className="text-xs uppercase tracking-[0.25em] text-[#EFE9DF]/60 hover:text-[#C8A45D] py-2 px-4 border border-[#C8A45D]/20 rounded-full transition-colors pointer-events-auto"
          >
            Skip Intro →
          </button>
        )}
      </div>
    </div>
  );
};
