/**
 * CZero Separator CSS Generator
 */

import type { SeparatorTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateSeparatorCSS(config: SeparatorTokens): string {
  let css = "/* ===== SEPARATOR ===== */\n\n";
  css += generateSeparatorVariables(config);
  css += "\n";
  css += generateSeparatorBase();
  css += "\n";
  if (config.customCSS) css += `/* Custom Separator CSS */\n${config.customCSS}\n`;
  return css;
}

function generateSeparatorVariables(config: SeparatorTokens): string {
  const vars: string[] = [];
  
  if (config.color) vars.push(`  --cz-separator-color: ${resolveToken(config.color)};`);
  if (config.thickness) vars.push(`  --cz-separator-thickness: ${config.thickness};`);
  if (config.marginY) vars.push(`  --cz-separator-margin-y: ${resolveToken(config.marginY)};`);
  if (config.marginX) vars.push(`  --cz-separator-margin-x: ${resolveToken(config.marginX)};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateSeparatorBase(): string {
  return `.cz-separator {
  background-color: var(--cz-separator-color);
  flex-shrink: 0;
}

.cz-separator-horizontal {
  width: 100%;
  height: var(--cz-separator-thickness);
  margin: var(--cz-separator-margin-y) 0;
}

.cz-separator-vertical {
  width: var(--cz-separator-thickness);
  height: 100%;
  margin: 0 var(--cz-separator-margin-x);
}
`;
}
