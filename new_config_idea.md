# CZero Extended Configuration System

> **Status**: Approved Design  
> **Created**: January 17, 2026  
> **Purpose**: Reference document for implementing per-component theming with complete control

---

## Overview

This document describes the extended configuration system that allows users to customize **every property** of every component, define custom variants, control interaction states, and use theme presets.

---

## 1. Config File Structure

```js
// czero.config.js
export default {
  // ===== GLOBAL TOKENS =====
  color: {
    primary: { light: "220 70% 50%", dark: "220 80% 60%" },
    secondary: { light: "220 10% 95%", dark: "220 15% 20%" },
    // ... all color tokens
  },
  radius: { sm: "0.25rem", md: "0.5rem", lg: "0.75rem", full: "9999px" },
  spacing: { sm: "0.5rem", md: "0.75rem", lg: "1rem" },
  shadow: { sm: "...", md: "...", lg: "..." },
  transition: { fast: "150ms ease", normal: "200ms ease" },
  typography: {
    fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem", lg: "1.125rem" },
    fontWeight: { normal: "400", medium: "500", semibold: "600", bold: "700" },
    lineHeight: { tight: "1.25", normal: "1.5", relaxed: "1.75" },
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },

  // ===== COMPONENT TOKENS =====
  components: {
    button: { /* see Component Token Schema below */ },
    input: { /* ... */ },
    // ... all 33 components
  },

  // ===== GLOBAL CSS INJECTION =====
  customCSS: {
    before: "",  // CSS inserted before all components
    after: "",   // CSS inserted after all components
  },
}
```

---

## 2. Token Reference Syntax

Users can reference global tokens using `$` prefix:

| Syntax | Resolves To |
|--------|-------------|
| `"$color-primary"` | `hsl(var(--cz-color-primary))` |
| `"$radius-md"` | `var(--cz-radius-md)` |
| `"$font-sm"` | `var(--cz-font-size-sm)` |
| `"$spacing-md"` | `var(--cz-spacing-md)` |
| `"0.5rem"` | Literal value (no transformation) |
| `"$color-primary / 0.5"` | `hsl(var(--cz-color-primary) / 0.5)` |

---

## 3. Component Token Schema

### Button

```js
button: {
  // === BASE SIZING ===
  height: { sm: "2rem", md: "2.5rem", lg: "3rem" },
  paddingX: { sm: "0.75rem", md: "1rem", lg: "1.5rem" },
  gap: "0.5rem",
  
  // === TYPOGRAPHY ===
  fontSize: { sm: "$font-sm", md: "$font-md", lg: "$font-lg" },
  fontWeight: "$font-medium",
  
  // === SHAPE ===
  borderRadius: "$radius-md",
  borderWidth: "1px",
  
  // === ICON-ONLY ===
  iconSize: { sm: "2rem", md: "2.5rem", lg: "3rem" },
  
  // === TRANSITIONS ===
  transition: "$transition-fast",
  
  // === STATES ===
  states: {
    hover: {
      opacity: "0.9",
      transform: "none",
      shadow: "none",
    },
    focus: {
      ringWidth: "2px",
      ringOffset: "2px",
      ringColor: "$color-ring",
    },
    active: {
      transform: "none",
    },
    disabled: {
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
  
  // === VARIANTS ===
  variants: {
    primary: {
      bg: "$color-primary",
      color: "$color-primaryFg",
      borderColor: "transparent",
      hover: { opacity: "0.9" },
    },
    secondary: {
      bg: "$color-secondary",
      color: "$color-secondaryFg",
      borderColor: "transparent",
      hover: { opacity: "0.8" },
    },
    outline: {
      bg: "transparent",
      color: "$color-fg",
      borderColor: "$color-border",
      hover: { bg: "$color-muted" },
    },
    ghost: {
      bg: "transparent",
      color: "$color-fg",
      borderColor: "transparent",
      hover: { bg: "$color-muted" },
    },
    danger: {
      bg: "$color-danger",
      color: "$color-dangerFg",
      borderColor: "transparent",
      hover: { opacity: "0.9" },
    },
    link: {
      bg: "transparent",
      color: "$color-primary",
      borderColor: "transparent",
      textDecoration: "underline",
      hover: { textDecorationThickness: "2px" },
    },
    // Users can add custom variants here
  },
  
  // === ANIMATIONS ===
  animations: {
    loading: {
      duration: "0.75s",
      timing: "linear",
    },
  },
  
  // === RESPONSIVE ===
  responsive: {
    sm: { /* overrides for < 640px */ },
    md: { /* overrides for < 768px */ },
  },
  
  // === CUSTOM CSS ===
  customCSS: "",
}
```

### Input

```js
input: {
  height: { sm: "2rem", md: "2.5rem", lg: "3rem" },
  paddingX: { sm: "0.5rem", md: "0.75rem", lg: "1rem" },
  fontSize: { sm: "$font-sm", md: "$font-md", lg: "$font-lg" },
  borderRadius: "$radius-md",
  borderWidth: "1px",
  borderColor: "$color-border",
  bg: "$color-bg",
  color: "$color-fg",
  placeholderColor: "$color-mutedFg",
  
  // Icons
  iconSize: "1rem",
  iconColor: "$color-mutedFg",
  iconSpacing: "2.5rem",
  
  // States
  states: {
    focus: {
      borderColor: "$color-ring",
      shadow: "0 0 0 2px $color-ring / 0.2",
    },
    error: {
      borderColor: "$color-danger",
      focusShadow: "0 0 0 2px $color-danger / 0.2",
    },
    disabled: {
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
  
  customCSS: "",
}
```

### Card

```js
card: {
  padding: "$spacing-lg",
  borderRadius: "$radius-lg",
  borderWidth: "1px",
  borderColor: "$color-border",
  bg: "$color-bg",
  shadow: "$shadow-sm",
  
  header: {
    paddingBottom: "$spacing-md",
    borderWidth: "1px",
    marginBottom: "$spacing-md",
  },
  title: {
    fontSize: "$font-lg",
    fontWeight: "$font-semibold",
    color: "$color-fg",
  },
  description: {
    fontSize: "$font-sm",
    color: "$color-mutedFg",
  },
  footer: {
    paddingTop: "$spacing-md",
    marginTop: "$spacing-md",
    borderWidth: "1px",
    gap: "0.5rem",
  },
  
  customCSS: "",
}
```

*(Similar schema for all 33 components)*

---

## 4. Theme Presets

### Preset Files Location
```
src/presets/
├── index.ts        # Export all presets
├── default.ts      # Default CZero theme
├── minimal.ts      # Low contrast, subtle shadows
├── vibrant.ts      # Bold colors, pronounced shadows
├── compact.ts      # Tighter spacing, smaller components
└── dark.ts         # Dark-first color palette
```

### Preset Structure
```ts
// src/presets/compact.ts
export const compact = {
  spacing: { sm: "0.375rem", md: "0.5rem", lg: "0.75rem" },
  components: {
    button: {
      height: { sm: "1.75rem", md: "2rem", lg: "2.5rem" },
      paddingX: { sm: "0.5rem", md: "0.75rem", lg: "1rem" },
      gap: "0.375rem",
    },
    input: {
      height: { sm: "1.75rem", md: "2rem", lg: "2.5rem" },
    },
    card: {
      padding: "$spacing-md",
    },
    // ... all components with compact overrides
  },
};
```

### User Usage
```js
import { presets } from "czero";

export default {
  ...presets.compact,
  ...presets.vibrant,  // Can compose multiple
  color: {
    primary: { light: "280 70% 50%" }, // User override
  },
}
```

---

## 5. Generated CSS Output

### CSS Variable Naming Convention

| Token Type | Variable Pattern | Example |
|------------|-----------------|---------|
| Global | `--cz-{category}-{name}` | `--cz-color-primary` |
| Component base | `--cz-{component}-{property}` | `--cz-btn-height-md` |
| Component state | `--cz-{component}-{state}-{property}` | `--cz-btn-hover-opacity` |
| Component variant | `--cz-{component}-{variant}-{property}` | `--cz-btn-primary-bg` |

### Example Output
```css
:root {
  /* Global tokens */
  --cz-color-primary: 220 70% 50%;
  --cz-radius-md: 0.5rem;
  
  /* Button base tokens */
  --cz-btn-height-sm: 2rem;
  --cz-btn-height-md: 2.5rem;
  --cz-btn-height-lg: 3rem;
  --cz-btn-padding-x-sm: 0.75rem;
  --cz-btn-padding-x-md: 1rem;
  --cz-btn-border-radius: var(--cz-radius-md);
  --cz-btn-transition: 150ms ease;
  
  /* Button state tokens */
  --cz-btn-hover-opacity: 0.9;
  --cz-btn-focus-ring-width: 2px;
  --cz-btn-focus-ring-color: var(--cz-color-ring);
  --cz-btn-disabled-opacity: 0.5;
  
  /* Button variant tokens */
  --cz-btn-primary-bg: hsl(var(--cz-color-primary));
  --cz-btn-primary-color: hsl(var(--cz-color-primaryFg));
}

.cz-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--cz-btn-gap);
  border-radius: var(--cz-btn-border-radius);
  font-weight: var(--cz-btn-font-weight);
  transition: all var(--cz-btn-transition);
  cursor: pointer;
  border: var(--cz-btn-border-width) solid transparent;
}

.cz-btn:hover { opacity: var(--cz-btn-hover-opacity); }
.cz-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 var(--cz-btn-focus-ring-offset) hsl(var(--cz-color-bg)),
              0 0 0 calc(var(--cz-btn-focus-ring-offset) + var(--cz-btn-focus-ring-width)) var(--cz-btn-focus-ring-color);
}
.cz-btn:disabled { opacity: var(--cz-btn-disabled-opacity); pointer-events: none; }

.cz-btn-sm { height: var(--cz-btn-height-sm); padding: 0 var(--cz-btn-padding-x-sm); }
.cz-btn-md { height: var(--cz-btn-height-md); padding: 0 var(--cz-btn-padding-x-md); }
.cz-btn-lg { height: var(--cz-btn-height-lg); padding: 0 var(--cz-btn-padding-x-lg); }

.cz-btn-primary {
  background: var(--cz-btn-primary-bg);
  color: var(--cz-btn-primary-color);
}

/* Responsive overrides */
@media (max-width: 640px) {
  :root {
    --cz-btn-height-md: 2.75rem; /* Larger touch targets */
  }
}
```

---

## 6. Key Design Decisions

1. **CSS Variables for Everything**: All values become CSS variables, allowing runtime theming
2. **Token References**: `$` syntax for referencing global tokens keeps config DRY
3. **Deep Merge**: Presets and user config are deep-merged, user always wins
4. **Variant Extensibility**: Users can add unlimited custom variants
5. **Component Isolation**: Each component's config is independent
6. **Backwards Compatible**: Existing configs (global tokens only) continue to work

---

## 7. TypeScript Support

Generate type definitions for config autocomplete:

```ts
// czero.config.d.ts (generated or shipped with library)
interface CZeroConfig {
  color?: ColorTokens;
  radius?: SizeTokens;
  // ...
  components?: {
    button?: ButtonConfig;
    input?: InputConfig;
    // ...
  };
}

interface ButtonConfig {
  height?: SizeVariants<string>;
  paddingX?: SizeVariants<string>;
  variants?: Record<string, ButtonVariant>;
  states?: ButtonStates;
  // ...
}
```
