/**
 * CZero Dialog CSS Generator
 */

import type { DialogTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateDialogCSS(config: DialogTokens): string {
  let css = "/* ===== DIALOG ===== */\n\n";
  css += generateDialogVariables(config);
  css += "\n";
  css += generateDialogBase();
  css += "\n";
  if (config.customCSS) css += `/* Custom Dialog CSS */\n${config.customCSS}\n`;
  return css;
}

function generateDialogVariables(config: DialogTokens): string {
  const vars: string[] = [];
  
  if (config.overlayBg) vars.push(`  --cz-dialog-overlay-bg: ${resolveToken(config.overlayBg)};`);
  if (config.contentBg) vars.push(`  --cz-dialog-content-bg: ${resolveToken(config.contentBg)};`);
  if (config.contentBorderRadius) vars.push(`  --cz-dialog-content-border-radius: ${resolveToken(config.contentBorderRadius)};`);
  if (config.contentShadow) vars.push(`  --cz-dialog-content-shadow: ${resolveToken(config.contentShadow)};`);
  if (config.contentPadding) vars.push(`  --cz-dialog-content-padding: ${resolveToken(config.contentPadding)};`);
  if (config.contentMaxWidth) vars.push(`  --cz-dialog-content-max-width: ${config.contentMaxWidth};`);
  if (config.headerGap) vars.push(`  --cz-dialog-header-gap: ${config.headerGap};`);
  if (config.titleFontSize) vars.push(`  --cz-dialog-title-font-size: ${resolveToken(config.titleFontSize)};`);
  if (config.titleFontWeight) vars.push(`  --cz-dialog-title-font-weight: ${resolveToken(config.titleFontWeight)};`);
  if (config.descriptionFontSize) vars.push(`  --cz-dialog-description-font-size: ${resolveToken(config.descriptionFontSize)};`);
  if (config.footerGap) vars.push(`  --cz-dialog-footer-gap: ${config.footerGap};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateDialogBase(): string {
  return `.cz-dialog-overlay {
  position: fixed;
  inset: 0;
  background-color: var(--cz-dialog-overlay-bg);
  z-index: 50;
  animation: cz-dialog-overlay-show 150ms ease;
}

.cz-dialog-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: var(--cz-dialog-content-max-width);
  width: calc(100% - 2rem);
  max-height: 85vh;
  background-color: var(--cz-dialog-content-bg);
  border-radius: var(--cz-dialog-content-border-radius);
  box-shadow: var(--cz-dialog-content-shadow);
  padding: var(--cz-dialog-content-padding);
  z-index: 51;
  animation: cz-dialog-content-show 150ms ease;
  overflow-y: auto;
}

.cz-dialog-header {
  display: flex;
  flex-direction: column;
  gap: var(--cz-dialog-header-gap);
  margin-bottom: 1rem;
}

.cz-dialog-title {
  font-size: var(--cz-dialog-title-font-size);
  font-weight: var(--cz-dialog-title-font-weight);
  color: hsl(var(--cz-color-fg));
  line-height: var(--cz-font-lineHeight-tight);
}

.cz-dialog-description {
  font-size: var(--cz-dialog-description-font-size);
  color: hsl(var(--cz-color-mutedFg));
}

.cz-dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--cz-dialog-footer-gap);
  margin-top: 1.5rem;
}

.cz-dialog-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem;
  border-radius: var(--cz-radius-sm);
  background: transparent;
  border: none;
  cursor: pointer;
  color: hsl(var(--cz-color-mutedFg));
  transition: all var(--cz-transition-fast);
}

.cz-dialog-close:hover {
  background: hsl(var(--cz-color-muted));
  color: hsl(var(--cz-color-fg));
}

@keyframes cz-dialog-overlay-show {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes cz-dialog-content-show {
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}
`;
}
