// Shared design tokens — charcoal & teal, professional/minimal theme
export const theme = {
  font: {
    heading: "'Space Grotesk', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  color: {
    bg: "#FFFFFF",
    bgAlt: "#F7F9F9",
    surface: "#FFFFFF",
    border: "#E5E7EB",
    borderStrong: "#D1D5DB",
    text: "#111827",
    textSecondary: "#4B5563",
    textMuted: "#9CA3AF",

    accent: "#0D9488",
    accentHover: "#0F766E",
    accentSoft: "#F0FDFA",
    accentBorder: "#99F6E4",
    accentText: "#0F766E",

    // secondary warm accent for variety — used sparingly (icons, tags, highlights)
    accent2: "#F59E0B",
    accent2Soft: "#FFFBEB",
    accent2Border: "#FDE68A",
    accent2Text: "#B45309",

    // tertiary cool accent for variety in tag/icon chips
    accent3: "#6366F1",
    accent3Soft: "#EEF2FF",
    accent3Border: "#C7D2FE",
    accent3Text: "#4338CA",

    dark: "#0B1220",
    darkAlt: "#111827",
    darkSurface: "#0F1720",
    darkText: "#F3F4F6",
    darkTextSecondary: "#9CA3AF",
    darkBorder: "rgba(255,255,255,0.08)",

    success: "#059669",
    danger: "#DC2626",

    gradientHero:
      "linear-gradient(135deg, #F0FDFA 0%, #FFFFFF 45%, #FFFBEB 100%)",
    gradientText: "linear-gradient(135deg, #0D9488 0%, #6366F1 100%)",
    gradientButton: "linear-gradient(135deg, #111827 0%, #0F766E 130%)",
    gradientDark:
      "linear-gradient(160deg, #0B1220 0%, #111827 60%, #0B1220 100%)",
  },
  fontImport:
    "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');",
};

export const T = theme;
