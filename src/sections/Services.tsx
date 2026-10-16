/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 05 — SERVICES EXPLORER (the main interactive piece)
 * Editorial list with category tabs, outlet filtering, hover photo preview,
 * interactive accordion on mobile, and persistent Session Tray with running total.
 */

import React, { useState, useRef } from "react";
import { Plus, Check, Trash2, Clock, Sparkles, ChevronDown } from "lucide-react";
import { SERVICES_DATA, OUTLETS_DATA, ServiceItem } from "../data/content";
import { useSession } from "../context/SessionContext";

const CATEGORIES = [
  { id: "all", label: "All Offerings" },
  { id: "reset", label: "Stress Reset" },
  { id: "sound", label: "Sound & Vibro" },
  { id: "massage", label: "Massage & Ayurveda" },
  { id: "salon", label: "Salon & Skin" },
  { id: "journeys", label: "Journeys" },
];

export const Services: React.FC = () => {
  const {
    selectedServices,
    addService,
    removeService,
    totalDuration,
    totalPrice,
    scrollToBooking,
  } = useSession();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedOutletFilter, setSelectedOutletFilter] = useState<string>("all");
  const [hoveredService, setHoveredService] = useState<ServiceItem | null>(null);
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null);

  // Filter services
  const filteredServices = SERVICES_DATA.filter((s) => {
    const matchCat = activeCategory === "all" || s.category === activeCategory;
    const matchOutlet =
      selectedOutletFilter === "all" || s.availableOutlets.includes(selectedOutletFilter);
    return matchCat && matchOutlet;
  });

  return (
    <section
      id="services-section"
      className="relative py-28 px-6 md:px-12 bg-[#1B1A18] text-[#EFE9DF] border-b border-[#C8A45D]/15 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs font-mono text-[#C8A45D] tracking-widest">
                (04)
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C8A84] font-sans">
                Curated Offerings
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#EFE9DF] tracking-tight">
              Choose your kind of quiet.
            </h2>
            <p className="text-xs text-[#8C8A84] mt-2 font-serif italic">
              Availability varies by outlet. Selecting an outlet filters this list. (All prices are sample demo estimates).
            </p>
          </div>

          {/* Outlet Quick Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#8C8A84] font-sans mr-2">
              Filter Outlet:
            </span>
            <button
              onClick={() => setSelectedOutletFilter("all")}
              className={`px-3 py-1 text-xs rounded-full border transition-all ${
                selectedOutletFilter === "all"
                  ? "bg-[#C8A45D] text-[#111110] border-[#C8A45D] font-semibold"
                  : "bg-transparent text-[#8C8A84] border-[#8C8A84]/30 hover:border-[#C8A45D]"
              }`}
            >
              All Outlets
            </button>
            {OUTLETS_DATA.map((outlet) => (
              <button
                key={outlet.id}
                onClick={() => setSelectedOutletFilter(outlet.id)}
                className={`px-3 py-1 text-xs rounded-full border transition-all ${
                  selectedOutletFilter === outlet.id
                    ? "bg-[#C8A45D] text-[#111110] border-[#C8A45D] font-semibold"
                    : "bg-transparent text-[#8C8A84] border-[#8C8A84]/30 hover:border-[#C8A45D]"
                }`}
              >
                {outlet.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-6 overflow-x-auto pb-4 mb-10 border-b border-[#C8A45D]/15 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative pb-3 text-xs sm:text-sm font-sans tracking-[0.16em] uppercase whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? "text-[#C8A45D] font-medium"
                  : "text-[#8C8A84] hover:text-[#EFE9DF]"
              }`}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C8A45D] animate-in fade-in" />
              )}
            </button>
          ))}
        </div>

        {/* Main Grid: Left Service Rows, Right Sticky Session Tray */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Services Editorial List */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-[#C8A45D]/15">
            {filteredServices.length === 0 ? (
              <div className="py-16 text-center text-[#8C8A84]">
                <p className="font-serif text-xl italic mb-2">No treatments matched this outlet filter.</p>
                <button
                  onClick={() => setSelectedOutletFilter("all")}
                  className="text-xs uppercase tracking-wider text-[#C8A45D] underline"
                >
                  Reset outlet filter
                </button>
              </div>
            ) : (
              filteredServices.map((service, idx) => {
                const isSelected = selectedServices.some((s) => s.id === service.id);
                const isExpanded = expandedMobileId === service.id;

                return (
                  <div
                    key={service.id}
                    onMouseEnter={() => setHoveredService(service)}
                    className="group py-6 flex flex-col transition-all duration-300 hover:bg-[#111110]/40 px-3 -mx-3 rounded-xl cursor-pointer"
                    onClick={() => setExpandedMobileId(isExpanded ? null : service.id)}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      {/* Left Title and Duration */}
                      <div className="flex items-baseline gap-4 md:gap-6 flex-1 min-w-0">
                        <span className="text-xs font-mono text-[#C8A45D] tracking-widest shrink-0">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#EFE9DF] group-hover:text-[#C8A45D] transition-colors truncate">
                            {service.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#8C8A84] mt-1 font-light line-clamp-2 md:line-clamp-1">
                            {service.shortDescription}
                          </p>
                        </div>
                      </div>

                      {/* Right Duration, Price & Action */}
                      <div
                        className="flex items-center gap-4 sm:gap-6 shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="hidden sm:flex flex-col items-end">
                          <span className="text-xs font-mono text-[#8C8A84] flex items-center gap-1">
                            <Clock size={12} />
                            {service.durationMinutes} min
                          </span>
                          <span className="font-serif text-lg text-[#C8A45D] font-semibold tabular-nums">
                            ₹{service.demoPriceINR.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            if (isSelected) {
                              removeService(service.id);
                            } else {
                              addService(service);
                            }
                          }}
                          className={`min-h-[38px] px-4 rounded-full text-xs font-sans tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 ${
                            isSelected
                              ? "bg-[#C8A45D] text-[#111110] font-semibold"
                              : "bg-[#111110] text-[#EFE9DF] border border-[#C8A45D]/30 hover:border-[#C8A45D] hover:text-[#C8A45D]"
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check size={13} />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus size={13} />
                              <span>Select</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Mobile expanded drawer with image & details */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isExpanded ? "max-h-96 mt-4 opacity-100" : "max-h-0 opacity-0 lg:hidden"
                      }`}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#C8A45D]/10">
                        <div className="aspect-[16/9] rounded-lg overflow-hidden bg-[#111110]">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-between text-xs text-[#8C8A84]">
                          <p>
                            <strong className="text-[#EFE9DF]">Ideal for:</strong>{" "}
                            {service.suitableFor}
                          </p>
                          <p className="mt-1 font-serif italic">
                            {service.experienceNotes}
                          </p>
                          <div className="sm:hidden flex items-center justify-between mt-3 pt-2 border-t border-[#C8A45D]/15 text-[#C8A45D]">
                            <span className="font-mono">{service.durationMinutes} minutes</span>
                            <span className="font-serif text-lg font-bold">
                              ₹{service.demoPriceINR.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Sticky "Your Session" Tray */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 p-6 rounded-2xl bg-[#111110] border border-[#C8A45D]/30 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#C8A45D]/15 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#C8A45D]" />
                <h4 className="font-serif text-lg text-[#EFE9DF]">
                  Your Sanctuary Session
                </h4>
              </div>
              <span className="text-[11px] font-mono text-[#C8A45D]">
                {selectedServices.length} Selected
              </span>
            </div>

            {/* Selected items list */}
            {selectedServices.length === 0 ? (
              <p className="text-xs text-[#8C8A84] py-8 text-center font-serif italic">
                No treatments selected yet. Pick a 5-minute chair reset or sound bath above.
              </p>
            ) : (
              <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
                {selectedServices.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-[#1B1A18] border border-[#C8A45D]/15 text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-[#EFE9DF] font-medium truncate">{item.name}</p>
                      <span className="text-[11px] text-[#8C8A84]">
                        {item.durationMinutes} min · ₹{item.demoPriceINR}
                      </span>
                    </div>
                    <button
                      onClick={() => removeService(item.id)}
                      className="text-[#8C8A84] hover:text-red-400 p-1 transition-colors"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Running Total & Duration */}
            <div className="mt-6 pt-4 border-t border-[#C8A45D]/15 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs text-[#8C8A84]">
                <span>Total Time:</span>
                <span className="font-mono text-[#EFE9DF] font-medium">
                  {totalDuration} Minutes
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#EFE9DF]">Estimated Total (Demo):</span>
                <span className="font-serif text-xl text-[#C8A45D] font-bold tabular-nums">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Proceed to Booking Button */}
            <button
              onClick={scrollToBooking}
              disabled={selectedServices.length === 0}
              className="mt-5 w-full min-h-[44px] bg-[#C8A45D] text-[#111110] font-sans font-semibold text-xs tracking-wider uppercase rounded-full flex items-center justify-center gap-2 hover:bg-[#d8b872] active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              <span>Confirm &amp; Pick Date / Time →</span>
            </button>

            <p className="mt-3 text-[10px] text-[#8C8A84] text-center font-serif italic">
              Front-end preview. No charge occurs today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
