// src/hooks/useGTM.ts
import { useCallback } from "react";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

const IS_DEV = import.meta.env.DEV;

export type Pitch = "roi" | "financiamento";

export const useGTM = () => {
  const pushEvent = useCallback(
    (event: string, data?: Record<string, unknown>) => {
      if (typeof window === "undefined") return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event, ...data });
      if (IS_DEV) console.log("[GTM]", event, data);
    },
    []
  );

  const fbqTrack = useCallback(
    (event: string, params?: Record<string, unknown>) => {
      if (typeof window === "undefined" || !window.fbq) return;
      window.fbq("track", event, params);
      if (IS_DEV) console.log("[FBQ]", event, params);
    },
    []
  );

  const fbqTrackCustom = useCallback(
    (event: string, params?: Record<string, unknown>) => {
      if (typeof window === "undefined" || !window.fbq) return;
      window.fbq("trackCustom", event, params);
      if (IS_DEV) console.log("[FBQ custom]", event, params);
    },
    []
  );

  const trackFormSubmission = useCallback(
    (formData: {
      name?: string;
      phone?: string;
      city?: string;
      billValue?: string;
      form_name?: string;
      pitch?: Pitch | null;
    }) => {
      const billNumeric = formData.billValue
        ? parseFloat(
            formData.billValue.replace(/[^0-9.,]/g, "").replace(",", ".")
          ) || 0
        : 0;
      // Estimativa anual de conta como proxy de valor do lead
      const estimatedLeadValue = billNumeric * 12;
      const formName = formData.form_name || "contact_form";

      pushEvent("form_submit", {
        form_name: formName,
        pitch: formData.pitch || null,
        user_city: formData.city || null,
        bill_value: billNumeric || null,
        conversion_value: estimatedLeadValue,
        has_name: Boolean(formData.name),
        has_phone: Boolean(formData.phone),
      });

      fbqTrack("Lead", {
        value: estimatedLeadValue,
        currency: "BRL",
        content_name: formData.pitch || formName,
      });
    },
    [pushEvent, fbqTrack]
  );

  const trackPageView = useCallback(
    (pageName?: string) => {
      const pagePath =
        typeof window !== "undefined" ? window.location.pathname : "";
      pushEvent("page_view", {
        page_name: pageName || pagePath || "landing_page",
        page_path: pagePath,
        page_type: "landing_page",
      });
    },
    [pushEvent]
  );

  const trackButtonClick = useCallback(
    (buttonName: string, location?: string) => {
      pushEvent("button_click", {
        button_name: buttonName,
        button_location: location,
        click_type: "cta_button",
      });
    },
    [pushEvent]
  );

  const trackFunnelStart = useCallback(
    (source: string) => {
      pushEvent("funnel_start", { source });
      fbqTrack("InitiateCheckout", { content_name: source });
    },
    [pushEvent, fbqTrack]
  );

  const trackPitchSelected = useCallback(
    (pitch: Pitch) => {
      pushEvent("pitch_selected", { pitch });
      fbqTrack("SubmitApplication", { content_name: pitch });
    },
    [pushEvent, fbqTrack]
  );

  const trackSectionView = useCallback(
    (sectionName: string) => {
      pushEvent("section_view", {
        section_name: sectionName,
        engagement_type: "scroll",
      });
      if (sectionName === "hero") {
        fbqTrack("ViewContent", { content_name: "hero" });
      }
    },
    [pushEvent, fbqTrack]
  );

  const trackVideoInteraction = useCallback(
    (action: "play" | "pause" | "end", videoId?: string) => {
      pushEvent("video_interaction", {
        video_action: action,
        video_id: videoId || "hero_video",
        engagement_type: "video",
      });
    },
    [pushEvent]
  );

  const trackTestimonialView = useCallback(
    (testimonialIndex: number, testimonialName: string) => {
      pushEvent("testimonial_view", {
        testimonial_index: testimonialIndex,
        testimonial_name: testimonialName,
        engagement_type: "social_proof",
      });
    },
    [pushEvent]
  );

  const trackFAQInteraction = useCallback(
    (question: string, questionIndex: number) => {
      pushEvent("faq_interaction", {
        faq_question: question,
        faq_index: questionIndex,
        engagement_type: "information_seeking",
      });
    },
    [pushEvent]
  );

  const trackWhatsAppClick = useCallback(
    (location: string, message?: string) => {
      pushEvent("whatsapp_click", {
        click_location: location,
        message_type: message || "default",
        contact_method: "whatsapp",
      });
      fbqTrack("Contact", { content_name: location });
    },
    [pushEvent, fbqTrack]
  );

  const trackServiceInterest = useCallback(
    (serviceName: string) => {
      pushEvent("service_interest", {
        service_name: serviceName,
        engagement_type: "feature_interest",
      });
    },
    [pushEvent]
  );

  const trackScrollDepth = useCallback(
    (depth: 25 | 50 | 75 | 100) => {
      pushEvent("scroll_depth", {
        scroll_percentage: depth,
        engagement_level:
          depth >= 75 ? "high" : depth >= 50 ? "medium" : "low",
      });
    },
    [pushEvent]
  );

  const trackTimeOnPage = useCallback(
    (timeInSeconds: number) => {
      pushEvent("time_on_page", {
        time_seconds: timeInSeconds,
        engagement_duration:
          timeInSeconds >= 120
            ? "long"
            : timeInSeconds >= 60
            ? "medium"
            : "short",
      });
    },
    [pushEvent]
  );

  return {
    pushEvent,
    fbqTrack,
    fbqTrackCustom,
    trackFormSubmission,
    trackPageView,
    trackButtonClick,
    trackFunnelStart,
    trackPitchSelected,
    trackSectionView,
    trackVideoInteraction,
    trackTestimonialView,
    trackFAQInteraction,
    trackWhatsAppClick,
    trackServiceInterest,
    trackScrollDepth,
    trackTimeOnPage,
  };
};
