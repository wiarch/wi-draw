import { defaultLang, languages } from "@excalidraw/excalidraw";
import LanguageDetector from "i18next-browser-languagedetector";

export const languageDetector = new LanguageDetector();

languageDetector.init({
  languageUtils: {},
  order: ["localStorage", "navigator"],
  lookupLocalStorage: "i18nextLng",
  caches: ["localStorage"],
});

export const getPreferredLanguage = () => {
  const detectedLanguages = languageDetector.detect();
  const candidates = Array.isArray(detectedLanguages)
    ? [...detectedLanguages]
    : [detectedLanguages];

  if (typeof navigator !== "undefined") {
    candidates.push(...(navigator.languages || []), navigator.language);
  }

  for (const candidate of candidates) {
    const language = String(candidate || "").toLowerCase().split(/[-_]/)[0];
    if (language === "es") {
      return languages.find((lang) => lang.code === "es-ES")?.code ||
        defaultLang.code;
    }
    if (language === "en") {
      return defaultLang.code;
    }
  }

  return defaultLang.code;
};
