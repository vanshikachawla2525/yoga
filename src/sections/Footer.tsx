/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * FOOTER: "The Exhale"
 * Full-screen Ink atmosphere completing the descent to stillness.
 * Giant rotating gold circle behind "Breathe out.", interactive wordmark fill,
 * back to top trigger, and 6-second quiet micro-twist.
 */

import React, { useState, useEffect, useRef } from "react";
import { ArrowUp, Instagram, MessageCircle, Mail } from "lucide-react";
import { OUTLETS_DATA, PROVISIONAL_WHATSAPP_NUMBER } from "../data/content";
import { useSession } from "../context/SessionContext";

export const Footer: React.FC = () => {
  const { showToast, scrollToSection } = useSession();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [showQuietTwist, setShowQuietTwist] = useState(false);
  const [wordmarkFillPercent, setWordmarkFillPercent] = useState(0);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const quietTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 6-second stillness micro-twist
  useEffect(() => {
    const handleActivity = () => {
      setShowQuietTwist(false);
      if (quietTimerRef.current) clearTimeout(quietTimerRef.current);
      quietTimerRef.current = setTimeout(() => {
        setShowQuietTwist(true);
      }, 6000);
    };

    window.addEventListener("scroll", handleActivity, { passive: true });
    window.addEventListener("mousemove", handleActivity, { passive: true });
    handleActivity();

    return () => {
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("mousemove", handleActivity);
      if (quietTimerRef.current) clearTimeout(quietTimerRef.current);
    };
  }, []);

  const handleWordmarkMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wordmarkRef.current) return;
    const rect = wordmarkRef.current.getBoundingClientRect();
    const percent = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    setWordmarkFillPercent(percent);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterDone(true);
      showToast("Subscribed (Demo): Newsletter dispatch pending launch");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappUrl = `https://wa.me/${PROVISIONAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Stress Buster Station concierge, I would like to inquire about booking."
  )}`;

  return (
    <footer
      id="footer-section"
      className="relative min-h-[100svh] bg-[#111110] text-[#EFE9DF] pt-24 pb-12 px-6 md:px-12 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Giant slowly rotating gold background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] aspect-square rounded-full border border-[#C8A45D]/10 pointer-events-none animate-[spin_60s_linear_infinite]">
        <div className="absolute inset-8 rounded-full border border-dashed border-[#C8A45D]/15" />
      </div>

      {/* Main Top Centerpiece: "Breathe out." */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center my-auto py-12">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C8A45D] font-sans block mb-3">
          The Final Descent
        </span>

        <h2 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#EFE9DF] mb-6">
          Breathe <span className="italic text-[#C8A45D]">out.</span>
        </h2>

        <p className="font-sans text-sm md:text-base text-[#8C8A84] max-w-md mx-auto font-light mb-10">
          The noise of the day ends here. Take this breath with you into the evening.
        </p>

        {/* Newsletter Demo Subscription */}
        <div className="max-w-md mx-auto mb-8">
          {newsletterDone ? (
            <p className="text-xs text-[#C8A45D] font-serif italic py-2">
              ✓ Gratitude. You will receive our monthly Gurugram quiet letter.
            </p>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email for the Quiet Letter"
                className="flex-1 px-4 py-2.5 rounded-full bg-[#1B1A18] border border-[#C8A45D]/25 text-xs text-[#EFE9DF] placeholder-[#8C8A84] focus:outline-none focus:border-[#C8A45D]"
                required
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-[#C8A45D] text-[#111110] text-xs font-sans font-semibold uppercase tracking-wider hover:bg-[#d8b872] transition-colors"
              >
                Join
              </button>
            </form>
          )}
        </div>

        {/* 6-second inactivity quiet twist */}
        {showQuietTwist && (
          <p className="text-xs font-serif italic text-[#C8A45D] animate-in fade-in duration-700 tracking-wider">
            Still here? Good. That's the point.
          </p>
        )}
      </div>

      {/* Middle Directory Navigation */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-t border-[#C8A45D]/15 text-xs">
        {/* Brand & Mission */}
        <div className="md:col-span-4 flex flex-col items-start">
          <span className="font-sans uppercase tracking-[0.25em] text-[#C8A45D] font-bold text-sm">
            Stress Buster Station
          </span>
          <span className="font-serif italic text-base text-[#EFE9DF] mt-1">
            Five Minutes of Quiet™
          </span>
          <p className="text-[#8C8A84] mt-3 leading-relaxed max-w-xs">
            A sanctuary network dedicated to urban decompression, sound therapy, and restorative bodywork across Gurugram, India.
          </p>
        </div>

        {/* Outlets Directory */}
        <div className="md:col-span-4 flex flex-col gap-1 text-[#8C8A84]">
          <span className="font-sans uppercase tracking-widest text-[#EFE9DF] font-medium mb-2">
            Gurugram Sanctuaries
          </span>
          {OUTLETS_DATA.map((o) => (
            <span key={o.id} className="hover:text-[#C8A45D] transition-colors cursor-pointer" onClick={() => scrollToSection("locations-section")}>
              {o.shortName} ({o.complex})
            </span>
          ))}
        </div>

        {/* Contact & Socials */}
        <div className="md:col-span-4 flex flex-col items-start md:items-end gap-3 text-[#8C8A84]">
          <span className="font-sans uppercase tracking-widest text-[#EFE9DF] font-medium mb-1">
            Concierge Direct
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#C8A45D] transition-colors"
          >
            <MessageCircle size={14} className="text-[#C8A45D]" />
            <span>+91 70429 38777 (WhatsApp)</span>
          </a>
          <a
            href="https://instagram.com/stressbusterstation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#C8A45D] transition-colors"
          >
            <Instagram size={14} className="text-[#C8A45D]" />
            <span>@stressbusterstation</span>
          </a>

          {/* Back to top circular button */}
          <button
            onClick={scrollToTop}
            className="mt-2 w-12 h-12 rounded-full border border-[#C8A45D]/40 hover:border-[#C8A45D] hover:bg-[#C8A45D]/10 text-[#C8A45D] flex items-center justify-center transition-all group"
            aria-label="Back to top"
          >
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Giant Outlined Wordmark with Interactive Gold Fill */}
      <div
        ref={wordmarkRef}
        onMouseMove={handleWordmarkMouseMove}
        className="relative z-10 w-full overflow-hidden my-4 py-2 cursor-pointer"
        aria-hidden="true"
      >
        <div className="relative font-serif text-3xl sm:text-5xl md:text-7xl lg:text-[7.5vw] font-bold uppercase tracking-tight text-center whitespace-nowrap leading-none select-none">
          {/* Outlined Base Text */}
          <span className="text-transparent [-webkit-text-stroke:1px_rgba(200,164,93,0.3)]">
            STRESS BUSTER STATION
          </span>
          {/* Gold Filled Overlay Clipping */}
          <div
            className="absolute inset-0 overflow-hidden transition-[width] duration-75"
            style={{ width: `${wordmarkFillPercent}%` }}
          >
            <span className="text-[#C8A45D] block text-center whitespace-nowrap">
              STRESS BUSTER STATION
            </span>
          </div>
        </div>
      </div>

      {/* Mandatory Honesty & Legal Disclaimers */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-[#C8A45D]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8C8A84]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span>Demo preview. Prices, availability and reviews are sample content pending owner verification.</span>
          <span className="hidden sm:inline">·</span>
          <span>Wellness services are not a substitute for medical or mental-health care.</span>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => showToast()} className="hover:text-[#EFE9DF] transition-colors">
            Privacy Policy
          </button>
          <button onClick={() => showToast()} className="hover:text-[#EFE9DF] transition-colors">
            Terms of Service
          </button>
          <span>© {new Date().getFullYear()} Stress Buster Station</span>
        </div>
      </div>
    </footer>
  );
};
