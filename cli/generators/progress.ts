/**
 * CZero Progress CSS Generator
 */

import type { ProgressTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateProgressCSS(config: ProgressTokens): string {
  let css = "/* ===== PROGRESS ===== */\n\n";
  css += generateProgressVariables(config);
  css += "\n";
  css += generateProgressBase();
  css += "\n";
  css += generateProgressSizes();
  css += "\n";
  css += generateProgressVariants(config);
  css += "\n";
  if (config.customCSS) css += `/* Custom Progress CSS */\n${config.customCSS}\n`;
  return css;
}

function generateProgressVariables(config: ProgressTokens): string {
  const vars: string[] = [];
  
  if (config.height) {
    for (const [size, value] of Object.entries(config.height)) {
      vars.push(`  --cz-progress-height-${size}: ${value};`);
    }
  }
  if (config.borderRadius) vars.push(`  --cz-progress-border-radius: ${resolveToken(config.borderRadius)};`);
  if (config.bg) vars.push(`  --cz-progress-bg: ${resolveToken(config.bg)};`);
  if (config.transition) vars.push(`  --cz-progress-transition: ${resolveToken(config.transition)};`);

  if (config.barColors) {
    for (const [name, value] of Object.entries(config.barColors)) {
      vars.push(`  --cz-progress-bar-${name}: ${resolveToken(value)};`);
    }
  }

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateProgressBase(): string {
  return `.cz-progress {
  position: relative;
  overflow: hidden;
  background-color: var(--cz-progress-bg);
  border-radius: var(--cz-progress-border-radius);
  width: 100%;
}

.cz-progress-bar {
  height: 100%;
  background-color: var(--cz-progress-bar-default);
  border-radius: var(--cz-progress-border-radius);
  transition: width var(--cz-progress-transition);
}

.cz-progress-indeterminate .cz-progress-bar {
  width: 50% !important;
  animation: cz-progress-indeterminate 1.5s ease-in-out infinite;
}

@keyframes cz-progress-indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(300%); }
}
`;
}

function generateProgressSizes(): string {
  return `/* Progress Sizes */
.cz-progress-sm { height: var(--cz-progress-height-sm); }
.cz-progress-md { height: var(--cz-progress-height-md); }
.cz-progress-lg { height: var(--cz-progress-height-lg); }
`;
}

function generateProgressVariants(config: ProgressTokens): string {
  let css = "/* Progress Variants */\n";
  const variants = ["default", "success", "warning", "danger"];
  
  for (const name of variants) {
    css += `.cz-progress-${name} .cz-progress-bar { background-color: var(--cz-progress-bar-${name}); }\n`;
  }
  
  return css;
}
