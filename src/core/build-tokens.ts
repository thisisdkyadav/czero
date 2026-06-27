/**
 * Build script to generate CSS from theme.config.ts
 * Outputs tokens.css with --cz-* prefixed CSS variables
 */

import { defaultCssVars, cssVarsToString } from "./tokens";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.resolve(__dirname, "styles");

function generateTokensCSS(): string {
  return `/**
 * CZero Design Tokens
 * Auto-generated from theme.config.ts - DO NOT EDIT MANUALLY
 */

${cssVarsToString(defaultCssVars())}
`;
}

function generateResetCSS(): string {
  return `/**
 * CZero Component Reset
 * Scoped to CZero components only - won't affect other elements
 */

/* Base reset for all CZero components */
[class*="cz-"],
[class*="cz-"]::before,
[class*="cz-"]::after {
  box-sizing: border-box;
  margin: 0;
}

/* "Theme once" for type: every component picks up the font token (Code/Kbd
   override to monospace via their own rules, which win by source order). */
[class*="cz-"] {
  font-family: var(--cz-font-fontFamily, inherit);
}
`;
}

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Write files. The single shipped entry is dist/styles.css (reset + tokens +
// components, concatenated by build:css) — there's no partial index.css.
fs.writeFileSync(path.join(OUTPUT_DIR, "tokens.css"), generateTokensCSS());
fs.writeFileSync(path.join(OUTPUT_DIR, "reset.css"), generateResetCSS());

console.log("✅ Tokens generated successfully!");
console.log(`   → ${path.join(OUTPUT_DIR, "tokens.css")}`);
console.log(`   → ${path.join(OUTPUT_DIR, "reset.css")}`);
