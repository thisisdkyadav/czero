/**
 * CZero Spinner CSS Generator
 */

import type { SpinnerTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateSpinnerCSS(config: SpinnerTokens): string {
  let css = "/* ===== SPINNER ===== */\n\n";
  css += generateSpinnerVariables(config);
  css += "\n";
  css += generateSpinnerBase();
  css += "\n";
  css += generateSpinnerSizes();
  css += "\n";
  if (config.customCSS) css += `/* Custom Spinner CSS */\n${config.customCSS}\n`;
  return css;
}

function generateSpinnerVariables(config: SpinnerTokens): string {
  const vars: string[] = [];
  
  if (config.size) {
    for (const [size, value] of Object.entries(config.size)) {
      vars.push(`  --cz-spinner-size-${size}: ${value};`);
    }
  }
  if (config.borderWidth) {
    for (const [size, value] of Object.entries(config.borderWidth)) {
      vars.push(`  --cz-spinner-border-width-${size}: ${value};`);
    }
  }
  if (config.color) vars.push(`  --cz-spinner-color: ${resolveToken(config.color)};`);
  if (config.trackColor) vars.push(`  --cz-spinner-track-color: ${resolveToken(config.trackColor)};`);
  if (config.animationDuration) vars.push(`  --cz-spinner-duration: ${config.animationDuration};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateSpinnerBase(): string {
  return `.cz-spinner {
  display: inline-block;
  border-radius: var(--cz-radius-full);
  border-style: solid;
  border-color: var(--cz-spinner-track-color);
  border-top-color: var(--cz-spinner-color);
  animation: cz-spin var(--cz-spinner-duration) linear infinite;
}
`;
}

function generateSpinnerSizes(): string {
  return `/* Spinner Sizes */
.cz-spinner-sm {
  width: var(--cz-spinner-size-sm);
  height: var(--cz-spinner-size-sm);
  border-width: var(--cz-spinner-border-width-sm);
}
.cz-spinner-md {
  width: var(--cz-spinner-size-md);
  height: var(--cz-spinner-size-md);
  border-width: var(--cz-spinner-border-width-md);
}
.cz-spinner-lg {
  width: var(--cz-spinner-size-lg);
  height: var(--cz-spinner-size-lg);
  border-width: var(--cz-spinner-border-width-lg);
}
`;
}
