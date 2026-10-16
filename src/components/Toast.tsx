/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Info, X } from "lucide-react";
import { useSession } from "../context/SessionContext";

export const Toast: React.FC = () => {
  const { toastMessage, showToast } = useSession();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[9995] max-w-sm flex items-center gap-3 px-4 py-3 bg-[#1B1A18]/95 backdrop-blur-md border border-[#C8A45D]/40 text-[#EFE9DF] text-xs font-sans rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="w-5 h-5 rounded-full bg-[#C8A45D]/20 text-[#C8A45D] flex items-center justify-center shrink-0">
        <Info size={12} />
      </div>
      <p className="flex-1 leading-snug font-medium text-[#EFE9DF]">
        {toastMessage}
      </p>
      <button
        onClick={() => showToast("")}
        className="text-[#8C8A84] hover:text-[#EFE9DF] p-1 transition-colors"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
};
