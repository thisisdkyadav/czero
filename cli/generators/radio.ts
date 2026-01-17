/**
 * CZero Radio CSS Generator
 */

import type { RadioTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateRadioCSS(config: RadioTokens): string {
  let css = "/* ===== RADIO ===== */\n\n";
  css += generateRadioVariables(config);
  css += "\n";
  css += generateRadioBase();
  css += "\n";
  css += generateRadioGroup();
  css += "\n";
  if (config.customCSS) css += `/* Custom Radio CSS */\n${config.customCSS}\n`;
  return css;
}

function generateRadioVariables(config: RadioTokens): string {
  const vars: string[] = [];
  
  if (config.size) vars.push(`  --cz-radio-size: ${config.size};`);
  if (config.indicatorSize) vars.push(`  --cz-radio-indicator-size: ${config.indicatorSize};`);
  if (config.borderWidth) vars.push(`  --cz-radio-border-width: ${config.borderWidth};`);
  if (config.borderColor) vars.push(`  --cz-radio-border-color: ${resolveToken(config.borderColor)};`);
  if (config.bg) vars.push(`  --cz-radio-bg: ${resolveToken(config.bg)};`);
  if (config.checkedBorderColor) vars.push(`  --cz-radio-checked-border-color: ${resolveToken(config.checkedBorderColor)};`);
  if (config.indicatorBg) vars.push(`  --cz-radio-indicator-bg: ${resolveToken(config.indicatorBg)};`);
  if (config.labelFontSize) vars.push(`  --cz-radio-label-font-size: ${resolveToken(config.labelFontSize)};`);
  if (config.labelGap) vars.push(`  --cz-radio-label-gap: ${config.labelGap};`);

  if (config.states?.hover?.borderColor) vars.push(`  --cz-radio-hover-border-color: ${resolveToken(config.states.hover.borderColor)};`);
  if (config.states?.focus?.ringWidth) vars.push(`  --cz-radio-focus-ring-width: ${config.states.focus.ringWidth};`);
  if (config.states?.focus?.ringColor) vars.push(`  --cz-radio-focus-ring-color: ${resolveToken(config.states.focus.ringColor)};`);
  if (config.states?.disabled?.opacity) vars.push(`  --cz-radio-disabled-opacity: ${config.states.disabled.opacity};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateRadioBase(): string {
  return `.cz-radio-wrapper {
  display: inline-flex;
  align-items: center;
  gap: var(--cz-radio-label-gap);
  cursor: pointer;
  user-select: none;
}

.cz-radio-wrapper.cz-disabled {
  cursor: not-allowed;
  opacity: var(--cz-radio-disabled-opacity);
}

.cz-radio {
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--cz-radio-size);
  height: var(--cz-radio-size);
  border-radius: var(--cz-radius-full);
  border: var(--cz-radio-border-width) solid var(--cz-radio-border-color);
  background-color: var(--cz-radio-bg);
  transition: all var(--cz-transition-fast);
  flex-shrink: 0;
  cursor: pointer;
}

.cz-radio:hover {
  border-color: var(--cz-radio-hover-border-color);
}

.cz-radio:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--cz-color-bg)), 0 0 0 4px var(--cz-radio-focus-ring-color);
}

.cz-radio:disabled {
  cursor: not-allowed;
  opacity: var(--cz-radio-disabled-opacity);
}

.cz-radio[data-state="checked"] {
  border-color: var(--cz-radio-checked-border-color);
}

.cz-radio-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.cz-radio-indicator::after {
  content: "";
  display: block;
  width: var(--cz-radio-indicator-size);
  height: var(--cz-radio-indicator-size);
  border-radius: var(--cz-radius-full);
  background-color: var(--cz-radio-indicator-bg);
}

.cz-radio-label {
  font-size: var(--cz-radio-label-font-size);
  color: hsl(var(--cz-color-fg));
}
`;
}

function generateRadioGroup(): string {
  return `/* Radio Group */
.cz-radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cz-radio-group-horizontal {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}

.cz-radio-group-item {
  display: flex;
  align-items: flex-start;
  gap: var(--cz-radio-label-gap);
}

.cz-radio-group-item .cz-radio {
  margin-top: 0.125rem;
}

.cz-radio-group-text {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.cz-radio-group-label {
  font-size: var(--cz-font-size-sm);
  font-weight: var(--cz-font-weight-medium);
  color: hsl(var(--cz-color-fg));
}

.cz-radio-group-description {
  font-size: var(--cz-font-size-xs);
  color: hsl(var(--cz-color-mutedFg));
}
`;
}
