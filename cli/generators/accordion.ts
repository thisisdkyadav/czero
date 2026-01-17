/**
 * CZero Accordion CSS Generator
 */

import type { AccordionTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateAccordionCSS(config: AccordionTokens): string {
  let css = "/* ===== ACCORDION ===== */\n\n";
  css += generateAccordionVariables(config);
  css += "\n";
  css += generateAccordionBase();
  css += "\n";
  if (config.customCSS) css += `/* Custom Accordion CSS */\n${config.customCSS}\n`;
  return css;
}

function generateAccordionVariables(config: AccordionTokens): string {
  const vars: string[] = [];
  
  if (config.borderColor) vars.push(`  --cz-accordion-border-color: ${resolveToken(config.borderColor)};`);
  if (config.triggerPaddingX) vars.push(`  --cz-accordion-trigger-padding-x: ${config.triggerPaddingX};`);
  if (config.triggerPaddingY) vars.push(`  --cz-accordion-trigger-padding-y: ${config.triggerPaddingY};`);
  if (config.triggerFontSize) vars.push(`  --cz-accordion-trigger-font-size: ${resolveToken(config.triggerFontSize)};`);
  if (config.triggerFontWeight) vars.push(`  --cz-accordion-trigger-font-weight: ${resolveToken(config.triggerFontWeight)};`);
  if (config.triggerHoverBg) vars.push(`  --cz-accordion-trigger-hover-bg: ${resolveToken(config.triggerHoverBg)};`);
  if (config.contentPaddingX) vars.push(`  --cz-accordion-content-padding-x: ${config.contentPaddingX};`);
  if (config.contentPaddingBottom) vars.push(`  --cz-accordion-content-padding-bottom: ${config.contentPaddingBottom};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateAccordionBase(): string {
  return `.cz-accordion {
  width: 100%;
}

.cz-accordion-item {
  border-bottom: 1px solid var(--cz-accordion-border-color);
}

.cz-accordion-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--cz-accordion-trigger-padding-y) var(--cz-accordion-trigger-padding-x);
  font-size: var(--cz-accordion-trigger-font-size);
  font-weight: var(--cz-accordion-trigger-font-weight);
  color: hsl(var(--cz-color-fg));
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background-color var(--cz-transition-fast);
}

.cz-accordion-trigger:hover {
  background-color: var(--cz-accordion-trigger-hover-bg);
}

.cz-accordion-trigger-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  transition: transform var(--cz-transition-fast);
}

.cz-accordion-item[data-state="open"] .cz-accordion-trigger-icon {
  transform: rotate(180deg);
}

.cz-accordion-content {
  overflow: hidden;
  font-size: var(--cz-font-size-sm);
  color: hsl(var(--cz-color-mutedFg));
}

.cz-accordion-content[data-state="open"] {
  animation: cz-accordion-open 200ms ease-out;
}

.cz-accordion-content[data-state="closed"] {
  animation: cz-accordion-close 200ms ease-out;
}

.cz-accordion-content-inner {
  padding: 0 var(--cz-accordion-content-padding-x) var(--cz-accordion-content-padding-bottom);
}

@keyframes cz-accordion-open {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}

@keyframes cz-accordion-close {
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
}
`;
}
