/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 11 — BOOKING (The Complete 5-Step Journey)
 * 1. Location Selection
 * 2. Service Selection (filtered by chosen outlet)
 * 3. Date & Time Selection (21-day calendar + seeded time slots)
 * 4. Your Details (Indian phone validation + consent)
 * 5. Review & Demo Confirmation (real .ics export + prefilled WhatsApp link)
 */

import React, { useState, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  MessageCircle,
  RotateCcw,
  Sparkles,
  AlertCircle
} from "lucide-react";
import {
  OUTLETS_DATA,
  SERVICES_DATA,
  PROVISIONAL_WHATSAPP_NUMBER,
  OutletItem,
  ServiceItem,
} from "../data/content";
import { useSession } from "../context/SessionContext";

export const Booking: React.FC = () => {
  const {
    selectedServices,
    addService,
    removeService,
    selectedOutletId,
    setSelectedOutletId,
    selectedPlan,
  } = useSession();

  const [step, setStep] = useState(1);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("11:30 AM");

  // User details state
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
    consent: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [mockRefCode, setMockRefCode] = useState("");

  // Next 21 days calendar generator
  const calendarDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 21; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push({
        dateObj: d,
        dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
        dateNum: d.getDate(),
        monthName: d.toLocaleDateString("en-US", { month: "short" }),
        fullDateStr: d.toISOString().split("T")[0],
      });
    }
    return dates;
  }, []);

  // Seeded reproducible time slots for demo
  const timeSlots = useMemo(() => {
    const slots = [
      "09:30 AM",
      "10:15 AM",
      "11:00 AM",
      "11:30 AM",
      "12:15 PM",
      "02:00 PM",
      "02:45 PM",
      "03:30 PM",
      "04:15 PM",
      "05:00 PM",
      "06:30 PM",
      "07:15 PM",
      "08:00 PM",
    ];

    // Mark deterministic booked slots using date index
    return slots.map((s, idx) => ({
      time: s,
      isBooked: (idx + selectedDateIndex * 3) % 4 === 0,
    }));
  }, [selectedDateIndex]);

  // Current chosen outlet
  const currentOutlet =
    OUTLETS_DATA.find((o) => o.id === selectedOutletId) || OUTLETS_DATA[0];

  // Services available at current outlet
  const availableServices = SERVICES_DATA.filter((s) =>
    s.availableOutlets.includes(currentOutlet.id)
  );

  const totalMinutes = selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0);
  const totalAmount =
    selectedServices.reduce((sum, s) => sum + s.demoPriceINR, 0) +
    (selectedPlan ? selectedPlan.demoMonthlyINR : 0);

  // Validate step 4 details
  const validateDetails = () => {
    const errs: Record<string, string> = {};
    if (!details.name.trim()) errs.name = "Full name is required";
    if (!details.phone.trim()) {
      errs.phone = "Phone number is required";
    } else {
      // Indian mobile format (10 digits, optional +91)
      const cleanPhone = details.phone.replace(/[\s\-\+]/g, "");
      if (cleanPhone.length < 10) {
        errs.phone = "Please enter a valid 10-digit mobile number";
      }
    }
    if (details.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!details.consent) {
      errs.consent = "Please acknowledge that wellness services are non-medical";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (selectedServices.length === 0) {
        alert("Please pick at least one treatment for your session.");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      if (validateDetails()) {
        setStep(5);
      }
    }
  };

  const handleConfirmDemoBooking = () => {
    const code = "SBS-" + Math.floor(100000 + Math.random() * 900000);
    setMockRefCode(code);
    setIsConfirmed(true);
  };

  // Generate and download genuine .ics calendar file
  const handleDownloadICS = () => {
    const chosenDate = calendarDates[selectedDateIndex].fullDateStr.replace(/-/g, "");
    const startTimeFormatted = "113000"; // 11:30:00
    const endTimeFormatted = "123000";

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Stress Buster Station//Wellness Reservation//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:${mockRefCode}@stressbusterstation.com
DTSTAMP:${chosenDate}T${startTimeFormatted}Z
DTSTART:${chosenDate}T${startTimeFormatted}
DTEND:${chosenDate}T${endTimeFormatted}
SUMMARY:Stress Buster Station Reset Session (${mockRefCode})
DESCRIPTION:Your session at ${currentOutlet.name}. Services: ${selectedServices.map((s) => s.name).join(", ")}.
LOCATION:${currentOutlet.address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `SBS-Reset-${mockRefCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Prefilled WhatsApp link
  const selectedDateStr = calendarDates[selectedDateIndex].dateObj.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const whatsappMessage = `Hello Stress Buster Station,
I would like to confirm my session reservation:
• Ref: ${mockRefCode} (Demo)
• Name: ${details.name}
• Location: ${currentOutlet.name}
• Date & Time: ${selectedDateStr} at ${selectedTimeSlot}
• Services: ${selectedServices.map((s) => s.name).join(", ")}
• Total Duration: ${totalMinutes} mins (Est. ₹${totalAmount})`;

  const whatsappUrl = `https://wa.me/${PROVISIONAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <section
      id="booking-section"
      className="relative py-28 px-6 md:px-12 bg-[#141312] text-[#EFE9DF] border-b border-[#C8A45D]/15 overflow-hidden select-none"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-mono text-[#C8A45D] tracking-widest">
              (10)
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C8A84] font-sans">
              Sanctuary Reservation
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#EFE9DF] tracking-tight mb-2">
            Reserve Your Pause
          </h2>

          <p className="text-xs text-[#8C8A84] font-serif italic max-w-md">
            Demo preview: test the 5-step journey. No credit card or actual booking is processed.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-[11px] font-sans uppercase tracking-widest text-[#8C8A84] mb-2">
            <span className={step >= 1 ? "text-[#C8A45D] font-medium" : ""}>1. Location</span>
            <span className={step >= 2 ? "text-[#C8A45D] font-medium" : ""}>2. Service</span>
            <span className={step >= 3 ? "text-[#C8A45D] font-medium" : ""}>3. Date &amp; Time</span>
            <span className={step >= 4 ? "text-[#C8A45D] font-medium" : ""}>4. Details</span>
            <span className={step >= 5 ? "text-[#C8A45D] font-medium" : ""}>5. Review</span>
          </div>
          <div className="w-full h-1 bg-[#1B1A18] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#B5845A] to-[#C8A45D] transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Multi-Step Box */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#1B1A18] border border-[#C8A45D]/25 shadow-2xl relative">
          {/* Confirmed Success State */}
          {isConfirmed ? (
            <div className="py-8 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
              <div className="w-16 h-16 rounded-full bg-[#C8A45D]/15 border-2 border-[#C8A45D] flex items-center justify-center text-[#C8A45D] mb-4">
                <Check size={28} />
              </div>

              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A45D] mb-1">
                Demo Confirmation
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#EFE9DF] mb-2">
                Your Sanctuary Space is Held
              </h3>
              <p className="text-xs text-[#8C8A84] max-w-md font-serif italic mb-6">
                Demo confirmation: no real booking or payment was made. Reference code generated for review.
              </p>

              {/* Mock Reference Badge */}
              <div className="px-6 py-3 rounded-2xl bg-[#111110] border border-[#C8A45D]/30 mb-8 flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest text-[#8C8A84]">
                  Mock Reference Code
                </span>
                <span className="font-mono text-2xl text-[#C8A45D] font-bold tracking-wider mt-1">
                  {mockRefCode}
                </span>
              </div>

              {/* Action Buttons: Download .ics & WhatsApp */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={handleDownloadICS}
                  className="min-h-[44px] px-6 rounded-full bg-[#111110] border border-[#C8A45D]/40 text-[#EFE9DF] hover:border-[#C8A45D] hover:text-[#C8A45D] text-xs font-sans uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <Download size={14} className="text-[#C8A45D]" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-6 rounded-full bg-[#C8A45D] text-[#111110] hover:bg-[#d8b872] text-xs font-sans font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg"
                >
                  <MessageCircle size={14} />
                  <span>Send on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setIsConfirmed(false);
                    setStep(1);
                  }}
                  className="min-h-[44px] px-4 text-xs font-sans text-[#8C8A84] hover:text-[#EFE9DF] uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw size={13} />
                  <span>Book Another</span>
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Step 1: Location */}
              {step === 1 && (
                <div className="animate-in fade-in">
                  <h3 className="font-serif text-2xl text-[#EFE9DF] mb-4">
                    Choose Your Sanctuary Outlet
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {OUTLETS_DATA.map((outlet) => {
                      const isSelected = selectedOutletId === outlet.id;
                      return (
                        <div
                          key={outlet.id}
                          onClick={() => setSelectedOutletId(outlet.id)}
                          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#111110] border-[#C8A45D] shadow-lg"
                              : "bg-[#111110]/50 border-[#C8A45D]/15 hover:border-[#C8A45D]/40"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-serif text-lg text-[#EFE9DF]">
                              {outlet.name}
                            </h4>
                            {isSelected && <Check size={16} className="text-[#C8A45D]" />}
                          </div>
                          <p className="text-xs text-[#8C8A84] mb-2">{outlet.address}</p>
                          <span className="text-[11px] font-mono text-[#C8A45D]">
                            {outlet.demoHours}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Service */}
              {step === 2 && (
                <div className="animate-in fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-2xl text-[#EFE9DF]">
                      Select Treatments at {currentOutlet.shortName}
                    </h3>
                    <span className="text-xs text-[#8C8A84] font-mono">
                      {selectedServices.length} chosen
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                    {availableServices.map((service) => {
                      const isSelected = selectedServices.some((s) => s.id === service.id);
                      return (
                        <div
                          key={service.id}
                          onClick={() => {
                            if (isSelected) {
                              removeService(service.id);
                            } else {
                              addService(service);
                            }
                          }}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? "bg-[#111110] border-[#C8A45D]"
                              : "bg-[#111110]/50 border-[#C8A45D]/15 hover:border-[#C8A45D]/40"
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <h4 className="font-serif text-base text-[#EFE9DF] truncate">
                              {service.name}
                            </h4>
                            <span className="text-[11px] text-[#8C8A84]">
                              {service.durationMinutes} min · ₹{service.demoPriceINR}
                            </span>
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                              isSelected
                                ? "bg-[#C8A45D] border-[#C8A45D] text-[#111110]"
                                : "border-[#8C8A84]/40 text-transparent"
                            }`}
                          >
                            <Check size={12} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Date & Time */}
              {step === 3 && (
                <div className="animate-in fade-in">
                  <h3 className="font-serif text-2xl text-[#EFE9DF] mb-4">
                    Pick a Date &amp; Time
                  </h3>

                  {/* 21 Days Horizontal Scroll Carousel */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
                    {calendarDates.map((d, idx) => {
                      const isSelected = selectedDateIndex === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedDateIndex(idx)}
                          className={`flex flex-col items-center justify-center min-w-[70px] py-3 rounded-2xl border transition-all shrink-0 ${
                            isSelected
                              ? "bg-[#C8A45D] text-[#111110] border-[#C8A45D] font-semibold shadow-md"
                              : "bg-[#111110] text-[#EFE9DF] border-[#C8A45D]/20 hover:border-[#C8A45D]"
                          }`}
                        >
                          <span className="text-[10px] uppercase tracking-wider">{d.dayName}</span>
                          <span className="font-serif text-xl">{d.dateNum}</span>
                          <span className="text-[10px] uppercase opacity-70">{d.monthName}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Seeded Time Slots */}
                  <h4 className="text-xs uppercase tracking-widest text-[#8C8A84] font-sans mb-3">
                    Available Time Slots (Demo availability)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                    {timeSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        disabled={slot.isBooked}
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`py-2 px-3 rounded-xl text-xs font-mono transition-all border ${
                          slot.isBooked
                            ? "bg-[#111110]/30 border-transparent text-[#8C8A84]/40 line-through cursor-not-allowed"
                            : selectedTimeSlot === slot.time
                            ? "bg-[#C8A45D] text-[#111110] border-[#C8A45D] font-bold shadow-md"
                            : "bg-[#111110] text-[#EFE9DF] border-[#C8A45D]/20 hover:border-[#C8A45D]"
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Your Details */}
              {step === 4 && (
                <div className="animate-in fade-in">
                  <h3 className="font-serif text-2xl text-[#EFE9DF] mb-4">
                    Guest Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8C8A84] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={details.name}
                        onChange={(e) => setDetails({ ...details, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#111110] border border-[#C8A45D]/20 text-xs text-[#EFE9DF] focus:outline-none focus:border-[#C8A45D]"
                      />
                      {errors.name && (
                        <span className="text-[11px] text-red-400 mt-1 block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8C8A84] mb-1">
                        Mobile Phone (Indian Format) *
                      </label>
                      <input
                        type="tel"
                        value={details.phone}
                        onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#111110] border border-[#C8A45D]/20 text-xs text-[#EFE9DF] focus:outline-none focus:border-[#C8A45D]"
                      />
                      {errors.phone && (
                        <span className="text-[11px] text-red-400 mt-1 block">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8C8A84] mb-1">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={details.email}
                        onChange={(e) => setDetails({ ...details, email: e.target.value })}
                        placeholder="guest@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#111110] border border-[#C8A45D]/20 text-xs text-[#EFE9DF] focus:outline-none focus:border-[#C8A45D]"
                      />
                      {errors.email && (
                        <span className="text-[11px] text-red-400 mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#8C8A84] mb-1">
                        Special Requests / Pressure Note
                      </label>
                      <input
                        type="text"
                        value={details.notes}
                        onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                        placeholder="e.g. Focus on neck; low acoustic volume"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#111110] border border-[#C8A45D]/20 text-xs text-[#EFE9DF] focus:outline-none focus:border-[#C8A45D]"
                      />
                    </div>
                  </div>

                  {/* Consent checkbox */}
                  <label className="flex items-start gap-2.5 mt-6 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={details.consent}
                      onChange={(e) => setDetails({ ...details, consent: e.target.checked })}
                      className="mt-1 accent-[#C8A45D]"
                    />
                    <span className="text-xs text-[#8C8A84]">
                      I understand that wellness and acoustic services are designed for relaxation and are not a substitute for clinical medical care.
                    </span>
                  </label>
                  {errors.consent && (
                    <span className="text-[11px] text-red-400 mt-1 block">
                      {errors.consent}
                    </span>
                  )}
                </div>
              )}

              {/* Step 5: Review & Confirm */}
              {step === 5 && (
                <div className="animate-in fade-in">
                  <h3 className="font-serif text-2xl text-[#EFE9DF] mb-4">
                    Review Your Reservation
                  </h3>

                  <div className="p-6 rounded-2xl bg-[#111110] border border-[#C8A45D]/20 flex flex-col gap-4 mb-6">
                    <div className="flex justify-between text-xs pb-3 border-b border-[#C8A45D]/15">
                      <span className="text-[#8C8A84]">Outlet:</span>
                      <span className="text-[#EFE9DF] font-medium">{currentOutlet.name}</span>
                    </div>

                    <div className="flex justify-between text-xs pb-3 border-b border-[#C8A45D]/15">
                      <span className="text-[#8C8A84]">Date &amp; Time:</span>
                      <span className="text-[#EFE9DF] font-mono">
                        {selectedDateStr} at {selectedTimeSlot}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs pb-3 border-b border-[#C8A45D]/15">
                      <span className="text-[#8C8A84]">Services:</span>
                      <span className="text-[#EFE9DF] text-right font-medium">
                        {selectedServices.map((s) => s.name).join(", ")}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs pb-3 border-b border-[#C8A45D]/15">
                      <span className="text-[#8C8A84]">Guest:</span>
                      <span className="text-[#EFE9DF]">
                        {details.name} ({details.phone})
                      </span>
                    </div>

                    <div className="flex justify-between items-baseline pt-2">
                      <span className="text-sm font-medium text-[#EFE9DF]">Estimated Total (Demo):</span>
                      <span className="font-serif text-2xl text-[#C8A45D] font-bold tabular-nums">
                        ₹{totalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#8C8A84] font-serif italic mb-6">
                    Policy: You can reschedule or cancel up to 2 hours prior without charge. No payment details required for this demo.
                  </p>

                  <button
                    onClick={handleConfirmDemoBooking}
                    className="w-full min-h-[44px] rounded-full bg-[#C8A45D] text-[#111110] font-sans font-semibold text-xs uppercase tracking-wider hover:bg-[#d8b872] active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Confirm Demo Booking (No Payment Charged)</span>
                  </button>
                </div>
              )}

              {/* Navigation Back / Next Row */}
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#C8A45D]/15">
                {step > 1 ? (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-[#8C8A84] hover:text-[#EFE9DF] transition-colors"
                  >
                    <ChevronLeft size={14} />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 5 && (
                  <button
                    onClick={handleNextStep}
                    className="min-h-[40px] px-6 rounded-full bg-[#C8A45D] text-[#111110] text-xs font-sans font-semibold uppercase tracking-wider hover:bg-[#d8b872] active:scale-95 transition-all flex items-center gap-1"
                  >
                    <span>Next Step</span>
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
