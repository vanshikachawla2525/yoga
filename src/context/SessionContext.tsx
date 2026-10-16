/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { ServiceItem, PlanItem, SERVICES_DATA } from "../data/content";

interface SessionContextType {
  selectedServices: ServiceItem[];
  selectedPlan: PlanItem | null;
  selectedOutletId: string;
  totalDuration: number;
  totalPrice: number;
  addService: (service: ServiceItem) => void;
  removeService: (serviceId: string) => void;
  clearSession: () => void;
  selectPlan: (plan: PlanItem | null) => void;
  setSelectedOutletId: (id: string) => void;
  toastMessage: string | null;
  showToast: (msg?: string) => void;
  calmLevel: number; // 0 to 100
  setCalmLevel: (val: number) => void;
  isPreloaderFinished: boolean;
  setIsPreloaderFinished: (val: boolean) => void;
  scrollToBooking: () => void;
  scrollToSection: (id: string) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([SERVICES_DATA[0]]);
  const [selectedPlan, setSelectedPlan] = useState<PlanItem | null>(null);
  const [selectedOutletId, setSelectedOutletId] = useState<string>("capri");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [calmLevel, setCalmLevel] = useState<number>(0);
  const [isPreloaderFinished, setIsPreloaderFinished] = useState<boolean>(() => {
    return typeof window !== "undefined" && sessionStorage.getItem("sbs_preloader_seen") === "true";
  });

  const totalDuration = selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0);
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.demoPriceINR, 0) + (selectedPlan ? selectedPlan.demoMonthlyINR : 0);

  const addService = (service: ServiceItem) => {
    if (!selectedServices.some(s => s.id === service.id)) {
      setSelectedServices(prev => [...prev, service]);
      showToast(`Added "${service.name}" to session`);
    } else {
      showToast(`"${service.name}" is already in your session`);
    }
  };

  const removeService = (serviceId: string) => {
    setSelectedServices(prev => prev.filter(s => s.id !== serviceId));
  };

  const clearSession = () => {
    setSelectedServices([]);
    setSelectedPlan(null);
  };

  const selectPlan = (plan: PlanItem | null) => {
    setSelectedPlan(plan);
    if (plan) {
      showToast(`Selected "${plan.name}" membership`);
    }
  };

  const showToast = (msg = "Full site page: coming in the live build") => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(current => (current === msg ? null : current));
    }, 3200);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToBooking = () => {
    scrollToSection("booking-section");
  };

  return (
    <SessionContext.Provider
      value={{
        selectedServices,
        selectedPlan,
        selectedOutletId,
        totalDuration,
        totalPrice,
        addService,
        removeService,
        clearSession,
        selectPlan,
        setSelectedOutletId,
        toastMessage,
        showToast,
        calmLevel,
        setCalmLevel,
        isPreloaderFinished,
        setIsPreloaderFinished,
        scrollToBooking,
        scrollToSection
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
