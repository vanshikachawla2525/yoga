/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 14 — INSTAGRAM STRIP
 * Looping scroll-velocity marquee of 8 authentic wellness image tiles
 * linking to https://instagram.com/stressbusterstation.
 * NOTE: Images are stand-ins to be replaced with client's actual photography.
 */

import React from "react";
import { Instagram } from "lucide-react";
import { Marquee } from "../components/Marquee";
import { IMAGES } from "../data/content";

// 8 Curated Stand-in Wellness Visual Tiles (different aspect ratios)
const INSTA_TILES = [
  { img: IMAGES.heroArch1, caption: "Singing Bowl Resonance", aspect: "w-60 h-72" },
  { img: IMAGES.heroArch2, caption: "Quiet Oil Work", aspect: "w-48 h-64" },
  { img: IMAGES.heroArch3, caption: "Sacred Smoke", aspect: "w-72 h-80" },
  { img: IMAGES.ritualLounge, caption: "Travertine Sanctuary", aspect: "w-80 h-60" },
  { img: IMAGES.candleStones, caption: "Warm River Slate", aspect: "w-56 h-72" },
  { img: IMAGES.teaLounge, caption: "Unhurried Tea Ritual", aspect: "w-64 h-64" },
  { img: IMAGES.herbalHerbs, caption: "Ayurvedic Botanical Press", aspect: "w-52 h-68" },
  { img: IMAGES.skinCare, caption: "Clean Lymphatic Flow", aspect: "w-60 h-72" },
];

export const InstaStrip: React.FC = () => {
  return (
    <section className="py-20 bg-[#111110] border-b border-[#C8A45D]/15 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between mb-8">
        <div>
          <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#C8A45D] block mb-1">
            Visual Stillness
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#EFE9DF]">
            Follow the Exhale
          </h3>
        </div>

        <a
          href="https://instagram.com/stressbusterstation"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C8A45D]/30 text-xs font-sans tracking-wider uppercase text-[#EFE9DF] hover:border-[#C8A45D] hover:text-[#C8A45D] transition-colors"
        >
          <Instagram size={14} className="text-[#C8A45D]" />
          <span>@stressbusterstation</span>
        </a>
      </div>

      {/* Marquee loop of 8 tiles */}
      <Marquee speed={35} pauseOnHover={true}>
        {INSTA_TILES.map((tile, idx) => (
          <a
            key={idx}
            href="https://instagram.com/stressbusterstation"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="view"
            className={`mx-3 shrink-0 rounded-2xl overflow-hidden border border-[#C8A45D]/20 relative group block ${tile.aspect} bg-[#1B1A18]`}
          >
            <img
              src={tile.img}
              alt={tile.caption}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111110]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-[11px] font-serif italic text-[#C8A45D]">
                {tile.caption}
              </span>
            </div>
          </a>
        ))}
      </Marquee>
    </section>
  );
};
