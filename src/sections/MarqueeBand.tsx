/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 02 — MARQUEE: "Sound. Touch. Stillness."
 * Double strip: top strip in solid huge serif moving left,
 * bottom strip outlined text moving right, with small gold diamond separators.
 */

import React from "react";
import { Marquee } from "../components/Marquee";

export const MarqueeBand: React.FC = () => {
  const solidWords = ["Sound", "Touch", "Stillness", "Breath", "Quiet", "Decompress"];
  const outlineWords = ["Five Minutes", "Sanctuary", "Gurugram", "Vibrational Reset", "Restore", "Unwind"];

  return (
    <section className="py-10 bg-[#111110] border-y border-[#C8A45D]/15 overflow-hidden flex flex-col gap-3 select-none">
      {/* Top Strip: Solid huge serif moving left */}
      <Marquee speed={28} reverse={false}>
        {solidWords.map((word, idx) => (
          <span key={idx} className="inline-flex items-center gap-8 mx-6">
            <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#EFE9DF] tracking-tight hover:text-[#C8A45D] transition-colors">
              {word}
            </span>
            <span className="w-2 h-2 rotate-45 bg-[#C8A45D]/60" />
          </span>
        ))}
      </Marquee>

      {/* Bottom Strip: Outlined text moving right */}
      <Marquee speed={32} reverse={true} outlineStyle={true}>
        {outlineWords.map((word, idx) => (
          <span key={idx} className="inline-flex items-center gap-8 mx-6">
            <span className="font-serif text-4xl sm:text-5xl md:text-6xl italic tracking-tight hover:text-[#C8A45D] transition-colors">
              {word}
            </span>
            <span className="w-2 h-2 rotate-45 border border-[#C8A45D]/60" />
          </span>
        ))}
      </Marquee>
    </section>
  );
};
