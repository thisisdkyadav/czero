/**
 * CZero Alert CSS Generator
 */

import type { AlertTokens, VariantConfig } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateAlertCSS(config: AlertTokens): string {
  let css = "/* ===== ALERT ===== */\n\n";
  css += generateAlertVariables(config);
  css += "\n";
  css += generateAlertBase();
  css += "\n";
  css += generateAlertVariants(config);
  css += "\n";
  if (config.customCSS) css += `/* Custom Alert CSS */\n${config.customCSS}\n`;
  return css;
}

function generateAlertVariables(config: AlertTokens): string {
  const vars: string[] = [];
  
  if (config.paddingX) vars.push(`  --cz-alert-padding-x: ${resolveToken(config.paddingX)};`);
  if (config.paddingY) vars.push(`  --cz-alert-padding-y: ${resolveToken(config.paddingY)};`);
  if (config.borderRadius) vars.push(`  --cz-alert-border-radius: ${resolveToken(config.borderRadius)};`);
  if (config.borderWidth) vars.push(`  --cz-alert-border-width: ${config.borderWidth};`);
  if (config.titleFontSize) vars.push(`  --cz-alert-title-font-size: ${resolveToken(config.titleFontSize)};`);
  if (config.titleFontWeight) vars.push(`  --cz-alert-title-font-weight: ${resolveToken(config.titleFontWeight)};`);
  if (config.contentFontSize) vars.push(`  --cz-alert-content-font-size: ${resolveToken(config.contentFontSize)};`);

  if (config.variants) {
    for (const [name, variant] of Object.entries(config.variants)) {
      if (variant.bg) vars.push(`  --cz-alert-${name}-bg: ${resolveToken(variant.bg)};`);
      if (variant.borderColor) vars.push(`  --cz-alert-${name}-border-color: ${resolveToken(variant.borderColor)};`);
      if (variant.color) vars.push(`  --cz-alert-${name}-color: ${resolveToken(variant.color)};`);
    }
  }

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateAlertBase(): string {
  return `.cz-alert {
  display: flex;
  gap: 0.75rem;
  padding: var(--cz-alert-padding-y) var(--cz-alert-padding-x);
  border-radius: var(--cz-alert-border-radius);
  border: var(--cz-alert-border-width) solid transparent;
}

.cz-alert-icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.125rem;
}

.cz-alert-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cz-alert-title {
  font-size: var(--cz-alert-title-font-size);
  font-weight: var(--cz-alert-title-font-weight);
  line-height: var(--cz-font-lineHeight-tight);
}

.cz-alert-description {
  font-size: var(--cz-alert-content-font-size);
  opacity: 0.9;
}
`;
}

function generateAlertVariants(config: AlertTokens): string {
  let css = "/* Alert Variants */\n";
  const defaultVariants = ["info", "success", "warning", "danger"];
  
  for (const name of defaultVariants) {
    css += `.cz-alert-${name} {
  background: var(--cz-alert-${name}-bg);
  border-color: var(--cz-alert-${name}-border-color);
  color: var(--cz-alert-${name}-color);
}
.cz-alert-${name} .cz-alert-icon { color: var(--cz-alert-${name}-color); }
`;
  }
  
  return css;
}
