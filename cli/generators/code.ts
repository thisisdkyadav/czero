/**
 * CZero Code CSS Generator
 */

import type { CodeTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateCodeCSS(config: CodeTokens): string {
  let css = "/* ===== CODE ===== */\n\n";
  css += generateCodeVariables(config);
  css += "\n";
  css += generateCodeBase();
  css += "\n";
  if (config.customCSS) css += `/* Custom Code CSS */\n${config.customCSS}\n`;
  return css;
}

function generateCodeVariables(config: CodeTokens): string {
  const vars: string[] = [];
  
  if (config.fontFamily) vars.push(`  --cz-code-font-family: ${config.fontFamily};`);
  if (config.fontSize) vars.push(`  --cz-code-font-size: ${resolveToken(config.fontSize)};`);
  if (config.paddingX) vars.push(`  --cz-code-padding-x: ${config.paddingX};`);
  if (config.paddingY) vars.push(`  --cz-code-padding-y: ${config.paddingY};`);
  if (config.borderRadius) vars.push(`  --cz-code-border-radius: ${resolveToken(config.borderRadius)};`);
  if (config.bg) vars.push(`  --cz-code-bg: ${resolveToken(config.bg)};`);
  if (config.color) vars.push(`  --cz-code-color: ${resolveToken(config.color)};`);
  if (config.blockPadding) vars.push(`  --cz-code-block-padding: ${resolveToken(config.blockPadding)};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateCodeBase(): string {
  return `.cz-code {
  font-family: var(--cz-code-font-family);
  font-size: var(--cz-code-font-size);
  padding: var(--cz-code-padding-y) var(--cz-code-padding-x);
  border-radius: var(--cz-code-border-radius);
  background-color: var(--cz-code-bg);
  color: var(--cz-code-color);
}

.cz-code-block {
  display: block;
  padding: var(--cz-code-block-padding);
  overflow-x: auto;
  white-space: pre;
}
`;
}
