/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Menu } from "./Menu";
import { useSession } from "../context/SessionContext";

export const Header: React.FC = () => {
  const { scrollToBooking } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled past hero (approx 300px)
      setIsScrolled(currentScrollY > 150);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > 200 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[9900] transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-[#111110]/85 backdrop-blur-md border-b border-[#C8A45D]/15 py-3.5 shadow-lg shadow-black/20"
            : "bg-transparent py-5 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (stacked lockup, Station in italic serif) */}
          <a
            href="#hero-section"
            className="flex flex-col text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A45D] shrink-0"
            aria-label="Stress Buster Station home"
          >
            <span className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#C8A45D] group-hover:text-[#e4c37e] transition-colors leading-none">
              Stress Buster
            </span>
            <span className="font-serif italic text-xl md:text-2xl text-[#EFE9DF] group-hover:text-white transition-colors leading-none mt-1">
              Station
            </span>
          </a>

          {/* Zone 2: Quiet editorial navigation indicators (desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-sans tracking-[0.18em] uppercase text-[#8C8A84]">
            <a
              href="#ritual-section"
              className="hover:text-[#C8A45D] transition-colors whitespace-nowrap shrink-0"
            >
              The Ritual
            </a>
            <a
              href="#services-section"
              className="hover:text-[#C8A45D] transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#sound-section"
              className="hover:text-[#C8A45D] transition-colors whitespace-nowrap shrink-0"
            >
              Sound Room
            </a>
            <a
              href="#locations-section"
              className="hover:text-[#C8A45D] transition-colors whitespace-nowrap shrink-0"
            >
              Gurugram
            </a>
          </nav>

          {/* Zone 3: Functional CTA & Menu Morph Button */}
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="primary"
              magnetic={true}
              withArrow={true}
              onClick={scrollToBooking}
              className="text-[11px] px-5 py-2"
            >
              Book Session
            </Button>

            {/* Menu Button with 2 lines morphing into X */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              className="w-11 h-11 rounded-full border border-[#C8A45D]/30 flex flex-col items-center justify-center gap-1.5 hover:border-[#C8A45D] hover:bg-[#C8A45D]/10 transition-all duration-300 group"
            >
              <span className="w-5 h-[1.5px] bg-[#EFE9DF] group-hover:bg-[#C8A45D] transition-colors duration-300" />
              <span className="w-3.5 h-[1.5px] bg-[#EFE9DF] group-hover:bg-[#C8A45D] transition-colors duration-300 self-center" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen expanding menu overlay */}
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
