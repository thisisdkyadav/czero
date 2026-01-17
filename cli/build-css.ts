/**
 * CZero CSS Builder
 * Builds complete CSS from config using component generators
 */

import type { CZeroConfig, ComponentsConfig } from "../src/core/types/config";
import { componentDefaults } from "../src/core/component-defaults";
import { deepMerge } from "./utils/deep-merge";
import {
  generateButtonCSS,
  generateInputCSS,
  generateCardCSS,
  generateSwitchCSS,
  generateCheckboxCSS,
  generateTextareaCSS,
  generateSelectCSS,
  generateRadioCSS,
  generateLabelCSS,
  generateBadgeCSS,
  generateAvatarCSS,
  generateTableCSS,
  generateCodeCSS,
  generateKbdCSS,
  generateTagCSS,
  generateAlertCSS,
  generateToastCSS,
  generateTooltipCSS,
  generateProgressCSS,
  generateSpinnerCSS,
  generateSkeletonCSS,
  generateTabsCSS,
  generateBreadcrumbCSS,
  generateAccordionCSS,
  generateDialogCSS,
  generateDropdownMenuCSS,
  generateSeparatorCSS,
  generateScrollAreaCSS,
} from "./generators";

/**
 * Build complete component CSS from config
 * Merges user config with defaults and generates CSS for each component
 */
export function buildComponentsCSS(config: CZeroConfig): string {
  // Merge user component config with defaults
  const components = deepMerge(componentDefaults, config.components || {});

  let css = "";

  // Add before custom CSS
  if (config.customCSS?.before) {
    css += `/* Custom CSS (before) */\n${config.customCSS.before}\n\n`;
  }

  // Generate CSS for all components
  if (components.button) { css += generateButtonCSS(components.button) + "\n"; }
  if (components.input) { css += generateInputCSS(components.input) + "\n"; }
  if (components.card) { css += generateCardCSS(components.card) + "\n"; }
  if (components.switch) { css += generateSwitchCSS(components.switch) + "\n"; }
  if (components.checkbox) { css += generateCheckboxCSS(components.checkbox) + "\n"; }
  if (components.textarea) { css += generateTextareaCSS(components.textarea) + "\n"; }
  if (components.select) { css += generateSelectCSS(components.select) + "\n"; }
  if (components.radio) { css += generateRadioCSS(components.radio) + "\n"; }
  if (components.label) { css += generateLabelCSS(components.label) + "\n"; }
  if (components.badge) { css += generateBadgeCSS(components.badge) + "\n"; }
  if (components.avatar) { css += generateAvatarCSS(components.avatar) + "\n"; }
  if (components.table) { css += generateTableCSS(components.table) + "\n"; }
  if (components.code) { css += generateCodeCSS(components.code) + "\n"; }
  if (components.kbd) { css += generateKbdCSS(components.kbd) + "\n"; }
  if (components.tag) { css += generateTagCSS(components.tag) + "\n"; }
  if (components.alert) { css += generateAlertCSS(components.alert) + "\n"; }
  if (components.toast) { css += generateToastCSS(components.toast) + "\n"; }
  if (components.tooltip) { css += generateTooltipCSS(components.tooltip) + "\n"; }
  if (components.progress) { css += generateProgressCSS(components.progress) + "\n"; }
  if (components.spinner) { css += generateSpinnerCSS(components.spinner) + "\n"; }
  if (components.skeleton) { css += generateSkeletonCSS(components.skeleton) + "\n"; }
  if (components.tabs) { css += generateTabsCSS(components.tabs) + "\n"; }
  if (components.breadcrumb) { css += generateBreadcrumbCSS(components.breadcrumb) + "\n"; }
  if (components.accordion) { css += generateAccordionCSS(components.accordion) + "\n"; }
  if (components.dialog) { css += generateDialogCSS(components.dialog) + "\n"; }
  if (components.dropdownMenu) { css += generateDropdownMenuCSS(components.dropdownMenu) + "\n"; }
  if (components.separator) { css += generateSeparatorCSS(components.separator) + "\n"; }
  if (components.scrollArea) { css += generateScrollAreaCSS(components.scrollArea) + "\n"; }

  // Add after custom CSS
  if (config.customCSS?.after) {
    css += `/* Custom CSS (after) */\n${config.customCSS.after}\n`;
  }

  return css;
}


/**
 * Get legacy components CSS from file
 * Used for components that haven't been migrated to the new generator system
 */
export function getLegacyComponentsCSS(
  componentsPath: string,
  excludeComponents: string[] = ["button", "input", "card", "switch", "checkbox"]
): string {
  // For now, we read the entire file
  // In the future, we could parse and exclude specific sections
  // This is a migration helper
  
  const fs = require("fs");
  if (!fs.existsSync(componentsPath)) {
    return "";
  }

  let css = fs.readFileSync(componentsPath, "utf-8");

  // Remove sections for components that are now generated
  // This is a simple approach - in production you'd want more robust parsing
  for (const component of excludeComponents) {
    // Remove the component section from the CSS
    // Looking for patterns like /* ===== BUTTON ===== */ to the next /* ===== */ or end
    const sectionRegex = new RegExp(
      `\\/\\*\\s*=====\\s*${component.toUpperCase()}\\s*=====\\s*\\*\\/[\\s\\S]*?(?=\\/\\*\\s*=====|$)`,
      "gi"
    );
    css = css.replace(sectionRegex, "");
  }

  return css;
}

/**
 * Validate config structure
 */
export function validateConfig(config: unknown): CZeroConfig {
  if (typeof config !== "object" || config === null) {
    return {};
  }

  // Basic validation - in production you'd want more robust checking
  const validConfig = config as CZeroConfig;

  // Warn about unknown top-level keys
  const validKeys = ["color", "radius", "shadow", "spacing", "typography", "transition", "breakpoints", "components", "customCSS"];
  for (const key of Object.keys(validConfig)) {
    if (!validKeys.includes(key)) {
      console.warn(`⚠️  Unknown config key: "${key}"`);
    }
  }

  return validConfig;
}
