/**
 * CZero StatusBadge CSS Generator
 */

import type { StatusBadgeTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateStatusBadgeCSS(config: StatusBadgeTokens): string {
  let css = "/* ===== STATUS BADGE ===== */\n\n";
  css += generateStatusBadgeVariables(config);
  css += "\n";
  if (config.customCSS) css += `/* Custom StatusBadge CSS */\n${config.customCSS}\n`;
  return css;
}

function generateStatusBadgeVariables(config: StatusBadgeTokens): string {
  const vars: string[] = [];

  if (config.paddingX) vars.push(`  --cz-status-badge-padding-x: ${resolveValue(config.paddingX)};`);
  if (config.paddingY) vars.push(`  --cz-status-badge-padding-y: ${resolveValue(config.paddingY)};`);
  if (config.fontSize) vars.push(`  --cz-status-badge-font-size: ${resolveValue(config.fontSize)};`);
  if (config.fontWeight) vars.push(`  --cz-status-badge-font-weight: ${resolveValue(config.fontWeight)};`);
  if (config.lineHeight) vars.push(`  --cz-status-badge-line-height: ${resolveValue(config.lineHeight)};`);
  if (config.borderRadius) {
    vars.push(`  --cz-status-badge-border-radius: ${resolveValue(config.borderRadius)};`);
  }

  if (config.dotSize) vars.push(`  --cz-status-badge-dot-size: ${resolveValue(config.dotSize)};`);
  if (config.dotGap) vars.push(`  --cz-status-badge-dot-gap: ${resolveValue(config.dotGap)};`);

  if (config.successBg) vars.push(`  --cz-status-badge-success-bg: ${resolveValue(config.successBg)};`);
  if (config.successText) {
    vars.push(`  --cz-status-badge-success-text: ${resolveValue(config.successText)};`);
  }
  if (config.successDot) vars.push(`  --cz-status-badge-success-dot: ${resolveValue(config.successDot)};`);

  if (config.dangerBg) vars.push(`  --cz-status-badge-danger-bg: ${resolveValue(config.dangerBg)};`);
  if (config.dangerText) vars.push(`  --cz-status-badge-danger-text: ${resolveValue(config.dangerText)};`);
  if (config.dangerDot) vars.push(`  --cz-status-badge-danger-dot: ${resolveValue(config.dangerDot)};`);

  if (config.warningBg) {
    vars.push(`  --cz-status-badge-warning-bg: ${resolveValue(config.warningBg)};`);
  }
  if (config.warningText) {
    vars.push(`  --cz-status-badge-warning-text: ${resolveValue(config.warningText)};`);
  }
  if (config.warningDot) {
    vars.push(`  --cz-status-badge-warning-dot: ${resolveValue(config.warningDot)};`);
  }

  if (config.primaryBg) {
    vars.push(`  --cz-status-badge-primary-bg: ${resolveValue(config.primaryBg)};`);
  }
  if (config.primaryText) {
    vars.push(`  --cz-status-badge-primary-text: ${resolveValue(config.primaryText)};`);
  }
  if (config.primaryDot) {
    vars.push(`  --cz-status-badge-primary-dot: ${resolveValue(config.primaryDot)};`);
  }

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function resolveValue(value: string): string {
  if (!value.startsWith("$")) return value;
  if (/\s+\$/.test(value)) return value;
  return resolveToken(value);
}
