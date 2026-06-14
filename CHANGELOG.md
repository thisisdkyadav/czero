# Changelog

All notable changes to CZero will be documented in this file.

---

## [0.4.2] - 2026-06-14

### Switch — overflow fix + matured

**Fixed**
- Thumb could overflow the track ("dot outside the box"), especially when the
  switch was squished inside a flex row. The thumb is now sized from the track
  height (`height − 2·padding`) so it can't overflow vertically, and the checked
  offset is exactly `width − height` so it can't overflow horizontally — for any
  configured size. Added `flex-shrink: 0` so the track never gets squished.

**Changed**
- Smoother thumb motion (ease-out, no overshoot), refined thumb shadow, softer
  focus ring, `vertical-align: middle` for inline alignment, and
  `prefers-reduced-motion` support.
- Sizes now set only the track dimensions (`--cz-switch-width` / `-height`);
  the thumb size and travel derive automatically. New hooks:
  `--cz-switch-bg`, `--cz-switch-bg-checked`, `--cz-switch-thumb-bg`,
  `--cz-switch-padding`.

---

## [0.4.0] - 2026-06-14

### Modal — matured design + new options

**Added**
- `size="xs"` (~22rem) for compact confirm dialogs.
- `centered` prop (default `true`); set `false` for a top-aligned modal.
- Exit animations (overlay fade-out + content scale-down) via Radix `data-state`,
  plus refined enter easing and `prefers-reduced-motion` support.

**Changed**
- Larger default corner radius (`--cz-radius-xl`, 16px) and a richer, layered
  elevation shadow for a more modern, mature look.
- Neutral title color (`--cz-color-fg`) instead of brand-primary; refined title
  size and letter-spacing.
- More comfortable, consistent padding (1.5rem horizontal); tighter footer
  button gap; sane default body text color/size.
- Stronger backdrop blur (4px), `dvh`-based max-heights for mobile.

**Internal**
- Modal styling moved out of inline styles into `components.css` (`.cz-modal-*`);
  only dynamic values (z-index layering, custom width/min-height) remain inline.
  This removes the duplicate styling path and is what enables the CSS animations.
- New override hooks: `--cz-modal-overlay-blur`, `--cz-modal-title-color`,
  `--cz-modal-title-font-size`.

---

## [0.3.1] - 2026-06-14

### Fixed

- Removed leftover consumer-specific (non-`--cz-`) CSS variable fallbacks from
  component styles (e.g. `--color-bg-primary`, `--table-border`, `--radius-modal`).
  Components now reference only `--cz-*` tokens (and Radix's own `--radix-*`),
  so the library is fully self-contained and theme-namespace independent. No
  behavior change — those fallbacks were already inert.

---

## [0.3.0] - 2026-06-14

### ✨ Simplified theming

CZero now does one thing well: **define your theme once, every component follows.** Theming is plain `--cz-*` CSS variables — set them in CSS or via `<ThemeProvider>`. No build step, no config compiler.

### Added

- `<ThemeProvider theme={...}>` now accepts a typed `ThemeOverride` object and injects it as CSS variables at runtime. Set your brand once at the root; omitted tokens fall back to defaults.
- Exported `ThemeOverride` and `ColorValue` types for typed theme objects.
- Single token→CSS-variable mapper (`src/core/tokens.ts`) shared by the build script and the runtime provider, so names can never drift.

### Removed (breaking)

- **The `czero` CLI and `npx czero build` codegen step.** Theme with CSS variables or `<ThemeProvider>` instead — no generated `czero.css` to maintain.
- The `$token` reference DSL, per-component config generators, and `component-defaults.ts`.
- Theme presets and the `czero/presets` and `czero/config` entry points.

### Migration

- Replace `import "./czero.css"` (the old generated file) with `import "czero/styles.css"`.
- Move any `czero.config.js` component overrides to CSS variable overrides in `:root`, or to a `theme` object passed to `<ThemeProvider>`.

---

## [0.2.5] - 2026-02-15

### 🐛 Fixes

- Fixed nested modal stacking so each newly opened modal places its overlay between the previous modal content and the new modal content.
- Resolved the issue where second-level modal backdrops could render behind the first modal content.

---

## [0.2.0] - 2026-01-18

### 🎉 Initial Public Release

This is the first public release of CZero — a design-token-driven React component library built on Radix UI primitives.

### ✨ Features

#### Components (33 Total)
- **Forms**: Button, Input, Textarea, Select, Checkbox, Switch, RadioGroup, Label
- **Display**: Card, Badge, Tag, Avatar, Separator, Code, Kbd
- **Overlay**: Dialog, AlertDialog, DropdownMenu, Tooltip, Toast
- **Feedback**: Alert, Progress, Skeleton, Spinner
- **Navigation**: Tabs, Accordion, Breadcrumb
- **Data**: Table
- **Layout**: Stack, Grid, Container, AspectRatio, ScrollArea, VisuallyHidden

#### Design Token System
- Full configuration via `czero.config.js`
- CSS variable-based theming (`--cz-*` prefix)
- Dark mode support (`.dark` class)
- Component-level customization with token references (`$color-primary`)

#### CLI Tool
- `npx czero build` - Generate CSS from config
- `--preset` flag for built-in themes
- `--config` and `--output` options

#### Theme Presets (6)
- `compact` - Smaller spacing and sizes
- `comfortable` - Larger, spacious layout
- `rounded` - Large border radii
- `sharp` - Square corners
- `minimal` - Subtle, muted styling
- `vibrant` - Bold, saturated colors

#### Documentation Site
- Live Theme Customizer with Basic/Advanced modes
- Component pages with code examples
- Copy buttons on all code snippets
- Presets documentation page

### 🔧 Technical
- Built on Radix UI primitives for accessibility
- Full TypeScript support with declarations
- Tree-shakeable ESM + CJS bundles
- Zero runtime styling (generated CSS only)

---

## Links

- **Repository**: https://github.com/thisisdkyadav/czero
- **Documentation**: https://czero-docs.vercel.app
