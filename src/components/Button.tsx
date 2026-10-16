/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useMagnetic } from "../hooks/useMagnetic";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gold";
  magnetic?: boolean;
  withArrow?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  magnetic = false,
  withArrow = false,
  icon,
  children,
  className = "",
  onClick,
  ...rest
}) => {
  const magneticRef = useMagnetic<HTMLButtonElement>(0.3, 75);
  const fallbackRef = useRef<HTMLButtonElement>(null);
  const buttonRef = magnetic ? magneticRef : fallbackRef;

  // Base styling: pill, touch target min 44px
  const baseClasses =
    "relative inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-full text-xs font-sans font-medium tracking-[0.16em] uppercase transition-all duration-300 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45D] overflow-hidden group select-none whitespace-nowrap cursor-pointer";

  let variantClasses = "";
  if (variant === "primary") {
    variantClasses = "bg-[#C8A45D] text-[#111110] font-semibold hover:bg-[#d6b571] shadow-sm";
  } else if (variant === "gold") {
    variantClasses = "bg-[#C8A45D]/15 border border-[#C8A45D]/60 text-[#EFE9DF] hover:bg-[#C8A45D] hover:text-[#111110]";
  } else if (variant === "secondary") {
    variantClasses = "bg-[#1B1A18] text-[#EFE9DF] border border-[#EFE9DF]/15 hover:border-[#C8A45D]/60 hover:text-[#C8A45D]";
  } else if (variant === "ghost") {
    variantClasses = "bg-transparent text-[#EFE9DF] border border-transparent hover:border-[#C8A45D]/50 hover:text-[#C8A45D]";
  }

  return (
    <button
      ref={buttonRef}
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {/* Label container with vertical roll effect on hover */}
      <span className="relative inline-flex flex-col h-[18px] overflow-hidden leading-[18px]">
        <span className="transition-transform duration-300 ease-out group-hover:-translate-y-full flex items-center">
          {children}
        </span>
        <span
          className="absolute top-0 left-0 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 flex items-center text-inherit"
          aria-hidden="true"
        >
          {children}
        </span>
      </span>

      {/* Arrow or custom icon */}
      {withArrow && (
        <ArrowUpRight
          size={15}
          className="ml-2 transition-transform duration-300 ease-out group-hover:rotate-45 shrink-0"
        />
      )}
      {icon && <span className="ml-2 shrink-0">{icon}</span>}
    </button>
  );
};
