import { useState, useEffect, useMemo } from "react";
import { Button, Input, Switch, Checkbox, Badge } from "../../../src/react";
import "./ThemeCustomizer.css";

/* ------------------------------------------------------------------
   Live theme editor — the proof of czero's thesis: change one token,
   every component follows. It writes real --cz-* variables into a
   single <style> element with proper :root + .dark blocks, so the
   whole site re-skins live AND dark mode keeps cascading. The exact
   CSS it injects is the CSS it hands you to copy.
   ------------------------------------------------------------------ */

const STYLE_ID = "cz-customizer-overrides";

type Accent = { name: string; light: string; dark: string };
type Radius = { name: string; sm: string; md: string; lg: string; xl: string };
type Font = { name: string; stack: string };

const ACCENTS: Accent[] = [
  { name: "Blue", light: "217 87% 53%", dark: "214 100% 66%" },
  { name: "Indigo", light: "243 75% 59%", dark: "245 90% 72%" },
  { name: "Violet", light: "262 83% 62%", dark: "264 90% 74%" },
  { name: "Teal", light: "178 70% 38%", dark: "176 70% 50%" },
  { name: "Emerald", light: "158 68% 40%", dark: "156 70% 52%" },
  { name: "Amber", light: "33 92% 50%", dark: "36 95% 60%" },
  { name: "Rose", light: "342 79% 56%", dark: "344 90% 68%" },
  { name: "Slate", light: "220 14% 40%", dark: "220 14% 62%" },
];

const RADII: Radius[] = [
  { name: "Sharp", sm: "0", md: "0", lg: "0", xl: "0" },
  { name: "Subtle", sm: "0.1875rem", md: "0.3125rem", lg: "0.4375rem", xl: "0.5rem" },
  { name: "Rounded", sm: "0.25rem", md: "0.5rem", lg: "0.75rem", xl: "1rem" },
  { name: "Round", sm: "0.5rem", md: "0.875rem", lg: "1.25rem", xl: "1.5rem" },
];

const FONTS: Font[] = [
  { name: "System", stack: "system-ui, -apple-system, sans-serif" },
  { name: "Inter", stack: "Inter, system-ui, sans-serif" },
  { name: "Grotesk", stack: '"Space Grotesk", system-ui, sans-serif' },
  { name: "Mono", stack: '"JetBrains Mono", ui-monospace, monospace' },
];

const DEFAULT_ACCENT = ACCENTS[0];
const DEFAULT_RADIUS = RADII[2];
const DEFAULT_FONT = FONTS[1];

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  let r = 0, g = 0, b = 0;
  if (hex.length >= 7) {
    r = parseInt(hex.slice(1, 3), 16) / 255;
    g = parseInt(hex.slice(3, 5), 16) / 255;
    b = parseInt(hex.slice(5, 7), 16) / 255;
  }
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
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// Derive a custom accent's light + dark HSL strings from a single hex.
function accentFromHex(hex: string): Accent {
  const { h, s, l } = hexToHsl(hex);
  const light = `${h} ${s}% ${l}%`;
  const darkL = Math.min(Math.max(l + 10, 58), 74);
  const dark = `${h} ${Math.min(s + 6, 100)}% ${darkL}%`;
  return { name: "Custom", light, dark };
}

export default function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState<Accent>(DEFAULT_ACCENT);
  const [radius, setRadius] = useState<Radius>(DEFAULT_RADIUS);
  const [font, setFont] = useState<Font>(DEFAULT_FONT);
  const [custom, setCustom] = useState("#1e6cf0");
  const [copied, setCopied] = useState(false);

  // demo state for the in-panel preview
  const [demoSwitch, setDemoSwitch] = useState(true);
  const [demoCheck, setDemoCheck] = useState(true);

  const dirty =
    accent.name !== DEFAULT_ACCENT.name ||
    accent.light !== DEFAULT_ACCENT.light ||
    radius.name !== DEFAULT_RADIUS.name ||
    font.name !== DEFAULT_FONT.name;

  const css = useMemo(
    () =>
      `:root {
  --cz-color-primary: ${accent.light};
  --cz-color-ring: ${accent.light};
  --cz-radius-sm: ${radius.sm};
  --cz-radius-md: ${radius.md};
  --cz-radius-lg: ${radius.lg};
  --cz-radius-xl: ${radius.xl};
  --cz-font-fontFamily: ${font.stack};
}
.dark {
  --cz-color-primary: ${accent.dark};
  --cz-color-ring: ${accent.dark};
}`,
    [accent, radius, font]
  );

  // Inject (or remove) the override stylesheet. Because it's a real <style>
  // with :root + .dark rules — not inline styles on <html> — dark mode keeps
  // working, and on mount (not dirty) we touch nothing.
  useEffect(() => {
    const existing = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!dirty) {
      existing?.remove();
      return;
    }
    const el = existing ?? document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = css;
    if (!existing) document.head.appendChild(el);
  }, [css, dirty]);

  const reset = () => {
    setAccent(DEFAULT_ACCENT);
    setRadius(DEFAULT_RADIUS);
    setFont(DEFAULT_FONT);
  };

  const copy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      {!open && (
        <button className="czc-trigger" onClick={() => setOpen(true)} aria-label="Open theme customizer">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h12M18 18h2" />
            <circle cx="16" cy="6" r="2" fill="currentColor" stroke="none" />
            <circle cx="8" cy="12" r="2" fill="currentColor" stroke="none" />
            <circle cx="16" cy="18" r="2" fill="currentColor" stroke="none" />
          </svg>
          <span>Customize</span>
          {dirty && <span className="czc-trigger-dot" aria-hidden="true" />}
        </button>
      )}

      <aside className={`czc ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <header className="czc-head">
          <div>
            <span className="czc-eyebrow">Live theme</span>
            <h3 className="czc-title">Make it yours</h3>
          </div>
          <button className="czc-close" onClick={() => setOpen(false)} aria-label="Close customizer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </header>

        <div className="czc-scroll">
          {/* live preview — real components, re-skinning as you turn knobs */}
          <section className="czc-stage" aria-label="Live preview">
            <div className="czc-stage-row">
              <Button variant="primary" size="sm">Primary</Button>
              <Button variant="outline" size="sm">Outline</Button>
            </div>
            <Input placeholder="you@example.com" />
            <div className="czc-stage-row">
              <Switch checked={demoSwitch} onCheckedChange={setDemoSwitch} />
              <Checkbox checked={demoCheck} onCheckedChange={(v) => setDemoCheck(v === true)} />
              <Badge variant="primary">Shipped</Badge>
            </div>
          </section>

          {/* accent */}
          <section className="czc-block">
            <div className="czc-label">Accent</div>
            <div className="czc-swatches">
              {ACCENTS.map((a) => (
                <button
                  key={a.name}
                  className={`czc-swatch ${accent.name === a.name ? "is-active" : ""}`}
                  style={{ background: `hsl(${a.light})` }}
                  onClick={() => setAccent(a)}
                  title={a.name}
                  aria-label={a.name}
                  aria-pressed={accent.name === a.name}
                />
              ))}
              <label
                className={`czc-swatch czc-swatch-custom ${accent.name === "Custom" ? "is-active" : ""}`}
                title="Custom color"
              >
                <input
                  type="color"
                  value={custom}
                  onChange={(e) => {
                    setCustom(e.target.value);
                    setAccent(accentFromHex(e.target.value));
                  }}
                  aria-label="Custom accent color"
                />
              </label>
            </div>
          </section>

          {/* radius */}
          <section className="czc-block">
            <div className="czc-label">Radius</div>
            <div className="czc-seg">
              {RADII.map((r) => (
                <button
                  key={r.name}
                  className={`czc-seg-btn ${radius.name === r.name ? "is-active" : ""}`}
                  onClick={() => setRadius(r)}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </section>

          {/* font */}
          <section className="czc-block">
            <div className="czc-label">Font</div>
            <div className="czc-seg">
              {FONTS.map((f) => (
                <button
                  key={f.name}
                  className={`czc-seg-btn ${font.name === f.name ? "is-active" : ""}`}
                  style={{ fontFamily: f.stack }}
                  onClick={() => setFont(f)}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </section>

          {/* generated css */}
          <section className="czc-block">
            <div className="czc-label-row">
              <span className="czc-label">Your theme</span>
              <button className={`czc-copy ${copied ? "is-copied" : ""}`} onClick={copy}>
                {copied ? "Copied" : "Copy CSS"}
              </button>
            </div>
            <pre className="czc-code"><code>{css}</code></pre>
          </section>
        </div>

        <footer className="czc-foot">
          <button className="czc-reset" onClick={reset} disabled={!dirty}>Reset</button>
          <span className="czc-hint">Applies across the whole site</span>
        </footer>
      </aside>

      {open && <div className="czc-overlay" onClick={() => setOpen(false)} />}
    </>
  );
}
