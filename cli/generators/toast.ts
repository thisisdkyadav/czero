/**
 * CZero Toast CSS Generator
 */

import type { ToastTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateToastCSS(config: ToastTokens): string {
  let css = "/* ===== TOAST ===== */\n\n";
  css += generateToastVariables(config);
  css += "\n";
  css += generateToastBase();
  css += "\n";
  if (config.customCSS) css += `/* Custom Toast CSS */\n${config.customCSS}\n`;
  return css;
}

function generateToastVariables(config: ToastTokens): string {
  const vars: string[] = [];
  
  if (config.bg) vars.push(`  --cz-toast-bg: ${resolveToken(config.bg)};`);
  if (config.borderRadius) vars.push(`  --cz-toast-border-radius: ${resolveToken(config.borderRadius)};`);
  if (config.borderColor) vars.push(`  --cz-toast-border-color: ${resolveToken(config.borderColor)};`);
  if (config.shadow) vars.push(`  --cz-toast-shadow: ${resolveToken(config.shadow)};`);
  if (config.padding) vars.push(`  --cz-toast-padding: ${resolveToken(config.padding)};`);
  if (config.gap) vars.push(`  --cz-toast-gap: ${config.gap};`);
  if (config.titleFontSize) vars.push(`  --cz-toast-title-font-size: ${resolveToken(config.titleFontSize)};`);
  if (config.titleFontWeight) vars.push(`  --cz-toast-title-font-weight: ${resolveToken(config.titleFontWeight)};`);
  if (config.descriptionFontSize) vars.push(`  --cz-toast-description-font-size: ${resolveToken(config.descriptionFontSize)};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateToastBase(): string {
  return `.cz-toast-viewport {
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  max-width: 420px;
  width: 100%;
  z-index: 100;
  pointer-events: none;
}

.cz-toast {
  display: flex;
  gap: var(--cz-toast-gap);
  padding: var(--cz-toast-padding);
  background-color: var(--cz-toast-bg);
  border-radius: var(--cz-toast-border-radius);
  border: 1px solid var(--cz-toast-border-color);
  box-shadow: var(--cz-toast-shadow);
  pointer-events: auto;
  animation: cz-toast-slide-in 300ms ease;
}

.cz-toast[data-state="closed"] {
  animation: cz-toast-slide-out 200ms ease forwards;
}

.cz-toast-icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
}

.cz-toast-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 0;
}

.cz-toast-title {
  font-size: var(--cz-toast-title-font-size);
  font-weight: var(--cz-toast-title-font-weight);
  color: hsl(var(--cz-color-fg));
}

.cz-toast-description {
  font-size: var(--cz-toast-description-font-size);
  color: hsl(var(--cz-color-mutedFg));
}

.cz-toast-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem;
  border-radius: var(--cz-radius-sm);
  background: transparent;
  border: none;
  cursor: pointer;
  color: hsl(var(--cz-color-mutedFg));
  opacity: 0.5;
  transition: opacity var(--cz-transition-fast);
}

.cz-toast-close:hover {
  opacity: 1;
}

.cz-toast-action {
  margin-top: 0.5rem;
}

/* Toast Variants */
.cz-toast-success .cz-toast-icon { color: hsl(var(--cz-color-success)); }
.cz-toast-warning .cz-toast-icon { color: hsl(var(--cz-color-warning)); }
.cz-toast-danger .cz-toast-icon { color: hsl(var(--cz-color-danger)); }

@keyframes cz-toast-slide-in {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes cz-toast-slide-out {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
}
`;
}
