/**
 * CZero Badge CSS Generator
 */

import type { BadgeTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateBadgeCSS(config: BadgeTokens): string {
  let css = "/* ===== BADGE ===== */\n\n";
  css += generateBadgeVariables(config);
  css += "\n";
  css += generateBadgeBase();
  css += "\n";
  css += generateBadgeSizes();
  css += "\n";
  css += generateBadgeVariants(config);
  css += "\n";
  if (config.customCSS) css += `/* Custom Badge CSS */\n${config.customCSS}\n`;
  return css;
}

function generateBadgeVariables(config: BadgeTokens): string {
  const vars: string[] = [];
  
  if (config.paddingX) {
    for (const [size, value] of Object.entries(config.paddingX)) {
      vars.push(`  --cz-badge-padding-x-${size}: ${value};`);
    }
  }
  if (config.paddingY) {
    for (const [size, value] of Object.entries(config.paddingY)) {
      vars.push(`  --cz-badge-padding-y-${size}: ${value};`);
    }
  }
  if (config.fontSize) {
    for (const [size, value] of Object.entries(config.fontSize)) {
      vars.push(`  --cz-badge-font-size-${size}: ${resolveToken(value)};`);
    }
  }
  if (config.fontWeight) vars.push(`  --cz-badge-font-weight: ${resolveToken(config.fontWeight)};`);
  if (config.borderRadius) vars.push(`  --cz-badge-border-radius: ${resolveToken(config.borderRadius)};`);

  if (config.variants) {
    for (const [name, variant] of Object.entries(config.variants)) {
      if (variant.bg) vars.push(`  --cz-badge-${name}-bg: ${resolveToken(variant.bg)};`);
      if (variant.color) vars.push(`  --cz-badge-${name}-color: ${resolveToken(variant.color)};`);
      if (variant.borderColor) vars.push(`  --cz-badge-${name}-border-color: ${resolveToken(variant.borderColor)};`);
    }
  }

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateBadgeBase(): string {
  return `.cz-badge {
  display: inline-flex;
  align-items: center;
  border-radius: var(--cz-badge-border-radius);
  font-weight: var(--cz-badge-font-weight);
  white-space: nowrap;
  border: 1px solid transparent;
}
`;
}

function generateBadgeSizes(): string {
  return `/* Badge Sizes */
.cz-badge-sm {
  padding: var(--cz-badge-padding-y-sm) var(--cz-badge-padding-x-sm);
  font-size: var(--cz-badge-font-size-sm);
}
.cz-badge-md {
  padding: var(--cz-badge-padding-y-md) var(--cz-badge-padding-x-md);
  font-size: var(--cz-badge-font-size-md);
}
`;
}

function generateBadgeVariants(config: BadgeTokens): string {
  let css = "/* Badge Variants */\n";
  const defaultVariants = ["default", "primary", "success", "danger", "warning", "outline"];
  
  for (const name of defaultVariants) {
    css += `.cz-badge-${name} {
  background: var(--cz-badge-${name}-bg);
  color: var(--cz-badge-${name}-color);
}\n`;
  }
  
  // Custom variants from config
  if (config.variants) {
    for (const name of Object.keys(config.variants)) {
      if (!defaultVariants.includes(name)) {
        css += `.cz-badge-${name} {
  background: var(--cz-badge-${name}-bg);
  color: var(--cz-badge-${name}-color);
}\n`;
      }
    }
  }
  
  return css;
}
