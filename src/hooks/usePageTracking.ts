// src/hooks/usePageTracking.ts
import { useEffect, useRef } from "react";
import { useGTM } from "./useGTM";

export const usePageTracking = () => {
  const { trackScrollDepth, trackTimeOnPage } = useGTM();
  const scrollDepthsTracked = useRef(new Set<number>());
  const startTime = useRef(Date.now());
  const timeReported = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (documentHeight <= 0) return;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      [25, 50, 75, 100].forEach((depth) => {
        if (
          scrollPercentage >= depth &&
          !scrollDepthsTracked.current.has(depth)
        ) {
          scrollDepthsTracked.current.add(depth);
          trackScrollDepth(depth as 25 | 50 | 75 | 100);
        }
      });
    };

    const trackTime = () => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      if (
        timeSpent === 30 ||
        timeSpent === 60 ||
        timeSpent === 120 ||
        timeSpent === 300
      ) {
        trackTimeOnPage(timeSpent);
      }
    };

    const reportFinalTime = () => {
      if (timeReported.current) return;
      timeReported.current = true;
      const finalTime = Math.round((Date.now() - startTime.current) / 1000);
      trackTimeOnPage(finalTime);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        reportFinalTime();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    const timeInterval = setInterval(trackTime, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(timeInterval);
    };
  }, [trackScrollDepth, trackTimeOnPage]);
};
