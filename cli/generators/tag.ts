/**
 * CZero Tag CSS Generator
 */

import type { TagTokens, VariantConfig } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateTagCSS(config: TagTokens): string {
  let css = "/* ===== TAG ===== */\n\n";
  css += generateTagVariables(config);
  css += "\n";
  css += generateTagBase();
  css += "\n";
  if (config.customCSS) css += `/* Custom Tag CSS */\n${config.customCSS}\n`;
  return css;
}

function generateTagVariables(config: TagTokens): string {
  const vars: string[] = [];
  
  if (config.paddingX) vars.push(`  --cz-tag-padding-x: ${config.paddingX};`);
  if (config.paddingY) vars.push(`  --cz-tag-padding-y: ${config.paddingY};`);
  if (config.fontSize) vars.push(`  --cz-tag-font-size: ${resolveToken(config.fontSize)};`);
  if (config.fontWeight) vars.push(`  --cz-tag-font-weight: ${resolveToken(config.fontWeight)};`);
  if (config.borderRadius) vars.push(`  --cz-tag-border-radius: ${resolveToken(config.borderRadius)};`);
  if (config.gap) vars.push(`  --cz-tag-gap: ${config.gap};`);

  if (config.variants) {
    for (const [name, variant] of Object.entries(config.variants)) {
      if (variant.bg) vars.push(`  --cz-tag-${name}-bg: ${resolveToken(variant.bg)};`);
      if (variant.color) vars.push(`  --cz-tag-${name}-color: ${resolveToken(variant.color)};`);
    }
  }

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateTagBase(): string {
  return `.cz-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--cz-tag-gap);
  padding: var(--cz-tag-padding-y) var(--cz-tag-padding-x);
  border-radius: var(--cz-tag-border-radius);
  font-size: var(--cz-tag-font-size);
  font-weight: var(--cz-tag-font-weight);
  white-space: nowrap;
}

.cz-tag-icon {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
}

.cz-tag-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  margin-left: 0.25rem;
  margin-right: -0.25rem;
  border-radius: var(--cz-radius-sm);
  cursor: pointer;
  opacity: 0.7;
  transition: opacity var(--cz-transition-fast);
}

.cz-tag-close:hover {
  opacity: 1;
}

/* Tag Variants */
.cz-tag-default {
  background: var(--cz-tag-default-bg);
  color: var(--cz-tag-default-color);
}
.cz-tag-primary {
  background: var(--cz-tag-primary-bg);
  color: var(--cz-tag-primary-color);
}
.cz-tag-success {
  background: var(--cz-tag-success-bg);
  color: var(--cz-tag-success-color);
}
.cz-tag-warning {
  background: var(--cz-tag-warning-bg);
  color: var(--cz-tag-warning-color);
}
.cz-tag-danger {
  background: var(--cz-tag-danger-bg);
  color: var(--cz-tag-danger-color);
}

/* Tag Group */
.cz-tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
`;
}
