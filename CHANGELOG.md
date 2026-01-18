# Changelog

All notable changes to CZero will be documented in this file.

---

## [2.0.0] - 2026-01-18

### 🎉 Major Release

This is the first public release of CZero — a design-token-driven React component library built on Radix UI primitives.

### ✨ Features

#### Components (33 Total)
- **Forms**: Button, Input, Textarea, Select, Checkbox, Switch, RadioGroup, Label
- **Display**: Card, Badge, Tag, Avatar, Separator, Code, Kbd
- **Overlay**: Dialog, AlertDialog, DropdownMenu, Tooltip, Toast
- **Feedback**: Alert, Progress, Skeleton, Spinner
- **Navigation**: Tabs, Accordion, Breadcrumb
- **Data**: Table
- **Layout**: Stack, Grid, Container, AspectRatio, ScrollArea, VisuallyHidden

#### Design Token System
- Full configuration via `czero.config.js`
- CSS variable-based theming (`--cz-*` prefix)
- Dark mode support (`.dark` class)
- Component-level customization with token references (`$color-primary`)

#### CLI Tool
- `npx czero build` - Generate CSS from config
- `--preset` flag for built-in themes
- `--config` and `--output` options

#### Theme Presets (6)
- `compact` - Smaller spacing and sizes
- `comfortable` - Larger, spacious layout
- `rounded` - Large border radii
- `sharp` - Square corners
- `minimal` - Subtle, muted styling
- `vibrant` - Bold, saturated colors

#### Documentation Site
- Live Theme Customizer with Basic/Advanced modes
- Component pages with code examples
- Copy buttons on all code snippets
- Presets documentation page

### 🔧 Technical
- Built on Radix UI primitives for accessibility
- Full TypeScript support with declarations
- Tree-shakeable ESM + CJS bundles
- Zero runtime styling (generated CSS only)

---

## Links

- **Repository**: https://github.com/thisisdkyadav/czero
- **Documentation**: https://czero-docs.vercel.app
