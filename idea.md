
## 🧱 1. Project goals

**Core philosophy**
- **Design‑token driven:** entire look & feel controlled by a single config file.  
- **React first:** built using React + Radix UI primitives.  
- **Tailwind used only for authoring utilities** — we ship precompiled CSS.  
- **Composable components:** flexible, accessible, low‑level.  
- **Customizable themes:** users can add brand palettes or modes easily.  
- **Lightweight CSS package:** one compiled file, tree‑shakeable JS.  

---

## 📚 2. Technical stack

- **React + TypeScript**
- **Radix UI** for accessibility and behavior (dialogs, popovers, menus, switches, etc.)
- **Tailwind CSS (internal use only)** – generates token‑based utilities
- **PostCSS build** – compiles CSS to a single distributable file
- **Rollup / Vite library build** – bundles components
- **ESM + CJS output** – for compatibility
- **CSS Variables** – theming, brand colors, responsive spacing, shadows

---

## 🎨 3. Design-token config

The heart of your system.

Example `theme.config.ts`:
```ts
export const theme = {
  color: {
    bg: { light: "0 0% 100%", dark: "220 40% 3%" },
    fg: { light: "220 15% 10%", dark: "210 40% 96%" },
    primary: { light: "222 47% 45%", dark: "210 80% 65%" },
    accent: { light: "200 90% 55%", dark: "200 90% 45%" },
    muted: { light: "220 10% 95%", dark: "220 8% 20%" },
    danger: { light: "0 70% 55%", dark: "0 80% 65%" },
  },
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    full: "9999px",
  },
  shadow: {
    sm: "0 1px 2px rgb(0 0 0 / 0.05)",
    md: "0 2px 4px rgb(0 0 0 / 0.08)",
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    size: { sm: "0.875rem", md: "1rem", lg: "1.25rem" },
    lineHeight: { sm: "1.4", md: "1.6", lg: "1.75" },
  },
  spacing: { xs: "0.25rem", sm: "0.5rem", md: "0.75rem", lg: "1rem" },
};
```

Build script reads this → outputs:
- tokens.css (`:root` variables)
- utilities.css (small class set)
- final `dist/styles.css` → included by users

---

## 🧩 4. Package structure

```
your-ui/
├─ src/
│  ├─ core/
│  │   ├─ theme.config.ts
│  │   ├─ build-tokens.ts
│  │   └─ styles/
│  │       ├─ tokens.css
│  │       ├─ utilities.css
│  │       └─ index.css
│  ├─ react/
│  │   ├─ components/
│  │   │   ├─ ui/
│  │   │   │   ├─ button.tsx
│  │   │   │   ├─ input.tsx
│  │   │   │   ├─ switch.tsx
│  │   │   │   ├─ dialog.tsx
│  │   │   │   ├─ dropdown-menu.tsx
│  │   │   │   └─ ... etc ...
│  │   ├─ hooks/
│  │   │   ├─ use-toast.ts
│  │   │   └─ use-theme.ts
│  │   └─ lib/
│  │       └─ cn.ts
│  └─ index.ts (barrel export)
├─ scripts/
│  └─ build-css.ts  (reads theme.config.ts → builds tokens/utilities)
├─ package.json
└─ rollup.config.ts
```

---

## 🧠 5. Component plan

### **Stage 1 — Foundations**
Basic core components to shape the system.

| Category | Component | Core feature |
|-----------|------------|---------------|
| **Form** | Button | variants, sizes, disabled state |
| | Input, Textarea | labels, focus ring, validation colors |
| | Checkbox, Switch | Radix primitives |
| **Display** | Card, Badge, Avatar | static styling + tokens |
| **Overlay** | Dialog (Radix), Tooltip, Dropdown | accessibility + animation |
| **Feedback** | Toast, Alert | Radix + transitions |
| **Navigation** | Tabs, Separator, Breadcrumb | tailwind utilities |

### **Stage 2 — Composition**
| Category | Component | Core feature |
|-----------|------------|---------------|
| **Layout** | Container, Grid, Stack | spacing utils |
| **Feedback** | Progress, Skeleton | animation + tokens |
| **Forms extended** | Select, RadioGroup | full keyboard interactions |
| **Data display** | Table, Tag, Accordion | style consistency |

### **Stage 3 — Advanced / Docs**
| Category | Component | Core feature |
|-----------|------------|---------------|
| **Docs utilities** | Typography system (Headings, Text) |
| **Theme switching** | Dark/light + runtime theme API |
| **Showcase site** | Example docs using your library |

---

## 🧰 6. Developer experience (DX)

- **Usage**
  ```js
  import "@your/ui/styles.css"
  import { Button } from "@your/ui/react"
  ```
  ```tsx
  <Button variant="primary">Click</Button>
  ```

- **Theming**
  Developers change `theme.config.ts` → run `npm run build:theme` → new CSS generated.

- **Dark mode**
  `.dark` overrides variables on :root.  
  You can also support runtime toggle via `useTheme()` hook.

- **Custom brand**
  Users can extend your theme by merging additional token files before build.

---

## ⚙️ 7. Build and release process

1. **Build CSS tokens**  
   `node scripts/build-css.ts` → generates `dist/styles.css`
2. **Bundle React components**  
   `rollup -c` → outputs `dist/react`
3. **Publish NPM**  
   includes:
   - `/react` → JS + types
   - `/css` → compiled tokens+utilities
4. **Docs playground (Storybook or Ladle)**  
   optional for demos.

---

## 🧭 8. Roadmap highlights

**Phase 1 (MVP)**
- Setup tokens system + build script  
- Button, Input, Dialog, Card  
- Single theme config  
- Rollup publish ready

**Phase 2**
- More components (Switch, Tooltip, Toast)
- Add dark mode support
- Add docs/examples

**Phase 3**
- Extended component suite
- Theme editor (live config → CSS generation)
- Prepare for open-source release or branding

---

## ✅ TL;DR — What we’ll build

| Layer | Purpose |
|--------|----------|
| **theme.config.ts** | Source of truth for design |
| **build-css.ts** | Generates CSS variables + utilities |
| **dist/styles.css** | Single lightweight theme file |
| **React components (Radix-based)** | Accessible UI primitives |
| **Hooks & helpers** | Theming, state, utilities |
| **Future ready** | Core CSS reusable with any framework later |
