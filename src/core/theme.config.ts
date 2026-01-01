/**
 * CZero Design Tokens
 * Single source of truth for all design values
 */

export const theme = {
  color: {
    bg: { light: "0 0% 100%", dark: "220 40% 3%" },
    fg: { light: "220 15% 10%", dark: "210 40% 96%" },
    primary: { light: "222 47% 45%", dark: "210 80% 65%" },
    primaryFg: { light: "0 0% 100%", dark: "220 40% 3%" },
    secondary: { light: "220 10% 95%", dark: "220 8% 25%" },
    secondaryFg: { light: "220 15% 10%", dark: "210 40% 96%" },
    muted: { light: "220 10% 95%", dark: "220 8% 20%" },
    mutedFg: { light: "220 10% 40%", dark: "220 10% 60%" },
    danger: { light: "0 70% 55%", dark: "0 80% 65%" },
    dangerFg: { light: "0 0% 100%", dark: "0 0% 100%" },
    success: { light: "142 70% 45%", dark: "142 70% 55%" },
    successFg: { light: "0 0% 100%", dark: "0 0% 100%" },
    warning: { light: "38 92% 50%", dark: "38 92% 60%" },
    warningFg: { light: "0 0% 100%", dark: "0 0% 0%" },
    border: { light: "220 13% 90%", dark: "220 10% 20%" },
    ring: { light: "222 47% 45%", dark: "210 80% 65%" },
  },
  radius: {
    none: "0",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
  shadow: {
    none: "none",
    sm: "0 1px 2px rgb(0 0 0 / 0.05)",
    md: "0 2px 4px rgb(0 0 0 / 0.08)",
    lg: "0 4px 12px rgb(0 0 0 / 0.12)",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    "2xl": "2rem",
  },
  typography: {
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    size: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
    },
    weight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeight: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  },
  transition: {
    fast: "150ms ease",
    normal: "200ms ease",
    slow: "300ms ease",
  },
} as const;

export type Theme = typeof theme;
