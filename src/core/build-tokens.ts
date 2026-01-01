/**
 * Build script to generate CSS from theme.config.ts
 * Outputs tokens.css with --cz-* prefixed CSS variables
 */

import { theme } from "./theme.config";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.resolve(__dirname, "styles");

function flattenObject(
  obj: Record<string, unknown>,
  prefix = ""
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}-${key}` : key;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
    } else {
      result[newKey] = String(value);
    }
  }

  return result;
}

function generateTokensCSS(): string {
  const lightVars: string[] = [];
  const darkVars: string[] = [];

  // Process colors (have light/dark variants)
  for (const [name, values] of Object.entries(theme.color)) {
    if (typeof values === "object" && "light" in values && "dark" in values) {
      lightVars.push(`  --cz-color-${name}: ${values.light};`);
      darkVars.push(`  --cz-color-${name}: ${values.dark};`);
    }
  }

  // Process other tokens (no light/dark variants)
  const simpleTokens = ["radius", "shadow", "spacing", "transition"] as const;
  for (const category of simpleTokens) {
    const tokens = flattenObject(
      theme[category] as Record<string, unknown>,
      `cz-${category}`
    );
    for (const [key, value] of Object.entries(tokens)) {
      lightVars.push(`  --${key}: ${value};`);
    }
  }

  // Process typography
  const typoTokens = flattenObject(theme.typography, "cz-font");
  for (const [key, value] of Object.entries(typoTokens)) {
    lightVars.push(`  --${key}: ${value};`);
  }

  return `/**
 * CZero Design Tokens
 * Auto-generated from theme.config.ts - DO NOT EDIT MANUALLY
 */

:root {
${lightVars.join("\n")}
}

.dark {
${darkVars.join("\n")}
}
`;
}

function generateResetCSS(): string {
  return `/**
 * CZero Minimal Reset
 */

*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

body {
  line-height: var(--cz-font-lineHeight-normal);
  -webkit-font-smoothing: antialiased;
  font-family: var(--cz-font-fontFamily);
}

button, input, textarea, select {
  font: inherit;
}
`;
}

function generateIndexCSS(): string {
  return `/**
 * CZero Styles Entry Point
 */

@import "./reset.css";
@import "./tokens.css";
`;
}

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Write files
fs.writeFileSync(path.join(OUTPUT_DIR, "tokens.css"), generateTokensCSS());
fs.writeFileSync(path.join(OUTPUT_DIR, "reset.css"), generateResetCSS());
fs.writeFileSync(path.join(OUTPUT_DIR, "index.css"), generateIndexCSS());

console.log("✅ Tokens generated successfully!");
console.log(`   → ${path.join(OUTPUT_DIR, "tokens.css")}`);
console.log(`   → ${path.join(OUTPUT_DIR, "reset.css")}`);
console.log(`   → ${path.join(OUTPUT_DIR, "index.css")}`);
