# CZero — Architecture & Vision

> **Last Updated:** January 18, 2026
>
> A design-token-driven React component library built on top of **Radix UI primitives**.

---

## 🧱 1. Core Philosophy

| Principle | Description |
|-----------|-------------|
| **Radix First** | Every interactive component is built on Radix UI primitives for accessibility and behavior. No custom implementations for complex interactions. |
| **Design-Token Driven** | Entire look & feel controlled by a single `theme.config.ts` file |
| **Zero Runtime Styling** | We ship precompiled CSS — users don't need Tailwind at runtime |
| **Composable & Accessible** | Leverage Radix's WAI-ARIA compliance out of the box |
| **Customizable Themes** | Users override tokens to match their brand |

---

## 📚 2. Technical Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 18+ with TypeScript |
| **Primitives** | **Radix UI** for all interactive components |
| **Styling** | Pure CSS with `--cz-*` CSS variables (no Tailwind at runtime) |
| **Build** | Rollup for components, esbuild for CLI |
| **Output** | ESM + CJS bundles with TypeScript declarations |

### Peer Dependencies
```json
{
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0"
}
```

### Bundled Dependencies
Radix primitives are bundled WITH the library — users don't need to install them separately.

---

## 🎯 3. Radix Integration Strategy

### Why Radix?

1. **Accessibility** — WAI-ARIA compliant, keyboard navigation, screen reader support
2. **Behavior** — Focus management, scroll locking, click-outside handling
3. **Unstyled** — We apply CZero's token-based CSS on top
4. **Composable** — Parts-based API for flexibility

### Component → Radix Primitive Mapping

| CZero Component | Radix Primitive | Notes |
|-----------------|-----------------|-------|
| **Dialog** | `@radix-ui/react-dialog` | Portal, overlay, focus trap |
| **AlertDialog** | `@radix-ui/react-alert-dialog` | Non-dismissible confirmation |
| **DropdownMenu** | `@radix-ui/react-dropdown-menu` | Submenus, keyboard nav |
| **Select** | `@radix-ui/react-select` | Virtualization ready |
| **Checkbox** | `@radix-ui/react-checkbox` | Indeterminate state |
| **Switch** | `@radix-ui/react-switch` | Toggle behavior |
| **RadioGroup** | `@radix-ui/react-radio-group` | Roving tabindex |
| **Tabs** | `@radix-ui/react-tabs` | Automatic/manual activation |
| **Accordion** | `@radix-ui/react-accordion` | Single/multiple open |
| **Tooltip** | `@radix-ui/react-tooltip` | Delay, positioning |
| **Toast** | `@radix-ui/react-toast` | Queue, swipe dismiss |
| **Popover** | `@radix-ui/react-popover` | Positioning, collision |
| **Collapsible** | `@radix-ui/react-collapsible` | Animate height |
| **Slider** | `@radix-ui/react-slider` | Range, marks |
| **Progress** | `@radix-ui/react-progress` | Semantic progress |
| **ScrollArea** | `@radix-ui/react-scroll-area` | Custom scrollbars |
| **Separator** | `@radix-ui/react-separator` | Semantic HR |
| **Label** | `@radix-ui/react-label` | Form label association |
| **AspectRatio** | `@radix-ui/react-aspect-ratio` | Responsive media |
| **VisuallyHidden** | `@radix-ui/react-visually-hidden` | Screen reader only |
| **Avatar** | `@radix-ui/react-avatar` | Fallback handling |
| **Slot** | `@radix-ui/react-slot` | `asChild` pattern |
| **NavigationMenu** | `@radix-ui/react-navigation-menu` | Site navigation |
| **ContextMenu** | `@radix-ui/react-context-menu` | Right-click menu |
| **HoverCard** | `@radix-ui/react-hover-card` | Preview cards |
| **Menubar** | `@radix-ui/react-menubar` | App menu bar |

### Components WITHOUT Radix (Pure Styling)

These components are purely stylistic and don't need Radix:

| Component | Reason |
|-----------|--------|
| **Button** | Simple element, no complex behavior |
| **Input** | Native HTML input with styles |
| **Textarea** | Native HTML textarea |
| **Card** | Container with styling |
| **Badge** | Static label |
| **Tag** | Static label with optional dismiss |
| **Alert** | Static feedback block |
| **Skeleton** | CSS animation only |
| **Spinner** | CSS/SVG animation |
| **Container** | Layout wrapper |
| **Grid** | CSS grid layout |
| **Stack** | Flexbox layout |
| **Table** | Styled HTML table |
| **Breadcrumb** | Navigation with links |
| **Code** | Styled code block |
| **Kbd** | Keyboard shortcut indicator |

---

## 🪝 4. Hooks & Utilities

### Required Hooks

| Hook | Purpose |
|------|---------|
| `useTheme` | Dark/light mode toggle with system preference detection and localStorage persistence |

### Optional Hooks

| Hook | Purpose |
|------|---------|
| `useMediaQuery` | Responsive breakpoint detection in JS |

### Utilities

Since CZero uses semantic CSS classes (not Tailwind utilities), we do **NOT** need:
- ~~`cn()`~~ (tailwind-merge) — No conflicting utility classes to resolve
- ~~`clsx`~~ — Simple array join is sufficient

---

## 🧩 5. Package Structure

```
CZero/
├── src/
│   ├── core/
│   │   ├── theme.config.ts      # Design tokens
│   │   ├── build-tokens.ts      # Generates tokens.css
│   │   └── styles/
│   │       ├── reset.css        # Minimal CSS reset
│   │       ├── tokens.css       # Generated CSS variables
│   │       ├── components.css   # All component styles
│   │       └── index.css        # Entry point
│   ├── react/
│   │   ├── components/          # All React components
│   │   ├── hooks/               # useTheme, etc.
│   │   └── index.ts             # Barrel exports
│   └── index.ts                 # Package entry
├── cli/
│   └── index.ts                 # CLI for CSS generation
├── docs/                        # Documentation site
├── dist/                        # Build output
├── package.json
└── rollup.config.ts
```

---

## 🎨 6. Design Token System

```ts
// theme.config.ts
export const theme = {
  color: {
    bg: { light: "0 0% 100%", dark: "220 40% 3%" },
    fg: { light: "220 15% 10%", dark: "210 40% 96%" },
    primary: { light: "222 47% 45%", dark: "210 80% 65%" },
    // ...
  },
  radius: { sm: "0.25rem", md: "0.5rem", lg: "0.75rem" },
  shadow: { sm: "...", md: "..." },
  spacing: { sm: "0.5rem", md: "0.75rem", lg: "1rem" },
  typography: { /* sizes, weights, lineHeights */ },
  transition: { fast: "150ms ease", normal: "200ms ease" },
};
```

Generated CSS:
```css
:root {
  --cz-color-primary: 222 47% 45%;
  --cz-radius-md: 0.5rem;
  /* ... */
}
.dark {
  --cz-color-primary: 210 80% 65%;
  /* ... */
}
```

---

## 🧰 7. Developer Experience

### Installation
```bash
npm install czero
```

### Usage
```tsx
import "czero/styles.css";
import { Button, Dialog, useTheme } from "czero/react";

function App() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="primary">Open</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Hello</Dialog.Title>
        <Dialog.Description>Content here</Dialog.Description>
      </Dialog.Content>
    </Dialog>
  );
}
```

### Custom Theming
```bash
npx czero build --config czero.config.js --output czero.css
```

---

## 🧭 8. Roadmap

### Phase 1: Foundation ✅
- [x] Token system + CLI
- [x] 33 components implemented
- [x] Documentation site
- [x] Dark mode CSS support
- [x] **Extended Config System** — Per-component customization with:
  - [x] Component-specific tokens (sizes, colors, spacing)
  - [x] Custom variants (success, gradient, etc.)
  - [x] State customization (hover, focus, disabled)
  - [x] Token references (`$radius-md`)
  - [x] CSS generators for all 28 components

### Phase 2: Radix Integration ✅
- [x] Add Radix dependencies
- [x] Implement `useTheme` hook
- [x] Migrate Dialog → Radix Dialog
- [x] Migrate Dropdown → Radix Dropdown
- [x] Migrate Checkbox → Radix Checkbox
- [x] Migrate Switch → Radix Switch
- [x] Migrate Tabs → Radix Tabs
- [x] Migrate Accordion → Radix Accordion
- [x] Migrate Select → Radix Select
- [x] Migrate RadioGroup → Radix RadioGroup
- [x] Migrate Tooltip → Radix Tooltip
- [x] Migrate Toast → Radix Toast
- [x] Add new Radix-based components (ScrollArea, Progress, Avatar)

### Phase 3: Advanced Features ✅
- [x] Theme presets (compact, comfortable, rounded, sharp, minimal, vibrant)
- [x] Theme editor / Live Theme Customizer (docs site)
- [ ] Responsive breakpoint overrides
- [ ] Command palette (⌘K)
- [ ] Form validation integration
- [ ] Animation system

### Phase 4: Open Source Release
- [ ] Comprehensive docs
- [ ] Storybook integration
- [ ] Changelog
- [ ] Contributing guide
- [ ] v1.0 release

---

## ✅ Summary

| Aspect | Approach |
|--------|----------|
| **Primitives** | Radix UI for all interactive components |
| **Styling** | Pure CSS with design tokens |
| **Accessibility** | Inherited from Radix (WCAG 2.1 AA) |
| **Theming** | CSS variables + CLI generation |
| **Bundle** | Tree-shakeable ESM + CJS |
| **TypeScript** | Full type definitions |
