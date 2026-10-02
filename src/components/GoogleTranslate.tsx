"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

type Language = "hi" | "en";

type GoogleTranslateElement = new (
  options: {
    autoDisplay: boolean;
    includedLanguages: string;
    pageLanguage: string;
  },
  elementId: string,
) => unknown;

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: GoogleTranslateElement;
      };
    };
  }
}

const LANGUAGE_STORAGE_KEY = "panditiji-language";
const TRANSLATE_ELEMENT_ID = "google_translate_element";
const TRANSLATE_CALLBACK_NAME = "googleTranslateElementInit";

export default function GoogleTranslate() {
  const pathname = usePathname();
  const languageRef = useRef<Language>("hi");
  const previousPathnameRef = useRef(pathname);
  const observerRef = useRef<MutationObserver | null>(null);
  const initializationTimerRef = useRef<number | null>(null);

  const applyLanguage = useCallback((language: Language, refresh = false) => {
    languageRef.current = language;
    const existingLanguage = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("googtrans="))
      ?.split("=")[1];
    document.cookie = `googtrans=/hi/${language}; path=/; SameSite=Lax`;

    const selector =
      document.querySelector<HTMLSelectElement>(".goog-te-combo");

    if (
      language === "hi" &&
      (selector?.value === "en" || existingLanguage === "/hi/en")
    ) {
      window.location.reload();
      return;
    }

    if (selector) {
      if (refresh && language === "en") {
        selector.value = "";
        selector.dispatchEvent(new Event("change"));
        window.setTimeout(() => {
          if (selector.isConnected) {
            selector.value = language;
            selector.dispatchEvent(new Event("change"));
          }
        }, 100);
        return;
      }

      selector.value = language === "hi" ? "" : language;
      selector.dispatchEvent(new Event("change"));
    }
  }, []);

  const initializeTranslator = useCallback(() => {
    const TranslateElement = window.google?.translate?.TranslateElement;
    const container = document.getElementById(TRANSLATE_ELEMENT_ID);

    if (!TranslateElement || !container) {
      return false;
    }

    if (container.dataset.initialized !== "true") {
      container.dataset.initialized = "true";
      new TranslateElement(
        {
          autoDisplay: false,
          includedLanguages: "hi,en",
          pageLanguage: "hi",
        },
        TRANSLATE_ELEMENT_ID,
      );
    }

    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    languageRef.current = savedLanguage === "en" ? "en" : "hi";

    const applyWhenReady = () => {
      const selector =
        container.querySelector<HTMLSelectElement>(".goog-te-combo");

      if (!selector) {
        return false;
      }

      observerRef.current?.disconnect();
      observerRef.current = null;
      applyLanguage(languageRef.current);
      return true;
    };

    if (!applyWhenReady()) {
      observerRef.current?.disconnect();
      observerRef.current = new MutationObserver(applyWhenReady);
      observerRef.current.observe(container, {
        childList: true,
        subtree: true,
      });
      applyWhenReady();
    }

    return true;
  }, [applyLanguage]);

  const startTranslatorInitialization = useCallback(() => {
    if (initializeTranslator()) {
      if (initializationTimerRef.current !== null) {
        window.clearInterval(initializationTimerRef.current);
        initializationTimerRef.current = null;
      }
      return;
    }

    if (initializationTimerRef.current !== null) {
      return;
    }

    let attempts = 0;
    initializationTimerRef.current = window.setInterval(() => {
      attempts += 1;

      if (initializeTranslator()) {
        if (initializationTimerRef.current !== null) {
          window.clearInterval(initializationTimerRef.current);
          initializationTimerRef.current = null;
        }
      } else if (attempts >= 50) {
        if (initializationTimerRef.current !== null) {
          window.clearInterval(initializationTimerRef.current);
          initializationTimerRef.current = null;
        }
        console.warn("Google Translate could not be initialized.");
      }
    }, 200);
  }, [initializeTranslator]);

  // Register the initialization function as the global callback
  // that element.js invokes when it finishes loading.
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)[TRANSLATE_CALLBACK_NAME] = startTranslatorInitialization;
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any)[TRANSLATE_CALLBACK_NAME];
    };
  }, [startTranslatorInitialization]);

  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const language = (
        event as CustomEvent<{ language?: unknown }>
      ).detail?.language;

      if (language === "hi" || language === "en") {
        applyLanguage(language);
      }
    };

    window.addEventListener(
      "panditiji-language-change",
      handleLanguageChange,
    );

    return () => {
      window.removeEventListener(
        "panditiji-language-change",
        handleLanguageChange,
      );
      observerRef.current?.disconnect();
      if (initializationTimerRef.current !== null) {
        window.clearInterval(initializationTimerRef.current);
        initializationTimerRef.current = null;
      }
    };
  }, [applyLanguage]);

  useEffect(() => {
    if (previousPathnameRef.current !== pathname) {
      previousPathnameRef.current = pathname;
      applyLanguage(languageRef.current, true);
    }
  }, [pathname, applyLanguage]);

  return (
    <>
      <div id={TRANSLATE_ELEMENT_ID} className="hidden" />
      <Script
        src={`https://translate.google.com/translate_a/element.js?cb=${TRANSLATE_CALLBACK_NAME}`}
        strategy="afterInteractive"
        onReady={startTranslatorInitialization}
        onError={(event) => {
          console.warn("Google Translate failed to load.", event);
        }}
      />
    </>
  );
}
