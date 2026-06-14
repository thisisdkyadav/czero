# CZero

A lightweight, design-token-driven React component library built on [Radix UI](https://www.radix-ui.com/) primitives.

**Define your theme once — every component follows it.** No build step, no config compiler, no Tailwind at runtime. Components are styled entirely with `--cz-*` CSS variables, so theming is just setting those variables.

## Features

- 🎨 **Theme once** — set a handful of CSS variables (in CSS or via `<ThemeProvider>`) and the whole UI adapts.
- ⚡ **No build step** — import the prebuilt stylesheet and go. Nothing to compile.
- 🌙 **Dark mode built in** — toggle with `useTheme()` or a `.dark` class.
- ♿ **Accessible** — interactive components are built on Radix UI primitives (focus management, keyboard nav, ARIA).
- 🧩 **35 components** — forms, overlays, feedback, navigation, data, and layout.
- 🔡 **Typed** — full TypeScript declarations, including your theme overrides.

## Install

```bash
npm install czero
```

`react` and `react-dom` (>=18) are peer dependencies.

## Quick start

```jsx
import "czero/styles.css";
import { Button, Card } from "czero/react";

function App() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Hello CZero</Card.Title>
      </Card.Header>
      <Card.Body>
        <Button variant="primary">Click me</Button>
      </Card.Body>
    </Card>
  );
}
```

That's the whole setup. The default theme is already applied.

## Theming

Every component reads semantic `--cz-*` CSS variables. A "theme" is just a set of values for those variables — so you can apply one two ways.

### Option A — plain CSS (zero runtime)

Override any token in your own `:root`. This is all most apps need:

```css
:root {
  --cz-color-primary: 280 70% 50%;   /* purple — colors are "H S% L%" triplets */
  --cz-radius-md: 0.75rem;
  --cz-font-fontFamily: "Inter", system-ui, sans-serif;
}
```

> Colors are unwrapped HSL triplets (`H S% L%`), not `hsl(...)`. Components wrap them, which is what makes opacity variants like `hsl(var(--cz-color-primary) / 0.5)` work.

### Option B — `<ThemeProvider>` (typed, runtime)

Pass a typed `theme` object once at the root. It injects your overrides as CSS variables and also manages dark mode. Anything you omit falls back to the defaults.

```jsx
import "czero/styles.css";
import { ThemeProvider } from "czero/react";

const theme = {
  color: {
    primary: { light: "280 70% 50%", dark: "280 60% 65%" },
    // a plain string applies to both light and dark
    ring: "280 70% 50%",
  },
  radius: { md: "0.75rem" },
  typography: { fontFamily: '"Inter", system-ui, sans-serif' },
};

function Root() {
  return (
    <ThemeProvider theme={theme} defaultTheme="system">
      <App />
    </ThemeProvider>
  );
}
```

The `theme` prop is fully typed (`ThemeOverride`), so you get autocomplete for every token.

## Dark mode

CZero ships light and dark values for every color. Switch modes with the hook:

```jsx
import { useTheme } from "czero/react";

function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  return (
    <Button variant="ghost" onClick={toggleTheme}>
      {resolvedTheme === "dark" ? "🌙" : "☀️"}
    </Button>
  );
}
```

`useTheme` requires a `<ThemeProvider>` ancestor. Prefer not to use the provider? Just toggle a `.dark` class on `<html>` yourself — the CSS responds to it either way.

## Token reference

| Category | Tokens |
|----------|--------|
| Color | `bg`, `fg`, `primary`, `primaryFg`, `secondary`, `secondaryFg`, `muted`, `mutedFg`, `danger`, `dangerFg`, `success`, `successFg`, `warning`, `warningFg`, `border`, `ring` |
| Radius | `none`, `sm`, `md`, `lg`, `xl`, `full` |
| Spacing | `xs`, `sm`, `md`, `lg`, `xl`, `2xl` |
| Shadow | `none`, `sm`, `md`, `lg` |
| Typography | `fontFamily`, `size.*`, `weight.*`, `lineHeight.*` |
| Transition | `fast`, `normal`, `slow` |

CSS variable names follow the pattern `--cz-<category>-<token>` (e.g. `--cz-color-primary`, `--cz-radius-md`, `--cz-spacing-lg`, `--cz-font-size-md`).

### Per-component escape hatch

Global tokens cover the vast majority of theming. When you need to nudge a single component, override its component-scoped variable directly — no config file, still just CSS:

```css
:root {
  --cz-modal-content-border-radius: 1rem;
  --cz-table-cell-padding: 0.5rem 0.75rem;
}
```

These are intentionally rare; reach for global tokens first.

## Components

**Forms** — Button, Input, Textarea, Select, Checkbox, Switch, RadioGroup, Label
**Display** — Card, Badge, StatusBadge, Tag, Avatar, Separator, Code, Kbd
**Overlay** — Dialog, Modal, DropdownMenu, Tooltip, Toast
**Feedback** — Alert, Progress, Skeleton, Spinner
**Navigation** — Tabs, Accordion, Breadcrumb
**Data** — Table, DataTable
**Layout** — Stack, Grid, Container, AspectRatio, ScrollArea, VisuallyHidden

```jsx
import { Button, Input, Modal, DataTable, StatusBadge } from "czero/react";
```

## Stylesheet entry points

| Import | Contents |
|--------|----------|
| `czero/styles.css` | Everything: reset + tokens + components (use this) |
| `czero/components.css` | Component styles only |
| `czero/reset.css` | Minimal reset, scoped to `.cz-*` elements |

## License

MIT
