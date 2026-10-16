/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 10 — CORPORATE WELLNESS: "Quiet, at work."
 * Workplace ergonomic wellness programs, interactive validated inquiry form,
 * honeypot spam protection, and real in-browser HTML brochure generator.
 */

import React, { useState } from "react";
import { Download, CheckCircle, Briefcase, Users, Building, Shield } from "lucide-react";
import { BROCHURE_SAMPLE_CONTENT, IMAGES } from "../data/content";

export const Corporate: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    workEmail: "",
    employeeCount: "50-200",
    preferredFormat: "On-Site Chair Clinic",
    location: "DLF Cyber City",
    timeframe: "Next 30 Days",
    honeypot: "", // Spam prevention
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.companyName.trim()) errs.companyName = "Company name is required";
    if (!formData.contactPerson.trim()) errs.contactPerson = "Contact person is required";
    if (!formData.workEmail.trim()) {
      errs.workEmail = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      errs.workEmail = "Please provide a valid corporate email format";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Silent discard for spam bots
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  // Generate downloadable single-page HTML brochure on the fly
  const handleDownloadBrochure = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${BROCHURE_SAMPLE_CONTENT.title}</title>
  <style>
    body { font-family: 'Georgia', serif; background: #111110; color: #EFE9DF; padding: 40px; line-height: 1.6; max-width: 800px; mx-auto; }
    h1 { color: #C8A45D; font-size: 28px; margin-bottom: 8px; }
    .badge { color: #8C8A84; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; }
    .disclaimer { background: #1B1A18; border: 1px solid #C8A45D; padding: 15px; border-radius: 8px; font-size: 12px; margin: 25px 0; }
    ul { list-style: none; padding-left: 0; }
    li { padding: 8px 0; border-bottom: 1px solid #2A2825; font-size: 15px; }
    .contact { margin-top: 30px; font-size: 14px; color: #8C8A84; }
  </style>
</head>
<body>
  <div class="badge">Stress Buster Station · Corporate Dossier</div>
  <h1>${BROCHURE_SAMPLE_CONTENT.title}</h1>
  <p>${BROCHURE_SAMPLE_CONTENT.edition}</p>
  
  <div class="disclaimer">
    <strong>DEMO PREVIEW NOTICE:</strong> ${BROCHURE_SAMPLE_CONTENT.disclaimer}
  </div>

  <h2>Core Corporate Decompression Formats:</h2>
  <ul>
    ${BROCHURE_SAMPLE_CONTENT.pillars.map((p) => `<li>◆ ${p}</li>`).join("")}
  </ul>

  <div class="contact">
    <p>Sanctuary Locations: ${BROCHURE_SAMPLE_CONTENT.locations}</p>
    <p>Corporate Concierge: ${BROCHURE_SAMPLE_CONTENT.phone} | ${BROCHURE_SAMPLE_CONTENT.email}</p>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Stress-Buster-Station-Corporate-Brochure-Demo.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="corporate-section"
      className="relative py-28 px-6 md:px-12 bg-[#111110] text-[#EFE9DF] border-b border-[#C8A45D]/15 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-mono text-[#C8A45D] tracking-widest">
              (09)
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C8A84] font-sans">
              Workplace Decompression
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-[#EFE9DF] tracking-tight mb-4">
            Quiet, <span className="italic text-[#C8A45D]">at work.</span>
          </h2>

          <p className="font-sans text-sm md:text-base text-[#8C8A84] font-light leading-relaxed">
            Gurugram teams face relentless cognitive friction. We bring calibrated 5-minute chair resets, sound rooms, and executive decompression pop-ups directly onto corporate campuses.
          </p>
        </div>

        {/* 3 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-[#1B1A18] border border-[#C8A45D]/20">
            <span className="font-serif text-4xl text-[#C8A45D]/40 block mb-2 font-light">01</span>
            <h4 className="font-serif text-xl text-[#EFE9DF] mb-2">Campus Site Assessment</h4>
            <p className="text-xs text-[#8C8A84] leading-relaxed">
              We inspect ambient sound levels and floor space to designate an acoustic sanctuary zone.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#1B1A18] border border-[#C8A45D]/20">
            <span className="font-serif text-4xl text-[#C8A45D]/40 block mb-2 font-light">02</span>
            <h4 className="font-serif text-xl text-[#EFE9DF] mb-2">Turnkey Setup</h4>
            <p className="text-xs text-[#8C8A84] leading-relaxed">
              Our practitioners arrive with calibrated zero-gravity chairs, Tibetan singing bowls, and botanical mists.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#1B1A18] border border-[#C8A45D]/20">
            <span className="font-serif text-4xl text-[#C8A45D]/40 block mb-2 font-light">03</span>
            <h4 className="font-serif text-xl text-[#EFE9DF] mb-2">Rhythmic Cadence</h4>
            <p className="text-xs text-[#8C8A84] leading-relaxed">
              Employees reserve 15-minute slots via our discrete schedule without interrupting daily sprint workflows.
            </p>
          </div>
        </div>

        {/* Form and Brochure Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-[#1B1A18] border border-[#C8A45D]/30 shadow-2xl">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#EFE9DF] mb-2">
              Request a Corporate Decompression Proposal
            </h3>
            <p className="text-xs text-[#8C8A84] mb-6 font-serif italic">
              Fill out this preliminary consultation outline. (Demo form: captured locally).
            </p>

            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center animate-in fade-in">
                <CheckCircle size={48} className="text-[#C8A45D] mb-4" />
                <h4 className="font-serif text-2xl text-[#EFE9DF] mb-2">
                  Enquiry Captured Locally
                </h4>
                <p className="text-xs text-[#8C8A84] max-w-md font-sans mb-6">
                  Demo enquiry captured successfully. In the live site this routes immediately to our Gurugram corporate concierge desk.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full border border-[#C8A45D]/40 text-xs font-sans uppercase tracking-widest text-[#C8A45D] hover:bg-[#C8A45D] hover:text-[#111110] transition-colors"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Honeypot field hidden from real humans */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-[#8C8A84] mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Zomato / Google / BCG"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#111110] border border-[#C8A45D]/20 text-xs text-[#EFE9DF] focus:outline-none focus:border-[#C8A45D]"
                    />
                    {errors.companyName && (
                      <span className="text-[11px] text-red-400 mt-1 block">
                        {errors.companyName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-[#8C8A84] mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="Your Full Name"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#111110] border border-[#C8A45D]/20 text-xs text-[#EFE9DF] focus:outline-none focus:border-[#C8A45D]"
                    />
                    {errors.contactPerson && (
                      <span className="text-[11px] text-red-400 mt-1 block">
                        {errors.contactPerson}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-[#8C8A84] mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#111110] border border-[#C8A45D]/20 text-xs text-[#EFE9DF] focus:outline-none focus:border-[#C8A45D]"
                    />
                    {errors.workEmail && (
                      <span className="text-[11px] text-red-400 mt-1 block">
                        {errors.workEmail}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-[#8C8A84] mb-1">
                      Team Size
                    </label>
                    <select
                      value={formData.employeeCount}
                      onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#111110] border border-[#C8A45D]/20 text-xs text-[#EFE9DF] focus:outline-none focus:border-[#C8A45D]"
                    >
                      <option value="10-50">10 – 50 Employees</option>
                      <option value="50-200">50 – 200 Employees</option>
                      <option value="200-500">200 – 500 Employees</option>
                      <option value="500+">500+ Enterprise</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-[#8C8A84] mb-1">
                      Format
                    </label>
                    <select
                      value={formData.preferredFormat}
                      onChange={(e) => setFormData({ ...formData, preferredFormat: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#111110] border border-[#C8A45D]/20 text-xs text-[#EFE9DF] focus:outline-none focus:border-[#C8A45D]"
                    >
                      <option value="On-Site Chair Clinic">On-Site Ergonomic Chair Clinic</option>
                      <option value="Acoustic Sound Pop-Up">Acoustic Sound Bath Pop-Up</option>
                      <option value="Off-Site Retreat">Off-Site Sanctuary Day at Capri</option>
                      <option value="Prepaid Pass Bundle">Prepaid Corporate Pass Pack</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-[#8C8A84] mb-1">
                      Location / Region
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#111110] border border-[#C8A45D]/20 text-xs text-[#EFE9DF] focus:outline-none focus:border-[#C8A45D]"
                    >
                      <option value="DLF Cyber City">DLF Cyber City, Gurugram</option>
                      <option value="Golf Course Road">Golf Course Road Corridor</option>
                      <option value="Sector 48 / Sohna Rd">Sector 48 / Sohna Road</option>
                      <option value="Udyog Vihar">Udyog Vihar / Aerocity</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 min-h-[44px] rounded-full bg-[#C8A45D] text-[#111110] text-xs font-sans font-semibold uppercase tracking-wider hover:bg-[#d8b872] active:scale-98 transition-all"
                >
                  Submit Demo Corporate Enquiry →
                </button>
              </form>
            )}
          </div>

          {/* Right Download Brochure Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#1B1A18] border border-[#C8A45D]/20 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C8A45D] block mb-2">
                Downloadable Asset
              </span>
              <h3 className="font-serif text-2xl text-[#EFE9DF] mb-3">
                Corporate Wellness Dossier
              </h3>
              <p className="text-xs text-[#8C8A84] leading-relaxed mb-6 font-light">
                Generates a clean standalone one-page overview of on-site formats, pricing structures, and acoustic equipment specifications.
              </p>

              <div className="p-4 rounded-xl bg-[#111110] border border-[#C8A45D]/15 mb-6 text-xs text-[#8C8A84] flex flex-col gap-2">
                <span className="text-[#EFE9DF] font-medium">Includes:</span>
                <span>• Equipment footprints (chairs, bowls, linen)</span>
                <span>• Team scheduling mechanics</span>
                <span>• Sample rate cards (Demo estimates)</span>
              </div>
            </div>

            <button
              onClick={handleDownloadBrochure}
              className="w-full min-h-[44px] rounded-full border border-[#C8A45D]/40 text-[#EFE9DF] hover:border-[#C8A45D] hover:text-[#C8A45D] text-xs font-sans font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download size={14} className="text-[#C8A45D]" />
              <span>Download Brochure (.html)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
