import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGTM } from "./useGTM";

export const useRouteChangeTracking = () => {
  const location = useLocation();
  const { trackPageView, fbqTrack } = useGTM();

  useEffect(() => {
    trackPageView();
    fbqTrack("PageView");
  }, [location.pathname, location.search, trackPageView, fbqTrack]);
};
