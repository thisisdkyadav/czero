/**
 * CZero Button CSS Generator
 * Generates CSS for button component from config tokens
 */

import type { ButtonTokens, SizeVariants, VariantConfig } from "../../src/core/types/config";
import { resolveToken, componentVarName, toKebabCase } from "../token-resolver";

/**
 * Generate all button CSS including variables, base styles, sizes, variants, and states
 */
export function generateButtonCSS(config: ButtonTokens): string {
  let css = "";

  css += "/* ===== BUTTON ===== */\n\n";

  // Generate CSS variables
  css += generateButtonVariables(config);
  css += "\n";

  // Generate base styles
  css += generateButtonBase();
  css += "\n";

  // Generate size variants
  css += generateButtonSizes(config);
  css += "\n";

  // Generate color variants
  if (config.variants) {
    css += generateButtonVariants(config.variants);
    css += "\n";
  }

  // Generate icon button styles
  css += generateButtonIcon(config);
  css += "\n";

  // Generate loading state styles
  css += generateButtonLoading(config);
  css += "\n";

  // Append custom CSS
  if (config.customCSS) {
    css += `/* Custom Button CSS */\n${config.customCSS}\n`;
  }

  return css;
}

/**
 * Generate CSS variables for button component
 */
function generateButtonVariables(config: ButtonTokens): string {
  const vars: string[] = [];

  // Size-based variables
  if (config.height) {
    for (const [size, value] of Object.entries(config.height)) {
      vars.push(`  ${componentVarName("button", "height", size)}: ${resolveToken(value)};`);
    }
  }

  if (config.paddingX) {
    for (const [size, value] of Object.entries(config.paddingX)) {
      vars.push(`  ${componentVarName("button", "paddingX", size)}: ${resolveToken(value)};`);
    }
  }

  if (config.fontSize && typeof config.fontSize === "object") {
    for (const [size, value] of Object.entries(config.fontSize)) {
      vars.push(`  ${componentVarName("button", "fontSize", size)}: ${resolveToken(value)};`);
    }
  }

  if (config.iconSize) {
    for (const [size, value] of Object.entries(config.iconSize)) {
      vars.push(`  ${componentVarName("button", "iconSize", size)}: ${resolveToken(value)};`);
    }
  }

  // Single-value variables
  if (config.gap) {
    vars.push(`  ${componentVarName("button", "gap")}: ${resolveToken(config.gap)};`);
  }
  if (config.fontWeight) {
    vars.push(`  ${componentVarName("button", "fontWeight")}: ${resolveToken(config.fontWeight)};`);
  }
  if (config.borderRadius) {
    vars.push(`  ${componentVarName("button", "borderRadius")}: ${resolveToken(config.borderRadius)};`);
  }
  if (config.borderWidth) {
    vars.push(`  ${componentVarName("button", "borderWidth")}: ${resolveToken(config.borderWidth)};`);
  }
  if (config.transition) {
    vars.push(`  ${componentVarName("button", "transition")}: ${resolveToken(config.transition)};`);
  }

  // State variables
  if (config.states?.hover?.opacity) {
    vars.push(`  ${componentVarName("button", "hoverOpacity")}: ${config.states.hover.opacity};`);
  }
  if (config.states?.focus?.ringWidth) {
    vars.push(`  ${componentVarName("button", "focusRingWidth")}: ${config.states.focus.ringWidth};`);
  }
  if (config.states?.focus?.ringOffset) {
    vars.push(`  ${componentVarName("button", "focusRingOffset")}: ${config.states.focus.ringOffset};`);
  }
  if (config.states?.focus?.ringColor) {
    vars.push(`  ${componentVarName("button", "focusRingColor")}: ${resolveToken(config.states.focus.ringColor)};`);
  }
  if (config.states?.disabled?.opacity) {
    vars.push(`  ${componentVarName("button", "disabledOpacity")}: ${config.states.disabled.opacity};`);
  }

  // Animation variables
  if (config.animations?.loading?.duration) {
    vars.push(`  ${componentVarName("button", "loadingDuration")}: ${config.animations.loading.duration};`);
  }
  if (config.animations?.loading?.timing) {
    vars.push(`  ${componentVarName("button", "loadingTiming")}: ${config.animations.loading.timing};`);
  }

  // Variant variables
  if (config.variants) {
    for (const [name, variant] of Object.entries(config.variants)) {
      if (variant.bg) {
        vars.push(`  --cz-btn-${name}-bg: ${resolveToken(variant.bg)};`);
      }
      if (variant.color) {
        vars.push(`  --cz-btn-${name}-color: ${resolveToken(variant.color)};`);
      }
      if (variant.borderColor) {
        vars.push(`  --cz-btn-${name}-border-color: ${resolveToken(variant.borderColor)};`);
      }
    }
  }

  return `:root {\n${vars.join("\n")}\n}\n`;
}

/**
 * Generate base button styles
 */
function generateButtonBase(): string {
  return `.cz-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--cz-btn-gap);
  border-radius: var(--cz-btn-border-radius);
  font-weight: var(--cz-btn-font-weight);
  transition: all var(--cz-btn-transition);
  cursor: pointer;
  border: var(--cz-btn-border-width) solid transparent;
}

.cz-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 var(--cz-btn-focus-ring-offset) hsl(var(--cz-color-bg)),
              0 0 0 calc(var(--cz-btn-focus-ring-offset) + var(--cz-btn-focus-ring-width)) var(--cz-btn-focus-ring-color);
}

.cz-btn:disabled {
  pointer-events: none;
  opacity: var(--cz-btn-disabled-opacity);
}
`;
}

/**
 * Generate button size variants
 */
function generateButtonSizes(config: ButtonTokens): string {
  const sizes = ["sm", "md", "lg"];
  let css = "/* Button Sizes */\n";

  for (const size of sizes) {
    css += `.cz-btn-${size} {
  height: var(--cz-btn-height-${size});
  padding: 0 var(--cz-btn-padding-x-${size});
  font-size: var(--cz-btn-font-size-${size});
}\n`;
  }

  return css;
}

/**
 * Generate button color variants
 */
function generateButtonVariants(
  variants: Record<string, VariantConfig>
): string {
  let css = "/* Button Variants */\n";

  for (const [name, variant] of Object.entries(variants)) {
    // Base variant styles
    css += `.cz-btn-${name} {\n`;
    css += `  background: var(--cz-btn-${name}-bg);\n`;
    css += `  color: var(--cz-btn-${name}-color);\n`;
    
    if (variant.borderColor && variant.borderColor !== "transparent") {
      css += `  border-color: var(--cz-btn-${name}-border-color);\n`;
    }
    
    if (variant.textDecoration) {
      css += `  text-decoration: ${variant.textDecoration};\n`;
      css += `  text-underline-offset: 4px;\n`;
    }
    
    css += `}\n`;

    // Hover styles
    if (variant.hover) {
      css += `.cz-btn-${name}:hover {\n`;
      
      if (variant.hover.opacity) {
        css += `  opacity: ${variant.hover.opacity};\n`;
      }
      if (variant.hover.bg) {
        css += `  background: ${resolveToken(variant.hover.bg)};\n`;
      }
      if (variant.textDecoration) {
        css += `  text-decoration-thickness: 2px;\n`;
      }
      
      css += `}\n`;
    }
  }

  return css;
}

/**
 * Generate icon button styles
 */
function generateButtonIcon(config: ButtonTokens): string {
  return `/* Button Icon Size */
.cz-btn-icon {
  padding: 0;
}
.cz-btn-icon.cz-btn-sm { width: var(--cz-btn-icon-size-sm); height: var(--cz-btn-icon-size-sm); }
.cz-btn-icon.cz-btn-md { width: var(--cz-btn-icon-size-md); height: var(--cz-btn-icon-size-md); }
.cz-btn-icon.cz-btn-lg { width: var(--cz-btn-icon-size-lg); height: var(--cz-btn-icon-size-lg); }
`;
}

/**
 * Generate loading button styles
 */
function generateButtonLoading(config: ButtonTokens): string {
  return `/* Button Loading State */
.cz-btn-loading { position: relative; }
.cz-btn-spinner {
  width: 1rem;
  height: 1rem;
  animation: cz-spin var(--cz-btn-loading-duration) var(--cz-btn-loading-timing) infinite;
  flex-shrink: 0;
}
.cz-btn-content { opacity: 1; }
`;
}
