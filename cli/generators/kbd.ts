/**
 * CZero Kbd CSS Generator
 */

import type { KbdTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateKbdCSS(config: KbdTokens): string {
  let css = "/* ===== KBD ===== */\n\n";
  css += generateKbdVariables(config);
  css += "\n";
  css += generateKbdBase();
  css += "\n";
  if (config.customCSS) css += `/* Custom Kbd CSS */\n${config.customCSS}\n`;
  return css;
}

function generateKbdVariables(config: KbdTokens): string {
  const vars: string[] = [];
  
  if (config.fontFamily) vars.push(`  --cz-kbd-font-family: ${config.fontFamily};`);
  if (config.fontSize) vars.push(`  --cz-kbd-font-size: ${resolveToken(config.fontSize)};`);
  if (config.fontWeight) vars.push(`  --cz-kbd-font-weight: ${resolveToken(config.fontWeight)};`);
  if (config.paddingX) vars.push(`  --cz-kbd-padding-x: ${config.paddingX};`);
  if (config.paddingY) vars.push(`  --cz-kbd-padding-y: ${config.paddingY};`);
  if (config.borderRadius) vars.push(`  --cz-kbd-border-radius: ${resolveToken(config.borderRadius)};`);
  if (config.bg) vars.push(`  --cz-kbd-bg: ${resolveToken(config.bg)};`);
  if (config.color) vars.push(`  --cz-kbd-color: ${resolveToken(config.color)};`);
  if (config.borderColor) vars.push(`  --cz-kbd-border-color: ${resolveToken(config.borderColor)};`);
  if (config.shadow) vars.push(`  --cz-kbd-shadow: ${resolveToken(config.shadow)};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateKbdBase(): string {
  return `.cz-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--cz-kbd-font-family);
  font-size: var(--cz-kbd-font-size);
  font-weight: var(--cz-kbd-font-weight);
  padding: var(--cz-kbd-padding-y) var(--cz-kbd-padding-x);
  border-radius: var(--cz-kbd-border-radius);
  background-color: var(--cz-kbd-bg);
  color: var(--cz-kbd-color);
  border: 1px solid var(--cz-kbd-border-color);
  box-shadow: var(--cz-kbd-shadow);
  min-width: 1.5rem;
}
`;
}
