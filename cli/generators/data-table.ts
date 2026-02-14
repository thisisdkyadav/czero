/**
 * CZero DataTable CSS Generator
 */

import type { DataTableTokens } from "../../src/core/types/config";
import { resolveToken } from "../token-resolver";

export function generateDataTableCSS(config: DataTableTokens): string {
  let css = "/* ===== DATA TABLE ===== */\n\n";
  css += generateDataTableVariables(config);
  css += "\n";
  css += generateDataTableBase();
  css += "\n";
  if (config.customCSS) css += `/* Custom DataTable CSS */\n${config.customCSS}\n`;
  return css;
}

function generateDataTableVariables(config: DataTableTokens): string {
  const vars: string[] = [];

  if (config.containerBg) vars.push(`  --cz-data-table-container-bg: ${resolveValue(config.containerBg)};`);
  if (config.containerBorderRadius) {
    vars.push(`  --cz-data-table-container-border-radius: ${resolveValue(config.containerBorderRadius)};`);
  }
  if (config.containerBorderColor) {
    vars.push(`  --cz-data-table-container-border-color: ${resolveValue(config.containerBorderColor)};`);
  }
  if (config.containerShadow) {
    vars.push(`  --cz-data-table-container-shadow: ${resolveValue(config.containerShadow)};`);
  }

  if (config.headerCellPadding) {
    vars.push(`  --cz-data-table-header-cell-padding: ${resolveValue(config.headerCellPadding)};`);
  }
  if (config.headerFontSize) {
    vars.push(`  --cz-data-table-header-font-size: ${resolveValue(config.headerFontSize)};`);
  }
  if (config.headerFontWeight) {
    vars.push(`  --cz-data-table-header-font-weight: ${resolveValue(config.headerFontWeight)};`);
  }
  if (config.headerColor) vars.push(`  --cz-data-table-header-color: ${resolveValue(config.headerColor)};`);
  if (config.headerTextTransform) {
    vars.push(`  --cz-data-table-header-text-transform: ${resolveValue(config.headerTextTransform)};`);
  }
  if (config.headerLetterSpacing) {
    vars.push(`  --cz-data-table-header-letter-spacing: ${resolveValue(config.headerLetterSpacing)};`);
  }

  if (config.bodyCellPadding) {
    vars.push(`  --cz-data-table-body-cell-padding: ${resolveValue(config.bodyCellPadding)};`);
  }
  if (config.bodyFontSize) {
    vars.push(`  --cz-data-table-body-font-size: ${resolveValue(config.bodyFontSize)};`);
  }
  if (config.bodyColor) vars.push(`  --cz-data-table-body-color: ${resolveValue(config.bodyColor)};`);
  if (config.rowBorderColor) {
    vars.push(`  --cz-data-table-row-border-color: ${resolveValue(config.rowBorderColor)};`);
  }
  if (config.rowHoverBg) vars.push(`  --cz-data-table-row-hover-bg: ${resolveValue(config.rowHoverBg)};`);
  if (config.stripedRowBg) {
    vars.push(`  --cz-data-table-striped-row-bg: ${resolveValue(config.stripedRowBg)};`);
  }
  if (config.selectedRowBg) {
    vars.push(`  --cz-data-table-selected-row-bg: ${resolveValue(config.selectedRowBg)};`);
  }

  if (config.sortIconOpacity) {
    vars.push(`  --cz-data-table-sort-icon-opacity: ${resolveValue(config.sortIconOpacity)};`);
  }
  if (config.sortActiveColor) {
    vars.push(`  --cz-data-table-sort-active-color: ${resolveValue(config.sortActiveColor)};`);
  }

  if (config.paginationPadding) {
    vars.push(`  --cz-data-table-pagination-padding: ${resolveValue(config.paginationPadding)};`);
  }
  if (config.paginationGap) vars.push(`  --cz-data-table-pagination-gap: ${resolveValue(config.paginationGap)};`);
  if (config.paginationBorderColor) {
    vars.push(`  --cz-data-table-pagination-border-color: ${resolveValue(config.paginationBorderColor)};`);
  }
  if (config.paginationTextColor) {
    vars.push(`  --cz-data-table-pagination-text-color: ${resolveValue(config.paginationTextColor)};`);
  }
  if (config.paginationTextStrongColor) {
    vars.push(`  --cz-data-table-pagination-text-strong-color: ${resolveValue(config.paginationTextStrongColor)};`);
  }
  if (config.paginationButtonSize) {
    vars.push(`  --cz-data-table-pagination-button-size: ${resolveValue(config.paginationButtonSize)};`);
  }
  if (config.paginationButtonRadius) {
    vars.push(`  --cz-data-table-pagination-button-radius: ${resolveValue(config.paginationButtonRadius)};`);
  }
  if (config.paginationButtonHoverBg) {
    vars.push(`  --cz-data-table-pagination-button-hover-bg: ${resolveValue(config.paginationButtonHoverBg)};`);
  }
  if (config.paginationButtonBorderColor) {
    vars.push(`  --cz-data-table-pagination-button-border-color: ${resolveValue(config.paginationButtonBorderColor)};`);
  }
  if (config.paginationButtonColor) {
    vars.push(`  --cz-data-table-pagination-button-color: ${resolveValue(config.paginationButtonColor)};`);
  }
  if (config.paginationButtonDisabledColor) {
    vars.push(`  --cz-data-table-pagination-button-disabled-color: ${resolveValue(config.paginationButtonDisabledColor)};`);
  }

  if (config.emptyStateColor) {
    vars.push(`  --cz-data-table-empty-state-color: ${resolveValue(config.emptyStateColor)};`);
  }
  if (config.emptyStateTitleColor) {
    vars.push(`  --cz-data-table-empty-state-title-color: ${resolveValue(config.emptyStateTitleColor)};`);
  }
  if (config.emptyStateIconBg) {
    vars.push(`  --cz-data-table-empty-state-icon-bg: ${resolveValue(config.emptyStateIconBg)};`);
  }
  if (config.emptyStateIconColor) {
    vars.push(`  --cz-data-table-empty-state-icon-color: ${resolveValue(config.emptyStateIconColor)};`);
  }

  if (config.loadingShimmerBase) {
    vars.push(`  --cz-data-table-loading-shimmer-base: ${resolveValue(config.loadingShimmerBase)};`);
  }
  if (config.loadingShimmerHighlight) {
    vars.push(`  --cz-data-table-loading-shimmer-highlight: ${resolveValue(config.loadingShimmerHighlight)};`);
  }

  return `:root {\n${vars.join("\n")}\n}\n`;
}

function resolveValue(value: string): string {
  if (!value.startsWith("$")) return value;
  if (/\s+\$/.test(value)) return value;
  return resolveToken(value);
}

function generateDataTableBase(): string {
  return `.cz-data-table-page-btn {
  transition: all var(--transition-fast, var(--cz-transition-fast));
}

.cz-data-table-page-btn:hover:not(:disabled) {
  background: var(--cz-data-table-pagination-button-hover-bg, transparent);
  border-color: var(--cz-data-table-pagination-button-border-color, transparent);
}

.cz-data-table-shimmer {
  background-size: 200% 100%;
  animation: cz-data-table-shimmer 1.5s infinite;
}

@keyframes cz-data-table-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
`;
}
