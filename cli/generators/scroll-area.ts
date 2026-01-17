/**
 * CZero Scroll Area CSS Generator
 */

import type { ScrollAreaTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateScrollAreaCSS(config: ScrollAreaTokens): string {
  let css = "/* ===== SCROLL AREA ===== */\n\n";
  css += generateScrollAreaVariables(config);
  css += "\n";
  css += generateScrollAreaBase();
  css += "\n";
  if (config.customCSS) css += `/* Custom Scroll Area CSS */\n${config.customCSS}\n`;
  return css;
}

function generateScrollAreaVariables(config: ScrollAreaTokens): string {
  const vars: string[] = [];
  
  if (config.scrollbarWidth) vars.push(`  --cz-scrollbar-width: ${config.scrollbarWidth};`);
  if (config.thumbBg) vars.push(`  --cz-scrollbar-thumb-bg: ${resolveToken(config.thumbBg)};`);
  if (config.thumbBorderRadius) vars.push(`  --cz-scrollbar-thumb-border-radius: ${resolveToken(config.thumbBorderRadius)};`);
  if (config.trackBg) vars.push(`  --cz-scrollbar-track-bg: ${resolveToken(config.trackBg)};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateScrollAreaBase(): string {
  return `.cz-scroll-area {
  position: relative;
  overflow: hidden;
}

.cz-scroll-area-viewport {
  width: 100%;
  height: 100%;
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.cz-scroll-area-viewport::-webkit-scrollbar {
  display: none;
}

.cz-scrollbar {
  display: flex;
  touch-action: none;
  user-select: none;
  padding: 2px;
  transition: background-color var(--cz-transition-fast);
}

.cz-scrollbar:hover {
  background-color: var(--cz-scrollbar-track-bg);
}

.cz-scrollbar[data-orientation="vertical"] {
  width: var(--cz-scrollbar-width);
}

.cz-scrollbar[data-orientation="horizontal"] {
  flex-direction: column;
  height: var(--cz-scrollbar-width);
}

.cz-scrollbar-thumb {
  flex: 1;
  background-color: var(--cz-scrollbar-thumb-bg);
  border-radius: var(--cz-scrollbar-thumb-border-radius);
  position: relative;
}

.cz-scrollbar-thumb::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  min-width: 44px;
  min-height: 44px;
}

.cz-scroll-area-corner {
  background-color: var(--cz-scrollbar-track-bg);
}
`;
}
