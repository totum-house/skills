/**
 * extract_tokens.js
 *
 * Roda no contexto da página (via claude-in-chrome:javascript_tool) e devolve
 * um objeto JSON com os tokens visuais medidos do DOM renderizado.
 *
 * Uso: colar o corpo desta IIFE no javascript_tool e capturar o retorno (console.log
 * ou return, dependendo de como a ferramenta expõe o resultado).
 */
(function extractDesignTokens() {
  const results = {
    source_url: window.location.href,
    extracted_at: new Date().toISOString(),
    colors: {},
    typography: {},
    spacing: {},
    components: {},
    warnings: [],
  };

  // ---------- helpers ----------
  function computed(el, prop) {
    if (!el) return null;
    return window.getComputedStyle(el).getPropertyValue(prop).trim();
  }

  function firstMatch(selectors) {
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) return el;
    }
    return null;
  }

  function colorFrequency(elements) {
    const freq = {};
    elements.forEach((el) => {
      const bg = computed(el, "background-color");
      const color = computed(el, "color");
      [bg, color].forEach((c) => {
        if (c && c !== "rgba(0, 0, 0, 0)" && c !== "transparent") {
          freq[c] = (freq[c] || 0) + 1;
        }
      });
    });
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .map(([color, count]) => ({ color, count }));
  }

  // ---------- CORES ----------
  const sampleEls = Array.from(
    document.querySelectorAll(
      "body, header, main, section, div, button, a, h1, h2, h3, .btn, [class*='button'], [class*='card']"
    )
  ).slice(0, 400); // limite defensivo para não travar em páginas gigantes

  results.colors.frequency_ranking = colorFrequency(sampleEls).slice(0, 10);
  results.colors.body_background = computed(document.body, "background-color");
  results.colors.body_text = computed(document.body, "color");

  const primaryBtn = firstMatch([
    "button[class*='primary']",
    "a[class*='primary']",
    ".btn-primary",
    "button",
    "a.btn",
  ]);
  if (primaryBtn) {
    results.colors.primary_button_bg = computed(primaryBtn, "background-color");
    results.colors.primary_button_text = computed(primaryBtn, "color");
  } else {
    results.warnings.push("Nenhum botão primário identificado por heurística de seletor.");
  }

  // Custom properties no :root (indica design system formal via CSS variables)
  const rootStyles = window.getComputedStyle(document.documentElement);
  const rootVars = {};
  for (let i = 0; i < rootStyles.length; i++) {
    const prop = rootStyles[i];
    if (prop.startsWith("--")) {
      rootVars[prop] = rootStyles.getPropertyValue(prop).trim();
    }
  }
  results.colors.css_custom_properties = rootVars;
  if (Object.keys(rootVars).length === 0) {
    results.warnings.push("Nenhuma CSS custom property encontrada no :root — site provavelmente não usa design tokens formais.");
  }

  // ---------- TIPOGRAFIA ----------
  results.typography.headings = {};
  ["h1", "h2", "h3", "h4", "h5", "h6"].forEach((tag) => {
    const el = document.querySelector(tag);
    if (el) {
      results.typography.headings[tag] = {
        font_family: computed(el, "font-family"),
        font_size: computed(el, "font-size"),
        font_weight: computed(el, "font-weight"),
        line_height: computed(el, "line-height"),
        letter_spacing: computed(el, "letter-spacing"),
      };
    }
  });

  const bodyEl = firstMatch(["p", "body"]);
  results.typography.body = {
    font_family: computed(bodyEl, "font-family"),
    font_size: computed(bodyEl, "font-size"),
    font_weight: computed(bodyEl, "font-weight"),
    line_height: computed(bodyEl, "line-height"),
  };

  const btnEl = firstMatch(["button", ".btn", "a.button"]);
  if (btnEl) {
    results.typography.button = {
      font_family: computed(btnEl, "font-family"),
      font_size: computed(btnEl, "font-size"),
      font_weight: computed(btnEl, "font-weight"),
      text_transform: computed(btnEl, "text-transform"),
    };
  }

  // ---------- ESPAÇAMENTO E GRID ----------
  const containerEl = firstMatch([
    "main",
    "[class*='container']",
    "[class*='wrapper']",
    "section",
  ]);
  results.spacing.container_max_width = computed(containerEl, "max-width");

  const sections = Array.from(document.querySelectorAll("section")).slice(0, 5);
  results.spacing.section_padding_samples = sections.map((s) => ({
    padding_top: computed(s, "padding-top"),
    padding_bottom: computed(s, "padding-bottom"),
  }));

  const gridEl = firstMatch(["[class*='grid']", "[style*='grid']"]);
  results.spacing.grid_gap = gridEl ? computed(gridEl, "gap") : null;

  const breakpointCandidates = [640, 768, 1024, 1280, 1536];
  results.spacing.active_breakpoints = breakpointCandidates.filter(
    (bp) => window.matchMedia(`(min-width: ${bp}px)`).matches
  );

  // ---------- COMPONENTES ----------
  const cardEl = firstMatch(["[class*='card']", "article"]);
  results.components.card = cardEl
    ? {
        border_radius: computed(cardEl, "border-radius"),
        box_shadow: computed(cardEl, "box-shadow"),
      }
    : null;

  if (btnEl) {
    results.components.button = {
      border_radius: computed(btnEl, "border-radius"),
      box_shadow: computed(btnEl, "box-shadow"),
      transition: computed(btnEl, "transition"),
    };
  }

  return results;
})();
