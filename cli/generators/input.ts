/**
 * CZero Input CSS Generator
 * Generates CSS for input component from config tokens
 */

import type { InputTokens } from "../../src/core/types/config";
import { resolveToken, componentVarName } from "../token-resolver";

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

  // Generate size variants
  css += generateInputSizes();
  css += "\n";

  // Generate state styles
  css += generateInputStates(config);
  css += "\n";

  // Generate icon styles
  css += generateInputIcons(config);
  css += "\n";

  // Generate clear button styles
  css += generateInputClear();
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
  if (config.height) {
    for (const [size, value] of Object.entries(config.height)) {
      vars.push(`  ${componentVarName("input", "height", size)}: ${resolveToken(value)};`);
    }
  }

  if (config.paddingX) {
    for (const [size, value] of Object.entries(config.paddingX)) {
      vars.push(`  ${componentVarName("input", "paddingX", size)}: ${resolveToken(value)};`);
    }
  }

  if (config.fontSize && typeof config.fontSize === "object") {
    for (const [size, value] of Object.entries(config.fontSize)) {
      vars.push(`  ${componentVarName("input", "fontSize", size)}: ${resolveToken(value)};`);
    }
  }

  // Single-value variables
  if (config.borderRadius) {
    vars.push(`  ${componentVarName("input", "borderRadius")}: ${resolveToken(config.borderRadius)};`);
  }
  if (config.borderWidth) {
    vars.push(`  ${componentVarName("input", "borderWidth")}: ${resolveToken(config.borderWidth)};`);
  }
  if (config.borderColor) {
    vars.push(`  ${componentVarName("input", "borderColor")}: ${resolveToken(config.borderColor)};`);
  }
  if (config.bg) {
    vars.push(`  ${componentVarName("input", "bg")}: ${resolveToken(config.bg)};`);
  }
  if (config.color) {
    vars.push(`  ${componentVarName("input", "color")}: ${resolveToken(config.color)};`);
  }
  if (config.placeholderColor) {
    vars.push(`  ${componentVarName("input", "placeholderColor")}: ${resolveToken(config.placeholderColor)};`);
  }

  // Icon variables
  if (config.iconSize) {
    vars.push(`  ${componentVarName("input", "iconSize")}: ${resolveToken(config.iconSize)};`);
  }
  if (config.iconColor) {
    vars.push(`  ${componentVarName("input", "iconColor")}: ${resolveToken(config.iconColor)};`);
  }
  if (config.iconSpacing) {
    vars.push(`  ${componentVarName("input", "iconSpacing")}: ${resolveToken(config.iconSpacing)};`);
  }

  // State variables
  if (config.states?.focus?.borderColor) {
    vars.push(`  ${componentVarName("input", "focusBorderColor")}: ${resolveToken(config.states.focus.borderColor)};`);
  }
  if (config.states?.focus?.shadow) {
    vars.push(`  ${componentVarName("input", "focusShadow")}: ${resolveToken(config.states.focus.shadow)};`);
  }
  if (config.states?.error?.borderColor) {
    vars.push(`  ${componentVarName("input", "errorBorderColor")}: ${resolveToken(config.states.error.borderColor)};`);
  }
  if (config.states?.error?.focusShadow) {
    vars.push(`  ${componentVarName("input", "errorFocusShadow")}: ${resolveToken(config.states.error.focusShadow)};`);
  }
  if (config.states?.disabled?.opacity) {
    vars.push(`  ${componentVarName("input", "disabledOpacity")}: ${config.states.disabled.opacity};`);
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

/**
 * Generate input size variants
 */
function generateInputSizes(): string {
  return `/* Input Sizes */
.cz-input-sm {
  height: var(--cz-input-height-sm);
  padding: 0 var(--cz-input-padding-x-sm);
  font-size: var(--cz-input-font-size-sm);
}
.cz-input-md {
  height: var(--cz-input-height-md);
  padding: 0 var(--cz-input-padding-x-md);
  font-size: var(--cz-input-font-size-md);
}
.cz-input-lg {
  height: var(--cz-input-height-lg);
  padding: 0 var(--cz-input-padding-x-lg);
  font-size: var(--cz-input-font-size-lg);
}
`;
}

/**
 * Generate input state styles
 */
function generateInputStates(config: InputTokens): string {
  return `.cz-input:focus {
  outline: none;
  border-color: var(--cz-input-focus-border-color);
  box-shadow: var(--cz-input-focus-shadow);
}

.cz-input:disabled {
  cursor: not-allowed;
  opacity: var(--cz-input-disabled-opacity);
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
function generateInputIcons(config: InputTokens): string {
  return `/* Input with Icons */
.cz-input-has-left-icon .cz-input { padding-left: var(--cz-input-icon-spacing); }
.cz-input-has-right-icon .cz-input { padding-right: var(--cz-input-icon-spacing); }

.cz-input-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--cz-input-icon-spacing);
  height: 100%;
  color: var(--cz-input-icon-color);
  pointer-events: none;
}
.cz-input-icon svg { width: var(--cz-input-icon-size); height: var(--cz-input-icon-size); }
.cz-input-icon-left { left: 0; }
.cz-input-icon-right { right: 0; }
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
  width: var(--cz-input-icon-spacing);
  height: 100%;
  color: var(--cz-input-icon-color);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color var(--cz-transition-fast);
}
.cz-input-clear:hover { color: var(--cz-input-color); }
.cz-input-clear svg { width: 0.875rem; height: 0.875rem; }
`;
}
