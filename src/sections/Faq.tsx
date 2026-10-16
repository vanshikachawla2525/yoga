/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 13 — FAQ
 * Accordion with smooth height animation, rotating plus icon,
 * and answers to critical guest questions including medical disclaimer.
 */

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { FAQS_DATA } from "../data/content";

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq-section"
      className="relative py-28 px-6 md:px-12 bg-[#1B1A18] text-[#EFE9DF] border-b border-[#C8A45D]/15 overflow-hidden select-none"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-mono text-[#C8A45D] tracking-widest">
              (12)
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C8A84] font-sans">
              Clarity &amp; Questions
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#EFE9DF] tracking-tight">
            Frequently Contemplated
          </h2>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col divide-y divide-[#C8A45D]/15">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="py-6 transition-colors">
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between text-left gap-6 group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-xl sm:text-2xl text-[#EFE9DF] group-hover:text-[#C8A45D] transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-[#C8A45D]/30 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45 border-[#C8A45D] bg-[#C8A45D]/10" : ""
                    }`}
                  >
                    <Plus size={16} className="text-[#C8A45D]" />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-72 mt-4 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="font-sans text-xs sm:text-sm text-[#8C8A84] leading-relaxed max-w-3xl font-light">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
