/**
 * CZero Input CSS Generator
 * Generates CSS for input component from config tokens
 */

import type { InputTokens } from "../../src/core/types/config";
import { resolveToken, componentVarName } from "../token-resolver";

type SizeMap = Record<string, string | undefined>;

const isSizeMap = (value: unknown): value is SizeMap =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function pushSizeOrSingleVar(
  vars: string[],
  component: string,
  key: string,
  value: string | SizeMap | undefined
) {
  if (!value) return;

  if (typeof value === "string") {
    vars.push(`  ${componentVarName(component, key)}: ${resolveToken(value)};`);
    return;
  }

  for (const [size, tokenValue] of Object.entries(value)) {
    if (!tokenValue) continue;
    vars.push(
      `  ${componentVarName(component, key, size)}: ${resolveToken(tokenValue)};`
    );
  }
}

/**
 * Generate all input CSS including variables, base styles, sizes, and states
 */
export function generateInputCSS(config: InputTokens): string {
  let css = "";

  css += "/* ===== INPUT ===== */\n\n";

  // Generate CSS variables
  css += generateInputVariables(config);
  css += "\n";

  // Generate base styles
  css += generateInputBase();
  css += "\n";

  // Generate input variant classes
  css += generateInputVariants(config);
  css += "\n";

  // Generate size variants
  css += generateInputSizes();
  css += "\n";

  // Generate state styles
  css += generateInputStates();
  css += "\n";

  // Generate icon styles
  css += generateInputIcons();
  css += "\n";

  // Generate clear button styles
  css += generateInputClear();
  css += "\n";

  // Generate password toggle styles
  css += generateInputPasswordToggle();
  css += "\n";

  // Append custom CSS
  if (config.customCSS) {
    css += `/* Custom Input CSS */\n${config.customCSS}\n`;
  }

  return css;
}

/**
 * Generate CSS variables for input component
 */
function generateInputVariables(config: InputTokens): string {
  const vars: string[] = [];

  // Size-based variables
  pushSizeOrSingleVar(vars, "input", "height", config.height);
  pushSizeOrSingleVar(vars, "input", "paddingX", config.paddingX);
  pushSizeOrSingleVar(vars, "input", "paddingY", config.paddingY);
  if (config.fontSize && isSizeMap(config.fontSize)) {
    pushSizeOrSingleVar(vars, "input", "fontSize", config.fontSize);
  }

  // Single-value variables
  if (config.borderRadius) {
    vars.push(
      `  ${componentVarName("input", "borderRadius")}: ${resolveToken(config.borderRadius)};`
    );
  }
  if (config.borderWidth) {
    vars.push(
      `  ${componentVarName("input", "borderWidth")}: ${resolveToken(config.borderWidth)};`
    );
  }
  if (config.borderColor) {
    vars.push(
      `  ${componentVarName("input", "borderColor")}: ${resolveToken(config.borderColor)};`
    );
  }
  if (config.bg) {
    vars.push(`  ${componentVarName("input", "bg")}: ${resolveToken(config.bg)};`);
  }
  if (config.color) {
    vars.push(`  ${componentVarName("input", "color")}: ${resolveToken(config.color)};`);
  }
  if (config.placeholderColor) {
    vars.push(
      `  ${componentVarName("input", "placeholderColor")}: ${resolveToken(config.placeholderColor)};`
    );
  }

  // Icon and clear variables
  pushSizeOrSingleVar(vars, "input", "iconSize", config.iconSize as string | SizeMap);
  if (config.iconColor) {
    vars.push(
      `  ${componentVarName("input", "iconColor")}: ${resolveToken(config.iconColor)};`
    );
  }
  if (config.iconColorFocus) {
    vars.push(
      `  ${componentVarName("input", "iconColorFocus")}: ${resolveToken(config.iconColorFocus)};`
    );
  }
  if (config.iconColorError) {
    vars.push(
      `  ${componentVarName("input", "iconColorError")}: ${resolveToken(config.iconColorError)};`
    );
  }
  pushSizeOrSingleVar(
    vars,
    "input",
    "iconSpacing",
    config.iconSpacing as string | SizeMap
  );
  pushSizeOrSingleVar(
    vars,
    "input",
    "clearIconSize",
    config.clearIconSize as string | SizeMap
  );
  if (config.clearHoverBg) {
    vars.push(
      `  ${componentVarName("input", "clearHoverBg")}: ${resolveToken(config.clearHoverBg)};`
    );
  }
  if (config.clearHoverColor) {
    vars.push(
      `  ${componentVarName("input", "clearHoverColor")}: ${resolveToken(config.clearHoverColor)};`
    );
  }
  if (config.clearBorderRadius) {
    vars.push(
      `  ${componentVarName("input", "clearBorderRadius")}: ${resolveToken(config.clearBorderRadius)};`
    );
  }

  // State variables
  if (config.states?.focus?.borderColor) {
    vars.push(
      `  ${componentVarName("input", "focusBorderColor")}: ${resolveToken(config.states.focus.borderColor)};`
    );
  }
  if (config.states?.focus?.shadow) {
    vars.push(
      `  ${componentVarName("input", "focusShadow")}: ${resolveToken(config.states.focus.shadow)};`
    );
  }
  if (config.states?.error?.borderColor) {
    vars.push(
      `  ${componentVarName("input", "errorBorderColor")}: ${resolveToken(config.states.error.borderColor)};`
    );
  }
  if (config.states?.error?.focusShadow) {
    vars.push(
      `  ${componentVarName("input", "errorFocusShadow")}: ${resolveToken(config.states.error.focusShadow)};`
    );
  }
  if (config.states?.disabled?.opacity) {
    vars.push(
      `  ${componentVarName("input", "disabledOpacity")}: ${config.states.disabled.opacity};`
    );
  }
  if (config.states?.disabled?.cursor) {
    vars.push(
      `  ${componentVarName("input", "disabledCursor")}: ${config.states.disabled.cursor};`
    );
  }
  if (config.states?.disabled?.bg) {
    vars.push(
      `  ${componentVarName("input", "disabledBg")}: ${resolveToken(config.states.disabled.bg)};`
    );
  }
  if (config.states?.disabled?.color) {
    vars.push(
      `  ${componentVarName("input", "disabledColor")}: ${resolveToken(config.states.disabled.color)};`
    );
  }
  if (config.states?.readOnly?.bg) {
    vars.push(
      `  ${componentVarName("input", "readOnlyBg")}: ${resolveToken(config.states.readOnly.bg)};`
    );
  }
  if (config.states?.readOnly?.color) {
    vars.push(
      `  ${componentVarName("input", "readOnlyColor")}: ${resolveToken(config.states.readOnly.color)};`
    );
  }
  if (config.states?.readOnly?.cursor) {
    vars.push(
      `  ${componentVarName("input", "readOnlyCursor")}: ${config.states.readOnly.cursor};`
    );
  }

  return `:root {\n${vars.join("\n")}\n}\n`;
}

/**
 * Generate base input styles
 */
function generateInputBase(): string {
  return `.cz-input-field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.cz-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  --cz-input-icon-spacing-current: var(--cz-input-icon-spacing, 2.5rem);
  --cz-input-icon-size-current: var(--cz-input-icon-size, 1rem);
  --cz-input-clear-icon-size-current: var(--cz-input-clear-icon-size, var(--cz-input-icon-size-current));
}

.cz-input-wrapper-sm {
  --cz-input-icon-spacing-current: var(--cz-input-icon-spacing-sm, var(--cz-input-icon-spacing-current));
  --cz-input-icon-size-current: var(--cz-input-icon-size-sm, var(--cz-input-icon-size-current));
  --cz-input-clear-icon-size-current: var(--cz-input-clear-icon-size-sm, var(--cz-input-icon-size-current));
}

.cz-input-wrapper-md {
  --cz-input-icon-spacing-current: var(--cz-input-icon-spacing-md, var(--cz-input-icon-spacing-current));
  --cz-input-icon-size-current: var(--cz-input-icon-size-md, var(--cz-input-icon-size-current));
  --cz-input-clear-icon-size-current: var(--cz-input-clear-icon-size-md, var(--cz-input-icon-size-current));
}

.cz-input-wrapper-lg {
  --cz-input-icon-spacing-current: var(--cz-input-icon-spacing-lg, var(--cz-input-icon-spacing-current));
  --cz-input-icon-size-current: var(--cz-input-icon-size-lg, var(--cz-input-icon-size-current));
  --cz-input-clear-icon-size-current: var(--cz-input-clear-icon-size-lg, var(--cz-input-icon-size-current));
}

.cz-input {
  width: 100%;
  border-radius: var(--cz-input-border-radius);
  border: var(--cz-input-border-width) solid var(--cz-input-border-color);
  background-color: var(--cz-input-bg);
  color: var(--cz-input-color);
  transition: all var(--cz-transition-fast);
}

.cz-input::placeholder {
  color: var(--cz-input-placeholder-color);
}
`;
}

function generateInputVariants(config: InputTokens): string {
  if (!config.variants || Object.keys(config.variants).length === 0) {
    return "";
  }

  const blocks: string[] = [];

  for (const [name, variant] of Object.entries(config.variants)) {
    const lines: string[] = [];

    if (variant.bg) {
      lines.push(`  --cz-input-bg: ${resolveToken(variant.bg)};`);
    }
    if (variant.color) {
      lines.push(`  --cz-input-color: ${resolveToken(variant.color)};`);
    }
    if (variant.borderColor) {
      lines.push(`  --cz-input-border-color: ${resolveToken(variant.borderColor)};`);
    }
    if (variant.placeholderColor) {
      lines.push(
        `  --cz-input-placeholder-color: ${resolveToken(variant.placeholderColor)};`
      );
    }
    if (variant.iconColor) {
      lines.push(`  --cz-input-icon-color: ${resolveToken(variant.iconColor)};`);
    }
    if (variant.iconColorFocus) {
      lines.push(
        `  --cz-input-icon-color-focus: ${resolveToken(variant.iconColorFocus)};`
      );
    }
    if (variant.iconColorError) {
      lines.push(
        `  --cz-input-icon-color-error: ${resolveToken(variant.iconColorError)};`
      );
    }
    if (variant.focusBorderColor) {
      lines.push(
        `  --cz-input-focus-border-color: ${resolveToken(variant.focusBorderColor)};`
      );
    }
    if (variant.focusShadow) {
      lines.push(`  --cz-input-focus-shadow: ${resolveToken(variant.focusShadow)};`);
    }
    if (variant.clearHoverBg) {
      lines.push(
        `  --cz-input-clear-hover-bg: ${resolveToken(variant.clearHoverBg)};`
      );
    }
    if (variant.clearHoverColor) {
      lines.push(
        `  --cz-input-clear-hover-color: ${resolveToken(variant.clearHoverColor)};`
      );
    }

    if (lines.length === 0) continue;

    blocks.push(
      `.cz-input-wrapper-variant-${name} {\n${lines.join("\n")}\n}`
    );
  }

  return blocks.join("\n\n");
}

/**
 * Generate input size variants
 */
function generateInputSizes(): string {
  return `/* Input Sizes */
.cz-input-sm {
  height: var(--cz-input-height-sm);
  padding: var(--cz-input-padding-y-sm, 0) var(--cz-input-padding-x-sm);
  font-size: var(--cz-input-font-size-sm);
}
.cz-input-md {
  height: var(--cz-input-height-md);
  padding: var(--cz-input-padding-y-md, 0) var(--cz-input-padding-x-md);
  font-size: var(--cz-input-font-size-md);
}
.cz-input-lg {
  height: var(--cz-input-height-lg);
  padding: var(--cz-input-padding-y-lg, 0) var(--cz-input-padding-x-lg);
  font-size: var(--cz-input-font-size-lg);
}
`;
}

/**
 * Generate input state styles
 */
function generateInputStates(): string {
  return `.cz-input:focus {
  outline: none;
  border-color: var(--cz-input-focus-border-color);
  box-shadow: var(--cz-input-focus-shadow);
}

.cz-input:disabled {
  cursor: var(--cz-input-disabled-cursor, not-allowed);
  opacity: var(--cz-input-disabled-opacity, 0.5);
  background-color: var(--cz-input-disabled-bg, var(--cz-input-bg));
  color: var(--cz-input-disabled-color, var(--cz-input-color));
}

.cz-input:read-only {
  cursor: var(--cz-input-read-only-cursor, default);
  background-color: var(--cz-input-read-only-bg, var(--cz-input-bg));
  color: var(--cz-input-read-only-color, var(--cz-input-color));
}

.cz-input-error {
  border-color: var(--cz-input-error-border-color);
}
.cz-input-error:focus {
  border-color: var(--cz-input-error-border-color);
  box-shadow: var(--cz-input-error-focus-shadow);
}

.cz-input-description {
  font-size: var(--cz-font-size-xs);
  color: var(--cz-input-placeholder-color);
}
`;
}

/**
 * Generate input icon styles
 */
function generateInputIcons(): string {
  return `/* Input with Icons */
.cz-input-has-left-icon .cz-input { padding-left: var(--cz-input-icon-spacing-current); }
.cz-input-has-right-icon .cz-input { padding-right: var(--cz-input-icon-spacing-current); }

.cz-input-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--cz-input-icon-spacing-current);
  height: 100%;
  color: var(--cz-input-icon-color);
  pointer-events: none;
  transition: color var(--cz-transition-fast);
}
.cz-input-icon svg {
  width: var(--cz-input-icon-size-current);
  height: var(--cz-input-icon-size-current);
}
.cz-input-icon-left { left: 0; }
.cz-input-icon-right { right: 0; }

.cz-input-wrapper:focus-within .cz-input-icon {
  color: var(--cz-input-icon-color-focus, var(--cz-input-icon-color));
}

.cz-input-wrapper-error .cz-input-icon {
  color: var(--cz-input-icon-color-error, var(--cz-input-icon-color));
}
`;
}

/**
 * Generate input clear button styles
 */
function generateInputClear(): string {
  return `/* Input Clear Button */
.cz-input-clear {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--cz-input-icon-spacing-current);
  height: 100%;
  color: var(--cz-input-icon-color);
  background: transparent;
  border: none;
  border-radius: var(--cz-input-clear-border-radius, var(--cz-radius-sm));
  cursor: pointer;
  transition: color var(--cz-transition-fast), background-color var(--cz-transition-fast);
}
.cz-input-clear:hover {
  background-color: var(--cz-input-clear-hover-bg, transparent);
  color: var(--cz-input-clear-hover-color, var(--cz-input-color));
}
.cz-input-clear svg {
  width: var(--cz-input-clear-icon-size-current);
  height: var(--cz-input-clear-icon-size-current);
}
`;
}

function generateInputPasswordToggle(): string {
  return `/* Input Password Toggle */
.cz-input-password-toggle {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--cz-input-icon-spacing-current);
  height: 100%;
  color: var(--cz-input-icon-color);
  background: transparent;
  border: none;
  border-radius: var(--cz-input-clear-border-radius, var(--cz-radius-sm));
  cursor: pointer;
  transition: color var(--cz-transition-fast), background-color var(--cz-transition-fast);
}

.cz-input-password-toggle:hover {
  background-color: var(--cz-input-clear-hover-bg, transparent);
  color: var(--cz-input-icon-color-focus, var(--cz-input-icon-color));
}

.cz-input-password-toggle svg {
  width: var(--cz-input-clear-icon-size-current);
  height: var(--cz-input-clear-icon-size-current);
}
`;
}
