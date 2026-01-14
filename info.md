# CZero Codebase Documentation

> Complete reference for future development and maintenance.

---

## Overview

CZero is a **design-token-driven React component library** that generates CSS from user configuration. Users don't need Tailwind - they run a CLI that creates a standalone CSS file.

### Key Concepts

1. **Design Tokens** - Values defined in `theme.config.ts` (colors, radii, spacing, etc.)
2. **CSS Variables** - Tokens become `--cz-*` CSS variables
3. **Pure CSS Components** - No runtime dependencies, just CSS classes with `cz-*` prefix
4. **CLI Tool** - Generates CSS from user's config file

---

## Directory Structure

```
CZero/
├── cli/                      # CLI tool source
│   └── index.ts              # Main CLI entry point
├── src/
│   ├── core/                 # Core library (tokens, styles)
│   │   ├── build-tokens.ts   # Script to generate tokens.css
│   │   ├── theme.config.ts   # Default design token values
│   │   └── styles/
│   │       ├── reset.css     # Minimal CSS reset
│   │       ├── tokens.css    # Generated CSS variables
│   │       ├── components.css# Pure CSS component styles
│   │       └── index.css     # CSS entry point (imports)
│   ├── react/                # React components
│   │   ├── components/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   └── badge.tsx
│   │   └── index.ts          # Barrel exports
│   └── index.ts              # Package entry point
├── dist/                     # Build output (gitignored)
│   ├── cli/index.js          # Bundled CLI
│   ├── react/                # Bundled components
│   ├── reset.css
│   ├── components.css
│   └── styles.css            # Combined CSS for library dev
├── docs/                     # Documentation site (Vite + React)
│   ├── czero.config.js       # Example user config
│   ├── src/
│   │   ├── czero.css         # Generated CSS (from CLI)
│   │   ├── index.css         # Imports czero.css
│   │   ├── App.tsx
│   │   ├── components/       # Layout, CodePreview, etc.
│   │   └── pages/            # Home, GettingStarted, component pages
│   └── package.json
├── package.json
├── rollup.config.ts          # Component bundling
├── tsconfig.json
└── README.md
```

---

## File Purposes

### Core Files

| File | Purpose |
|------|---------|
| `cli/index.ts` | CLI tool that reads user's config and generates CSS |
| `src/core/theme.config.ts` | Default design token values (colors, spacing, etc.) |
| `src/core/build-tokens.ts` | Internal script to generate tokens.css for library development |
| `src/core/styles/components.css` | All component CSS using `cz-*` classes and `--cz-*` vars |
| `src/core/styles/reset.css` | Minimal CSS reset |
| `src/core/styles/tokens.css` | Generated CSS variables from theme.config.ts |

### React Components

> **33 components** organized by category:

| Category | Components |
|----------|------------|
| **Forms** | `button`, `input`, `textarea`, `select`, `checkbox`, `switch`, `radio-group`, `label` |
| **Display** | `card`, `badge`, `tag`, `avatar`, `separator`, `code`, `kbd` |
| **Overlay** | `dialog`, `dropdown-menu`, `tooltip` |
| **Feedback** | `alert`, `toast`, `progress`, `skeleton`, `spinner` |
| **Navigation** | `tabs`, `accordion`, `breadcrumb` |
| **Data** | `table` |
| **Layout** | `stack`, `grid`, `container`, `aspect-ratio`, `scroll-area`, `visually-hidden` |

All components are in `src/react/components/` and exported from `src/react/index.ts`.

### Build Configuration

| File | Purpose |
|------|---------|
| `package.json` | Package config, scripts, dependencies, bin entry for CLI |
| `rollup.config.ts` | Bundles React components to ESM + CJS with TypeScript declarations |
| `tsconfig.json` | TypeScript configuration |

---

## How It Works

### 1. User Creates Config

```js
// czero.config.js (in user's project)
export default {
  color: {
    primary: { light: "280 70% 50%", dark: "280 60% 60%" },
    // ...override any token
  },
  radius: { md: "0.75rem" },
};
```

### 2. User Runs CLI

```bash
npx czero build --config czero.config.js --output czero.css
```

### 3. CLI Does This:

1. Loads user's config file
2. Deep-merges with default theme
3. Generates CSS variables (`:root { --cz-color-primary: ... }`)
4. Prepends reset.css
5. Appends components.css
6. Writes everything to output file

### 4. User Imports

```jsx
import "./czero.css";
import { Button } from "czero/react";
```

---

## CSS Class Naming Convention

All classes use `cz-` prefix:

```
cz-{component}             → cz-btn, cz-input, cz-card, cz-badge
cz-{component}-{variant}   → cz-btn-primary, cz-badge-success
cz-{component}-{size}      → cz-btn-sm, cz-input-lg
cz-{utility}               → cz-flex, cz-text-sm, cz-bg-primary
```

---

## CSS Variable Naming Convention

All variables use `--cz-` prefix:

```
--cz-color-{name}          → --cz-color-primary, --cz-color-bg
--cz-radius-{size}         → --cz-radius-md, --cz-radius-lg
--cz-spacing-{size}        → --cz-spacing-sm, --cz-spacing-lg
--cz-font-{property}       → --cz-font-size-md, --cz-font-weight-bold
--cz-shadow-{size}         → --cz-shadow-sm, --cz-shadow-lg
--cz-transition-{speed}    → --cz-transition-fast
```

---

## Build Scripts

```bash
npm run build:tokens    # Generates src/core/styles/tokens.css
npm run build:css       # Copies CSS files to dist/
npm run build:components # Bundles React components with Rollup
npm run build:cli       # Bundles CLI with esbuild
npm run build           # Runs all of the above

npm run dev             # Watch mode for component development
npm run typecheck       # TypeScript check without emit
```

---

## Adding a New Component

1. Create `src/react/components/{name}.tsx`
2. Use pure CSS classes from components.css (or add new ones)
3. Export from `src/react/index.ts`
4. Add CSS to `src/core/styles/components.css`
5. Rebuild: `npm run build`

### Component Template

```tsx
import * as React from "react";

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary";
  size?: "sm" | "md" | "lg";
}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className = "", variant = "default", size = "md", ...props }, ref) => {
    const classes = [
      "cz-mycomponent",
      `cz-mycomponent-${variant}`,
      `cz-mycomponent-${size}`,
      className,
    ].filter(Boolean).join(" ");

    return <div ref={ref} className={classes} {...props} />;
  }
);

MyComponent.displayName = "MyComponent";
```

---

## Adding a New Token

1. Add to `src/core/theme.config.ts`:
```ts
export const theme = {
  // ...existing
  newCategory: {
    value1: "...",
    value2: "...",
  },
};
```

2. Update `src/core/build-tokens.ts` to process the new category

3. Update `cli/index.ts` to include in default theme and generation

4. Rebuild: `npm run build:tokens && npm run build:cli`

---

## Dark Mode

Dark mode is activated by adding `.dark` class to root element:

```html
<html class="dark">
```

Colors are defined with light/dark variants:
```ts
color: {
  primary: { light: "222 47% 45%", dark: "210 80% 65%" }
}
```

Generated CSS:
```css
:root { --cz-color-primary: 222 47% 45%; }
.dark { --cz-color-primary: 210 80% 65%; }
```

---

## Package Exports

```json
{
  "exports": {
    "./styles.css": "./dist/styles.css",
    "./components.css": "./dist/components.css",
    "./reset.css": "./dist/reset.css",
    "./react": {
      "import": "./dist/react/index.js",
      "require": "./dist/react/index.cjs",
      "types": "./dist/react/index.d.ts"
    }
  },
  "bin": {
    "czero": "./dist/cli/index.js"
  }
}
```

---

## Testing Changes

### Library Development
```bash
cd x:\open_source\CZero
npm run build
```

### Docs Site (as example user app)
```bash
cd x:\open_source\CZero\docs
npm run generate:css    # Regenerates CSS from czero.config.js
npm run dev             # Starts Vite dev server
```

---

## Dependencies

### Runtime (peer)
- `react` >= 18.0.0
- `react-dom` >= 18.0.0

### Dev Only
- `esbuild` - CLI bundling
- `rollup` - Component bundling
- `typescript` - Type checking
- `tsx` - Running TypeScript scripts

---

## Important Notes

1. **No Tailwind at runtime** - Tailwind was removed; components use pure CSS
2. **CLI is bundled** - Uses esbuild with `--packages=external`
3. **Colors use HSL** - Format: `"H S% L%"` (space-separated, no hsl() wrapper)
4. **CSS vars reference other vars** - e.g., `hsl(var(--cz-color-primary))`
