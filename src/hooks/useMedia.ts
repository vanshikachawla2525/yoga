/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";

export function useMedia() {
  const [windowWidth, setWindowWidth] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [hasFinePointer, setHasFinePointer] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia("(pointer: fine)").matches : true
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const handlePointer = (e: MediaQueryListEvent) => setHasFinePointer(e.matches);

    window.addEventListener("resize", handleResize);
    pointerQuery.addEventListener("change", handlePointer);

    return () => {
      window.removeEventListener("resize", handleResize);
      pointerQuery.removeEventListener("change", handlePointer);
    };
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  return { windowWidth, isMobile, isTablet, isDesktop, hasFinePointer };
}
