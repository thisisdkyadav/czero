# CZero — Development Roadmap

> **Future development priorities and suggestions**
> 
> Last Updated: January 17, 2026

---

## 🔥 High Priority

### 1. Theme Presets
Finalize and document pre-built theme configurations:
- `compact` — Smaller sizes, tighter spacing
- `comfortable` — Larger, more spacious
- `rounded` — Full border radius everywhere
- `sharp` — Square corners
- `minimal` — Subtle colors, less visual noise

**Usage:** `preset: "compact"` in config

---

### 2. Documentation Website Polish
- [ ] Live theme customizer (adjust tokens, see changes in real-time)
- [ ] Code copy buttons on all examples
- [ ] Prop tables for each component page
- [ ] Improved mobile responsiveness

---

### 3. Responsive Breakpoint System
Add responsive overrides to config:
```js
components: {
  button: {
    responsive: {
      sm: { height: { sm: "1.75rem", md: "2rem" } },
    },
  },
}
```

---

## 🧩 Medium Priority

### 4. Animation System
Configurable animations for Dialog, Toast, Dropdown:
```js
animation: {
  fadeIn: { duration: "200ms", timing: "ease-out" },
  slideUp: { duration: "300ms", timing: "ease" },
}
```

---

### 5. Form Components Enhancement
- [ ] Form component with validation context
- [ ] Better error message handling
- [ ] react-hook-form / formik integration

---

### 6. Missing Components
- [ ] Popover — Floating click-triggered content
- [ ] Collapsible — Expandable sections
- [ ] Slider — Range input
- [ ] ContextMenu — Right-click menu
- [ ] HoverCard — Preview cards on hover

---

## 📦 Lower Priority

### 7. Storybook Integration
- [ ] Component playground
- [ ] Visual regression testing
- [ ] Isolated development

---

### 8. Package Publishing (npm)
- [ ] Finalize README.md
- [ ] Add CHANGELOG.md
- [ ] Set up versioning (semver)
- [ ] CI/CD for publishing

---

### 9. Command Palette (⌘K)
Searchable command menu component

---

## Top 3 Immediate Actions

| Rank | Task | Reason |
|------|------|--------|
| **1** | Theme Presets | Already half-done, quick win |
| **2** | Live Theme Customizer | Great for docs, helps users |
| **3** | Responsive Breakpoints | Completes config system |
