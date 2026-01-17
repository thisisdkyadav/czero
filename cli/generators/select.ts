/**
 * CZero Select CSS Generator
 */

import type { SelectTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateSelectCSS(config: SelectTokens): string {
  let css = "/* ===== SELECT ===== */\n\n";
  css += generateSelectVariables(config);
  css += "\n";
  css += generateSelectBase();
  css += "\n";
  css += generateSelectSizes();
  css += "\n";
  css += generateSelectContent(config);
  css += "\n";
  if (config.customCSS) css += `/* Custom Select CSS */\n${config.customCSS}\n`;
  return css;
}

function generateSelectVariables(config: SelectTokens): string {
  const vars: string[] = [];
  
  if (config.height) {
    for (const [size, value] of Object.entries(config.height)) {
      vars.push(`  --cz-select-height-${size}: ${value};`);
    }
  }
  if (config.paddingX) {
    for (const [size, value] of Object.entries(config.paddingX)) {
      vars.push(`  --cz-select-padding-x-${size}: ${value};`);
    }
  }
  if (config.fontSize && typeof config.fontSize === "object") {
    for (const [size, value] of Object.entries(config.fontSize)) {
      vars.push(`  --cz-select-font-size-${size}: ${resolveToken(value)};`);
    }
  }
  
  if (config.borderRadius) vars.push(`  --cz-select-border-radius: ${resolveToken(config.borderRadius)};`);
  if (config.borderWidth) vars.push(`  --cz-select-border-width: ${config.borderWidth};`);
  if (config.borderColor) vars.push(`  --cz-select-border-color: ${resolveToken(config.borderColor)};`);
  if (config.bg) vars.push(`  --cz-select-bg: ${resolveToken(config.bg)};`);
  if (config.color) vars.push(`  --cz-select-color: ${resolveToken(config.color)};`);
  if (config.iconSize) vars.push(`  --cz-select-icon-size: ${config.iconSize};`);

  if (config.states?.focus?.ringWidth) vars.push(`  --cz-select-focus-ring-width: ${config.states.focus.ringWidth};`);
  if (config.states?.focus?.ringColor) vars.push(`  --cz-select-focus-ring-color: ${resolveToken(config.states.focus.ringColor)};`);
  if (config.states?.disabled?.opacity) vars.push(`  --cz-select-disabled-opacity: ${config.states.disabled.opacity};`);

  // Content
  if (config.content?.bg) vars.push(`  --cz-select-content-bg: ${resolveToken(config.content.bg)};`);
  if (config.content?.borderRadius) vars.push(`  --cz-select-content-border-radius: ${resolveToken(config.content.borderRadius)};`);
  if (config.content?.shadow) vars.push(`  --cz-select-content-shadow: ${resolveToken(config.content.shadow)};`);
  if (config.content?.padding) vars.push(`  --cz-select-content-padding: ${config.content.padding};`);

  // Item
  if (config.item?.paddingX) vars.push(`  --cz-select-item-padding-x: ${config.item.paddingX};`);
  if (config.item?.paddingY) vars.push(`  --cz-select-item-padding-y: ${config.item.paddingY};`);
  if (config.item?.borderRadius) vars.push(`  --cz-select-item-border-radius: ${resolveToken(config.item.borderRadius)};`);
  if (config.item?.hoverBg) vars.push(`  --cz-select-item-hover-bg: ${resolveToken(config.item.hoverBg)};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateSelectBase(): string {
  return `.cz-select-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--cz-select-border-radius);
  border: var(--cz-select-border-width) solid var(--cz-select-border-color);
  background-color: var(--cz-select-bg);
  color: var(--cz-select-color);
  transition: all var(--cz-transition-fast);
  cursor: pointer;
  gap: 0.5rem;
}

.cz-select-trigger:focus-visible {
  outline: none;
  box-shadow: 0 0 0 var(--cz-select-focus-ring-width) var(--cz-select-focus-ring-color);
}

.cz-select-trigger:disabled {
  cursor: not-allowed;
  opacity: var(--cz-select-disabled-opacity);
}

.cz-select-trigger[data-placeholder] {
  color: hsl(var(--cz-color-mutedFg));
}

.cz-select-icon {
  width: var(--cz-select-icon-size);
  height: var(--cz-select-icon-size);
  color: hsl(var(--cz-color-mutedFg));
  flex-shrink: 0;
}
`;
}

function generateSelectSizes(): string {
  return `/* Select Sizes */
.cz-select-sm {
  height: var(--cz-select-height-sm);
  padding: 0 var(--cz-select-padding-x-sm);
  font-size: var(--cz-select-font-size-sm);
}
.cz-select-md {
  height: var(--cz-select-height-md);
  padding: 0 var(--cz-select-padding-x-md);
  font-size: var(--cz-select-font-size-md);
}
.cz-select-lg {
  height: var(--cz-select-height-lg);
  padding: 0 var(--cz-select-padding-x-lg);
  font-size: var(--cz-select-font-size-lg);
}
`;
}

function generateSelectContent(config: SelectTokens): string {
  return `/* Select Content */
.cz-select-content {
  overflow: hidden;
  background-color: var(--cz-select-content-bg);
  border-radius: var(--cz-select-content-border-radius);
  box-shadow: var(--cz-select-content-shadow);
  border: 1px solid hsl(var(--cz-color-border));
  padding: var(--cz-select-content-padding);
  z-index: 50;
}

.cz-select-viewport {
  padding: 0;
}

.cz-select-item {
  display: flex;
  align-items: center;
  padding: var(--cz-select-item-padding-y) var(--cz-select-item-padding-x);
  border-radius: var(--cz-select-item-border-radius);
  font-size: var(--cz-font-size-sm);
  cursor: pointer;
  outline: none;
  user-select: none;
  transition: background-color var(--cz-transition-fast);
}

.cz-select-item:hover,
.cz-select-item[data-highlighted] {
  background-color: var(--cz-select-item-hover-bg);
}

.cz-select-item[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}

.cz-select-item-indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  margin-right: 0.5rem;
}

.cz-select-separator {
  height: 1px;
  background-color: hsl(var(--cz-color-border));
  margin: 0.25rem 0;
}

.cz-select-label {
  padding: var(--cz-select-item-padding-y) var(--cz-select-item-padding-x);
  font-size: var(--cz-font-size-xs);
  font-weight: var(--cz-font-weight-medium);
  color: hsl(var(--cz-color-mutedFg));
}
`;
}
