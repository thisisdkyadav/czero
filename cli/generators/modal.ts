/**
 * CZero Modal CSS Generator
 */

import type { ModalTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateModalCSS(config: ModalTokens): string {
  let css = "/* ===== MODAL ===== */\n\n";
  css += generateModalVariables(config);
  css += "\n";
  css += generateModalBase();
  css += "\n";
  if (config.customCSS) css += `/* Custom Modal CSS */\n${config.customCSS}\n`;
  return css;
}

function generateModalVariables(config: ModalTokens): string {
  const vars: string[] = [];

  if (config.overlayBg) vars.push(`  --cz-modal-overlay-bg: ${resolveValue(config.overlayBg)};`);
  if (config.contentBg) vars.push(`  --cz-modal-content-bg: ${resolveValue(config.contentBg)};`);
  if (config.contentBorderRadius) {
    vars.push(`  --cz-modal-content-border-radius: ${resolveValue(config.contentBorderRadius)};`);
  }
  if (config.contentBorderColor) {
    vars.push(`  --cz-modal-content-border-color: ${resolveValue(config.contentBorderColor)};`);
  }
  if (config.contentShadow) vars.push(`  --cz-modal-content-shadow: ${resolveValue(config.contentShadow)};`);

  if (config.headerPadding) vars.push(`  --cz-modal-header-padding: ${resolveValue(config.headerPadding)};`);
  if (config.bodyPadding) vars.push(`  --cz-modal-body-padding: ${resolveValue(config.bodyPadding)};`);
  if (config.footerPadding) vars.push(`  --cz-modal-footer-padding: ${resolveValue(config.footerPadding)};`);
  if (config.footerGap) vars.push(`  --cz-modal-footer-gap: ${resolveValue(config.footerGap)};`);

  if (config.closeIconSize) vars.push(`  --cz-modal-close-icon-size: ${resolveValue(config.closeIconSize)};`);
  if (config.closeIconPadding) {
    vars.push(`  --cz-modal-close-icon-padding: ${resolveValue(config.closeIconPadding)};`);
  }
  if (config.closeIconRadius) vars.push(`  --cz-modal-close-icon-radius: ${resolveValue(config.closeIconRadius)};`);
  if (config.closeIconBg) vars.push(`  --cz-modal-close-icon-bg: ${resolveValue(config.closeIconBg)};`);
  if (config.closeIconColor) {
    vars.push(`  --cz-modal-close-icon-color: ${resolveValue(config.closeIconColor)};`);
  }
  if (config.closeIconHoverBg) {
    vars.push(`  --cz-modal-close-icon-hover-bg: ${resolveValue(config.closeIconHoverBg)};`);
  }
  if (config.closeIconHoverColor) {
    vars.push(`  --cz-modal-close-icon-hover-color: ${resolveValue(config.closeIconHoverColor)};`);
  }
  if (config.closeIconTransition) {
    vars.push(`  --cz-modal-close-icon-transition: ${resolveValue(config.closeIconTransition)};`);
  }
  if (config.closeIconFocusRing) {
    vars.push(`  --cz-modal-close-icon-focus-ring: ${resolveValue(config.closeIconFocusRing)};`);
  }

  if (config.tabFontSize) vars.push(`  --cz-modal-tab-font-size: ${resolveValue(config.tabFontSize)};`);
  if (config.tabFontWeight) {
    vars.push(`  --cz-modal-tab-font-weight: ${resolveValue(config.tabFontWeight)};`);
  }
  if (config.tabColor) vars.push(`  --cz-modal-tab-color: ${resolveValue(config.tabColor)};`);
  if (config.tabActiveColor) {
    vars.push(`  --cz-modal-tab-active-color: ${resolveValue(config.tabActiveColor)};`);
  }
  if (config.tabActiveBorderColor) {
    vars.push(`  --cz-modal-tab-active-border-color: ${resolveValue(config.tabActiveBorderColor)};`);
  }

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function resolveValue(value: string): string {
  if (!value.startsWith("$")) return value;
  if (/\s+\$/.test(value)) return value;
  return resolveToken(value);
}

function generateModalBase(): string {
  return `.cz-modal-close-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--cz-modal-close-icon-size, 2rem);
  height: var(--cz-modal-close-icon-size, 2rem);
  padding: var(--cz-modal-close-icon-padding, 0.5rem);
  flex-shrink: 0;
  border: 0;
  border-radius: var(--cz-modal-close-icon-radius, var(--cz-radius-md));
  background: var(--cz-modal-close-icon-bg, transparent);
  color: var(--cz-modal-close-icon-color, hsl(var(--cz-color-mutedFg)));
  cursor: pointer;
  transition: all var(--cz-modal-close-icon-transition, var(--cz-transition-fast));
}

.cz-modal-close-icon:hover {
  background: var(--cz-modal-close-icon-hover-bg, hsl(var(--cz-color-muted)));
  color: var(--cz-modal-close-icon-hover-color, hsl(var(--cz-color-primary)));
}

.cz-modal-close-icon:focus,
.cz-modal-close-icon:focus-visible {
  outline: none;
  box-shadow: var(--cz-modal-close-icon-focus-ring, none);
}

.cz-modal-close-btn {
  flex-shrink: 0;
}

.cz-modal-tab-btn:focus,
.cz-modal-tab-btn:focus-visible {
  outline: none;
  box-shadow: none;
}

@supports not (gap: 0.75rem) {
  .cz-modal-footer > * + * {
    margin-left: var(--cz-modal-footer-gap, var(--cz-spacing-md, 0.75rem));
  }
}
`;
}
