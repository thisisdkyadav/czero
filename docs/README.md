# CZero Documentation Site

This is an example app demonstrating how to use CZero in a real project.

## How This App Uses CZero

### 1. Theme Configuration

We created `czero.config.js` with our custom theme:

```js
export default {
  color: {
    primary: { light: "222 47% 45%", dark: "210 80% 65%" },
    // ...
  },
  radius: { md: "0.5rem" },
  typography: { fontFamily: "Inter, system-ui, sans-serif" },
};
```

### 2. Generate CSS

We run the CZero CLI to generate our styles:

```bash
npm run generate:css
# or directly: npx czero build --config czero.config.js --output src/czero.css
```

This creates `src/czero.css` with:
- CSS reset
- Design tokens from our config
- Component styles (Button, Input, Card, Badge)

### 3. Import & Use

In `src/index.css`:
```css
@import "./czero.css";
```

In components:
```jsx
import { Button, Input, Card, Badge } from "../../src/react";
// When using from npm: import { Button } from "czero/react";
```

## Scripts

- `npm run dev` - Start dev server
- `npm run generate:css` - Regenerate CSS from config
- `npm run build` - Production build (auto-regenerates CSS)

## Customization

1. Edit `czero.config.js`
2. Run `npm run generate:css`
3. Refresh the browser

Try changing the primary color to purple:
```js
primary: { light: "280 70% 50%", dark: "280 60% 60%" }
```
