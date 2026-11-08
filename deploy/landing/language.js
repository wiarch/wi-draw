const translations = {
  en: {
    skip: "Skip to content",
    pageTitle: "WI Draw — Make ideas visible",
    metaDescription:
      "A calm, hand-drawn canvas for diagrams, plans, and visual ideas.",
    navLabel: "Main navigation",
    navFeatures: "Features",
    languageLabel: "Language",
    openApp: "Open app",
    homeLabel: "WI Draw home",
    heroEyebrow: "Your space to think visually",
    heroTitleFirst: "Make ideas",
    heroTitleSecond: "visible.",
    heroDescription:
      "A simple, hand-drawn canvas for turning early thoughts into clear diagrams, plans, and sketches.",
    viewGithub: "View on GitHub",
    heroNote: "Start with a blank canvas. No account needed.",
    canvasAlt: "Illustration of a hand-drawn project map on a whiteboard",
    diagramIdea: "A new idea",
    diagramStart: "start anywhere",
    diagramSketch: "Sketch it",
    diagramSketchHint: "make a rough draft",
    diagramConnect: "Connect it",
    diagramConnectHint: "show how it fits",
    diagramExplore: "Keep exploring",
    diagramExploreHint: "one step at a time",
    canvasCaption: "A little room for big thinking",
    featuresEyebrow: "A canvas that stays out of your way",
    featuresTitleFirst: "From rough thought",
    featuresTitleSecond: "to clear picture.",
    featureOneTitle: "A natural hand-drawn feel",
    featureOneText:
      "Make diagrams that feel approachable, expressive, and easy to change.",
    featureTwoTitle: "Shapes that tell a story",
    featureTwoText:
      "Arrange shapes, arrows, notes, and freehand lines to show how things connect.",
    featureThreeTitle: "Take your work with you",
    featureThreeText:
      "Export a drawing as an image or SVG when it is ready to share or use elsewhere.",
    featureFourTitle: "Ready when inspiration is",
    featureFourText:
      "Keep drawing in the browser, with an offline-friendly app experience.",
    howEyebrow: "A simple way to begin",
    howTitleOne: "Think it.",
    howTitleTwo: "Draw it.",
    howTitleThree: "Shape it.",
    howText:
      "Open a fresh canvas and let the first marks be imperfect. WI Draw is made for working ideas out as you go.",
    howLink: "Start with a blank canvas",
    stepOneTitle: "Open a canvas",
    stepOneText: "Begin right away, without setting up an account.",
    stepTwoTitle: "Make the first mark",
    stepTwoText: "Sketch shapes, add notes, and link the parts together.",
    stepThreeTitle: "Save or export",
    stepThreeText:
      "Keep a local copy or export your drawing for the next step.",
    footerText: "A visual workspace by WI Arch.",
    github: "GitHub",
  },
  es: {
    skip: "Saltar al contenido",
    pageTitle: "WI Draw — Haz visibles tus ideas",
    metaDescription:
      "Un lienzo sencillo para crear diagramas, planes e ideas visuales a mano alzada.",
    navLabel: "Navegación principal",
    navFeatures: "Funciones",
    languageLabel: "Idioma",
    openApp: "Abrir la app",
    homeLabel: "Inicio de WI Draw",
    heroEyebrow: "Tu espacio para pensar visualmente",
    heroTitleFirst: "Haz visibles",
    heroTitleSecond: "tus ideas.",
    heroDescription:
      "Un lienzo sencillo y a mano alzada para convertir tus primeras ideas en diagramas, planes y bocetos claros.",
    viewGithub: "Ver en GitHub",
    heroNote: "Empieza con un lienzo en blanco. Sin crear una cuenta.",
    canvasAlt: "Ilustración de un mapa de proyecto dibujado en una pizarra",
    diagramIdea: "Una idea nueva",
    diagramStart: "empieza donde quieras",
    diagramSketch: "Haz un boceto",
    diagramSketchHint: "crea un primer borrador",
    diagramConnect: "Conecta las partes",
    diagramConnectHint: "muestra cómo encajan",
    diagramExplore: "Sigue explorando",
    diagramExploreHint: "paso a paso",
    canvasCaption: "Un poco de espacio para grandes ideas",
    featuresEyebrow: "Un lienzo que te deja concentrarte",
    featuresTitleFirst: "De una idea inicial",
    featuresTitleSecond: "a una imagen clara.",
    featureOneTitle: "Un estilo natural a mano alzada",
    featureOneText:
      "Crea diagramas expresivos, cercanos y fáciles de modificar.",
    featureTwoTitle: "Formas que cuentan una historia",
    featureTwoText:
      "Organiza formas, flechas, notas y trazos libres para mostrar conexiones.",
    featureThreeTitle: "Llévate tu trabajo",
    featureThreeText:
      "Exporta tu dibujo como imagen o SVG para compartirlo o usarlo en otro lugar.",
    featureFourTitle: "Listo cuando llegue la inspiración",
    featureFourText:
      "Sigue dibujando en el navegador con una app que puede funcionar sin conexión.",
    howEyebrow: "Una forma sencilla de empezar",
    howTitleOne: "Piensa.",
    howTitleTwo: "Dibuja.",
    howTitleThree: "Dale forma.",
    howText:
      "Abre un lienzo nuevo y no te preocupes por que los primeros trazos sean imperfectos. WI Draw te ayuda a desarrollar tus ideas mientras dibujas.",
    howLink: "Empieza con un lienzo en blanco",
    stepOneTitle: "Abre un lienzo",
    stepOneText: "Empieza de inmediato, sin crear una cuenta.",
    stepTwoTitle: "Haz el primer trazo",
    stepTwoText: "Dibuja formas, añade notas y conecta las partes.",
    stepThreeTitle: "Guarda o exporta",
    stepThreeText:
      "Conserva una copia local o exporta el dibujo para seguir trabajando.",
    footerText: "Un espacio visual de WI Arch.",
    github: "GitHub",
  },
};

const normalizeLanguage = (candidate) => {
  const base = String(candidate || "")
    .toLowerCase()
    .split(/[-_]/)[0];
  return base === "es" ? "es-ES" : base === "en" ? "en" : null;
};

const detectLanguage = () => {
  try {
    const savedLanguage = normalizeLanguage(
      window.localStorage.getItem("i18nextLng"),
    );
    if (savedLanguage) {
      return savedLanguage;
    }
  } catch {
    // Storage can be disabled; continue with the browser's language list.
  }

  const browserLanguages = [
    ...(navigator.languages || []),
    navigator.language,
  ];
  return (
    browserLanguages.map(normalizeLanguage).find(Boolean) || "en"
  );
};

const applyLanguage = (language, persist = true) => {
  const normalizedLanguage = normalizeLanguage(language) || "en";
  const dictionary =
    translations[normalizedLanguage === "es-ES" ? "es" : "en"];

  document.documentElement.lang = normalizedLanguage;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const translation = dictionary[element.dataset.i18n];
    if (translation) {
      element.textContent = translation;
    }
  });
  document.querySelectorAll("[data-i18n-content]").forEach((element) => {
    const translation = dictionary[element.dataset.i18nContent];
    if (translation) {
      element.setAttribute("content", translation);
    }
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const translation = dictionary[element.dataset.i18nAriaLabel];
    if (translation) {
      element.setAttribute("aria-label", translation);
    }
  });

  const languageSelect = document.getElementById("language-select");
  if (languageSelect) {
    languageSelect.value = normalizedLanguage;
  }

  if (persist) {
    try {
      window.localStorage.setItem("i18nextLng", normalizedLanguage);
    } catch {
      // The current page remains translated if storage is unavailable.
    }
  }
};

applyLanguage(detectLanguage());
document
  .getElementById("language-select")
  ?.addEventListener("change", (event) => {
    applyLanguage(event.currentTarget.value);
  });
