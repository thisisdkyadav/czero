/**
 * CZero Dropdown Menu CSS Generator
 */

import type { DropdownMenuTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateDropdownMenuCSS(config: DropdownMenuTokens): string {
  let css = "/* ===== DROPDOWN MENU ===== */\n\n";
  css += generateDropdownVariables(config);
  css += "\n";
  css += generateDropdownBase();
  css += "\n";
  if (config.customCSS) css += `/* Custom Dropdown CSS */\n${config.customCSS}\n`;
  return css;
}

function generateDropdownVariables(config: DropdownMenuTokens): string {
  const vars: string[] = [];
  
  if (config.contentBg) vars.push(`  --cz-dropdown-content-bg: ${resolveToken(config.contentBg)};`);
  if (config.contentBorderRadius) vars.push(`  --cz-dropdown-content-border-radius: ${resolveToken(config.contentBorderRadius)};`);
  if (config.contentShadow) vars.push(`  --cz-dropdown-content-shadow: ${resolveToken(config.contentShadow)};`);
  if (config.contentPadding) vars.push(`  --cz-dropdown-content-padding: ${config.contentPadding};`);
  if (config.itemPaddingX) vars.push(`  --cz-dropdown-item-padding-x: ${config.itemPaddingX};`);
  if (config.itemPaddingY) vars.push(`  --cz-dropdown-item-padding-y: ${config.itemPaddingY};`);
  if (config.itemBorderRadius) vars.push(`  --cz-dropdown-item-border-radius: ${resolveToken(config.itemBorderRadius)};`);
  if (config.itemFontSize) vars.push(`  --cz-dropdown-item-font-size: ${resolveToken(config.itemFontSize)};`);
  if (config.itemHoverBg) vars.push(`  --cz-dropdown-item-hover-bg: ${resolveToken(config.itemHoverBg)};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateDropdownBase(): string {
  return `.cz-dropdown-content {
  min-width: 8rem;
  overflow: hidden;
  background-color: var(--cz-dropdown-content-bg);
  border-radius: var(--cz-dropdown-content-border-radius);
  box-shadow: var(--cz-dropdown-content-shadow);
  border: 1px solid hsl(var(--cz-color-border));
  padding: var(--cz-dropdown-content-padding);
  z-index: 50;
  animation: cz-dropdown-fade-in 150ms ease;
}

.cz-dropdown-item {
  display: flex;
  align-items: center;
  padding: var(--cz-dropdown-item-padding-y) var(--cz-dropdown-item-padding-x);
  border-radius: var(--cz-dropdown-item-border-radius);
  font-size: var(--cz-dropdown-item-font-size);
  color: hsl(var(--cz-color-fg));
  cursor: pointer;
  outline: none;
  user-select: none;
  transition: background-color var(--cz-transition-fast);
  gap: 0.5rem;
}

.cz-dropdown-item:hover,
.cz-dropdown-item[data-highlighted] {
  background-color: var(--cz-dropdown-item-hover-bg);
}

.cz-dropdown-item[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}

.cz-dropdown-item-icon {
  width: 1rem;
  height: 1rem;
  color: hsl(var(--cz-color-mutedFg));
}

.cz-dropdown-item-shortcut {
  margin-left: auto;
  font-size: var(--cz-font-size-xs);
  color: hsl(var(--cz-color-mutedFg));
}

.cz-dropdown-separator {
  height: 1px;
  background-color: hsl(var(--cz-color-border));
  margin: 0.25rem 0;
}

.cz-dropdown-label {
  padding: var(--cz-dropdown-item-padding-y) var(--cz-dropdown-item-padding-x);
  font-size: var(--cz-font-size-xs);
  font-weight: var(--cz-font-weight-medium);
  color: hsl(var(--cz-color-mutedFg));
}

.cz-dropdown-sub-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cz-dropdown-sub-trigger-icon {
  width: 1rem;
  height: 1rem;
  margin-left: auto;
}

@keyframes cz-dropdown-fade-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
`;
}
