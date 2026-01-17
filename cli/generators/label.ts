/**
 * CZero Label CSS Generator
 */

import type { LabelTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateLabelCSS(config: LabelTokens): string {
  let css = "/* ===== LABEL ===== */\n\n";
  css += generateLabelVariables(config);
  css += "\n";
  css += generateLabelBase();
  css += "\n";
  if (config.customCSS) css += `/* Custom Label CSS */\n${config.customCSS}\n`;
  return css;
}

function generateLabelVariables(config: LabelTokens): string {
  const vars: string[] = [];
  
  if (config.fontSize) vars.push(`  --cz-label-font-size: ${resolveToken(config.fontSize)};`);
  if (config.fontWeight) vars.push(`  --cz-label-font-weight: ${resolveToken(config.fontWeight)};`);
  if (config.color) vars.push(`  --cz-label-color: ${resolveToken(config.color)};`);
  if (config.requiredColor) vars.push(`  --cz-label-required-color: ${resolveToken(config.requiredColor)};`);
  if (config.disabledOpacity) vars.push(`  --cz-label-disabled-opacity: ${config.disabledOpacity};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateLabelBase(): string {
  return `.cz-label {
  font-size: var(--cz-label-font-size);
  font-weight: var(--cz-label-font-weight);
  color: var(--cz-label-color);
}

.cz-label-required {
  color: var(--cz-label-required-color);
  margin-left: 0.25rem;
}

.cz-label-disabled {
  opacity: var(--cz-label-disabled-opacity);
  cursor: not-allowed;
}

.cz-error {
  font-size: var(--cz-font-size-sm);
  color: hsl(var(--cz-color-danger));
}
`;
}
