/**
 * CZero token utilities
 *
 * Single source of truth for turning a theme (or a partial theme override)
 * into `--cz-*` CSS custom properties. Used both by the build script that
 * generates `tokens.css` and by the runtime `ThemeProvider` so the naming
 * can never drift between the two.
 *
 * This module is pure (no Node or DOM APIs) so it is safe to import in the
 * browser, on the server, and from build scripts.
 */

import { theme, type Theme } from "./theme.config";

export { theme };
export type { Theme };

/** A color token can be a single value (applied to both modes) or per-mode. */
export type ColorValue = string | { light?: string; dark?: string };

/**
 * A partial, deeply-optional version of the theme. Anything you set here
 * overrides the default; anything you omit falls back to the shipped tokens.
 */
export interface ThemeOverride {
  color?: Partial<Record<keyof Theme["color"], ColorValue>>;
  radius?: Partial<Record<keyof Theme["radius"], string>>;
  shadow?: Partial<Record<keyof Theme["shadow"], string>>;
  spacing?: Partial<Record<keyof Theme["spacing"], string>>;
  transition?: Partial<Record<keyof Theme["transition"], string>>;
  typography?: {
    fontFamily?: string;
    size?: Partial<Record<keyof Theme["typography"]["size"], string>>;
    weight?: Partial<Record<keyof Theme["typography"]["weight"], string>>;
    lineHeight?: Partial<Record<keyof Theme["typography"]["lineHeight"], string>>;
  };
}

/** CSS variables split by color mode. `light` lives in `:root`, `dark` in `.dark`. */
export interface CssVarSets {
  light: Record<string, string>;
  dark: Record<string, string>;
}

function setSimple(
  out: Record<string, string>,
  category: string,
  values: Record<string, string> | undefined
) {
  if (!values) return;
  for (const [key, value] of Object.entries(values)) {
    if (value == null) continue;
    out[`--cz-${category}-${key}`] = value;
  }
}

/**
 * Convert a theme override (or a full theme) into `--cz-*` variables.
 * Mirrors the variable names emitted by `build-tokens.ts` exactly.
 */
export function themeToCssVars(override: ThemeOverride): CssVarSets {
  const light: Record<string, string> = {};
  const dark: Record<string, string> = {};

  // Colors — support `"H S% L%"` shorthand or `{ light, dark }`.
  if (override.color) {
    for (const [name, value] of Object.entries(override.color)) {
      if (value == null) continue;
      const variable = `--cz-color-${name}`;
      if (typeof value === "string") {
        light[variable] = value;
        dark[variable] = value;
      } else {
        if (value.light != null) light[variable] = value.light;
        if (value.dark != null) dark[variable] = value.dark;
      }
    }
  }

  // Mode-agnostic scales live in `:root` only.
  setSimple(light, "radius", override.radius);
  setSimple(light, "shadow", override.shadow);
  setSimple(light, "spacing", override.spacing);
  setSimple(light, "transition", override.transition);

  // Typography flattens under the `--cz-font-*` namespace. Sub-key names are
  // kept verbatim (e.g. `lineHeight`) to match the variables components.css
  // already references.
  if (override.typography) {
    const { fontFamily, size, weight, lineHeight } = override.typography;
    if (fontFamily != null) light["--cz-font-fontFamily"] = fontFamily;
    setSimple(light, "font-size", size);
    setSimple(light, "font-weight", weight);
    setSimple(light, "font-lineHeight", lineHeight);
  }

  return { light, dark };
}

function block(selector: string, vars: Record<string, string>): string {
  const entries = Object.entries(vars);
  if (entries.length === 0) return "";
  const body = entries.map(([k, v]) => `  ${k}: ${v};`).join("\n");
  return `${selector} {\n${body}\n}`;
}

/**
 * Render `CssVarSets` to a CSS string with `:root` and `.dark` blocks.
 * Empty blocks are omitted.
 */
export function cssVarsToString(sets: CssVarSets): string {
  return [block(":root", sets.light), block(".dark", sets.dark)]
    .filter(Boolean)
    .join("\n\n");
}

/** The full default theme expressed as variables — used to generate `tokens.css`. */
export function defaultCssVars(): CssVarSets {
  return themeToCssVars(theme as unknown as ThemeOverride);
}
