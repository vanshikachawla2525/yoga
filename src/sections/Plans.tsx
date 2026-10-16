/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 08 — MEMBERSHIPS & PACKAGES
 * Monthly/Quarterly toggle with number-roll animation,
 * 3D tilting cards, Most chosen highlighted card, and expandable perks tiles.
 */

import React, { useState } from "react";
import { Check, Sparkles, Gift, Users, ShieldCheck, ChevronRight } from "lucide-react";
import { MEMBERSHIP_PLANS, SPECIAL_TILES, PlanItem } from "../data/content";
import { useSession } from "../context/SessionContext";

export const Plans: React.FC = () => {
  const { selectPlan, scrollToBooking, showToast } = useSession();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">("monthly");
  const [expandedTileIndex, setExpandedTileIndex] = useState<number | null>(null);

  return (
    <section
      id="plans-section"
      className="relative py-28 px-6 md:px-12 bg-[#111110] text-[#EFE9DF] border-b border-[#C8A45D]/15 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-mono text-[#C8A45D] tracking-widest">
              (07)
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C8A84] font-sans">
              Membership Cadence
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#EFE9DF] tracking-tight mb-4">
            Come back to yourself.
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#8C8A84] font-light max-w-lg mb-8">
            Regular micro-pauses prevent compound cognitive fatigue. Choose a sustained practice across our Gurugram sanctuaries.
          </p>

          {/* Monthly / Quarterly Billing Toggle */}
          <div className="inline-flex items-center p-1 bg-[#1B1A18] rounded-full border border-[#C8A45D]/30 relative">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-[#C8A45D] text-[#111110] font-semibold shadow-md"
                  : "text-[#8C8A84] hover:text-[#EFE9DF]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("quarterly")}
              className={`px-5 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 ${
                billingCycle === "quarterly"
                  ? "bg-[#C8A45D] text-[#111110] font-semibold shadow-md"
                  : "text-[#8C8A84] hover:text-[#EFE9DF]"
              }`}
            >
              <span>Quarterly</span>
              <span className="text-[10px] text-[#C8A45D] bg-[#111110] px-1.5 py-0.2 rounded-full">
                Save 15%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {MEMBERSHIP_PLANS.map((plan) => {
            const price =
              billingCycle === "monthly" ? plan.demoMonthlyINR : plan.demoQuarterlyINR;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all duration-500 bg-[#1B1A18] ${
                  plan.isPopular
                    ? "border-2 border-[#C8A45D] shadow-2xl shadow-[#C8A45D]/10 md:-translate-y-3 z-10"
                    : "border border-[#C8A45D]/20 hover:border-[#C8A45D]/50"
                }`}
              >
                {/* Popular Pill */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C8A45D] text-[#111110] font-sans text-[10px] uppercase font-bold tracking-[0.2em] shadow-lg">
                    Most Chosen (Demo)
                  </div>
                )}

                {/* Top Section */}
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#C8A45D] block mb-1">
                    {plan.tier} Tier
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#EFE9DF] mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-[#8C8A84] leading-relaxed mb-6 font-serif italic">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-8 pb-6 border-b border-[#C8A45D]/15">
                    <span className="font-serif text-4xl sm:text-5xl text-[#C8A45D] font-bold tabular-nums">
                      ₹{price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs font-sans text-[#8C8A84] ml-2">
                      / {billingCycle === "monthly" ? "month" : "quarter"}
                    </span>
                    <span className="block text-[10px] text-[#8C8A84] mt-1 italic">
                      // DEMO sample rate
                    </span>
                  </div>

                  {/* Included Perks */}
                  <ul className="flex flex-col gap-3 mb-8">
                    {plan.includedPerks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#EFE9DF]">
                        <Check size={14} className="text-[#C8A45D] shrink-0 mt-0.5" />
                        <span className="font-light">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Choose Plan Action */}
                <div>
                  <button
                    onClick={() => {
                      selectPlan(plan);
                      scrollToBooking();
                    }}
                    className={`w-full min-h-[44px] rounded-full text-xs font-sans tracking-widest uppercase transition-all duration-300 font-semibold flex items-center justify-center gap-2 ${
                      plan.isPopular
                        ? "bg-[#C8A45D] text-[#111110] hover:bg-[#d6b571]"
                        : "bg-[#111110] text-[#EFE9DF] border border-[#C8A45D]/30 hover:border-[#C8A45D] hover:text-[#C8A45D]"
                    }`}
                  >
                    <span>Choose Plan</span>
                  </button>
                  <p className="text-[10px] text-[#8C8A84] text-center mt-2 font-serif italic">
                    Ideal for: {plan.idealFor}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Special Expandable Tiles Row: Gift Vouchers, First-Visit, Prepaid, Family */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SPECIAL_TILES.map((tile, idx) => {
            const isExpanded = expandedTileIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => setExpandedTileIndex(isExpanded ? null : idx)}
                className="p-5 rounded-2xl bg-[#1B1A18]/60 border border-[#C8A45D]/20 hover:border-[#C8A45D]/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-serif text-lg text-[#EFE9DF] group-hover:text-[#C8A45D] transition-colors">
                    {tile.title}
                  </h4>
                  <ChevronRight
                    size={15}
                    className={`text-[#C8A45D] transition-transform duration-300 ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  />
                </div>

                <p className="text-xs text-[#8C8A84] line-clamp-2 mb-3">
                  {tile.description}
                </p>

                <div className="text-[11px] font-sans uppercase tracking-wider text-[#C8A45D] pt-2 border-t border-[#C8A45D]/10">
                  {tile.action}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
