// src/hooks/useGTM.ts
// Todos os eventos sobem para window.dataLayer e são roteados pelo GTM
// (web + server-side via Stape) para Meta Pixel, GA4 e outras tags.
// Não disparamos fbq/gtag diretamente para evitar duplicação.
import { useCallback } from "react";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
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
        currency: "BRL",
        has_name: Boolean(formData.name),
        has_phone: Boolean(formData.phone),
      });
    },
    [pushEvent]
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
    },
    [pushEvent]
  );

  const trackPitchSelected = useCallback(
    (pitch: Pitch) => {
      pushEvent("pitch_selected", { pitch });
    },
    [pushEvent]
  );

  const trackSectionView = useCallback(
    (sectionName: string) => {
      pushEvent("section_view", {
        section_name: sectionName,
        engagement_type: "scroll",
      });
    },
    [pushEvent]
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
    },
    [pushEvent]
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
