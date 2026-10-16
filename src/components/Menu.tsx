/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import { PROVISIONAL_WHATSAPP_NUMBER, OUTLETS_DATA, IMAGES } from "../data/content";
import { useSession } from "../context/SessionContext";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { id: "home", label: "Home", sectionId: "hero-section", preview: IMAGES.heroArch1 },
  { id: "about", label: "About Us", sectionId: "manifesto-section", preview: IMAGES.heroArch2 },
  { id: "services", label: "Services", sectionId: "services-section", preview: IMAGES.massageHands },
  { id: "sound", label: "Sound & Vibro Therapy", sectionId: "sound-section", preview: IMAGES.heroArch3 },
  { id: "salon", label: "Salon & Skin", sectionId: "services-section", preview: IMAGES.skinCare },
  { id: "locations", label: "Locations", sectionId: "locations-section", preview: IMAGES.teaLounge },
  { id: "memberships", label: "Memberships & Packages", sectionId: "plans-section", preview: IMAGES.ritualLounge },
  { id: "corporate", label: "Corporate Wellness", sectionId: "corporate-section", preview: IMAGES.corporateWellness },
  { id: "vouchers", label: "Gift Vouchers", sectionId: "plans-section", preview: IMAGES.zenStones },
  { id: "testimonials", label: "Testimonials", sectionId: "voices-section", preview: IMAGES.herbalHerbs },
  { id: "faqs", label: "FAQs", sectionId: "faq-section", preview: IMAGES.steamAroma },
  { id: "contact", label: "Contact", sectionId: "locations-section", preview: IMAGES.workspaceCalm }
];

export const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const { showToast, scrollToSection } = useSession();
  const [hoveredPreview, setHoveredPreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLinkClick = (e: React.MouseEvent, sectionId?: string) => {
    e.preventDefault();
    showToast("Full site page: coming in the live build");
    if (sectionId) {
      setTimeout(() => {
        scrollToSection(sectionId);
        onClose();
      }, 400);
    }
  };

  const whatsappUrl = `https://wa.me/${PROVISIONAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Stress Buster Station, I would like to inquire about your wellness offerings."
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation Menu"
      className="fixed inset-0 z-[9999] bg-[#111110] text-[#EFE9DF] flex flex-col justify-between overflow-y-auto animate-in fade-in zoom-in-95 duration-500"
    >
      {/* Top Bar of Menu */}
      <div className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-[#C8A45D]/15">
        <div className="flex flex-col">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#C8A45D]">
            Stress Buster Station
          </span>
          <span className="font-serif italic text-sm text-[#8C8A84]">
            Sanctuary Navigation
          </span>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 border border-[#C8A45D]/30 rounded-full hover:border-[#C8A45D] text-xs font-sans tracking-widest uppercase transition-colors"
          aria-label="Close menu"
        >
          <span>Close</span>
          <X size={16} className="text-[#C8A45D]" />
        </button>
      </div>

      {/* Main Grid: Left Links, Right Contact/Locations/Preview */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Links */}
        <div className="lg:col-span-7 flex flex-col gap-1.5">
          {MENU_ITEMS.map((item, idx) => (
            <a
              key={item.id}
              href={`#${item.sectionId}`}
              aria-disabled="true"
              onClick={(e) => handleLinkClick(e, item.sectionId)}
              onMouseEnter={() => setHoveredPreview(item.preview)}
              onMouseLeave={() => setHoveredPreview(null)}
              className="group flex items-baseline gap-4 py-1 text-2xl sm:text-3xl lg:text-4xl font-serif text-[#EFE9DF]/80 hover:text-[#C8A45D] transition-all duration-300"
            >
              <span className="text-xs font-mono text-[#8C8A84]/60 group-hover:text-[#C8A45D]">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="group-hover:translate-x-3 group-hover:italic transition-transform duration-300">
                {item.label}
              </span>
              <span className="opacity-0 group-hover:opacity-100 text-xs font-sans uppercase tracking-[0.2em] text-[#C8A45D]/80 ml-auto transition-opacity hidden sm:inline">
                Jump In-Page →
              </span>
            </a>
          ))}
        </div>

        {/* Right Pane: Context Preview, Location Chips & Live WhatsApp */}
        <div className="lg:col-span-5 flex flex-col gap-8 border-t lg:border-t-0 lg:border-l border-[#C8A45D]/15 pt-8 lg:pt-0 lg:pl-12">
          {/* Dynamic Image Preview on Desktop Hover */}
          <div className="hidden lg:block w-full h-44 rounded-xl overflow-hidden bg-[#1B1A18] border border-[#C8A45D]/20 relative">
            <img
              src={hoveredPreview || IMAGES.ritualLounge}
              alt="Sanctuary mood"
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 text-[11px] font-sans tracking-widest uppercase text-[#C8A45D]">
              Gurugram Sanctuary Preview
            </div>
          </div>

          {/* Locations Quick Chips */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-sans mb-3 flex items-center gap-2">
              <MapPin size={13} />
              <span>Sanctuary Outlets (Demo)</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {OUTLETS_DATA.map((outlet) => (
                <button
                  key={outlet.id}
                  onClick={() => {
                    scrollToSection("locations-section");
                    onClose();
                  }}
                  className="px-3 py-1.5 text-xs bg-[#1B1A18] border border-[#C8A45D]/20 rounded-lg hover:border-[#C8A45D] hover:text-[#C8A45D] transition-colors text-left"
                >
                  <span className="block font-medium">{outlet.shortName}</span>
                  <span className="text-[10px] text-[#8C8A84]">{outlet.complex}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Direct Concierge WhatsApp Action */}
          <div className="p-4 bg-[#1B1A18] rounded-xl border border-[#C8A45D]/20 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#8C8A84]">
                Direct Concierge
              </p>
              <p className="text-sm font-medium text-[#EFE9DF] mt-0.5">
                +91 70429 38777
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#C8A45D] text-[#111110] rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#d4b46e] transition-colors"
            >
              <MessageCircle size={14} />
              <span>Chat Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer secondary row */}
      <div className="px-6 md:px-12 py-5 border-t border-[#C8A45D]/15 flex flex-wrap items-center justify-between text-xs text-[#8C8A84]">
        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com/stressbusterstation"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C8A45D] transition-colors"
          >
            Instagram
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C8A45D] transition-colors"
          >
            WhatsApp
          </a>
          <button
            onClick={() => showToast("Legal terms pending live deployment")}
            className="hover:text-[#C8A45D] transition-colors"
          >
            Privacy
          </button>
          <button
            onClick={() => showToast("Legal terms pending live deployment")}
            className="hover:text-[#C8A45D] transition-colors"
          >
            Terms
          </button>
        </div>

        <span className="text-[11px] text-[#8C8A84]/70 mt-2 sm:mt-0 font-serif italic">
          Five Minutes of Quiet™ · Gurugram, India
        </span>
      </div>
    </div>
  );
};
