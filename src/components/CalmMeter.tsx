/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useSession } from "../context/SessionContext";

export const CalmMeter: React.FC = () => {
  const { calmLevel } = useSession();

  // Subtle state description based on scroll depth
  const stateLabel =
    calmLevel < 25
      ? "Urban Noise"
      : calmLevel < 60
      ? "Slowing Down"
      : calmLevel < 90
      ? "Deep Resonance"
      : "Complete Stillness";

  return (
    <div
      role="region"
      aria-label="Calm descent meter"
      className="fixed bottom-6 left-6 z-[9980] hidden sm:flex items-center gap-3 px-3 py-2 bg-[#1B1A18]/80 backdrop-blur-md border border-[#C8A45D]/20 rounded-full shadow-lg"
    >
      <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-sans text-[#8C8A84]">
        <span>Noise</span>
        <span className="text-[#C8A45D]/60">→</span>
        <span className="text-[#C8A45D] font-semibold">Calm</span>
      </div>

      {/* Mini Progress Track */}
      <div className="w-16 h-1 bg-[#2A2825] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#B5845A] to-[#C8A45D] transition-all duration-200"
          style={{ width: `${Math.round(calmLevel)}%` }}
        />
      </div>

      <span className="text-[10px] font-mono text-[#C8A45D] tabular-nums">
        {Math.round(calmLevel)}%
      </span>

      <span className="text-[10px] text-[#8C8A84] border-l border-[#8C8A84]/20 pl-2 hidden md:inline font-serif italic">
        {stateLabel}
      </span>
    </div>
  );
};
