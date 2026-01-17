/**
 * CZero Skeleton CSS Generator
 */

import type { SkeletonTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateSkeletonCSS(config: SkeletonTokens): string {
  let css = "/* ===== SKELETON ===== */\n\n";
  css += generateSkeletonVariables(config);
  css += "\n";
  css += generateSkeletonBase();
  css += "\n";
  if (config.customCSS) css += `/* Custom Skeleton CSS */\n${config.customCSS}\n`;
  return css;
}

function generateSkeletonVariables(config: SkeletonTokens): string {
  const vars: string[] = [];
  
  if (config.bg) vars.push(`  --cz-skeleton-bg: ${resolveToken(config.bg)};`);
  if (config.borderRadius) vars.push(`  --cz-skeleton-border-radius: ${resolveToken(config.borderRadius)};`);
  if (config.animationDuration) vars.push(`  --cz-skeleton-duration: ${config.animationDuration};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateSkeletonBase(): string {
  return `.cz-skeleton {
  background-color: var(--cz-skeleton-bg);
  border-radius: var(--cz-skeleton-border-radius);
  animation: cz-skeleton-pulse var(--cz-skeleton-duration) ease-in-out infinite;
}

.cz-skeleton-circle {
  border-radius: var(--cz-radius-full);
}

.cz-skeleton-text {
  height: 1rem;
  width: 100%;
}

@keyframes cz-skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
`;
}
