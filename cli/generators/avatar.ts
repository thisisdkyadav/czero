/**
 * CZero Avatar CSS Generator
 */

import type { AvatarTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateAvatarCSS(config: AvatarTokens): string {
  let css = "/* ===== AVATAR ===== */\n\n";
  css += generateAvatarVariables(config);
  css += "\n";
  css += generateAvatarBase();
  css += "\n";
  css += generateAvatarSizes();
  css += "\n";
  if (config.customCSS) css += `/* Custom Avatar CSS */\n${config.customCSS}\n`;
  return css;
}

function generateAvatarVariables(config: AvatarTokens): string {
  const vars: string[] = [];
  
  if (config.size) {
    for (const [size, value] of Object.entries(config.size)) {
      vars.push(`  --cz-avatar-size-${size}: ${value};`);
    }
  }
  if (config.borderRadius) vars.push(`  --cz-avatar-border-radius: ${resolveToken(config.borderRadius)};`);
  if (config.fallbackBg) vars.push(`  --cz-avatar-fallback-bg: ${resolveToken(config.fallbackBg)};`);
  if (config.fallbackColor) vars.push(`  --cz-avatar-fallback-color: ${resolveToken(config.fallbackColor)};`);
  if (config.fallbackFontWeight) vars.push(`  --cz-avatar-fallback-font-weight: ${resolveToken(config.fallbackFontWeight)};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateAvatarBase(): string {
  return `.cz-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: var(--cz-avatar-border-radius);
  background-color: var(--cz-avatar-fallback-bg);
  flex-shrink: 0;
}

.cz-avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cz-avatar-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-weight: var(--cz-avatar-fallback-font-weight);
  color: var(--cz-avatar-fallback-color);
  text-transform: uppercase;
}
`;
}

function generateAvatarSizes(): string {
  return `/* Avatar Sizes */
.cz-avatar-sm {
  width: var(--cz-avatar-size-sm);
  height: var(--cz-avatar-size-sm);
  font-size: calc(var(--cz-avatar-size-sm) * 0.4);
}
.cz-avatar-md {
  width: var(--cz-avatar-size-md);
  height: var(--cz-avatar-size-md);
  font-size: calc(var(--cz-avatar-size-md) * 0.4);
}
.cz-avatar-lg {
  width: var(--cz-avatar-size-lg);
  height: var(--cz-avatar-size-lg);
  font-size: calc(var(--cz-avatar-size-lg) * 0.4);
}
.cz-avatar-xl {
  width: var(--cz-avatar-size-xl);
  height: var(--cz-avatar-size-xl);
  font-size: calc(var(--cz-avatar-size-xl) * 0.4);
}

/* Avatar Group */
.cz-avatar-group {
  display: flex;
}

.cz-avatar-group .cz-avatar {
  border: 2px solid hsl(var(--cz-color-bg));
  margin-left: -0.5rem;
}

.cz-avatar-group .cz-avatar:first-child {
  margin-left: 0;
}
`;
}
