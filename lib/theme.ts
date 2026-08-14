// Shared design tokens — editorial / magazine direction.
// Ink + paper base, deepened teal as the signature accent, amber & indigo
// held back for sparing use in tags and small marks.
export const theme = {
  font: {
    // Editorial serif — carries headlines, pull quotes, big numerals.
    display: "'Fraunces', serif",
    // Geometric sans — kickers, labels, nav, UI chrome.
    heading: "'Space Grotesk', sans-serif",
    // Workhorse body copy.
    body: "'Inter', sans-serif",
    // Data, stack tags, code, captions.
    mono: "'JetBrains Mono', monospace",
  },
  color: {
    ink: "#0B1310",
    inkSoft: "#1C2521",
    paper: "#F5F6F2",
    paperAlt: "#ECEEE8",
    surface: "#FFFFFF",
    border: "#DEDFD8",
    borderStrong: "#C6C8BE",
    text: "#121815",
    textSecondary: "#4B534D",
    textMuted: "#8B9189",

    accent: "#0E7C74",
    accentBright: "#14B8A6",
    accentSoft: "#E7F4F1",
    accentBorder: "#B9DFD8",
    accentText: "#0B6259",

    accent2: "#F59E0B",
    accent2Soft: "#FDF5E4",
    accent2Border: "#F0D89A",
    accent2Text: "#92600A",

    accent3: "#6366F1",
    accent3Soft: "#EEEEFB",
    accent3Border: "#C9CAF3",
    accent3Text: "#4143B0",

    dark: "#0B1310",
    darkAlt: "#121915",
    darkSurface: "#161F1A",
    darkText: "#F2F4F0",
    darkTextSecondary: "#9AA69F",
    darkBorder: "rgba(245,246,242,0.1)",

    success: "#0E7C74",
    danger: "#B3351D",

    gradientText:
      "linear-gradient(135deg, #0E7C74 0%, #14B8A6 45%, #6366F1 100%)",
    gradientDark:
      "linear-gradient(160deg, #0B1310 0%, #121915 55%, #0B1310 100%)",
  },
  type: {
    display: "clamp(2.75rem, 6.5vw, 6.5rem)",
    h1: "clamp(2.25rem, 5vw, 4rem)",
    h2: "clamp(1.9rem, 4vw, 3rem)",
    h3: "clamp(1.3rem, 2.4vw, 1.8rem)",
    kicker: "0.72rem",
  },
  fontImport:
    "@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');",
};

export const T = theme;
