/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Stress Buster Station — Master App Entry
 * Gurugram, India · "Five Minutes of Quiet"
 */

import React from "react";
import { SessionProvider, useSession } from "./context/SessionContext";
import { useLenis } from "./hooks/useLenis";
import { Preloader } from "./components/Preloader";
import { Cursor } from "./components/Cursor";
import { Header } from "./components/Header";
import { ScrollMeter } from "./components/ScrollMeter";
import { CalmMeter } from "./components/CalmMeter";
import { Toast } from "./components/Toast";
import { BottomBar } from "./components/BottomBar";

// 14 Sections in exact sequence
import { Hero } from "./sections/Hero";
import { MarqueeBand } from "./sections/MarqueeBand";
import { Manifesto } from "./sections/Manifesto";
import { Ritual } from "./sections/Ritual";
import { Services } from "./sections/Services";
import { SoundRoom } from "./sections/SoundRoom";
import { MoodFinder } from "./sections/MoodFinder";
import { Plans } from "./sections/Plans";
import { Locations } from "./sections/Locations";
import { Corporate } from "./sections/Corporate";
import { Booking } from "./sections/Booking";
import { Voices } from "./sections/Voices";
import { Faq } from "./sections/Faq";
import { InstaStrip } from "./sections/InstaStrip";
import { Footer } from "./sections/Footer";

const MainContent: React.FC = () => {
  const { isPreloaderFinished } = useSession();
  // Enable Lenis smooth scrolling only after preloader completes
  useLenis(isPreloaderFinished);

  return (
    <div className="relative min-h-screen bg-[#111110] text-[#EFE9DF] selection:bg-[#C8A45D]/30 selection:text-white">
      {/* Subtle Film Grain Texture Overlay */}
      <div className="film-grain" aria-hidden="true" />

      {/* Global Systems */}
      <Preloader />
      <Cursor />
      <ScrollMeter />
      <CalmMeter />
      <Header />
      <Toast />

      {/* Main Page Landmark */}
      <main id="main-content" className="relative z-10">
        {/* 01 — HERO: "Pause. Even for five minutes." */}
        <Hero />

        {/* 02 — MARQUEE: "Sound. Touch. Stillness." */}
        <MarqueeBand />

        {/* 03 — MANIFESTO (Scroll-scrub text on Warm Bone) */}
        <Manifesto />

        {/* 04 — THE RESET RITUAL (Horizontal pinned journey / mobile fallback) */}
        <Ritual />

        {/* 05 — SERVICES EXPLORER (Category tabs, outlet filter, session tray) */}
        <Services />

        {/* 06 — SOUND ROOM (Web Audio singing-bowl synthesizer + waveform) */}
        <SoundRoom />

        {/* 07 — MOOD FINDER (3-question tap quiz with recommendation) */}
        <MoodFinder />

        {/* 08 — MEMBERSHIPS & PACKAGES (Toggle + 3D tilt cards + expandable tiles) */}
        <Plans />

        {/* 09 — LOCATIONS (Directory + interactive stylized SVG map) */}
        <Locations />

        {/* 10 — CORPORATE WELLNESS ("Quiet, at work." + form + downloadable HTML brochure) */}
        <Corporate />

        {/* 11 — BOOKING (5-step flow + calendar + Indian phone validation + .ics + WhatsApp) */}
        <Booking />

        {/* 12 — VOICES (Sample reviews draggable carousel) */}
        <Voices />

        {/* 13 — FAQ (Accordion with medical disclaimer) */}
        <Faq />

        {/* 14 — INSTAGRAM STRIP (8-tile loop marquee) */}
        <InstaStrip />
      </main>

      {/* 05 — FOOTER ("The Exhale" + giant circle + interactive wordmark) */}
      <Footer />

      {/* Mobile Sticky Action Bar */}
      <BottomBar />
    </div>
  );
};

export default function App() {
  return (
    <SessionProvider>
      <MainContent />
    </SessionProvider>
  );
}
