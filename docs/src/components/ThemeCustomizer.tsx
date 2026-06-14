import { useState, useEffect } from "react";
import "./ThemeCustomizer.css";

// A live editor for CZero's global design tokens. Everything here works by
// setting --cz-* CSS variables on :root — exactly how theming works in a real
// app. "Copy CSS" hands you the same variables to paste into your project.

interface TokenConfig {
  color: Record<string, string>; // stored as hex for the color picker
  radius: Record<string, string>;
  shadow: Record<string, string>;
  spacing: Record<string, string>;
  typography: { fontFamily: string; size: Record<string, string> };
}

const defaultConfig: TokenConfig = {
  color: {
    bg: "#ffffff",
    fg: "#1a1a2e",
    primary: "#3b5998",
    primaryFg: "#ffffff",
    secondary: "#f0f2f5",
    secondaryFg: "#1a1a2e",
    muted: "#f0f2f5",
    mutedFg: "#6b7280",
    danger: "#dc3545",
    dangerFg: "#ffffff",
    success: "#28a745",
    successFg: "#ffffff",
    warning: "#ffc107",
    warningFg: "#000000",
    border: "#e5e7eb",
    ring: "#3b5998",
  },
  radius: { none: "0", sm: "0.25rem", md: "0.5rem", lg: "0.75rem", xl: "1rem", full: "9999px" },
  shadow: {
    none: "none",
    sm: "0 1px 2px rgb(0 0 0 / 0.05)",
    md: "0 2px 4px rgb(0 0 0 / 0.08)",
    lg: "0 4px 12px rgb(0 0 0 / 0.12)",
  },
  spacing: { xs: "0.25rem", sm: "0.5rem", md: "0.75rem", lg: "1rem", xl: "1.5rem", "2xl": "2rem" },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    size: { xs: "0.75rem", sm: "0.875rem", md: "1rem", lg: "1.125rem", xl: "1.25rem" },
  },
};

const colorKeys = Object.keys(defaultConfig.color);

function hexToHsl(hex: string): string {
  if (!hex.startsWith("#") || hex.length < 7) return "0 0% 50%";
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

const RADIUS_PRESETS: Record<string, TokenConfig["radius"]> = {
  none: { none: "0", sm: "0", md: "0", lg: "0", xl: "0", full: "0" },
  sm: { none: "0", sm: "0.125rem", md: "0.25rem", lg: "0.375rem", xl: "0.5rem", full: "9999px" },
  md: { none: "0", sm: "0.25rem", md: "0.5rem", lg: "0.75rem", xl: "1rem", full: "9999px" },
  lg: { none: "0", sm: "0.375rem", md: "0.75rem", lg: "1rem", xl: "1.5rem", full: "9999px" },
  xl: { none: "0", sm: "0.5rem", md: "1rem", lg: "1.5rem", xl: "2rem", full: "9999px" },
};

const SHADOW_PRESETS: Record<string, TokenConfig["shadow"]> = {
  none: { none: "none", sm: "none", md: "none", lg: "none" },
  sm: { none: "none", sm: "0 1px 1px rgb(0 0 0 / 0.03)", md: "0 1px 2px rgb(0 0 0 / 0.05)", lg: "0 2px 4px rgb(0 0 0 / 0.08)" },
  md: { none: "none", sm: "0 1px 2px rgb(0 0 0 / 0.05)", md: "0 2px 4px rgb(0 0 0 / 0.08)", lg: "0 4px 8px rgb(0 0 0 / 0.12)" },
  lg: { none: "none", sm: "0 2px 4px rgb(0 0 0 / 0.08)", md: "0 4px 12px rgb(0 0 0 / 0.12)", lg: "0 8px 24px rgb(0 0 0 / 0.16)" },
};

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<TokenConfig>(defaultConfig);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["colors"]));

  // Apply tokens live by writing --cz-* variables onto :root.
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(config.color).forEach(([name, hex]) =>
      root.style.setProperty(`--cz-color-${name}`, hexToHsl(hex))
    );
    Object.entries(config.radius).forEach(([name, val]) =>
      root.style.setProperty(`--cz-radius-${name}`, val)
    );
    Object.entries(config.shadow).forEach(([name, val]) =>
      root.style.setProperty(`--cz-shadow-${name}`, val)
    );
    Object.entries(config.spacing).forEach(([name, val]) =>
      root.style.setProperty(`--cz-spacing-${name}`, val)
    );
    root.style.setProperty("--cz-font-fontFamily", config.typography.fontFamily);
    Object.entries(config.typography.size).forEach(([name, val]) =>
      root.style.setProperty(`--cz-font-size-${name}`, val)
    );
  }, [config]);

  const toggleSection = (s: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });

  const updateColor = (name: string, value: string) =>
    setConfig((p) => ({ ...p, color: { ...p.color, [name]: value } }));
  const updateValue = (cat: "radius" | "shadow" | "spacing", key: string, value: string) =>
    setConfig((p) => ({ ...p, [cat]: { ...p[cat], [key]: value } }));

  const copyCss = () => {
    const lines = [
      ...colorKeys.map((k) => `  --cz-color-${k}: ${hexToHsl(config.color[k])};`),
      ...Object.entries(config.radius).map(([k, v]) => `  --cz-radius-${k}: ${v};`),
      ...Object.entries(config.shadow).map(([k, v]) => `  --cz-shadow-${k}: ${v};`),
      ...Object.entries(config.spacing).map(([k, v]) => `  --cz-spacing-${k}: ${v};`),
      `  --cz-font-fontFamily: ${config.typography.fontFamily};`,
      ...Object.entries(config.typography.size).map(([k, v]) => `  --cz-font-size-${k}: ${v};`),
    ];
    navigator.clipboard.writeText(`:root {\n${lines.join("\n")}\n}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        className={`customizer-toggle ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Theme Customizer"
      >
        {isOpen ? "✕" : "🎨"}
      </button>

      <aside className={`customizer-sidebar ${isOpen ? "open" : ""}`}>
        <div className="customizer-header">
          <h3>Theme Customizer</h3>
          <span className="customizer-subtitle">Live · global tokens</span>
        </div>

        <div className="customizer-body">
          <Section title="🎨 Colors" expanded={expanded.has("colors")} onToggle={() => toggleSection("colors")}>
            <div className="adv-rows">
              {colorKeys.map((name) => (
                <div key={name} className="adv-row">
                  <input
                    type="color"
                    value={config.color[name]}
                    onChange={(e) => updateColor(name, e.target.value)}
                    className="adv-color"
                  />
                  <label>{name}</label>
                  <input
                    type="text"
                    value={config.color[name]}
                    onChange={(e) => updateColor(name, e.target.value)}
                    className="adv-input"
                  />
                </div>
              ))}
            </div>
          </Section>

          <Section title="📐 Radius" expanded={expanded.has("radius")} onToggle={() => toggleSection("radius")}>
            <div className="preset-row">
              {Object.entries(RADIUS_PRESETS).map(([key, values]) => (
                <button
                  key={key}
                  className={`preset-chip ${config.radius.md === values.md ? "active" : ""}`}
                  onClick={() => setConfig((p) => ({ ...p, radius: values }))}
                >
                  {key}
                </button>
              ))}
            </div>
          </Section>

          <Section title="🌑 Shadows" expanded={expanded.has("shadows")} onToggle={() => toggleSection("shadows")}>
            <div className="preset-row">
              {Object.entries(SHADOW_PRESETS).map(([key, values]) => (
                <button
                  key={key}
                  className={`preset-chip ${config.shadow.md === values.md ? "active" : ""}`}
                  onClick={() => setConfig((p) => ({ ...p, shadow: values }))}
                >
                  {key}
                </button>
              ))}
            </div>
          </Section>

          <Section title="📏 Spacing" expanded={expanded.has("spacing")} onToggle={() => toggleSection("spacing")}>
            {Object.entries(config.spacing).map(([name, val]) => (
              <div key={name} className="adv-row">
                <label>{name}</label>
                <input type="text" value={val} onChange={(e) => updateValue("spacing", name, e.target.value)} className="adv-input full" />
              </div>
            ))}
          </Section>

          <Section title="🔤 Typography" expanded={expanded.has("typography")} onToggle={() => toggleSection("typography")}>
            <div className="adv-row">
              <label>family</label>
              <input
                type="text"
                value={config.typography.fontFamily}
                onChange={(e) => setConfig((p) => ({ ...p, typography: { ...p.typography, fontFamily: e.target.value } }))}
                className="adv-input full"
              />
            </div>
            {Object.entries(config.typography.size).map(([name, val]) => (
              <div key={name} className="adv-row">
                <label>size {name}</label>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => setConfig((p) => ({ ...p, typography: { ...p.typography, size: { ...p.typography.size, [name]: e.target.value } } }))}
                  className="adv-input full"
                />
              </div>
            ))}
          </Section>
        </div>

        <div className="customizer-footer">
          <button className="action-btn" onClick={() => setConfig(defaultConfig)}>Reset</button>
          <button className="action-btn primary" onClick={copyCss}>
            {copied ? "✓ Copied!" : "Copy CSS"}
          </button>
        </div>
      </aside>

      {isOpen && <div className="customizer-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
}

function Section({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="cfg-section">
      <button className="cfg-section-header" onClick={onToggle}>
        <span>{title}</span>
        <span className="cfg-arrow">{expanded ? "▼" : "▶"}</span>
      </button>
      {expanded && <div className="cfg-section-body">{children}</div>}
    </div>
  );
}
