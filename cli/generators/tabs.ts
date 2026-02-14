/**
 * CZero Tabs CSS Generator
 */

import type { TabsTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateTabsCSS(config: TabsTokens): string {
  let css = "/* ===== TABS ===== */\n\n";
  css += generateTabsVariables(config);
  css += "\n";
  css += generateTabsBase();
  css += "\n";
  if (config.customCSS) css += `/* Custom Tabs CSS */\n${config.customCSS}\n`;
  return css;
}

function generateTabsVariables(config: TabsTokens): string {
  const vars: string[] = [];

  if (config.listBorderWidth) vars.push(`  --cz-tabs-list-border-width: ${config.listBorderWidth};`);
  if (config.listBorderColor) vars.push(`  --cz-tabs-list-border-color: ${resolveToken(config.listBorderColor)};`);
  if (config.listGap) vars.push(`  --cz-tabs-list-gap: ${resolveToken(config.listGap)};`);

  if (config.triggerPaddingX) vars.push(`  --cz-tabs-trigger-padding-x: ${resolveToken(config.triggerPaddingX)};`);
  if (config.triggerPaddingY) vars.push(`  --cz-tabs-trigger-padding-y: ${resolveToken(config.triggerPaddingY)};`);
  if (config.triggerPaddingXSm) vars.push(`  --cz-tabs-trigger-padding-x-sm: ${resolveToken(config.triggerPaddingXSm)};`);
  if (config.triggerPaddingYSm) vars.push(`  --cz-tabs-trigger-padding-y-sm: ${resolveToken(config.triggerPaddingYSm)};`);
  if (config.triggerPaddingXLg) vars.push(`  --cz-tabs-trigger-padding-x-lg: ${resolveToken(config.triggerPaddingXLg)};`);
  if (config.triggerPaddingYLg) vars.push(`  --cz-tabs-trigger-padding-y-lg: ${resolveToken(config.triggerPaddingYLg)};`);

  if (config.triggerFontSize) vars.push(`  --cz-tabs-trigger-font-size: ${resolveToken(config.triggerFontSize)};`);
  if (config.triggerFontSizeSm) vars.push(`  --cz-tabs-trigger-font-size-sm: ${resolveToken(config.triggerFontSizeSm)};`);
  if (config.triggerFontSizeLg) vars.push(`  --cz-tabs-trigger-font-size-lg: ${resolveToken(config.triggerFontSizeLg)};`);
  if (config.triggerFontWeight) vars.push(`  --cz-tabs-trigger-font-weight: ${resolveToken(config.triggerFontWeight)};`);

  if (config.triggerColor) vars.push(`  --cz-tabs-trigger-color: ${resolveToken(config.triggerColor)};`);
  if (config.triggerActiveColor) vars.push(`  --cz-tabs-trigger-active-color: ${resolveToken(config.triggerActiveColor)};`);
  if (config.triggerActiveBorderColor) vars.push(`  --cz-tabs-trigger-active-border-color: ${resolveToken(config.triggerActiveBorderColor)};`);

  if (config.triggerGap) vars.push(`  --cz-tabs-trigger-gap: ${resolveToken(config.triggerGap)};`);
  if (config.triggerRadius) vars.push(`  --cz-tabs-trigger-radius: ${resolveToken(config.triggerRadius)};`);
  if (config.triggerBorderWidth) vars.push(`  --cz-tabs-trigger-border-width: ${config.triggerBorderWidth};`);
  if (config.triggerTransition) vars.push(`  --cz-tabs-trigger-transition: ${resolveToken(config.triggerTransition)};`);

  if (config.iconSize) vars.push(`  --cz-tabs-icon-size: ${resolveToken(config.iconSize)};`);
  if (config.countPaddingX) vars.push(`  --cz-tabs-count-padding-x: ${resolveToken(config.countPaddingX)};`);
  if (config.countMinWidth) vars.push(`  --cz-tabs-count-min-width: ${resolveToken(config.countMinWidth)};`);
  if (config.countHeight) vars.push(`  --cz-tabs-count-height: ${resolveToken(config.countHeight)};`);
  if (config.countFontSize) vars.push(`  --cz-tabs-count-font-size: ${resolveToken(config.countFontSize)};`);
  if (config.countFontWeight) vars.push(`  --cz-tabs-count-font-weight: ${resolveToken(config.countFontWeight)};`);
  if (config.countRadius) vars.push(`  --cz-tabs-count-radius: ${resolveToken(config.countRadius)};`);
  if (config.countBg) vars.push(`  --cz-tabs-count-bg: ${resolveToken(config.countBg)};`);
  if (config.countColor) vars.push(`  --cz-tabs-count-color: ${resolveToken(config.countColor)};`);
  if (config.countActiveBg) vars.push(`  --cz-tabs-count-active-bg: ${resolveToken(config.countActiveBg)};`);
  if (config.countActiveColor) vars.push(`  --cz-tabs-count-active-color: ${resolveToken(config.countActiveColor)};`);

  if (config.pillsListGap) vars.push(`  --cz-tabs-pills-list-gap: ${resolveToken(config.pillsListGap)};`);
  if (config.pillsTriggerBg) vars.push(`  --cz-tabs-pills-trigger-bg: ${resolveToken(config.pillsTriggerBg)};`);
  if (config.pillsTriggerColor) vars.push(`  --cz-tabs-pills-trigger-color: ${resolveToken(config.pillsTriggerColor)};`);
  if (config.pillsTriggerBorderColor) vars.push(`  --cz-tabs-pills-trigger-border-color: ${resolveToken(config.pillsTriggerBorderColor)};`);
  if (config.pillsTriggerHoverBg) vars.push(`  --cz-tabs-pills-trigger-hover-bg: ${resolveToken(config.pillsTriggerHoverBg)};`);
  if (config.pillsTriggerHoverColor) vars.push(`  --cz-tabs-pills-trigger-hover-color: ${resolveToken(config.pillsTriggerHoverColor)};`);
  if (config.pillsTriggerActiveBg) vars.push(`  --cz-tabs-pills-trigger-active-bg: ${resolveToken(config.pillsTriggerActiveBg)};`);
  if (config.pillsTriggerActiveColor) vars.push(`  --cz-tabs-pills-trigger-active-color: ${resolveToken(config.pillsTriggerActiveColor)};`);
  if (config.pillsTriggerActiveBorderColor) vars.push(`  --cz-tabs-pills-trigger-active-border-color: ${resolveToken(config.pillsTriggerActiveBorderColor)};`);
  if (config.pillsTriggerRadius) vars.push(`  --cz-tabs-pills-trigger-radius: ${resolveToken(config.pillsTriggerRadius)};`);

  if (config.enclosedListBg) vars.push(`  --cz-tabs-enclosed-list-bg: ${resolveToken(config.enclosedListBg)};`);
  if (config.enclosedListPadding) vars.push(`  --cz-tabs-enclosed-list-padding: ${resolveToken(config.enclosedListPadding)};`);
  if (config.enclosedListRadius) vars.push(`  --cz-tabs-enclosed-list-radius: ${resolveToken(config.enclosedListRadius)};`);
  if (config.enclosedTriggerColor) vars.push(`  --cz-tabs-enclosed-trigger-color: ${resolveToken(config.enclosedTriggerColor)};`);
  if (config.enclosedTriggerActiveBg) vars.push(`  --cz-tabs-enclosed-trigger-active-bg: ${resolveToken(config.enclosedTriggerActiveBg)};`);
  if (config.enclosedTriggerActiveColor) vars.push(`  --cz-tabs-enclosed-trigger-active-color: ${resolveToken(config.enclosedTriggerActiveColor)};`);
  if (config.enclosedTriggerRadius) vars.push(`  --cz-tabs-enclosed-trigger-radius: ${resolveToken(config.enclosedTriggerRadius)};`);
  if (config.enclosedTriggerActiveShadow) vars.push(`  --cz-tabs-enclosed-trigger-active-shadow: ${resolveToken(config.enclosedTriggerActiveShadow)};`);

  if (config.contentPadding) vars.push(`  --cz-tabs-content-padding: ${resolveToken(config.contentPadding)};`);

  if (config.states?.hover?.color) vars.push(`  --cz-tabs-trigger-hover-color: ${resolveToken(config.states.hover.color)};`);
  if (config.states?.focus?.ringWidth) vars.push(`  --cz-tabs-trigger-focus-ring-width: ${config.states.focus.ringWidth};`);
  if (config.states?.focus?.ringColor) vars.push(`  --cz-tabs-trigger-focus-ring-color: ${resolveToken(config.states.focus.ringColor)};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateTabsBase(): string {
  return `.cz-tabs {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.cz-tabs-list {
  display: flex;
  align-items: center;
  border-bottom: var(--cz-tabs-list-border-width) solid var(--cz-tabs-list-border-color);
  gap: var(--cz-tabs-list-gap);
  padding-bottom: 0;
}

.cz-tabs--full-width .cz-tabs-list {
  width: 100%;
}

.cz-tabs--full-width .cz-tabs-trigger {
  flex: 1;
}

.cz-tabs--no-border .cz-tabs-list {
  border-bottom: none;
}

.cz-tabs-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--cz-tabs-trigger-gap);
  padding: var(--cz-tabs-trigger-padding-y) var(--cz-tabs-trigger-padding-x);
  font-size: var(--cz-tabs-trigger-font-size);
  font-weight: var(--cz-tabs-trigger-font-weight);
  color: var(--cz-tabs-trigger-color);
  background: transparent;
  border: none;
  border-bottom: var(--cz-tabs-trigger-border-width) solid transparent;
  margin-bottom: calc(var(--cz-tabs-list-border-width) * -1);
  border-radius: var(--cz-tabs-trigger-radius);
  cursor: pointer;
  transition: all var(--cz-tabs-trigger-transition);
  white-space: nowrap;
}

.cz-tabs-trigger:hover {
  color: var(--cz-tabs-trigger-hover-color);
}

.cz-tabs-trigger:focus-visible {
  outline: none;
  box-shadow: 0 0 0 var(--cz-tabs-trigger-focus-ring-width) var(--cz-tabs-trigger-focus-ring-color);
}

.cz-tabs-trigger[data-state="active"],
.cz-tabs-trigger.cz-tabs-trigger-active {
  color: var(--cz-tabs-trigger-active-color);
  border-bottom-color: var(--cz-tabs-trigger-active-border-color);
}

.cz-tabs-trigger:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cz-tabs-trigger-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: var(--cz-tabs-icon-size);
  line-height: 1;
}

.cz-tabs-trigger-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--cz-tabs-count-padding-x);
  min-width: var(--cz-tabs-count-min-width);
  height: var(--cz-tabs-count-height);
  border-radius: var(--cz-tabs-count-radius);
  font-size: var(--cz-tabs-count-font-size);
  font-weight: var(--cz-tabs-count-font-weight);
  background: var(--cz-tabs-count-bg);
  color: var(--cz-tabs-count-color);
}

.cz-tabs-trigger[data-state="active"] .cz-tabs-trigger-count,
.cz-tabs-trigger.cz-tabs-trigger-active .cz-tabs-trigger-count {
  background: var(--cz-tabs-count-active-bg);
  color: var(--cz-tabs-count-active-color);
}

.cz-tabs--size-sm .cz-tabs-trigger {
  padding: var(--cz-tabs-trigger-padding-y-sm) var(--cz-tabs-trigger-padding-x-sm);
  font-size: var(--cz-tabs-trigger-font-size-sm);
}

.cz-tabs--size-md .cz-tabs-trigger {
  padding: var(--cz-tabs-trigger-padding-y) var(--cz-tabs-trigger-padding-x);
  font-size: var(--cz-tabs-trigger-font-size);
}

.cz-tabs--size-lg .cz-tabs-trigger {
  padding: var(--cz-tabs-trigger-padding-y-lg) var(--cz-tabs-trigger-padding-x-lg);
  font-size: var(--cz-tabs-trigger-font-size-lg);
}

.cz-tabs--variant-underline .cz-tabs-list {
  background: transparent;
}

.cz-tabs--variant-pills .cz-tabs-list {
  border-bottom: none;
  gap: var(--cz-tabs-pills-list-gap);
}

.cz-tabs--variant-pills .cz-tabs-trigger {
  color: var(--cz-tabs-pills-trigger-color);
  background: var(--cz-tabs-pills-trigger-bg);
  border: 1px solid var(--cz-tabs-pills-trigger-border-color);
  margin-bottom: 0;
  border-radius: var(--cz-tabs-pills-trigger-radius);
}

.cz-tabs--variant-pills .cz-tabs-trigger:hover {
  background: var(--cz-tabs-pills-trigger-hover-bg);
  color: var(--cz-tabs-pills-trigger-hover-color);
}

.cz-tabs--variant-pills .cz-tabs-trigger[data-state="active"],
.cz-tabs--variant-pills .cz-tabs-trigger.cz-tabs-trigger-active {
  background: var(--cz-tabs-pills-trigger-active-bg);
  color: var(--cz-tabs-pills-trigger-active-color);
  border-color: var(--cz-tabs-pills-trigger-active-border-color);
}

.cz-tabs--variant-pills .cz-tabs-trigger[data-state="active"] .cz-tabs-trigger-count,
.cz-tabs--variant-pills .cz-tabs-trigger.cz-tabs-trigger-active .cz-tabs-trigger-count {
  background: var(--cz-tabs-count-active-bg);
  color: var(--cz-tabs-count-active-color);
}

.cz-tabs--variant-enclosed .cz-tabs-list {
  border-bottom: none;
  background: var(--cz-tabs-enclosed-list-bg);
  padding: var(--cz-tabs-enclosed-list-padding);
  border-radius: var(--cz-tabs-enclosed-list-radius);
  gap: var(--cz-tabs-list-gap);
}

.cz-tabs--variant-enclosed .cz-tabs-trigger {
  color: var(--cz-tabs-enclosed-trigger-color);
  margin-bottom: 0;
  border: none;
  border-radius: var(--cz-tabs-enclosed-trigger-radius);
}

.cz-tabs--variant-enclosed .cz-tabs-trigger[data-state="active"],
.cz-tabs--variant-enclosed .cz-tabs-trigger.cz-tabs-trigger-active {
  color: var(--cz-tabs-enclosed-trigger-active-color);
  background: var(--cz-tabs-enclosed-trigger-active-bg);
  border-bottom-color: transparent;
  box-shadow: var(--cz-tabs-enclosed-trigger-active-shadow);
}

.cz-tabs-content {
  padding: var(--cz-tabs-content-padding);
}

.cz-tabs-content[data-state="inactive"] {
  display: none;
}
`;
}
