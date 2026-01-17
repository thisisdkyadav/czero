/**
 * CZero Checkbox CSS Generator
 * Generates CSS for checkbox component from config tokens
 */

import type { CheckboxTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateCheckboxCSS(config: CheckboxTokens): string {
  let css = "";

  css += "/* ===== CHECKBOX ===== */\n\n";
  css += generateCheckboxVariables(config);
  css += "\n";
  css += generateCheckboxBase();
  css += "\n";
  css += generateCheckboxSizes(config);
  css += "\n";
  css += generateCheckboxDescription();
  css += "\n";

  if (config.customCSS) {
    css += `/* Custom Checkbox CSS */\n${config.customCSS}\n`;
  }

  return css;
}

function generateCheckboxVariables(config: CheckboxTokens): string {
  const vars: string[] = [];

  // Size variants
  if (config.size) {
    for (const [size, value] of Object.entries(config.size)) {
      vars.push(`  --cz-checkbox-size-${size}: ${resolveToken(value)};`);
    }
  }
  if (config.iconSize) {
    for (const [size, value] of Object.entries(config.iconSize)) {
      vars.push(`  --cz-checkbox-icon-size-${size}: ${value};`);
    }
  }

  // Single values
  if (config.borderRadius) vars.push(`  --cz-checkbox-border-radius: ${resolveToken(config.borderRadius)};`);
  if (config.borderWidth) vars.push(`  --cz-checkbox-border-width: ${config.borderWidth};`);
  if (config.borderColor) vars.push(`  --cz-checkbox-border-color: ${resolveToken(config.borderColor)};`);
  if (config.bg) vars.push(`  --cz-checkbox-bg: ${resolveToken(config.bg)};`);
  if (config.checkedBg) vars.push(`  --cz-checkbox-checked-bg: ${resolveToken(config.checkedBg)};`);
  if (config.checkedBorderColor) vars.push(`  --cz-checkbox-checked-border-color: ${resolveToken(config.checkedBorderColor)};`);
  if (config.indicatorColor) vars.push(`  --cz-checkbox-indicator-color: ${resolveToken(config.indicatorColor)};`);
  if (config.labelFontSize) vars.push(`  --cz-checkbox-label-font-size: ${resolveToken(config.labelFontSize)};`);
  if (config.labelGap) vars.push(`  --cz-checkbox-label-gap: ${config.labelGap};`);

  // States
  if (config.states?.hover?.borderColor) vars.push(`  --cz-checkbox-hover-border-color: ${resolveToken(config.states.hover.borderColor)};`);
  if (config.states?.focus?.ringWidth) vars.push(`  --cz-checkbox-focus-ring-width: ${config.states.focus.ringWidth};`);
  if (config.states?.focus?.ringColor) vars.push(`  --cz-checkbox-focus-ring-color: ${resolveToken(config.states.focus.ringColor)};`);
  if (config.states?.disabled?.opacity) vars.push(`  --cz-checkbox-disabled-opacity: ${config.states.disabled.opacity};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateCheckboxBase(): string {
  return `.cz-checkbox-wrapper {
  display: inline-flex;
  align-items: center;
  gap: var(--cz-checkbox-label-gap);
  cursor: pointer;
  user-select: none;
}

.cz-checkbox-wrapper.cz-disabled {
  cursor: not-allowed;
  opacity: var(--cz-checkbox-disabled-opacity);
}

.cz-checkbox {
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--cz-checkbox-border-radius);
  border: var(--cz-checkbox-border-width) solid var(--cz-checkbox-border-color);
  background-color: var(--cz-checkbox-bg);
  transition: all var(--cz-transition-fast);
  flex-shrink: 0;
  cursor: pointer;
}

.cz-checkbox:hover {
  border-color: var(--cz-checkbox-hover-border-color);
}

.cz-checkbox:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--cz-color-bg)), 0 0 0 4px var(--cz-checkbox-focus-ring-color);
}

.cz-checkbox:disabled {
  cursor: not-allowed;
  opacity: var(--cz-checkbox-disabled-opacity);
}

.cz-checkbox[data-state="checked"],
.cz-checkbox[data-state="indeterminate"] {
  background-color: var(--cz-checkbox-checked-bg);
  border-color: var(--cz-checkbox-checked-border-color);
}

.cz-checkbox-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cz-checkbox-indicator-color);
  width: 100%;
  height: 100%;
}

.cz-checkbox-label {
  font-size: var(--cz-checkbox-label-font-size);
  color: hsl(var(--cz-color-fg));
}
`;
}

function generateCheckboxSizes(config: CheckboxTokens): string {
  let css = "/* Checkbox Sizes */\n";

  for (const size of ["sm", "md", "lg"]) {
    css += `.cz-checkbox-${size} {
  width: var(--cz-checkbox-size-${size});
  height: var(--cz-checkbox-size-${size});
}
.cz-checkbox-${size} .cz-checkbox-indicator svg {
  width: var(--cz-checkbox-icon-size-${size});
  height: var(--cz-checkbox-icon-size-${size});
}
`;
  }

  return css;
}

function generateCheckboxDescription(): string {
  return `/* Checkbox with Description */
.cz-checkbox-wrapper-with-description {
  align-items: flex-start;
}
.cz-checkbox-wrapper-with-description .cz-checkbox {
  margin-top: 0.125rem;
}

.cz-checkbox-text {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.cz-checkbox-description {
  font-size: var(--cz-font-size-xs);
  color: hsl(var(--cz-color-mutedFg));
}
`;
}
