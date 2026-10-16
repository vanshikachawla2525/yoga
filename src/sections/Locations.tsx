/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 09 — LOCATIONS (Directory and Stylized SVG Sanctuary Map)
 * Split layout with selectable outlet cards and interactive SVG map coordinates.
 */

import React, { useState } from "react";
import { MapPin, Clock, Phone, Navigation, ArrowRight, AlertCircle } from "lucide-react";
import { OUTLETS_DATA, OutletItem } from "../data/content";
import { useSession } from "../context/SessionContext";

export const Locations: React.FC = () => {
  const { setSelectedOutletId, scrollToBooking } = useSession();
  const [activeOutlet, setActiveOutlet] = useState<OutletItem>(OUTLETS_DATA[0]);

  const handleBookHere = (outlet: OutletItem) => {
    setSelectedOutletId(outlet.id);
    scrollToBooking();
  };

  const getDirectionsUrl = (query: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <section
      id="locations-section"
      className="relative py-28 px-6 md:px-12 bg-[#1B1A18] text-[#EFE9DF] border-b border-[#C8A45D]/15 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs font-mono text-[#C8A45D] tracking-widest">
                (08)
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C8A84] font-sans">
                Gurugram Directory
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#EFE9DF] tracking-tight">
              Five Sanctuaries. One Rhythm.
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#8C8A84] bg-[#111110] px-3.5 py-2 rounded-full border border-[#C8A45D]/20">
            <AlertCircle size={13} className="text-[#C8A45D]" />
            <span>Locations, hours and services are provisional until confirmed by the owner.</span>
          </div>
        </div>

        {/* Split Layout: Directory List on Left, Stylized SVG Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Outlets Directory List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {OUTLETS_DATA.map((outlet) => {
              const isCurrent = activeOutlet.id === outlet.id;

              return (
                <div
                  key={outlet.id}
                  onClick={() => setActiveOutlet(outlet)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? "bg-[#111110] border-[#C8A45D] shadow-xl"
                      : "bg-[#111110]/50 border-[#C8A45D]/15 hover:border-[#C8A45D]/40"
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#EFE9DF]">
                      {outlet.name}
                    </h3>
                    <span className="text-[10px] font-mono text-[#C8A45D] tracking-wider uppercase">
                      {outlet.availableServicesCount} Treatments
                    </span>
                  </div>

                  <p className="text-xs text-[#8C8A84] font-sans mb-3 line-clamp-1">
                    {outlet.address}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-[#8C8A84]">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock size={11} className="text-[#C8A45D]" />
                      {outlet.demoHours}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Stylized SVG Map & Active Details Drawer */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Stylized SVG Map Viewport */}
            <div className="relative w-full h-[320px] sm:h-[380px] rounded-3xl bg-[#111110] border border-[#C8A45D]/25 overflow-hidden p-6 flex items-center justify-center shadow-2xl">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Stylized Gurugram Road Arteries */}
                <path
                  d="M10,20 Q40,40 90,50"
                  fill="none"
                  stroke="rgba(200, 164, 93, 0.12)"
                  strokeWidth="1"
                />
                <path
                  d="M30,90 Q50,50 70,10"
                  fill="none"
                  stroke="rgba(200, 164, 93, 0.15)"
                  strokeWidth="1.2"
                />
                <path
                  d="M15,65 Q55,60 85,85"
                  fill="none"
                  stroke="rgba(200, 164, 93, 0.1)"
                  strokeWidth="0.8"
                />
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(200,164,93,0.06)" strokeWidth="0.5" />

                {/* Animated Map Pins */}
                {OUTLETS_DATA.map((outlet) => {
                  const isCurrent = activeOutlet.id === outlet.id;
                  return (
                    <g
                      key={outlet.id}
                      onClick={() => setActiveOutlet(outlet)}
                      className="cursor-pointer"
                    >
                      {/* Pulse ring for active outlet */}
                      {isCurrent && (
                        <circle
                          cx={outlet.coordinates.x}
                          cy={outlet.coordinates.y}
                          r="6"
                          fill="none"
                          stroke="#C8A45D"
                          strokeWidth="1"
                          className="animate-ping origin-center opacity-70"
                        />
                      )}
                      <circle
                        cx={outlet.coordinates.x}
                        cy={outlet.coordinates.y}
                        r={isCurrent ? "4" : "2.5"}
                        fill={isCurrent ? "#C8A45D" : "rgba(239, 233, 223, 0.5)"}
                        className="transition-all duration-300"
                      />
                      <text
                        x={outlet.coordinates.x + 5}
                        y={outlet.coordinates.y + 1}
                        fill={isCurrent ? "#C8A45D" : "#8C8A84"}
                        fontSize="3"
                        fontFamily="sans-serif"
                        letterSpacing="0.05em"
                        className="transition-colors duration-200 select-none pointer-events-none"
                      >
                        {outlet.shortName}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute top-4 left-6 text-[10px] font-sans tracking-[0.25em] uppercase text-[#8C8A84]">
                Interactive Gurugram Grid (Vector Simulation)
              </div>
            </div>

            {/* Active Outlet Detail Card */}
            <div className="p-6 rounded-2xl bg-[#111110] border border-[#C8A45D]/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C8A45D] block mb-1">
                  Selected Sanctuary
                </span>
                <h4 className="font-serif text-2xl text-[#EFE9DF] mb-1">
                  {activeOutlet.name}
                </h4>
                <p className="text-xs text-[#8C8A84] mb-3">
                  {activeOutlet.address}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#8C8A84]">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock size={12} className="text-[#C8A45D]" />
                    {activeOutlet.demoHours}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={12} className="text-[#C8A45D]" />
                    {activeOutlet.demoPhone}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Book Here & Google Maps */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handleBookHere(activeOutlet)}
                  className="min-h-[44px] px-5 bg-[#C8A45D] text-[#111110] text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#d8b872] active:scale-95 transition-all"
                >
                  Book Here →
                </button>

                <a
                  href={getDirectionsUrl(activeOutlet.mapQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 bg-[#1B1A18] text-[#EFE9DF] border border-[#C8A45D]/30 text-xs font-medium uppercase tracking-wider rounded-full hover:border-[#C8A45D] flex items-center gap-1.5 transition-colors"
                >
                  <Navigation size={13} className="text-[#C8A45D]" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
