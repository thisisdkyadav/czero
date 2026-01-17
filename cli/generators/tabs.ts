/**
 * CZero Tabs CSS Generator
 */

import type { TabsTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateTabsCSS(config: TabsTokens): string {
  let css = "/* ===== TABS ===== */\n\n";
  css += generateTabsVariables(config);
  css += "\n";
  css += generateTabsBase();
  css += "\n";
  if (config.customCSS) css += `/* Custom Tabs CSS */\n${config.customCSS}\n`;
  return css;
}

function generateTabsVariables(config: TabsTokens): string {
  const vars: string[] = [];
  
  if (config.listBorderWidth) vars.push(`  --cz-tabs-list-border-width: ${config.listBorderWidth};`);
  if (config.listBorderColor) vars.push(`  --cz-tabs-list-border-color: ${resolveToken(config.listBorderColor)};`);
  if (config.triggerPaddingX) vars.push(`  --cz-tabs-trigger-padding-x: ${config.triggerPaddingX};`);
  if (config.triggerPaddingY) vars.push(`  --cz-tabs-trigger-padding-y: ${config.triggerPaddingY};`);
  if (config.triggerFontSize) vars.push(`  --cz-tabs-trigger-font-size: ${resolveToken(config.triggerFontSize)};`);
  if (config.triggerFontWeight) vars.push(`  --cz-tabs-trigger-font-weight: ${resolveToken(config.triggerFontWeight)};`);
  if (config.triggerColor) vars.push(`  --cz-tabs-trigger-color: ${resolveToken(config.triggerColor)};`);
  if (config.triggerActiveColor) vars.push(`  --cz-tabs-trigger-active-color: ${resolveToken(config.triggerActiveColor)};`);
  if (config.triggerActiveBorderColor) vars.push(`  --cz-tabs-trigger-active-border-color: ${resolveToken(config.triggerActiveBorderColor)};`);
  if (config.contentPadding) vars.push(`  --cz-tabs-content-padding: ${resolveToken(config.contentPadding)};`);

  if (config.states?.hover?.color) vars.push(`  --cz-tabs-trigger-hover-color: ${resolveToken(config.states.hover.color)};`);
  if (config.states?.focus?.ringWidth) vars.push(`  --cz-tabs-trigger-focus-ring-width: ${config.states.focus.ringWidth};`);
  if (config.states?.focus?.ringColor) vars.push(`  --cz-tabs-trigger-focus-ring-color: ${resolveToken(config.states.focus.ringColor)};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateTabsBase(): string {
  return `.cz-tabs {
  display: flex;
  flex-direction: column;
}

.cz-tabs-list {
  display: flex;
  border-bottom: var(--cz-tabs-list-border-width) solid var(--cz-tabs-list-border-color);
  gap: 0.5rem;
}

.cz-tabs-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--cz-tabs-trigger-padding-y) var(--cz-tabs-trigger-padding-x);
  font-size: var(--cz-tabs-trigger-font-size);
  font-weight: var(--cz-tabs-trigger-font-weight);
  color: var(--cz-tabs-trigger-color);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: calc(var(--cz-tabs-list-border-width) * -1);
  cursor: pointer;
  transition: all var(--cz-transition-fast);
  white-space: nowrap;
}

.cz-tabs-trigger:hover {
  color: var(--cz-tabs-trigger-hover-color);
}

.cz-tabs-trigger:focus-visible {
  outline: none;
  box-shadow: 0 0 0 var(--cz-tabs-trigger-focus-ring-width) var(--cz-tabs-trigger-focus-ring-color);
  border-radius: var(--cz-radius-sm);
}

.cz-tabs-trigger[data-state="active"],
.cz-tabs-trigger.cz-tabs-trigger-active {
  color: var(--cz-tabs-trigger-active-color);
  border-bottom-color: var(--cz-tabs-trigger-active-border-color);
}

.cz-tabs-trigger:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cz-tabs-content {
  padding: var(--cz-tabs-content-padding);
}

.cz-tabs-content[data-state="inactive"] {
  display: none;
}
`;
}
