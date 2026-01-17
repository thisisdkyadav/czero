/**
 * CZero Textarea CSS Generator
 */

import type { TextareaTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateTextareaCSS(config: TextareaTokens): string {
  let css = "/* ===== TEXTAREA ===== */\n\n";
  css += generateTextareaVariables(config);
  css += "\n";
  css += generateTextareaBase();
  css += "\n";
  css += generateTextareaSizes();
  css += "\n";
  css += generateTextareaStates(config);
  css += "\n";
  if (config.customCSS) css += `/* Custom Textarea CSS */\n${config.customCSS}\n`;
  return css;
}

function generateTextareaVariables(config: TextareaTokens): string {
  const vars: string[] = [];
  
  if (config.minHeight) vars.push(`  --cz-textarea-min-height: ${config.minHeight};`);
  if (config.borderRadius) vars.push(`  --cz-textarea-border-radius: ${resolveToken(config.borderRadius)};`);
  if (config.borderWidth) vars.push(`  --cz-textarea-border-width: ${config.borderWidth};`);
  if (config.borderColor) vars.push(`  --cz-textarea-border-color: ${resolveToken(config.borderColor)};`);
  if (config.bg) vars.push(`  --cz-textarea-bg: ${resolveToken(config.bg)};`);
  if (config.color) vars.push(`  --cz-textarea-color: ${resolveToken(config.color)};`);
  if (config.placeholderColor) vars.push(`  --cz-textarea-placeholder-color: ${resolveToken(config.placeholderColor)};`);

  if (config.paddingX) {
    for (const [size, value] of Object.entries(config.paddingX)) {
      vars.push(`  --cz-textarea-padding-x-${size}: ${value};`);
    }
  }
  if (config.paddingY) {
    for (const [size, value] of Object.entries(config.paddingY)) {
      vars.push(`  --cz-textarea-padding-y-${size}: ${value};`);
    }
  }
  if (config.fontSize && typeof config.fontSize === "object") {
    for (const [size, value] of Object.entries(config.fontSize)) {
      vars.push(`  --cz-textarea-font-size-${size}: ${resolveToken(value)};`);
    }
  }

  if (config.states?.focus?.borderColor) vars.push(`  --cz-textarea-focus-border-color: ${resolveToken(config.states.focus.borderColor)};`);
  if (config.states?.focus?.shadow) vars.push(`  --cz-textarea-focus-shadow: ${config.states.focus.shadow};`);
  if (config.states?.disabled?.opacity) vars.push(`  --cz-textarea-disabled-opacity: ${config.states.disabled.opacity};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateTextareaBase(): string {
  return `.cz-textarea-field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.cz-textarea {
  width: 100%;
  min-height: var(--cz-textarea-min-height);
  border-radius: var(--cz-textarea-border-radius);
  border: var(--cz-textarea-border-width) solid var(--cz-textarea-border-color);
  background-color: var(--cz-textarea-bg);
  color: var(--cz-textarea-color);
  resize: vertical;
  transition: all var(--cz-transition-fast);
}

.cz-textarea::placeholder {
  color: var(--cz-textarea-placeholder-color);
}

.cz-textarea-auto-resize {
  resize: none;
  overflow: hidden;
}
`;
}

function generateTextareaSizes(): string {
  return `/* Textarea Sizes */
.cz-textarea-sm {
  padding: var(--cz-textarea-padding-y-sm) var(--cz-textarea-padding-x-sm);
  font-size: var(--cz-textarea-font-size-sm);
}
.cz-textarea-md {
  padding: var(--cz-textarea-padding-y-md) var(--cz-textarea-padding-x-md);
  font-size: var(--cz-textarea-font-size-md);
}
.cz-textarea-lg {
  padding: var(--cz-textarea-padding-y-lg) var(--cz-textarea-padding-x-lg);
  font-size: var(--cz-textarea-font-size-lg);
}
`;
}

function generateTextareaStates(config: TextareaTokens): string {
  return `.cz-textarea:focus {
  outline: none;
  border-color: var(--cz-textarea-focus-border-color);
  box-shadow: var(--cz-textarea-focus-shadow);
}

.cz-textarea:disabled {
  cursor: not-allowed;
  opacity: var(--cz-textarea-disabled-opacity);
}

.cz-textarea-description {
  font-size: var(--cz-font-size-xs);
  color: var(--cz-textarea-placeholder-color);
}
`;
}
