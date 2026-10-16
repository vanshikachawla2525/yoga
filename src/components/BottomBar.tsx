/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Calendar, MessageCircle } from "lucide-react";
import { PROVISIONAL_WHATSAPP_NUMBER } from "../data/content";
import { useSession } from "../context/SessionContext";

export const BottomBar: React.FC = () => {
  const { scrollToBooking } = useSession();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const bookingEl = document.getElementById("booking-section");
      if (bookingEl) {
        const rect = bookingEl.getBoundingClientRect();
        // Hide if booking section is in viewport
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setIsVisible(false);
          return;
        }
      }
      setIsVisible(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${PROVISIONAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Stress Buster Station, I would like to inquire about booking a stress-reset session."
  )}`;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[9970] md:hidden px-4 py-3 bg-[#111110]/95 backdrop-blur-md border-t border-[#C8A45D]/20 flex items-center gap-3">
      <button
        onClick={scrollToBooking}
        className="flex-1 min-h-[44px] bg-[#C8A45D] text-[#111110] font-sans font-semibold text-xs tracking-wider uppercase rounded-full flex items-center justify-center gap-2 active:scale-95 transition-transform"
      >
        <Calendar size={15} />
        <span>Book Session</span>
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="min-h-[44px] px-4 bg-[#1B1A18] text-[#EFE9DF] border border-[#C8A45D]/30 font-sans font-medium text-xs tracking-wider uppercase rounded-full flex items-center justify-center gap-2 active:scale-95 transition-transform hover:border-[#C8A45D]"
        aria-label="Direct WhatsApp Concierge"
      >
        <MessageCircle size={15} className="text-[#C8A45D]" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
};
