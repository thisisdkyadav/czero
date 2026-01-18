import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ThemeCustomizer.css";

// ===== FULL CONFIG SCHEMA FROM AGENT_GUIDE.md =====
interface FullConfig {
  // Global Tokens
  color: Record<string, string>;
  radius: Record<string, string>;
  shadow: Record<string, string>;
  spacing: Record<string, string>;
  typography: {
    fontFamily: string;
    size: Record<string, string>;
    weight: Record<string, string>;
    lineHeight: Record<string, string>;
  };
  transition: Record<string, string>;
  // Component Tokens
  components: {
    button: { height: Record<string, string>; paddingX: Record<string, string>; borderRadius: string };
    input: { height: Record<string, string>; borderRadius: string };
    card: { padding: string; borderRadius: string; shadow: string };
  };
}

const defaultConfig: FullConfig = {
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
    fontFamily: "Inter, system-ui, sans-serif",
    size: { xs: "0.75rem", sm: "0.875rem", md: "1rem", lg: "1.125rem", xl: "1.25rem" },
    weight: { normal: "400", medium: "500", semibold: "600", bold: "700" },
    lineHeight: { tight: "1.25", normal: "1.5", relaxed: "1.75" },
  },
  transition: { fast: "150ms ease", normal: "200ms ease", slow: "300ms ease" },
  components: {
    button: { height: { sm: "2rem", md: "2.5rem", lg: "3rem" }, paddingX: { sm: "0.75rem", md: "1rem", lg: "1.5rem" }, borderRadius: "0.5rem" },
    input: { height: { sm: "2rem", md: "2.5rem", lg: "3rem" }, borderRadius: "0.5rem" },
    card: { padding: "1rem", borderRadius: "0.75rem", shadow: "0 1px 2px rgb(0 0 0 / 0.05)" },
  },
};

// ===== HELPERS =====
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

// ===== COMPONENT =====
export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"basic" | "advanced">("basic");
  const [config, setConfig] = useState<FullConfig>(defaultConfig);
  const [copied, setCopied] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["colors"]));
  
  const location = useLocation();
  const currentComponent = location.pathname.split("/").pop() || "";

  // Apply CSS variables
  useEffect(() => {
    const root = document.documentElement;
    
    // Colors
    Object.entries(config.color).forEach(([name, hex]) => {
      try { root.style.setProperty(`--cz-color-${name}`, hexToHsl(hex)); } catch {}
    });
    
    // Radius
    Object.entries(config.radius).forEach(([name, val]) => {
      root.style.setProperty(`--cz-radius-${name}`, val);
    });
    
    // Spacing
    Object.entries(config.spacing).forEach(([name, val]) => {
      root.style.setProperty(`--cz-spacing-${name}`, val);
    });
    
    // Shadow
    Object.entries(config.shadow).forEach(([name, val]) => {
      root.style.setProperty(`--cz-shadow-${name}`, val);
    });
    
    // Typography
    root.style.setProperty("--cz-font-family", config.typography.fontFamily);
    Object.entries(config.typography.size).forEach(([name, val]) => {
      root.style.setProperty(`--cz-font-size-${name}`, val);
    });
  }, [config]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  const updateColor = (name: string, value: string) => {
    setConfig(prev => ({ ...prev, color: { ...prev.color, [name]: value } }));
  };

  const updateValue = (category: keyof FullConfig, key: string, value: string) => {
    setConfig(prev => ({ ...prev, [category]: { ...(prev[category] as Record<string, string>), [key]: value } }));
  };

  const resetAll = () => {
    setConfig(defaultConfig);
  };

  const generateConfig = () => {
    const colorEntries = Object.entries(config.color).map(([k, v]) => 
      `    ${k}: { light: "${hexToHsl(v)}", dark: "${hexToHsl(v)}" }`
    ).join(",\n");
    
    const configStr = `// czero.config.js
export default {
  color: {
${colorEntries}
  },
  radius: ${JSON.stringify(config.radius, null, 4).replace(/"/g, '"')},
  shadow: ${JSON.stringify(config.shadow, null, 4).replace(/"/g, '"')},
  spacing: ${JSON.stringify(config.spacing, null, 4).replace(/"/g, '"')},
  typography: {
    fontFamily: "${config.typography.fontFamily}",
    size: ${JSON.stringify(config.typography.size, null, 6)},
    weight: ${JSON.stringify(config.typography.weight, null, 6)},
    lineHeight: ${JSON.stringify(config.typography.lineHeight, null, 6)},
  },
  transition: ${JSON.stringify(config.transition, null, 4)},
  components: {
    button: {
      height: ${JSON.stringify(config.components.button.height)},
      paddingX: ${JSON.stringify(config.components.button.paddingX)},
      borderRadius: "${config.components.button.borderRadius}",
    },
    input: {
      height: ${JSON.stringify(config.components.input.height)},
      borderRadius: "${config.components.input.borderRadius}",
    },
    card: {
      padding: "${config.components.card.padding}",
      borderRadius: "${config.components.card.borderRadius}",
      shadow: "${config.components.card.shadow}",
    },
  },
};`;
    navigator.clipboard.writeText(configStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const colorKeys = ["bg", "fg", "primary", "primaryFg", "secondary", "secondaryFg", "muted", "mutedFg", "danger", "dangerFg", "success", "successFg", "warning", "warningFg", "border", "ring"];

  return (
    <>
      <button className={`customizer-toggle ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)} title="Theme Customizer">
        {isOpen ? "✕" : "🎨"}
      </button>

      <aside className={`customizer-sidebar ${isOpen ? "open" : ""}`}>
        <div className="customizer-header">
          <h3>Theme Customizer</h3>
          <select value={mode} onChange={(e) => setMode(e.target.value as "basic" | "advanced")} className="mode-select">
            <option value="basic">Basic</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="customizer-body">
          {/* ===== BASIC MODE ===== */}
          {mode === "basic" && (
            <>
              <Section title="🎨 Colors" expanded={expandedSections.has("colors")} onToggle={() => toggleSection("colors")}>
                <div className="color-grid">
                  {["primary", "secondary", "danger", "success", "warning", "border"].map((name) => (
                    <div key={name} className="color-item">
                      <input type="color" value={config.color[name]} onChange={(e) => updateColor(name, e.target.value)} />
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="📐 Radius" expanded={expandedSections.has("radius")} onToggle={() => toggleSection("radius")}>
                <div className="preset-row">
                  {["none", "sm", "md", "lg", "xl", "full"].map((r) => (
                    <button key={r} className={`preset-chip ${config.radius.md === defaultConfig.radius[r as keyof typeof defaultConfig.radius] ? "active" : ""}`}
                      onClick={() => setConfig(prev => ({ ...prev, radius: { ...defaultConfig.radius } }))}>{r}</button>
                  ))}
                </div>
              </Section>

              <Section title="🌑 Shadows" expanded={expandedSections.has("shadows")} onToggle={() => toggleSection("shadows")}>
                <div className="preset-row">
                  {["none", "sm", "md", "lg"].map((s) => (
                    <button key={s} className="preset-chip" onClick={() => {}}>{s}</button>
                  ))}
                </div>
              </Section>
            </>
          )}

          {/* ===== ADVANCED MODE ===== */}
          {mode === "advanced" && (
            <>
              <Section title="🎨 Colors (16)" expanded={expandedSections.has("colors")} onToggle={() => toggleSection("colors")}>
                {colorKeys.map((name) => (
                  <div key={name} className="adv-row">
                    <input type="color" value={config.color[name]} onChange={(e) => updateColor(name, e.target.value)} className="adv-color" />
                    <label>{name}</label>
                    <input type="text" value={config.color[name]} onChange={(e) => updateColor(name, e.target.value)} className="adv-input" />
                  </div>
                ))}
              </Section>

              <Section title="📐 Radius" expanded={expandedSections.has("radius")} onToggle={() => toggleSection("radius")}>
                {Object.entries(config.radius).map(([name, val]) => (
                  <div key={name} className="adv-row">
                    <label>{name}</label>
                    <input type="text" value={val} onChange={(e) => updateValue("radius", name, e.target.value)} className="adv-input full" />
                  </div>
                ))}
              </Section>

              <Section title="📏 Spacing" expanded={expandedSections.has("spacing")} onToggle={() => toggleSection("spacing")}>
                {Object.entries(config.spacing).map(([name, val]) => (
                  <div key={name} className="adv-row">
                    <label>{name}</label>
                    <input type="text" value={val} onChange={(e) => updateValue("spacing", name, e.target.value)} className="adv-input full" />
                  </div>
                ))}
              </Section>

              <Section title="🌑 Shadows" expanded={expandedSections.has("shadow")} onToggle={() => toggleSection("shadow")}>
                {Object.entries(config.shadow).map(([name, val]) => (
                  <div key={name} className="adv-row">
                    <label>{name}</label>
                    <input type="text" value={val} onChange={(e) => updateValue("shadow", name, e.target.value)} className="adv-input full" />
                  </div>
                ))}
              </Section>

              <Section title="🔤 Typography" expanded={expandedSections.has("typography")} onToggle={() => toggleSection("typography")}>
                <div className="adv-row">
                  <label>fontFamily</label>
                  <input type="text" value={config.typography.fontFamily} 
                    onChange={(e) => setConfig(prev => ({ ...prev, typography: { ...prev.typography, fontFamily: e.target.value } }))} 
                    className="adv-input full" />
                </div>
                <div className="sub-section">Font Sizes</div>
                {Object.entries(config.typography.size).map(([name, val]) => (
                  <div key={name} className="adv-row">
                    <label>{name}</label>
                    <input type="text" value={val} 
                      onChange={(e) => setConfig(prev => ({ ...prev, typography: { ...prev.typography, size: { ...prev.typography.size, [name]: e.target.value } } }))} 
                      className="adv-input full" />
                  </div>
                ))}
                <div className="sub-section">Font Weights</div>
                {Object.entries(config.typography.weight).map(([name, val]) => (
                  <div key={name} className="adv-row">
                    <label>{name}</label>
                    <input type="text" value={val} 
                      onChange={(e) => setConfig(prev => ({ ...prev, typography: { ...prev.typography, weight: { ...prev.typography.weight, [name]: e.target.value } } }))} 
                      className="adv-input full" />
                  </div>
                ))}
              </Section>

              <Section title="⏱️ Transitions" expanded={expandedSections.has("transition")} onToggle={() => toggleSection("transition")}>
                {Object.entries(config.transition).map(([name, val]) => (
                  <div key={name} className="adv-row">
                    <label>{name}</label>
                    <input type="text" value={val} onChange={(e) => updateValue("transition", name, e.target.value)} className="adv-input full" />
                  </div>
                ))}
              </Section>

              {/* Component: Button */}
              {(currentComponent === "button" || currentComponent === "components") && (
                <Section title="🔘 Button Component" expanded={expandedSections.has("button")} onToggle={() => toggleSection("button")}>
                  <div className="sub-section">Heights</div>
                  {Object.entries(config.components.button.height).map(([name, val]) => (
                    <div key={name} className="adv-row">
                      <label>{name}</label>
                      <input type="text" value={val} 
                        onChange={(e) => setConfig(prev => ({ ...prev, components: { ...prev.components, button: { ...prev.components.button, height: { ...prev.components.button.height, [name]: e.target.value } } } }))} 
                        className="adv-input full" />
                    </div>
                  ))}
                  <div className="sub-section">Padding X</div>
                  {Object.entries(config.components.button.paddingX).map(([name, val]) => (
                    <div key={name} className="adv-row">
                      <label>{name}</label>
                      <input type="text" value={val} 
                        onChange={(e) => setConfig(prev => ({ ...prev, components: { ...prev.components, button: { ...prev.components.button, paddingX: { ...prev.components.button.paddingX, [name]: e.target.value } } } }))} 
                        className="adv-input full" />
                    </div>
                  ))}
                  <div className="adv-row">
                    <label>borderRadius</label>
                    <input type="text" value={config.components.button.borderRadius} 
                      onChange={(e) => setConfig(prev => ({ ...prev, components: { ...prev.components, button: { ...prev.components.button, borderRadius: e.target.value } } }))} 
                      className="adv-input full" />
                  </div>
                </Section>
              )}

              {/* Component: Card */}
              {currentComponent === "card" && (
                <Section title="🃏 Card Component" expanded={expandedSections.has("card")} onToggle={() => toggleSection("card")}>
                  <div className="adv-row">
                    <label>padding</label>
                    <input type="text" value={config.components.card.padding} 
                      onChange={(e) => setConfig(prev => ({ ...prev, components: { ...prev.components, card: { ...prev.components.card, padding: e.target.value } } }))} 
                      className="adv-input full" />
                  </div>
                  <div className="adv-row">
                    <label>borderRadius</label>
                    <input type="text" value={config.components.card.borderRadius} 
                      onChange={(e) => setConfig(prev => ({ ...prev, components: { ...prev.components, card: { ...prev.components.card, borderRadius: e.target.value } } }))} 
                      className="adv-input full" />
                  </div>
                </Section>
              )}

              {/* Component: Input */}
              {currentComponent === "input" && (
                <Section title="📝 Input Component" expanded={expandedSections.has("input")} onToggle={() => toggleSection("input")}>
                  <div className="sub-section">Heights</div>
                  {Object.entries(config.components.input.height).map(([name, val]) => (
                    <div key={name} className="adv-row">
                      <label>{name}</label>
                      <input type="text" value={val} 
                        onChange={(e) => setConfig(prev => ({ ...prev, components: { ...prev.components, input: { ...prev.components.input, height: { ...prev.components.input.height, [name]: e.target.value } } } }))} 
                        className="adv-input full" />
                    </div>
                  ))}
                </Section>
              )}
            </>
          )}
        </div>

        <div className="customizer-footer">
          <button className="action-btn" onClick={resetAll}>Reset</button>
          <button className="action-btn primary" onClick={generateConfig}>
            {copied ? "✓ Copied!" : "Copy Config"}
          </button>
        </div>
      </aside>

      {isOpen && <div className="customizer-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
}

// ===== Collapsible Section Component =====
function Section({ title, expanded, onToggle, children }: { title: string; expanded: boolean; onToggle: () => void; children: React.ReactNode }) {
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
