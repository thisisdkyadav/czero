/**
 * CZero Config Validator
 * Validates user configuration and provides helpful error messages
 */

import type { CZeroConfig, ComponentsConfig } from "../src/core/types/config";

export interface ValidationResult {
  valid: boolean;
  warnings: string[];
  errors: string[];
  config: CZeroConfig;
}

/**
 * Validate user config and return normalized version
 */
export function validateConfig(config: unknown): ValidationResult {
  const warnings: string[] = [];
  const errors: string[] = [];

  if (typeof config !== "object" || config === null) {
    return {
      valid: true,
      warnings: ["Config is empty, using defaults"],
      errors: [],
      config: {},
    };
  }

  const validConfig = config as Record<string, unknown>;

  // Valid top-level keys
  const validTopLevelKeys = [
    "color",
    "radius",
    "shadow",
    "spacing",
    "typography",
    "transition",
    "breakpoints",
    "components",
    "customCSS",
  ];

  // Check for unknown top-level keys
  for (const key of Object.keys(validConfig)) {
    if (!validTopLevelKeys.includes(key)) {
      warnings.push(`Unknown config key: "${key}" (will be ignored)`);
    }
  }

  // Validate components section
  if (validConfig.components) {
    const componentResult = validateComponents(validConfig.components);
    warnings.push(...componentResult.warnings);
    errors.push(...componentResult.errors);
  }

  // Validate color tokens
  if (validConfig.color) {
    const colorResult = validateColorTokens(validConfig.color);
    warnings.push(...colorResult.warnings);
    errors.push(...colorResult.errors);
  }

  // Validate customCSS
  if (validConfig.customCSS) {
    const customCSSResult = validateCustomCSS(validConfig.customCSS);
    warnings.push(...customCSSResult.warnings);
    errors.push(...customCSSResult.errors);
  }

  return {
    valid: errors.length === 0,
    warnings,
    errors,
    config: validConfig as CZeroConfig,
  };
}

/**
 * Validate components configuration
 */
function validateComponents(components: unknown): { warnings: string[]; errors: string[] } {
  const warnings: string[] = [];
  const errors: string[] = [];

  if (typeof components !== "object" || components === null) {
    errors.push("components must be an object");
    return { warnings, errors };
  }

  const validComponents = [
    "button", "input", "textarea", "card", "badge", "switch", "checkbox",
    "statusBadge", "radio", "select", "label", "alert", "tooltip", "progress",
    "skeleton", "spinner", "tabs", "dialog", "modal", "dropdownMenu",
    "accordion", "table", "dataTable", "avatar", "separator", "breadcrumb",
    "code", "kbd", "tag", "toast", "scrollArea", "container", "stack", "grid"
  ];

  for (const key of Object.keys(components as Record<string, unknown>)) {
    if (!validComponents.includes(key)) {
      warnings.push(`Unknown component: "${key}" (will be ignored)`);
    }
  }

  return { warnings, errors };
}

/**
 * Validate color tokens
 */
function validateColorTokens(color: unknown): { warnings: string[]; errors: string[] } {
  const warnings: string[] = [];
  const errors: string[] = [];

  if (typeof color !== "object" || color === null) {
    errors.push("color must be an object");
    return { warnings, errors };
  }

  const colorObj = color as Record<string, unknown>;

  for (const [name, value] of Object.entries(colorObj)) {
    if (typeof value === "object" && value !== null) {
      const colorValue = value as Record<string, unknown>;
      if (!("light" in colorValue) || !("dark" in colorValue)) {
        errors.push(`Color "${name}" must have both "light" and "dark" values`);
      }
    } else {
      errors.push(`Color "${name}" must be an object with "light" and "dark" values`);
    }
  }

  return { warnings, errors };
}

/**
 * Validate custom CSS injection
 */
function validateCustomCSS(customCSS: unknown): { warnings: string[]; errors: string[] } {
  const warnings: string[] = [];
  const errors: string[] = [];

  if (typeof customCSS !== "object" || customCSS === null) {
    errors.push("customCSS must be an object with 'before' and/or 'after' string properties");
    return { warnings, errors };
  }

  const css = customCSS as Record<string, unknown>;
  
  if (css.before && typeof css.before !== "string") {
    errors.push("customCSS.before must be a string");
  }
  
  if (css.after && typeof css.after !== "string") {
    errors.push("customCSS.after must be a string");
  }

  // Check for common CSS errors in custom CSS
  const customCSSString = `${css.before || ""}${css.after || ""}`;
  if (customCSSString.includes("{{") || customCSSString.includes("}}")) {
    warnings.push("customCSS contains template syntax ({{ }}) which won't be processed");
  }

  return { warnings, errors };
}

/**
 * Print validation results to console
 */
export function printValidationResults(result: ValidationResult): void {
  if (result.warnings.length > 0) {
    console.log("⚠️  Warnings:");
    for (const warning of result.warnings) {
      console.log(`   • ${warning}`);
    }
  }

  if (result.errors.length > 0) {
    console.log("❌ Errors:");
    for (const error of result.errors) {
      console.log(`   • ${error}`);
    }
  }
}
