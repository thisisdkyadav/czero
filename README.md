# CZero

A lightweight, design-token-driven React component library.

## Features

- 🎨 **Design Token Driven** - Single config file controls entire look & feel
- ⚡ **No Runtime Dependencies** - Precompiled CSS, no Tailwind required
- 🌙 **Dark Mode Ready** - Add `.dark` class and all components adapt
- ♿ **Accessible** - Built with accessibility in mind

## Quick Start

### 1. Install

```bash
npm install czero
```

### 2. Create Theme Config

Create `czero.config.js` in your project root:

```js
// czero.config.js
export default {
  color: {
    primary: { light: "222 47% 45%", dark: "210 80% 65%" },
    primaryFg: { light: "0 0% 100%", dark: "220 40% 3%" },
    // Override any token...
  },
  radius: {
    md: "0.5rem",
    lg: "0.75rem",
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
  },
};
```

### 3. Generate CSS

```bash
npx czero build
```

This creates `czero.css` with your custom tokens + component styles.

Options:
- `--config <path>` - Config file path (default: `czero.config.js`)
- `--output <path>` - Output CSS path (default: `czero.css`)
- `--preset <name>` - Apply a theme preset (can be used multiple times)

## Theme Presets

Use pre-built theme configurations for quick customization:

```bash
# Apply a single preset
npx czero build --preset compact

# Compose multiple presets
npx czero build --preset compact --preset rounded
```

**Available Presets:**

| Preset | Description |
|--------|-------------|
| `compact` | Smaller sizes, tighter spacing |
| `comfortable` | Larger touch targets, more spacing |
| `rounded` | Increased border radius everywhere |
| `sharp` | Minimal border radius, angular look |
| `minimal` | Subtle shadows, less visual noise |
| `vibrant` | Bold colors, pronounced effects |

### Programmatic Usage

```js
// czero.config.js
import { presets } from "czero/presets";

export default {
  ...presets.compact,
  ...presets.rounded,
  // Your overrides
  color: {
    primary: { light: "280 70% 50%", dark: "280 60% 60%" },
  },
};
```

### 4. Import & Use

```jsx
// Import generated CSS
import "./czero.css";

// Import components
import { Button, Input, Card, Badge } from "czero/react";

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

## Components

### Button

```jsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
```

### Input

```jsx
<Input placeholder="Enter text..." />
<Input label="Email" type="email" />
<Input label="Password" error="Required" />
<Input size="sm" />
<Input size="lg" />
```

### Card

```jsx
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description text</Card.Description>
  </Card.Header>
  <Card.Body>Content goes here</Card.Body>
  <Card.Footer>
    <Button variant="ghost">Cancel</Button>
    <Button>Save</Button>
  </Card.Footer>
</Card>
```

### Badge

```jsx
<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="outline">Outline</Badge>
```

## Dark Mode

Add the `.dark` class to your root element:

```html
<html class="dark">
  ...
</html>
```

All components automatically adapt to the dark color scheme.

## Theming

All design tokens use the `--cz-*` prefix. Override any token in your CSS:

```css
:root {
  --cz-color-primary: 280 70% 50%; /* Purple */
  --cz-radius-md: 1rem; /* More rounded */
}
```

## Available Tokens

| Category | Tokens |
|----------|--------|
| Colors | `bg`, `fg`, `primary`, `secondary`, `muted`, `danger`, `success`, `warning`, `border`, `ring` |
| Radius | `none`, `sm`, `md`, `lg`, `xl`, `full` |
| Spacing | `xs`, `sm`, `md`, `lg`, `xl`, `2xl` |
| Typography | `fontFamily`, `size-*`, `weight-*`, `lineHeight-*` |
| Shadow | `none`, `sm`, `md`, `lg` |
| Transition | `fast`, `normal`, `slow` |

## License

MIT
