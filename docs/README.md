# czero — documentation site

The docs site for [czero](../README.md): component reference, live examples, and
the interactive theme customizer. Built with Vite + React Router.

It consumes czero **directly from source** (`../src`) so changes to the library
are reflected immediately while developing — no build step, no codegen.

## Run it

```bash
npm install        # docs deps (vite, react-router)
npm run dev        # start the dev server
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build
```

> The library's own deps (React, Radix) resolve from the repo root, so run
> `npm install` at the root once as well.

## How it uses czero

Styles come from czero's source CSS, imported once in `src/index.css`:

```css
@import "../../src/core/styles/reset.css";
@import "../../src/core/styles/tokens.css";
@import "../../src/core/styles/components.css";
```

Components are imported from source:

```jsx
import { Button, Card } from "../../src/react";
// In a real app installed from npm:
//   import "czero/styles.css";
//   import { Button, Card } from "czero/react";
```

## Theming

Every component reads `--cz-*` CSS variables, so a theme is just values for
those variables — set them in `:root`/`.dark` or pass a typed object to
`<ThemeProvider>`. The **theme customizer** (the docked panel on the component
pages) edits these tokens live and hands you the exact CSS to copy. See the
[Getting Started](src/pages/GettingStarted.tsx) page for the full reference.
