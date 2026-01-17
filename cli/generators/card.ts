/**
 * CZero Card CSS Generator
 * Generates CSS for card component from config tokens
 */

import type { CardTokens } from "../../src/core/types/config";
import { resolveToken, componentVarName } from "../token-resolver";

/**
 * Generate all card CSS including variables and styles
 */
export function generateCardCSS(config: CardTokens): string {
  let css = "";

  css += "/* ===== CARD ===== */\n\n";
  css += generateCardVariables(config);
  css += "\n";
  css += generateCardBase();
  css += "\n";

  if (config.customCSS) {
    css += `/* Custom Card CSS */\n${config.customCSS}\n`;
  }

  return css;
}

function generateCardVariables(config: CardTokens): string {
  const vars: string[] = [];

  if (config.padding) vars.push(`  --cz-card-padding: ${resolveToken(config.padding)};`);
  if (config.borderRadius) vars.push(`  --cz-card-border-radius: ${resolveToken(config.borderRadius)};`);
  if (config.borderWidth) vars.push(`  --cz-card-border-width: ${resolveToken(config.borderWidth)};`);
  if (config.borderColor) vars.push(`  --cz-card-border-color: ${resolveToken(config.borderColor)};`);
  if (config.bg) vars.push(`  --cz-card-bg: ${resolveToken(config.bg)};`);
  if (config.shadow) vars.push(`  --cz-card-shadow: ${resolveToken(config.shadow)};`);

  // Header
  if (config.header?.paddingBottom) vars.push(`  --cz-card-header-padding-bottom: ${resolveToken(config.header.paddingBottom)};`);
  if (config.header?.marginBottom) vars.push(`  --cz-card-header-margin-bottom: ${resolveToken(config.header.marginBottom)};`);

  // Title
  if (config.title?.fontSize) vars.push(`  --cz-card-title-font-size: ${resolveToken(config.title.fontSize)};`);
  if (config.title?.fontWeight) vars.push(`  --cz-card-title-font-weight: ${resolveToken(config.title.fontWeight)};`);
  if (config.title?.color) vars.push(`  --cz-card-title-color: ${resolveToken(config.title.color)};`);

  // Description
  if (config.description?.fontSize) vars.push(`  --cz-card-description-font-size: ${resolveToken(config.description.fontSize)};`);
  if (config.description?.color) vars.push(`  --cz-card-description-color: ${resolveToken(config.description.color)};`);

  // Footer
  if (config.footer?.paddingTop) vars.push(`  --cz-card-footer-padding-top: ${resolveToken(config.footer.paddingTop)};`);
  if (config.footer?.marginTop) vars.push(`  --cz-card-footer-margin-top: ${resolveToken(config.footer.marginTop)};`);
  if (config.footer?.gap) vars.push(`  --cz-card-footer-gap: ${config.footer.gap};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateCardBase(): string {
  return `.cz-card {
  border-radius: var(--cz-card-border-radius);
  border: var(--cz-card-border-width) solid var(--cz-card-border-color);
  background-color: var(--cz-card-bg);
  box-shadow: var(--cz-card-shadow);
  padding: var(--cz-card-padding);
}

.cz-card-no-padding { padding: 0; }

.cz-card-header {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding-bottom: var(--cz-card-header-padding-bottom);
  border-bottom: var(--cz-card-border-width) solid var(--cz-card-border-color);
  margin-bottom: var(--cz-card-header-margin-bottom);
}

.cz-card-title {
  font-size: var(--cz-card-title-font-size);
  font-weight: var(--cz-card-title-font-weight);
  color: var(--cz-card-title-color);
  line-height: var(--cz-font-lineHeight-tight);
}

.cz-card-description {
  font-size: var(--cz-card-description-font-size);
  color: var(--cz-card-description-color);
}

.cz-card-body { color: var(--cz-card-title-color); }

.cz-card-footer {
  display: flex;
  align-items: center;
  gap: var(--cz-card-footer-gap);
  padding-top: var(--cz-card-footer-padding-top);
  margin-top: var(--cz-card-footer-margin-top);
  border-top: var(--cz-card-border-width) solid var(--cz-card-border-color);
}
`;
}
