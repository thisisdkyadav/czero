# CZero — Contributor & Agent Guide

How CZero is built and the rules to follow when changing it. Keep this accurate; it's the map.

## Philosophy

One idea drives everything: **components are styled entirely with `--cz-*` CSS variables, and a theme is just a set of values for those variables.** That's what makes "define the theme once, every component follows" true — at runtime, for free. There is no codegen, no config compiler, and no DSL. Don't reintroduce one.

## Architecture

```
src/
├── core/
│   ├── theme.config.ts     # Default token values (the source of truth)
│   ├── tokens.ts           # theme/override → --cz-* CSS variables (pure, shared)
│   ├── build-tokens.ts     # Build script: writes styles/tokens.css + reset.css
│   └── styles/
│       ├── reset.css        # Minimal reset, scoped to .cz-* elements
│       ├── tokens.css       # GENERATED from theme.config.ts — do not hand-edit
│       └── components.css   # Hand-written component styles (all in var(--cz-*))
└── react/
    ├── components/*.tsx      # One file per component; Radix + class names
    ├── hooks/use-theme.tsx   # ThemeProvider (dark mode + runtime token injection)
    └── index.ts             # Public barrel export
```

Build output (`dist/`, gitignored) is produced by `npm run build` and published via the `files: ["dist"]` allowlist.

## The two layers of styling

1. **Tokens** (`theme.config.ts` → `tokens.css`): global design values as `:root` / `.dark` variables. Generated — edit `theme.config.ts`, never `tokens.css`.
2. **Components** (`components.css`): plain CSS classes (`.cz-btn`, `.cz-input`, …) written **only** in terms of `var(--cz-*)`. No hardcoded colors, radii, or spacing — that's the rule that keeps theming working.

`tokens.ts` is the single mapper from a (partial) theme object to `--cz-*` variables. Both the build script and the runtime `ThemeProvider` import it, so variable names can't drift between build-time and runtime.

## How to change a token

1. Edit `src/core/theme.config.ts`.
2. Run `npm run build:tokens` to regenerate `tokens.css`.
3. If components should consume it, reference `var(--cz-…)` in `components.css`.

## How to add or change a component

1. Create/edit `src/react/components/<name>.tsx`. Use a Radix primitive for anything interactive (behavior from Radix, styling from us). Emit `cz-*` class names.
2. Add styles to `src/core/styles/components.css` using **only** `var(--cz-*)` values. Need a component-specific knob? Define a `--cz-<component>-<prop>` variable with a fallback to a global token: `var(--cz-modal-content-bg, hsl(var(--cz-color-bg)))`. That gives users an escape hatch without breaking the default.
3. Export it from `src/react/index.ts`.
4. `npm run build && npm run typecheck`.

Color values are HSL triplets (`"H S% L%"`) so components can apply opacity via `hsl(var(--cz-color-x) / 0.5)`.

## Runtime theming (`ThemeProvider`)

`use-theme.tsx` does two things:
- Manages light/dark/system and applies the `.dark` class.
- If given a `theme` (`ThemeOverride`) prop, converts it via `tokens.ts` and injects a single `<style id="czero-theme-vars">` with `:root` / `.dark` blocks. Omitted tokens fall back to the shipped defaults.

Keep this provider dependency-light and SSR-safe (guard `document`/`window`).

## Build & publish

```bash
npm run build       # clean → tokens → css → components (rollup)
npm run typecheck   # tsc --noEmit
```

`build` runs `clean` first so stale artifacts never ship. Publishing ships only `dist/`.

Known pre-existing issue: a few components (e.g. `accordion.tsx`) trip `tsc` with a Radix `ComponentPropsWithoutRef` "statically known members" error. Rollup still builds. Fixing those types is welcome but orthogonal to theming.

## Hard rules

- **No hardcoded style values in `components.css`.** Always `var(--cz-*)`. This is the contract.
- **Don't hand-edit `tokens.css`.** It's generated.
- **Don't reintroduce a config compiler / CLI / token DSL.** Theming is CSS variables. Keep it that way.
- Keep `tokens.ts` the only place that maps tokens → variable names.
- **Only reference `--cz-*` variables (and Radix's own `--radix-*`).** Never reference a consumer app's namespace (e.g. `--color-*`, `--table-*`) — that couples czero to one app. Component-specific knobs are `--cz-<component>-<prop>` with a `--cz-*`/literal fallback.
