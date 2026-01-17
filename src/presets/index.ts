/**
 * CZero Theme Presets
 * Pre-built theme configurations users can extend
 */

import type { CZeroConfig } from "../core/types/config";

/**
 * Default preset - balanced, professional look
 */
export const defaultPreset: Partial<CZeroConfig> = {
  // Uses all default values from component-defaults.ts
};

/**
 * Compact preset - tighter spacing, smaller sizes
 * Great for data-dense applications
 */
export const compact: Partial<CZeroConfig> = {
  spacing: {
    xs: "0.125rem",
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
  },
  components: {
    button: {
      height: { sm: "1.75rem", md: "2rem", lg: "2.5rem" },
      paddingX: { sm: "0.5rem", md: "0.75rem", lg: "1rem" },
      gap: "0.375rem",
    },
    input: {
      height: { sm: "1.75rem", md: "2rem", lg: "2.5rem" },
      paddingX: { sm: "0.375rem", md: "0.5rem", lg: "0.75rem" },
    },
    card: {
      padding: "$spacing-md",
      header: { paddingBottom: "$spacing-sm", marginBottom: "$spacing-sm" },
      footer: { paddingTop: "$spacing-sm", marginTop: "$spacing-sm", gap: "0.375rem" },
    },
    switch: {
      width: { sm: "1.75rem", md: "2.25rem", lg: "3rem" },
      height: { sm: "1rem", md: "1.25rem", lg: "1.5rem" },
      thumbSize: { sm: "0.75rem", md: "1rem", lg: "1.25rem" },
    },
    checkbox: {
      size: { sm: "0.875rem", md: "1rem", lg: "1.25rem" },
      iconSize: { sm: "8px", md: "10px", lg: "12px" },
      labelGap: "0.375rem",
    },
  },
};

/**
 * Comfortable preset - more spacing, larger touch targets
 * Great for mobile-first or accessibility-focused apps
 */
export const comfortable: Partial<CZeroConfig> = {
  spacing: {
    xs: "0.375rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  components: {
    button: {
      height: { sm: "2.5rem", md: "3rem", lg: "3.5rem" },
      paddingX: { sm: "1rem", md: "1.5rem", lg: "2rem" },
      gap: "0.75rem",
    },
    input: {
      height: { sm: "2.5rem", md: "3rem", lg: "3.5rem" },
      paddingX: { sm: "0.75rem", md: "1rem", lg: "1.25rem" },
    },
    card: {
      padding: "$spacing-xl",
      header: { paddingBottom: "$spacing-lg", marginBottom: "$spacing-lg" },
      footer: { paddingTop: "$spacing-lg", marginTop: "$spacing-lg", gap: "0.75rem" },
    },
    switch: {
      width: { sm: "2.5rem", md: "3.25rem", lg: "4rem" },
      height: { sm: "1.375rem", md: "1.75rem", lg: "2.125rem" },
      thumbSize: { sm: "1.125rem", md: "1.5rem", lg: "1.875rem" },
    },
    checkbox: {
      size: { sm: "1.25rem", md: "1.5rem", lg: "1.75rem" },
      iconSize: { sm: "12px", md: "14px", lg: "16px" },
      labelGap: "0.75rem",
    },
  },
};

/**
 * Rounded preset - increased border radius for a softer look
 */
export const rounded: Partial<CZeroConfig> = {
  radius: {
    none: "0",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    full: "9999px",
  },
  components: {
    button: {
      borderRadius: "$radius-lg",
    },
    input: {
      borderRadius: "$radius-lg",
    },
    card: {
      borderRadius: "$radius-xl",
    },
  },
};

/**
 * Sharp preset - no border radius for a modern, angular look
 */
export const sharp: Partial<CZeroConfig> = {
  radius: {
    none: "0",
    sm: "0",
    md: "2px",
    lg: "4px",
    xl: "6px",
    full: "9999px",
  },
  components: {
    button: {
      borderRadius: "$radius-sm",
    },
    input: {
      borderRadius: "$radius-sm",
    },
    card: {
      borderRadius: "$radius-md",
    },
    checkbox: {
      borderRadius: "2px",
    },
  },
};

/**
 * Minimal preset - reduced shadows, subtle borders
 */
export const minimal: Partial<CZeroConfig> = {
  shadow: {
    none: "none",
    sm: "none",
    md: "0 1px 2px rgb(0 0 0 / 0.03)",
    lg: "0 2px 4px rgb(0 0 0 / 0.05)",
  },
  components: {
    button: {
      states: {
        hover: { opacity: "0.8" },
        focus: { ringWidth: "1px", ringOffset: "1px" },
      },
    },
    card: {
      shadow: "none",
      borderWidth: "1px",
    },
  },
};

/**
 * Vibrant preset - bolder colors, more pronounced effects
 */
export const vibrant: Partial<CZeroConfig> = {
  shadow: {
    none: "none",
    sm: "0 2px 4px rgb(0 0 0 / 0.1)",
    md: "0 4px 8px rgb(0 0 0 / 0.12)",
    lg: "0 8px 16px rgb(0 0 0 / 0.15)",
  },
  components: {
    button: {
      states: {
        hover: { opacity: "1", transform: "translateY(-1px)" },
        focus: { ringWidth: "3px", ringOffset: "2px" },
      },
    },
    card: {
      shadow: "$shadow-md",
    },
  },
};

// Export all presets
export const presets = {
  default: defaultPreset,
  compact,
  comfortable,
  rounded,
  sharp,
  minimal,
  vibrant,
};
