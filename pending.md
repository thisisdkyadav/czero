# CZero — Pending Components for Initial Release

> Components and utilities recommended before v1.0 release.
> 
> **Last Updated:** January 16, 2026

---

## 📊 Current Status

- **Available Components:** 33
- **Pending Components:** 15
- **Pending Hooks/Utilities:** 4

---

## 🔴 High Priority (Must Have)

Essential components that users expect from any modern component library.

### Typography System

| Component | Description | Complexity |
|-----------|-------------|------------|
| `Heading` | Semantic headings (h1-h6) with size, weight, and color variants | Low |
| `Text` | Body text with variants (lead, muted, small, code inline) | Low |
| `Link` | Styled anchor with hover states, external link indicator | Low |

### Form Components

| Component | Description | Complexity |
|-----------|-------------|------------|
| `FormField` | Wrapper combining label, input, helper text, and error message | Medium |
| `Slider` | Range input with single/dual handles, marks, and tooltips | High |
| `DatePicker` | Calendar-based date selection (consider using a headless lib) | High |

### Overlay & Feedback

| Component | Description | Complexity |
|-----------|-------------|------------|
| `Popover` | Generic positioned overlay (base for tooltips, dropdowns) | Medium |
| `Sheet` | Slide-in panel from edges (mobile-friendly alternative to dialog) | Medium |
| `AlertDialog` | Confirmation dialog with required action (non-dismissible) | Low |

---

## 🟡 Medium Priority (Should Have)

Components that significantly improve library completeness.

### Navigation

| Component | Description | Complexity |
|-----------|-------------|------------|
| `Pagination` | Page navigation with prev/next, page numbers, ellipsis | Medium |
| `NavigationMenu` | Multi-level nav with dropdowns (for headers) | High |
| `Command` | Command palette / search with keyboard navigation (⌘K style) | High |

### Data Display

| Component | Description | Complexity |
|-----------|-------------|------------|
| `DataTable` | Enhanced table with sorting, filtering, pagination built-in | High |
| `List` | Styled list items with icons, actions, and dividers | Low |

### Utility

| Component | Description | Complexity |
|-----------|-------------|------------|
| `Collapsible` | Simple expand/collapse container (simpler than Accordion) | Low |

---

## 🟢 Low Priority (Nice to Have)

Components that can be added post-launch but would enhance the library.

### Display

| Component | Description | Complexity |
|-----------|-------------|------------|
| `Callout` | Highlighted information block (similar to Alert but for docs) | Low |
| `EmptyState` | Placeholder for empty lists/tables with icon and action | Low |
| `Timeline` | Vertical timeline for events/history display | Medium |

### Form

| Component | Description | Complexity |
|-----------|-------------|------------|
| `NumberInput` | Numeric input with increment/decrement buttons | Medium |
| `FileUpload` | Drag-and-drop file upload with preview | High |
| `ColorPicker` | Color selection input with swatches and custom input | High |

### Layout

| Component | Description | Complexity |
|-----------|-------------|------------|
| `Resizable` | Resizable panels with drag handles | High |
| `Drawer` | Alternative to Sheet, typically for mobile navigation | Medium |

---

## 🔧 Hooks & Utilities

> **Note**: After analyzing the current codebase, CZero uses **pure CSS with semantic class names** (e.g., `cz-btn`, `cz-card`), NOT Tailwind utilities. This means `cn` (tailwind-merge) is **NOT needed**.

| Name | Description | Priority | Status |
|------|-------------|----------|--------|
| `useTheme` | Runtime dark/light mode toggle with system preference detection | 🔴 High | Required |
| `useMediaQuery` | Responsive breakpoint detection hook | 🟡 Medium | Optional |
| `useClickOutside` | Detect clicks outside an element | 🟢 Low | Optional (already inline in components) |
| ~~`cn`~~ | ~~Class name merge utility~~ | — | ❌ Not needed (no Tailwind conflicts to resolve) |

---

## 📦 Recommended Initial Release Scope

For a solid v1.0 release, I recommend implementing at minimum:

### Must Complete (8 items)
1. ✅ `Heading` — Typography
2. ✅ `Text` — Typography  
3. ✅ `Link` — Typography
4. ✅ `FormField` — Form wrapper
5. ✅ `Popover` — Base overlay
6. ✅ `Sheet` — Mobile-friendly panel
7. ✅ `AlertDialog` — Confirmation dialogs
8. ✅ `useTheme` — Theme switching hook

### Should Complete (4 items)
9. ⬜ `Pagination` — Table/list navigation
10. ⬜ `Collapsible` — Simple expand/collapse
11. ⬜ `List` — Styled lists
12. ⬜ `useMediaQuery` — Responsive hook

---

## 📋 Implementation Checklist

```
Typography
[ ] Heading
[ ] Text
[ ] Link

Forms
[ ] FormField
[ ] Slider
[ ] DatePicker

Overlays
[ ] Popover
[ ] Sheet
[ ] AlertDialog

Navigation
[ ] Pagination
[ ] NavigationMenu
[ ] Command

Data Display
[ ] DataTable
[ ] List

Utility
[ ] Collapsible

Hooks
[ ] useTheme (required)
[ ] useMediaQuery (optional)
[ ] useClickOutside (optional)
```

---

## 💡 Notes

1. **Radix UI Integration** — Components like `Popover`, `Sheet`, `AlertDialog`, and `Collapsible` have Radix primitives that can accelerate development.

2. **DatePicker Consideration** — Consider integrating with `react-day-picker` or building on top of Radix's calendar primitives rather than building from scratch.

3. **Command Palette** — This is increasingly expected in modern apps. Consider building on `cmdk` library for accessibility.

4. **DataTable** — This is complex. Consider making it composable (headless) rather than a monolithic component.

5. **Theme Hook** — Should support:
   - System preference detection (`prefers-color-scheme`)
   - LocalStorage persistence
   - SSR compatibility (avoid hydration mismatch)
