/**
 * CZero Switch CSS Generator
 * Generates CSS for switch component from config tokens
 */

import type { SwitchTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateSwitchCSS(config: SwitchTokens): string {
  let css = "";

  css += "/* ===== SWITCH ===== */\n\n";
  css += generateSwitchVariables(config);
  css += "\n";
  css += generateSwitchBase();
  css += "\n";
  css += generateSwitchSizes(config);
  css += "\n";
  css += generateSwitchLabel();
  css += "\n";

  if (config.customCSS) {
    css += `/* Custom Switch CSS */\n${config.customCSS}\n`;
  }

  return css;
}

function generateSwitchVariables(config: SwitchTokens): string {
  const vars: string[] = [];

  // Size variants
  if (config.width) {
    for (const [size, value] of Object.entries(config.width)) {
      vars.push(`  --cz-switch-width-${size}: ${resolveToken(value)};`);
    }
  }
  if (config.height) {
    for (const [size, value] of Object.entries(config.height)) {
      vars.push(`  --cz-switch-height-${size}: ${resolveToken(value)};`);
    }
  }
  if (config.thumbSize) {
    for (const [size, value] of Object.entries(config.thumbSize)) {
      vars.push(`  --cz-switch-thumb-size-${size}: ${resolveToken(value)};`);
    }
  }

  // Single values
  if (config.thumbOffset) vars.push(`  --cz-switch-thumb-offset: ${config.thumbOffset};`);
  if (config.borderRadius) vars.push(`  --cz-switch-border-radius: ${resolveToken(config.borderRadius)};`);
  if (config.bgUnchecked) vars.push(`  --cz-switch-bg-unchecked: ${resolveToken(config.bgUnchecked)};`);
  if (config.bgChecked) vars.push(`  --cz-switch-bg-checked: ${resolveToken(config.bgChecked)};`);
  if (config.thumbBg) vars.push(`  --cz-switch-thumb-bg: ${resolveToken(config.thumbBg)};`);
  if (config.thumbShadow) vars.push(`  --cz-switch-thumb-shadow: ${resolveToken(config.thumbShadow)};`);
  if (config.transition) vars.push(`  --cz-switch-transition: ${resolveToken(config.transition)};`);

  // States
  if (config.states?.focus?.ringWidth) vars.push(`  --cz-switch-focus-ring-width: ${config.states.focus.ringWidth};`);
  if (config.states?.focus?.ringColor) vars.push(`  --cz-switch-focus-ring-color: ${resolveToken(config.states.focus.ringColor)};`);
  if (config.states?.disabled?.opacity) vars.push(`  --cz-switch-disabled-opacity: ${config.states.disabled.opacity};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateSwitchBase(): string {
  return `.cz-switch {
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  position: relative;
  border-radius: var(--cz-switch-border-radius);
  background-color: var(--cz-switch-bg-unchecked);
  transition: all var(--cz-switch-transition);
  cursor: pointer;
}

.cz-switch:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--cz-color-bg)), 0 0 0 4px var(--cz-switch-focus-ring-color);
}

.cz-switch[data-state="checked"],
.cz-switch.cz-switch-checked {
  background-color: var(--cz-switch-bg-checked);
}

.cz-switch.cz-disabled,
.cz-switch:disabled {
  opacity: var(--cz-switch-disabled-opacity);
  cursor: not-allowed;
}

.cz-switch-thumb {
  display: block;
  border-radius: var(--cz-switch-border-radius);
  background-color: var(--cz-switch-thumb-bg);
  box-shadow: var(--cz-switch-thumb-shadow);
  transition: transform var(--cz-switch-transition);
}
`;
}

function generateSwitchSizes(config: SwitchTokens): string {
  let css = "/* Switch Sizes */\n";

  for (const size of ["sm", "md", "lg"]) {
    css += `.cz-switch-${size} {
  width: var(--cz-switch-width-${size});
  height: var(--cz-switch-height-${size});
}
.cz-switch-${size} .cz-switch-thumb {
  width: var(--cz-switch-thumb-size-${size});
  height: var(--cz-switch-thumb-size-${size});
  transform: translateX(var(--cz-switch-thumb-offset));
}
.cz-switch-${size}[data-state="checked"] .cz-switch-thumb,
.cz-switch-${size}.cz-switch-checked .cz-switch-thumb {
  transform: translateX(calc(var(--cz-switch-width-${size}) - var(--cz-switch-thumb-size-${size}) - var(--cz-switch-thumb-offset)));
}
`;
  }

  return css;
}

function generateSwitchLabel(): string {
  return `/* Switch with Label */
.cz-switch-container {
  display: inline-flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
}
.cz-switch-container.cz-disabled {
  opacity: var(--cz-switch-disabled-opacity);
  cursor: not-allowed;
}

.cz-switch-label-left { flex-direction: row-reverse; }
.cz-switch-label-right { flex-direction: row; }

.cz-switch-text {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.cz-switch-label {
  font-size: var(--cz-font-size-sm);
  font-weight: var(--cz-font-weight-medium);
  color: hsl(var(--cz-color-fg));
  line-height: 1.5;
}

.cz-switch-description {
  font-size: var(--cz-font-size-xs);
  color: hsl(var(--cz-color-mutedFg));
}
`;
}
