#!/usr/bin/env node
/**
 * CZero CLI
 * Generates CSS from user's theme configuration
 * 
 * Usage: npx czero build [--config czero.config.js] [--output czero.css]
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default theme values (fallback if user doesn't specify)
const defaultTheme = {
  color: {
    bg: { light: "0 0% 100%", dark: "220 40% 3%" },
    fg: { light: "220 15% 10%", dark: "210 40% 96%" },
    primary: { light: "222 47% 45%", dark: "210 80% 65%" },
    primaryFg: { light: "0 0% 100%", dark: "220 40% 3%" },
    secondary: { light: "220 10% 95%", dark: "220 8% 25%" },
    secondaryFg: { light: "220 15% 10%", dark: "210 40% 96%" },
    muted: { light: "220 10% 95%", dark: "220 8% 20%" },
    mutedFg: { light: "220 10% 40%", dark: "220 10% 60%" },
    danger: { light: "0 70% 55%", dark: "0 80% 65%" },
    dangerFg: { light: "0 0% 100%", dark: "0 0% 100%" },
    success: { light: "142 70% 45%", dark: "142 70% 55%" },
    successFg: { light: "0 0% 100%", dark: "0 0% 100%" },
    warning: { light: "38 92% 50%", dark: "38 92% 60%" },
    warningFg: { light: "0 0% 100%", dark: "0 0% 0%" },
    border: { light: "220 13% 90%", dark: "220 10% 20%" },
    ring: { light: "222 47% 45%", dark: "210 80% 65%" },
  },
  radius: {
    none: "0",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
  shadow: {
    none: "none",
    sm: "0 1px 2px rgb(0 0 0 / 0.05)",
    md: "0 2px 4px rgb(0 0 0 / 0.08)",
    lg: "0 4px 12px rgb(0 0 0 / 0.12)",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    "2xl": "2rem",
  },
  typography: {
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    size: { xs: "0.75rem", sm: "0.875rem", md: "1rem", lg: "1.125rem", xl: "1.25rem" },
    weight: { normal: "400", medium: "500", semibold: "600", bold: "700" },
    lineHeight: { tight: "1.25", normal: "1.5", relaxed: "1.75" },
  },
  transition: { fast: "150ms ease", normal: "200ms ease", slow: "300ms ease" },
};

function deepMerge(target: any, source: any): any {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

function generateTokensCSS(theme: typeof defaultTheme): string {
  const lightVars: string[] = [];
  const darkVars: string[] = [];

  // Colors
  for (const [name, values] of Object.entries(theme.color)) {
    if (typeof values === "object" && "light" in values) {
      lightVars.push(`  --cz-color-${name}: ${values.light};`);
      darkVars.push(`  --cz-color-${name}: ${values.dark};`);
    }
  }

  // Radius
  for (const [name, value] of Object.entries(theme.radius)) {
    lightVars.push(`  --cz-radius-${name}: ${value};`);
  }

  // Shadow
  for (const [name, value] of Object.entries(theme.shadow)) {
    lightVars.push(`  --cz-shadow-${name}: ${value};`);
  }

  // Spacing
  for (const [name, value] of Object.entries(theme.spacing)) {
    lightVars.push(`  --cz-spacing-${name}: ${value};`);
  }

  // Typography
  lightVars.push(`  --cz-font-fontFamily: ${theme.typography.fontFamily};`);
  for (const [name, value] of Object.entries(theme.typography.size)) {
    lightVars.push(`  --cz-font-size-${name}: ${value};`);
  }
  for (const [name, value] of Object.entries(theme.typography.weight)) {
    lightVars.push(`  --cz-font-weight-${name}: ${value};`);
  }
  for (const [name, value] of Object.entries(theme.typography.lineHeight)) {
    lightVars.push(`  --cz-font-lineHeight-${name}: ${value};`);
  }

  // Transitions
  for (const [name, value] of Object.entries(theme.transition)) {
    lightVars.push(`  --cz-transition-${name}: ${value};`);
  }

  return `/**
 * CZero Design Tokens
 * Generated from czero.config.js
 */

:root {
${lightVars.join("\n")}
}

.dark {
${darkVars.join("\n")}
}
`;
}

function getComponentsCSS(): string {
  // Try multiple possible locations
  const possiblePaths = [
    path.join(__dirname, "components.css"),           // dist/cli/../components.css = dist/components.css
    path.join(__dirname, "../components.css"),         // dist/components.css
    path.join(__dirname, "../dist/components.css"),    // from root
    path.join(__dirname, "../../dist/components.css"), // from cli folder
    path.join(__dirname, "../src/core/styles/components.css"), // dev mode
    path.join(__dirname, "../../src/core/styles/components.css"), // dev mode from cli
  ];
  
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return fs.readFileSync(p, "utf-8");
    }
  }
  
  console.error("Error: Could not find components.css");
  console.error("Searched paths:", possiblePaths);
  process.exit(1);
}

function getResetCSS(): string {
  const possiblePaths = [
    path.join(__dirname, "reset.css"),
    path.join(__dirname, "../reset.css"),
    path.join(__dirname, "../dist/reset.css"),
    path.join(__dirname, "../../dist/reset.css"),
    path.join(__dirname, "../src/core/styles/reset.css"),
    path.join(__dirname, "../../src/core/styles/reset.css"),
  ];
  
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return fs.readFileSync(p, "utf-8");
    }
  }
  
  // Minimal fallback reset
  return `*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
body { line-height: 1.5; -webkit-font-smoothing: antialiased; }
button, input, textarea, select { font: inherit; }
`;
}

async function loadUserConfig(configPath: string): Promise<any> {
  const absolutePath = path.resolve(process.cwd(), configPath);
  
  if (!fs.existsSync(absolutePath)) {
    console.log(`No config found at ${configPath}, using defaults...`);
    return {};
  }

  try {
    // Import the config file
    const config = await import(`file://${absolutePath}`);
    return config.default || config.theme || config;
  } catch (error) {
    console.error(`Error loading config: ${error}`);
    return {};
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  // Parse arguments
  let configPath = "czero.config.js";
  let outputPath = "czero.css";
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--config" && args[i + 1]) {
      configPath = args[i + 1];
      i++;
    } else if (args[i] === "--output" && args[i + 1]) {
      outputPath = args[i + 1];
      i++;
    } else if (args[i] === "build") {
      // Just the build command, continue
    } else if (args[i] === "--help" || args[i] === "-h") {
      console.log(`
CZero CLI - Generate CSS from your theme configuration

Usage:
  npx czero build [options]

Options:
  --config <path>   Path to config file (default: czero.config.js)
  --output <path>   Output CSS file path (default: czero.css)
  --help, -h        Show this help message

Example:
  npx czero build --config my-theme.js --output src/styles/czero.css
`);
      process.exit(0);
    }
  }

  console.log("🎨 CZero CSS Generator");
  console.log(`   Config: ${configPath}`);
  console.log(`   Output: ${outputPath}`);
  console.log("");

  // Load user config and merge with defaults
  const userConfig = await loadUserConfig(configPath);
  const theme = deepMerge(defaultTheme, userConfig);

  // Generate CSS
  const resetCSS = getResetCSS();
  const tokensCSS = generateTokensCSS(theme);
  const componentsCSS = getComponentsCSS();

  const finalCSS = `${resetCSS}
${tokensCSS}
${componentsCSS}`;

  // Write output
  fs.writeFileSync(outputPath, finalCSS);

  console.log(`✅ Generated ${outputPath}`);
  console.log(`   ${finalCSS.split("\n").length} lines`);
}

main().catch(console.error);
