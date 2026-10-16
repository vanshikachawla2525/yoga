/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 07 — MOOD FINDER (interactive quiz twist)
 * 3-question tap quiz recommending an authentic treatment.
 * Calm particle settle effect, no medical diagnosis claims.
 */

import React, { useState } from "react";
import { Sparkles, ArrowRight, RotateCcw, Check } from "lucide-react";
import { SERVICES_DATA, ServiceItem } from "../data/content";
import { useSession } from "../context/SessionContext";

interface Question {
  id: number;
  title: string;
  options: { label: string; tag: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "What does today feel like in your body and mind?",
    options: [
      { label: "Mental Overload & Rapid Heartbeat", tag: "mind" },
      { label: "Heavy Shoulders & Stiff Neck", tag: "neck" },
      { label: "Dull Fatigue & Low Vitality", tag: "body" },
      { label: "Sensory Noise — Need Total Silence", tag: "sound" },
    ],
  },
  {
    id: 2,
    title: "How much time do you have to step away?",
    options: [
      { label: "5 – 15 Minutes (Desk Pause)", tag: "short" },
      { label: "25 – 30 Minutes (Acoustic Reset)", tag: "mid" },
      { label: "45 – 60 Minutes (Full Unwind)", tag: "long" },
      { label: "90 Minutes (Signature Retreat)", tag: "journey" },
    ],
  },
  {
    id: 3,
    title: "Where are you spending your day in Gurugram?",
    options: [
      { label: "Sector 48 / Sohna Road Corridor", tag: "capri" },
      { label: "DLF Cyber City / Cyber Hub", tag: "harmony" },
      { label: "DLF Phase 4 / Galleria Vicinity", tag: "dlf-city" },
      { label: "Golf Course Extension / Sector 63", tag: "hilton-63" },
    ],
  },
];

export const MoodFinder: React.FC = () => {
  const { addService, scrollToBooking } = useSession();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultService, setResultService] = useState<ServiceItem | null>(null);

  const handleSelectOption = (tag: string) => {
    const updated = [...answers, tag];
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate recommendation based on tags
      const timeTag = updated[1];
      let matched: ServiceItem;

      if (timeTag === "short") {
        matched = updated[0] === "neck" ? SERVICES_DATA[1] : SERVICES_DATA[0];
      } else if (timeTag === "mid") {
        matched = updated[0] === "sound" ? SERVICES_DATA[2] : SERVICES_DATA[3];
      } else if (timeTag === "journey") {
        matched = SERVICES_DATA[12]; // signature 90
      } else {
        matched = updated[0] === "body" ? SERVICES_DATA[6] : SERVICES_DATA[5];
      }

      setResultService(matched);
      setCurrentStep(3); // Result view
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResultService(null);
  };

  return (
    <section
      id="mood-section"
      className="relative py-28 px-6 md:px-12 bg-[#191816] text-[#EFE9DF] border-b border-[#C8A45D]/15 overflow-hidden select-none"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="text-xs font-mono text-[#C8A45D] tracking-widest">
            (06)
          </span>
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C8A84] font-sans">
            Personal Guidance
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-[#EFE9DF] tracking-tight mb-3">
          The Mood Finder
        </h2>
        <p className="text-xs text-[#8C8A84] font-serif italic mb-10 max-w-md">
          Three gentle questions to guide you toward your ideal sanctuary reset.
        </p>

        {/* Quiz Container Card */}
        <div className="w-full bg-[#111110] border border-[#C8A45D]/25 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          {currentStep < 3 ? (
            <div>
              {/* Progress Dots */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {QUESTIONS.map((q, idx) => (
                  <span
                    key={q.id}
                    className={`transition-all duration-300 rounded-full ${
                      currentStep === idx
                        ? "w-8 h-1.5 bg-[#C8A45D]"
                        : currentStep > idx
                        ? "w-3 h-1.5 bg-[#C8A45D]/40"
                        : "w-3 h-1.5 bg-[#8C8A84]/20"
                    }`}
                  />
                ))}
              </div>

              {/* Question Title */}
              <h3 className="font-serif text-2xl sm:text-3xl text-[#EFE9DF] mb-8 font-normal">
                {QUESTIONS[currentStep].title}
              </h3>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {QUESTIONS[currentStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt.tag)}
                    className="p-4 rounded-xl bg-[#1B1A18] border border-[#C8A45D]/20 hover:border-[#C8A45D] hover:bg-[#C8A45D]/10 text-xs sm:text-sm font-sans tracking-wide text-[#EFE9DF] transition-all duration-200 active:scale-98 flex items-center justify-between group"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight
                      size={14}
                      className="text-[#C8A45D] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Card */
            resultService && (
              <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center">
                <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A45D] mb-2">
                  Recommended For You Today
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl text-[#EFE9DF] mb-3">
                  {resultService.name}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#8C8A84] max-w-lg mb-6 leading-relaxed">
                  {resultService.shortDescription}
                </p>

                {/* Key Metrics */}
                <div className="flex items-center gap-6 py-3 px-6 rounded-2xl bg-[#1B1A18] border border-[#C8A45D]/20 mb-8">
                  <div>
                    <span className="block text-[10px] uppercase text-[#8C8A84]">Duration</span>
                    <span className="font-mono text-sm text-[#EFE9DF] font-medium">
                      {resultService.durationMinutes} Minutes
                    </span>
                  </div>
                  <div className="w-[1px] h-8 bg-[#C8A45D]/20" />
                  <div>
                    <span className="block text-[10px] uppercase text-[#8C8A84]">Sample Price</span>
                    <span className="font-serif text-lg text-[#C8A45D] font-bold">
                      ₹{resultService.demoPriceINR.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      addService(resultService);
                      scrollToBooking();
                    }}
                    className="min-h-[44px] px-8 rounded-full bg-[#C8A45D] text-[#111110] font-sans font-semibold text-xs uppercase tracking-wider hover:bg-[#d8b872] active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Check size={14} />
                    <span>Add to My Session &amp; Book</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="min-h-[44px] px-5 rounded-full border border-[#8C8A84]/30 text-[#8C8A84] hover:text-[#EFE9DF] hover:border-[#EFE9DF] text-xs font-sans uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw size={13} />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        <p className="mt-6 text-[11px] text-[#8C8A84]/70 font-serif italic max-w-md">
          This questionnaire is a non-clinical personal preference guide for relaxation modalities and does not diagnose physical or mental conditions.
        </p>
      </div>
    </section>
  );
};
