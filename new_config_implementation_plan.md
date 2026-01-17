# Extended Config System - Implementation Plan

> **Reference**: See `new_config_idea.md` for full design specification  
> **Created**: January 17, 2026  
> **Estimated Effort**: Large (affects CLI, all 33 components, documentation)

---

## Pre-Implementation Checklist

- [x] Finalize component token schema for all 33 components
- [x] Decide on default values for all tokens (current CSS values)
- [x] Create TypeScript interfaces for config structure
- [ ] Plan migration path for existing users

---

## Phase 1: Core Infrastructure ✅ COMPLETED

### 1.1 Create Default Component Tokens ✅
**Files**: `src/core/component-defaults.ts` - Created with all 33 components

### 1.2 Create Token Schema Types ✅
**Files**: `src/core/types/config.ts` - Created with full type definitions

### 1.3 Update CLI Config Loader
**Files**: `cli/index.ts` - Pending integration

### 1.4 Create Token Resolver ✅
**Files**: `cli/token-resolver.ts` - Created with $ syntax parsing

### 1.5 Create Deep Merge Utility ✅
**Files**: `cli/utils/deep-merge.ts` - Created

---

## Phase 2: CSS Generation Engine ✅ COMPLETED (5 components)

### 2.1 Create Component CSS Generators ✅
**Files**: `cli/generators/`

| Component | Status |
|-----------|--------|
| button | ✅ Created |
| input | ✅ Created |
| card | ✅ Created |
| switch | ✅ Created |
| checkbox | ✅ Created |
| utilities | ✅ Created |
| textarea | ⬜ Pending |
| badge | ⬜ Pending |
| ... (26 more) | ⬜ Pending |

### 2.2 CSS Builder ✅
**Files**: `cli/build-css.ts` - Created with component orchestration

---

## Phase 3: Theme Presets ✅ COMPLETED

### 3.1 Create Preset Files ✅
**Files**: `src/presets/index.ts` - Created with 6 presets:
- `compact` - Tighter spacing, smaller sizes
- `comfortable` - Larger touch targets
- `rounded` - More border radius
- `sharp` - Minimal border radius
- `minimal` - Reduced shadows
- `vibrant` - Bold effects

---

## Phase 4: Update Components.css Template ⬜ PENDING

This phase will update the existing `components.css` to use CSS variables.

## Phase 4: CLI Integration ✅ COMPLETED

- Updated `cli/index.ts` with `--new` / `--v2` flag for generator system
- Added `getLegacyComponentsCSS()` to exclude migrated components
- Backward compatible with legacy mode

---

## Phase 5: Animation System ✅ COMPLETED

Animation support is built into component generators:
- Button loading spinner animation via CSS variables
- Utility class `cz-animate-spin`
- Keyframes defined in `utilities.ts`

---

## Phase 6: TypeScript & DX ✅ COMPLETED

### 6.1 Config Types ✅
**Files**: `src/core/types/config.ts` - Full TypeScript definitions for autocomplete

### 6.2 Config Validation ✅
**Files**: `cli/validate-config.ts` - Validates config with helpful warnings/errors

### 6.3 Package Exports ✅
Added to `package.json`:
- `czero/presets` - Theme presets
- `czero/config` - TypeScript types

---

## Phase 7: Testing ⬜ PENDING

### Sample Config Created
**Files**: `czero.config.v2.js` - Demo file showing all features

### To Test
```bash
npx czero build --new --config czero.config.v2.js --output test-output.css
```

---

## ✅ Completed for 5 Components

| Component | Generator | Presets | Types | Tested |
|-----------|-----------|---------|-------|--------|
| button | ✅ | ✅ | ✅ | ⬜ |
| input | ✅ | ✅ | ✅ | ⬜ |
| card | ✅ | ✅ | ✅ | ⬜ |
| switch | ✅ | ✅ | ✅ | ⬜ |
| checkbox | ✅ | ✅ | ✅ | ⬜ |

---

## Remaining Work (28 Components)

After testing the 5 implemented components, create generators for:
- textarea, badge, radio, select, label, alert, tooltip, progress
- skeleton, spinner, tabs, dialog, dropdownMenu, accordion
- table, avatar, separator, breadcrumb, code, kbd, tag, toast
- scrollArea, container, stack, grid

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
