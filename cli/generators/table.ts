/**
 * CZero Table CSS Generator
 */

import type { TableTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateTableCSS(config: TableTokens): string {
  let css = "/* ===== TABLE ===== */\n\n";
  css += generateTableVariables(config);
  css += "\n";
  css += generateTableBase();
  css += "\n";
  if (config.customCSS) css += `/* Custom Table CSS */\n${config.customCSS}\n`;
  return css;
}

function generateTableVariables(config: TableTokens): string {
  const vars: string[] = [];
  
  if (config.borderRadius) vars.push(`  --cz-table-border-radius: ${config.borderRadius};`);
  if (config.borderWidth) vars.push(`  --cz-table-border-width: ${config.borderWidth};`);
  if (config.borderColor) vars.push(`  --cz-table-border-color: ${resolveToken(config.borderColor)};`);
  if (config.headerBg) vars.push(`  --cz-table-header-bg: ${resolveToken(config.headerBg)};`);
  if (config.headerFontWeight) vars.push(`  --cz-table-header-font-weight: ${resolveToken(config.headerFontWeight)};`);
  if (config.cellPadding) vars.push(`  --cz-table-cell-padding: ${config.cellPadding};`);
  if (config.cellPaddingX) vars.push(`  --cz-table-cell-padding-x: ${config.cellPaddingX};`);
  if (config.cellPaddingY) vars.push(`  --cz-table-cell-padding-y: ${config.cellPaddingY};`);
  if (config.rowHoverBg) vars.push(`  --cz-table-row-hover-bg: ${resolveToken(config.rowHoverBg)};`);
  if (config.stripedBg) vars.push(`  --cz-table-striped-bg: ${resolveToken(config.stripedBg)};`);

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function generateTableBase(): string {
  return `.cz-table-wrapper {
  width: 100%;
  overflow-x: auto;
  border-radius: var(--cz-table-border-radius);
}

.cz-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--cz-font-size-sm);
}

.cz-table-header {
  background-color: var(--cz-table-header-bg);
}

.cz-table-head {
  padding: var(--cz-table-cell-padding, var(--cz-table-cell-padding-y) var(--cz-table-cell-padding-x));
  text-align: left;
  font-weight: var(--cz-table-header-font-weight);
  color: hsl(var(--cz-color-mutedFg));
  border-bottom: var(--cz-table-border-width) solid var(--cz-table-border-color);
  white-space: nowrap;
}

.cz-table-body {
  color: hsl(var(--cz-color-fg));
}

.cz-table-row {
  transition: background-color var(--cz-transition-fast);
}

.cz-table-row:hover {
  background-color: var(--cz-table-row-hover-bg);
}

.cz-table-cell {
  padding: var(--cz-table-cell-padding, var(--cz-table-cell-padding-y) var(--cz-table-cell-padding-x));
  border-bottom: var(--cz-table-border-width) solid var(--cz-table-border-color);
}

.cz-table-footer {
  background-color: var(--cz-table-header-bg);
  font-weight: var(--cz-font-weight-medium);
}

.cz-table-footer .cz-table-cell {
  border-bottom: none;
  border-top: var(--cz-table-border-width) solid var(--cz-table-border-color);
}

/* Table Striped */
.cz-table-striped .cz-table-row:nth-child(even) {
  background-color: var(--cz-table-striped-bg);
}

/* Table Caption */
.cz-table-caption {
  margin-top: 0.5rem;
  font-size: var(--cz-font-size-sm);
  color: hsl(var(--cz-color-mutedFg));
  text-align: center;
}
`;
}
