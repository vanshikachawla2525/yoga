/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { useSession } from "../context/SessionContext";

const SECTIONS = [
  { id: "hero-section", label: "01", name: "Pause" },
  { id: "manifesto-section", label: "02", name: "Manifesto" },
  { id: "ritual-section", label: "03", name: "Ritual" },
  { id: "services-section", label: "04", name: "Services" },
  { id: "sound-section", label: "05", name: "Sound" },
  { id: "mood-section", label: "06", name: "Mood" },
  { id: "plans-section", label: "07", name: "Plans" },
  { id: "locations-section", label: "08", name: "Locations" },
  { id: "corporate-section", label: "09", name: "Corporate" },
  { id: "booking-section", label: "10", name: "Booking" },
  { id: "voices-section", label: "11", name: "Voices" },
  { id: "faq-section", label: "12", name: "FAQ" },
  { id: "footer-section", label: "13", name: "Exhale" },
];

export const ScrollMeter: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero-section");
  const { setCalmLevel, scrollToSection } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const currentScroll = window.scrollY;
      const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setScrollProgress(progress);
      setCalmLevel(progress);

      // Determine active section
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [setCalmLevel]);

  return (
    <>
      {/* 2px Gold Progress Bar at Top */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[9990] bg-[#111110]">
        <div
          className="h-full bg-gradient-to-r from-[#C8A45D]/60 via-[#C8A45D] to-[#EFE9DF] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Vertical Descent Meter on Right Edge (Desktop only) */}
      <nav
        aria-label="Section descent navigation"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-[9980] hidden lg:flex flex-col items-end gap-2.5 py-4 px-2"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C8A84]/70 font-sans mb-1 mr-0.5">
          Descent
        </span>
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="group flex items-center gap-2 cursor-pointer focus:outline-none"
              aria-label={`Jump to ${sec.name}`}
            >
              <span
                className={`text-[10px] font-mono tracking-widest transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                  isActive ? "text-[#C8A45D] !opacity-100 font-semibold" : "text-[#8C8A84]"
                }`}
              >
                {sec.name}
              </span>
              <span
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-2.5 h-2.5 bg-[#C8A45D] ring-2 ring-[#C8A45D]/30"
                    : "w-1.5 h-1.5 bg-[#8C8A84]/30 group-hover:bg-[#C8A45D]/70"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
};
