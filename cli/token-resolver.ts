/**
 * CZero Token Resolver
 * Parses $token-name syntax and resolves to CSS variable references
 */

/**
 * Resolve a token value to its CSS equivalent
 * 
 * Examples:
 * - "$color-primary" → "hsl(var(--cz-color-primary))"
 * - "$radius-md" → "var(--cz-radius-md)"
 * - "$font-sm" → "var(--cz-font-size-sm)"
 * - "0.5rem" → "0.5rem" (literal, no change)
 * - "$color-primary / 0.5" → "hsl(var(--cz-color-primary) / 0.5)"
 */
export function resolveToken(value: string | undefined): string {
  if (!value) return "";
  
  // If it doesn't start with $, return as-is (literal value)
  if (!value.startsWith("$")) {
    return value;
  }

  // Handle opacity syntax: "$color-primary / 0.5"
  const opacityMatch = value.match(/^\$([a-zA-Z-]+)\s*\/\s*(.+)$/);
  if (opacityMatch) {
    const [, tokenName, opacity] = opacityMatch;
    const cssVar = tokenNameToCssVar(tokenName);
    
    // Color tokens need hsl() wrapper
    if (tokenName.startsWith("color-")) {
      return `hsl(var(${cssVar}) / ${opacity})`;
    }
    return `var(${cssVar}) / ${opacity}`;
  }

  // Simple token reference: "$color-primary"
  const tokenName = value.slice(1); // Remove $
  const cssVar = tokenNameToCssVar(tokenName);

  // Color tokens need hsl() wrapper
  if (tokenName.startsWith("color-")) {
    return `hsl(var(${cssVar}))`;
  }

  return `var(${cssVar})`;
}

/**
 * Convert token name to CSS variable name
 * 
 * Examples:
 * - "color-primary" → "--cz-color-primary"
 * - "font-sm" → "--cz-font-size-sm"
 * - "font-medium" → "--cz-font-weight-medium"
 * - "radius-md" → "--cz-radius-md"
 * - "spacing-lg" → "--cz-spacing-lg"
 * - "transition-fast" → "--cz-transition-fast"
 */
function tokenNameToCssVar(tokenName: string): string {
  // Handle font shorthand tokens
  if (tokenName.startsWith("font-")) {
    const fontPart = tokenName.slice(5); // Remove "font-"
    
    // Size tokens: xs, sm, md, lg, xl
    if (["xs", "sm", "md", "lg", "xl"].includes(fontPart)) {
      return `--cz-font-size-${fontPart}`;
    }
    
    // Weight tokens: normal, medium, semibold, bold
    if (["normal", "medium", "semibold", "bold"].includes(fontPart)) {
      return `--cz-font-weight-${fontPart}`;
    }
    
    // Line height tokens: tight, normal, relaxed
    if (["tight", "relaxed"].includes(fontPart)) {
      return `--cz-font-lineHeight-${fontPart}`;
    }
    
    // Default: pass through
    return `--cz-font-${fontPart}`;
  }

  return `--cz-${tokenName}`;
}

/**
 * Resolve all token references in a styles object
 */
export function resolveTokensInObject<T extends Record<string, any>>(
  obj: T,
  colorProperties = ["bg", "color", "borderColor", "indicatorColor", "thumbBg", "trackColor"]
): T {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      result[key] = resolveToken(value);
    } else if (typeof value === "object" && value !== null) {
      result[key] = resolveTokensInObject(value, colorProperties);
    } else {
      result[key] = value;
    }
  }

  return result as T;
}

/**
 * Generate CSS variable declaration
 */
export function cssVar(name: string, value: string): string {
  return `  --cz-${name}: ${value};`;
}

/**
 * Generate CSS variable reference
 */
export function cssVarRef(name: string): string {
  return `var(--cz-${name})`;
}

/**
 * Check if a value is a token reference
 */
export function isTokenReference(value: string): boolean {
  return value.startsWith("$");
}

/**
 * Convert camelCase to kebab-case
 */
export function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Convert component property name to CSS variable name
 * 
 * Examples:
 * - ("button", "paddingX", "sm") → "--cz-btn-padding-x-sm"
 * - ("button", "height", "md") → "--cz-btn-height-md"
 * - ("input", "borderRadius") → "--cz-input-border-radius"
 */
export function componentVarName(
  component: string,
  property: string,
  size?: string
): string {
  // Component shorthand mapping
  const componentShorthand: Record<string, string> = {
    button: "btn",
    dropdownMenu: "dropdown",
    scrollArea: "scroll",
  };

  const compName = componentShorthand[component] || component;
  const propName = toKebabCase(property);

  if (size) {
    return `--cz-${compName}-${propName}-${size}`;
  }
  return `--cz-${compName}-${propName}`;
}
