/**
 * CZero Breadcrumb CSS Generator
 */

import type { BreadcrumbTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateBreadcrumbCSS(config: BreadcrumbTokens): string {
  let css = "/* ===== BREADCRUMB ===== */\n\n";
  css += generateBreadcrumbVariables(config);
  css += "\n";
  css += generateBreadcrumbBase();
  css += "\n";
  if (config.customCSS) css += `/* Custom Breadcrumb CSS */\n${config.customCSS}\n`;
  return css;
}

function generateBreadcrumbVariables(config: BreadcrumbTokens): string {
  const vars: string[] = [];
  
  if (config.gap) vars.push(`  --cz-breadcrumb-gap: ${config.gap};`);
  if (config.fontSize) vars.push(`  --cz-breadcrumb-font-size: ${resolveToken(config.fontSize)};`);
  if (config.itemColor) vars.push(`  --cz-breadcrumb-item-color: ${resolveToken(config.itemColor)};`);
  if (config.linkColor) vars.push(`  --cz-breadcrumb-link-color: ${resolveToken(config.linkColor)};`);
  if (config.activeColor) vars.push(`  --cz-breadcrumb-active-color: ${resolveToken(config.activeColor)};`);
  if (config.separatorColor) vars.push(`  --cz-breadcrumb-separator-color: ${resolveToken(config.separatorColor)};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateBreadcrumbBase(): string {
  return `.cz-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--cz-breadcrumb-gap);
  font-size: var(--cz-breadcrumb-font-size);
}

.cz-breadcrumb-item {
  display: inline-flex;
  align-items: center;
  gap: var(--cz-breadcrumb-gap);
  color: var(--cz-breadcrumb-item-color);
}

.cz-breadcrumb-link {
  color: var(--cz-breadcrumb-link-color);
  text-decoration: none;
  transition: color var(--cz-transition-fast);
}

.cz-breadcrumb-link:hover {
  color: var(--cz-breadcrumb-active-color);
  text-decoration: underline;
}

.cz-breadcrumb-page {
  color: var(--cz-breadcrumb-active-color);
  font-weight: var(--cz-font-weight-medium);
}

.cz-breadcrumb-separator {
  color: var(--cz-breadcrumb-separator-color);
}

.cz-breadcrumb-ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
}
`;
}
