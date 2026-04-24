import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGTM } from "./useGTM";

export const useRouteChangeTracking = () => {
  const location = useLocation();
  const { trackPageView } = useGTM();

  useEffect(() => {
    trackPageView();
  }, [location.pathname, location.search, trackPageView]);
};
