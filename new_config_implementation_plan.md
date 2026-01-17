# Extended Config System - Implementation Plan

> **Reference**: See `new_config_idea.md` for full design specification  
> **Created**: January 17, 2026  
> **Estimated Effort**: Large (affects CLI, all 33 components, documentation)

---

## Pre-Implementation Checklist

- [ ] Finalize component token schema for all 33 components
- [ ] Decide on default values for all tokens (current CSS values)
- [ ] Create TypeScript interfaces for config structure
- [ ] Plan migration path for existing users

---

## Phase 1: Core Infrastructure

### 1.1 Create Default Component Tokens
**Files**: `src/core/component-defaults.ts`

Create a file containing default token values for all components, extracted from current `components.css`:

```ts
export const componentDefaults = {
  button: {
    height: { sm: "2rem", md: "2.5rem", lg: "3rem" },
    paddingX: { sm: "0.75rem", md: "1rem", lg: "1.5rem" },
    // ... all current values
  },
  input: { ... },
  // ... all 33 components
};
```

### 1.2 Create Token Schema Types
**Files**: `src/core/types/config.ts`

Define TypeScript interfaces for the entire config structure:

```ts
interface CZeroConfig {
  color?: ColorTokens;
  components?: ComponentsConfig;
  customCSS?: { before?: string; after?: string };
}

interface ComponentsConfig {
  button?: ButtonTokens;
  input?: InputTokens;
  // ...
}

interface ButtonTokens {
  height?: SizeVariants<string>;
  paddingX?: SizeVariants<string>;
  variants?: Record<string, VariantConfig>;
  states?: StatesConfig;
  animations?: AnimationsConfig;
  responsive?: ResponsiveConfig;
  customCSS?: string;
}
```

### 1.3 Update CLI Config Loader
**Files**: `cli/index.ts`

1. Import `componentDefaults`
2. Deep-merge user config with defaults:
   ```ts
   const finalConfig = deepMerge(
     themeDefaults,
     componentDefaults,
     userConfig
   );
   ```
3. Implement `deepMerge` utility that handles arrays and nested objects

### 1.4 Create Token Resolver
**Files**: `cli/token-resolver.ts`

Parse `$token-name` syntax and resolve to CSS variable references:

```ts
function resolveToken(value: string, tokenType: 'color' | 'other'): string {
  if (!value.startsWith('$')) return value;
  
  const tokenName = value.slice(1);
  const cssVar = `var(--cz-${tokenName.replace('-', '-')})`;
  
  if (tokenType === 'color') {
    return `hsl(${cssVar})`;
  }
  return cssVar;
}
```

---

## Phase 2: CSS Generation Engine

### 2.1 Create Component CSS Generators
**Files**: `cli/generators/` (one file per component)

Each generator takes component config and outputs CSS string:

```ts
// cli/generators/button.ts
export function generateButtonCSS(config: ButtonTokens): string {
  let css = '';
  
  // Generate CSS variables
  css += generateButtonVariables(config);
  
  // Generate base styles
  css += generateButtonBase(config);
  
  // Generate size variants
  css += generateButtonSizes(config);
  
  // Generate color variants
  css += generateButtonVariants(config.variants);
  
  // Generate state styles
  css += generateButtonStates(config.states);
  
  // Generate responsive overrides
  css += generateButtonResponsive(config.responsive);
  
  // Append custom CSS
  if (config.customCSS) {
    css += `\n/* Custom Button CSS */\n${config.customCSS}\n`;
  }
  
  return css;
}
```

### 2.2 Update Main CSS Builder
**Files**: `cli/build-css.ts`

Orchestrate all generators:

```ts
export function buildCSS(config: CZeroConfig): string {
  let css = '';
  
  // Global CSS injection (before)
  css += config.customCSS?.before || '';
  
  // Reset
  css += generateReset();
  
  // Global tokens
  css += generateGlobalTokens(config);
  
  // Component CSS (in dependency order)
  css += generateButtonCSS(config.components?.button);
  css += generateInputCSS(config.components?.input);
  // ... all 33 components
  
  // Global CSS injection (after)
  css += config.customCSS?.after || '';
  
  return css;
}
```

### 2.3 Variant Generator
**Files**: `cli/generators/variants.ts`

Generic function to generate variant CSS:

```ts
function generateVariants(
  component: string,
  variants: Record<string, VariantConfig>
): string {
  let css = '';
  
  for (const [name, config] of Object.entries(variants)) {
    css += `.cz-${component}-${name} {\n`;
    
    if (config.bg) css += `  background: ${resolve(config.bg)};\n`;
    if (config.color) css += `  color: ${resolve(config.color)};\n`;
    if (config.borderColor) css += `  border-color: ${resolve(config.borderColor)};\n`;
    // ... other properties
    
    css += `}\n`;
    
    // Variant-specific hover
    if (config.hover) {
      css += `.cz-${component}-${name}:hover {\n`;
      // ... hover styles
      css += `}\n`;
    }
  }
  
  return css;
}
```

### 2.4 State Generator
**Files**: `cli/generators/states.ts`

Generate pseudo-class styles:

```ts
function generateStates(
  component: string,
  states: StatesConfig
): string {
  let css = '';
  
  if (states.hover) {
    css += `.cz-${component}:hover {\n`;
    if (states.hover.opacity) css += `  opacity: ${states.hover.opacity};\n`;
    if (states.hover.transform) css += `  transform: ${states.hover.transform};\n`;
    css += `}\n`;
  }
  
  if (states.focus) {
    css += `.cz-${component}:focus-visible {\n`;
    // ... focus styles
    css += `}\n`;
  }
  
  // ... disabled, active
  
  return css;
}
```

### 2.5 Responsive Generator
**Files**: `cli/generators/responsive.ts`

Generate media query overrides:

```ts
function generateResponsive(
  component: string,
  responsive: ResponsiveConfig,
  breakpoints: BreakpointConfig
): string {
  let css = '';
  
  for (const [breakpoint, overrides] of Object.entries(responsive)) {
    const maxWidth = breakpoints[breakpoint];
    
    css += `@media (max-width: ${maxWidth}) {\n`;
    css += `  :root {\n`;
    
    // Override CSS variables for this breakpoint
    for (const [prop, value] of Object.entries(overrides)) {
      css += `    --cz-${component}-${prop}: ${resolve(value)};\n`;
    }
    
    css += `  }\n`;
    css += `}\n`;
  }
  
  return css;
}
```

---

## Phase 3: Theme Presets

### 3.1 Create Preset Files
**Files**: `src/presets/*.ts`

```ts
// src/presets/compact.ts
export const compact: Partial<CZeroConfig> = {
  spacing: { sm: "0.375rem", md: "0.5rem", lg: "0.75rem" },
  components: {
    button: {
      height: { sm: "1.75rem", md: "2rem", lg: "2.5rem" },
      paddingX: { sm: "0.5rem", md: "0.75rem", lg: "1rem" },
    },
    // ... other components
  },
};
```

### 3.2 Export Presets
**Files**: `src/presets/index.ts`

```ts
export { compact } from './compact';
export { minimal } from './minimal';
export { vibrant } from './vibrant';

// Bundle all for easy access
export const presets = { compact, minimal, vibrant };
```

### 3.3 Update Package Exports
**Files**: `package.json`

```json
{
  "exports": {
    "./presets": {
      "import": "./dist/presets/index.js",
      "types": "./dist/presets/index.d.ts"
    }
  }
}
```

---

## Phase 4: Update Components.css Template

### 4.1 Convert Hardcoded Values to Variables

**Before** (current):
```css
.cz-btn-md { 
  height: 2.5rem; 
  padding: 0 1rem; 
}
```

**After** (variable-based):
```css
.cz-btn-md { 
  height: var(--cz-btn-height-md); 
  padding: 0 var(--cz-btn-padding-x-md); 
}
```

### 4.2 Component CSS Files
**Files**: `src/core/styles/components/` (split by component)

Split monolithic `components.css` into smaller files for maintainability:

```
src/core/styles/components/
├── button.css
├── input.css
├── card.css
├── badge.css
└── ... (33 files)
```

Each file uses CSS variables that the CLI generates.

---

## Phase 5: Animation System

### 5.1 Keyframe Generator
**Files**: `cli/generators/animations.ts`

```ts
function generateAnimations(
  component: string,
  animations: AnimationsConfig
): string {
  let css = '';
  
  for (const [name, config] of Object.entries(animations)) {
    if (config.keyframes) {
      css += `@keyframes cz-${component}-${name} {\n`;
      for (const [step, styles] of Object.entries(config.keyframes)) {
        css += `  ${step} {\n`;
        for (const [prop, value] of Object.entries(styles)) {
          css += `    ${prop}: ${value};\n`;
        }
        css += `  }\n`;
      }
      css += `}\n`;
    }
  }
  
  return css;
}
```

### 5.2 Animation Variables

```css
:root {
  --cz-btn-loading-duration: 0.75s;
  --cz-btn-loading-timing: linear;
}

.cz-btn-spinner {
  animation: cz-spin var(--cz-btn-loading-duration) var(--cz-btn-loading-timing) infinite;
}
```

---

## Phase 6: TypeScript & DX

### 6.1 Generate Config Types
**Files**: `src/types/config.d.ts`

Ship TypeScript definitions for config autocomplete.

### 6.2 Config Validation
**Files**: `cli/validate-config.ts`

Validate user config and provide helpful error messages:

```ts
function validateConfig(config: unknown): CZeroConfig {
  // Check structure
  // Warn about unknown properties
  // Validate token references exist
  // Return validated config or throw with helpful message
}
```

### 6.3 VS Code Extension (Future)
- Syntax highlighting for config files
- Autocomplete for token names
- Preview generated CSS

---

## Phase 7: Documentation

### 7.1 Update Docs Site
- Add "Theming" section with complete token reference
- Add "Presets" page with examples
- Add "Custom Variants" guide
- Add interactive theme builder (stretch goal)

### 7.2 Migration Guide
Document how to migrate from global-only config to component config.

---

## Implementation Order

| Step | Task | Dependencies | Est. Time |
|------|------|--------------|-----------|
| 1 | Create component defaults file | None | 1 day |
| 2 | Create TypeScript interfaces | Step 1 | 0.5 day |
| 3 | Update CLI config loader with deep merge | Steps 1-2 | 0.5 day |
| 4 | Create token resolver | None | 0.5 day |
| 5 | Create variant generator | Step 4 | 0.5 day |
| 6 | Create state generator | Step 4 | 0.5 day |
| 7 | Create responsive generator | Step 4 | 0.5 day |
| 8 | Create button CSS generator | Steps 4-7 | 1 day |
| 9 | Create generators for remaining 32 components | Step 8 | 3-4 days |
| 10 | Create theme presets | Steps 1-9 | 1 day |
| 11 | Update components.css to use variables | Steps 8-9 | 1 day |
| 12 | Add animation system | Step 9 | 0.5 day |
| 13 | Add config validation | Steps 1-2 | 0.5 day |
| 14 | Update documentation | All | 1-2 days |

**Total Estimated Time**: 10-12 days

---

## Testing Strategy

1. **Unit Tests**: Token resolver, deep merge, generators
2. **Snapshot Tests**: Generated CSS output
3. **Integration Tests**: Full config → CSS pipeline
4. **Visual Tests**: Render components with different configs

---

## Rollback Plan

If issues arise:
1. Keep existing `components.css` as fallback
2. CLI can detect old vs new config format
3. Provide `--legacy` flag to use old generation

---

## Success Criteria

- [ ] All 33 components support full token customization
- [ ] Users can create custom variants
- [ ] Users can customize all states (hover, focus, etc.)
- [ ] Theme presets work correctly
- [ ] Responsive overrides work
- [ ] No breaking changes for existing users
- [ ] TypeScript autocomplete works in config files
- [ ] Documentation covers all features
