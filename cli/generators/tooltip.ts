/**
 * CZero Tooltip CSS Generator
 */

import type { TooltipTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateTooltipCSS(config: TooltipTokens): string {
  let css = "/* ===== TOOLTIP ===== */\n\n";
  css += generateTooltipVariables(config);
  css += "\n";
  css += generateTooltipBase();
  css += "\n";
  if (config.customCSS) css += `/* Custom Tooltip CSS */\n${config.customCSS}\n`;
  return css;
}

function generateTooltipVariables(config: TooltipTokens): string {
  const vars: string[] = [];
  
  if (config.paddingX) vars.push(`  --cz-tooltip-padding-x: ${config.paddingX};`);
  if (config.paddingY) vars.push(`  --cz-tooltip-padding-y: ${config.paddingY};`);
  if (config.fontSize) vars.push(`  --cz-tooltip-font-size: ${resolveToken(config.fontSize)};`);
  if (config.borderRadius) vars.push(`  --cz-tooltip-border-radius: ${resolveToken(config.borderRadius)};`);
  if (config.bg) vars.push(`  --cz-tooltip-bg: ${resolveToken(config.bg)};`);
  if (config.color) vars.push(`  --cz-tooltip-color: ${resolveToken(config.color)};`);
  if (config.shadow) vars.push(`  --cz-tooltip-shadow: ${resolveToken(config.shadow)};`);
  if (config.offset) vars.push(`  --cz-tooltip-offset: ${config.offset};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateTooltipBase(): string {
  return `.cz-tooltip-content {
  padding: var(--cz-tooltip-padding-y) var(--cz-tooltip-padding-x);
  font-size: var(--cz-tooltip-font-size);
  border-radius: var(--cz-tooltip-border-radius);
  background-color: var(--cz-tooltip-bg);
  color: var(--cz-tooltip-color);
  box-shadow: var(--cz-tooltip-shadow);
  z-index: 50;
  animation: cz-tooltip-fade-in 150ms ease;
}

.cz-tooltip-arrow {
  fill: var(--cz-tooltip-bg);
}

@keyframes cz-tooltip-fade-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
`;
}
