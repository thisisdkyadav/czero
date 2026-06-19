import { useState, useEffect, useMemo, type ReactNode } from "react";
import { Button, Input, Switch, Checkbox, Badge } from "../../../src/react";
import { useTheme } from "../../../src/react/hooks/use-theme";
import "./ThemeCustomizer.css";

/* ------------------------------------------------------------------
   Live theme editor. Writes real --cz-* variables into one <style>
   with proper :root + .dark blocks, so the whole site re-skins live
   AND dark mode keeps cascading. The CSS it injects is the CSS you copy.

   State is three flat maps keyed by css-var suffix (everything after
   "--cz-"):  shared (radius/spacing/font — theme-independent),
   light + dark (color tokens, per theme).
   ------------------------------------------------------------------ */

const STYLE_ID = "cz-customizer-overrides";
type Vars = Record<string, string>;

interface Props {
  /** Permanently docked as a right rail (wide screens). */
  docked: boolean;
  /** Drawer is open (narrow screens). */
  open: boolean;
  /** Pill clicked — re-dock (wide) or open drawer (narrow). */
  onOpen: () => void;
  /** Header button — collapse the rail (wide) or close the drawer (narrow). */
  onClose: () => void;
}

/* ---- presets (simple mode) ---- */
const ACCENTS = [
  { name: "Blue", light: "217 87% 53%", dark: "214 100% 66%" },
  { name: "Indigo", light: "243 75% 59%", dark: "245 90% 72%" },
  { name: "Violet", light: "262 83% 62%", dark: "264 90% 74%" },
  { name: "Teal", light: "178 70% 38%", dark: "176 70% 50%" },
  { name: "Emerald", light: "158 68% 40%", dark: "156 70% 52%" },
  { name: "Amber", light: "33 92% 50%", dark: "36 95% 60%" },
  { name: "Rose", light: "342 79% 56%", dark: "344 90% 68%" },
  { name: "Slate", light: "220 14% 40%", dark: "220 14% 62%" },
];
const RADII = [
  { name: "Sharp", sm: "0", md: "0", lg: "0", xl: "0" },
  { name: "Subtle", sm: "0.1875rem", md: "0.3125rem", lg: "0.4375rem", xl: "0.5rem" },
  { name: "Rounded", sm: "0.25rem", md: "0.5rem", lg: "0.75rem", xl: "1rem" },
  { name: "Round", sm: "0.5rem", md: "0.875rem", lg: "1.25rem", xl: "1.5rem" },
];
const FONTS = [
  { name: "System", stack: "system-ui, -apple-system, sans-serif" },
  { name: "Inter", stack: "Inter, system-ui, sans-serif" },
  { name: "Grotesk", stack: '"Space Grotesk", system-ui, sans-serif' },
  { name: "Mono", stack: '"JetBrains Mono", ui-monospace, monospace' },
];

/* ---- advanced token lists ---- */
const COLOR_TOKENS = [
  ["primary", "Primary"], ["primaryFg", "Primary text"],
  ["secondary", "Secondary"], ["secondaryFg", "Secondary text"],
  ["muted", "Muted"], ["mutedFg", "Muted text"],
  ["border", "Border"],
  ["danger", "Danger"], ["success", "Success"], ["warning", "Warning"],
  ["bg", "Background"], ["fg", "Foreground"],
] as const;
const RADIUS_TOKENS = ["none", "sm", "md", "lg", "xl", "full"];
const SPACING_TOKENS = ["xs", "sm", "md", "lg", "xl", "2xl"];
const SIZE_TOKENS = ["xs", "sm", "md", "lg", "xl"];

/* ---- defaults (match what the docs actually render) ---- */
const DEF_LIGHT: Vars = {
  "color-bg": "0 0% 100%", "color-fg": "220 15% 10%",
  "color-primary": "217 87% 53%", "color-primaryFg": "0 0% 100%",
  "color-secondary": "220 10% 95%", "color-secondaryFg": "220 15% 10%",
  "color-muted": "220 10% 95%", "color-mutedFg": "220 10% 40%",
  "color-danger": "0 70% 55%", "color-success": "142 70% 45%", "color-warning": "38 92% 50%",
  "color-border": "220 13% 90%",
};
const DEF_DARK: Vars = {
  "color-bg": "220 40% 3%", "color-fg": "210 40% 96%",
  "color-primary": "214 100% 66%", "color-primaryFg": "220 40% 3%",
  "color-secondary": "220 8% 25%", "color-secondaryFg": "210 40% 96%",
  "color-muted": "220 8% 20%", "color-mutedFg": "220 10% 60%",
  "color-danger": "0 80% 65%", "color-success": "142 70% 55%", "color-warning": "38 92% 60%",
  "color-border": "220 10% 20%",
};
const DEF_SHARED: Vars = {
  "radius-none": "0", "radius-sm": "0.25rem", "radius-md": "0.5rem",
  "radius-lg": "0.75rem", "radius-xl": "1rem", "radius-full": "9999px",
  "spacing-xs": "0.25rem", "spacing-sm": "0.5rem", "spacing-md": "0.75rem",
  "spacing-lg": "1rem", "spacing-xl": "1.5rem", "spacing-2xl": "2rem",
  "font-fontFamily": "Inter, system-ui, sans-serif",
  "font-size-xs": "0.75rem", "font-size-sm": "0.875rem", "font-size-md": "1rem",
  "font-size-lg": "1.125rem", "font-size-xl": "1.25rem",
};

/* ---- color conversion ---- */
function hexToHsl(hex: string): string {
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
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}
function hslToHex(hsl: string): string {
  const m = hsl.trim().match(/^(-?\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/);
  if (!m) return "#000000";
  const h = +m[1] / 360, s = +m[2] / 100, l = +m[3] / 100;
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    const a = s * Math.min(l, 1 - l);
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(255 * c).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
function accentFromHex(hex: string) {
  const light = hexToHsl(hex);
  const m = light.match(/^(\d+) (\d+)% (\d+)%$/);
  if (!m) return { name: "Custom", light, dark: light };
  const h = +m[1], s = +m[2], l = +m[3];
  const dark = `${h} ${Math.min(s + 6, 100)}% ${Math.min(Math.max(l + 10, 58), 74)}%`;
  return { name: "Custom", light, dark };
}

export default function ThemeCustomizer({ docked, open, onOpen, onClose }: Props) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [shared, setShared] = useState<Vars>({});
  const [light, setLight] = useState<Vars>({});
  const [dark, setDark] = useState<Vars>({});
  const [mode, setMode] = useState<"simple" | "advanced">("simple");
  const [custom, setCustom] = useState("#1e6cf0");
  const [copied, setCopied] = useState(false);
  const [demoSwitch, setDemoSwitch] = useState(true);
  const [demoCheck, setDemoCheck] = useState(true);

  const dirty = !!(Object.keys(shared).length || Object.keys(light).length || Object.keys(dark).length);

  const css = useMemo(() => {
    if (!dirty) return "/* Theme defaults — tweak a token to see your overrides here. */";
    const block = (entries: [string, string][]) =>
      entries.map(([k, v]) => `  --cz-${k}: ${v};`).join("\n");
    const root = [...Object.entries(shared), ...Object.entries(light)];
    const lines = [`:root {\n${block(root)}\n}`];
    if (Object.keys(dark).length) lines.push(`.dark {\n${block(Object.entries(dark))}\n}`);
    return lines.join("\n");
  }, [shared, light, dark, dirty]);

  useEffect(() => {
    const existing = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!dirty) { existing?.remove(); return; }
    const el = existing ?? document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = css;
    if (!existing) document.head.appendChild(el);
  }, [css, dirty]);

  // editing target for advanced colors follows the live theme
  const editing = resolvedTheme;
  const colorMap = editing === "dark" ? dark : light;
  const setColorMap = editing === "dark" ? setDark : setLight;
  const colorDefaults = editing === "dark" ? DEF_DARK : DEF_LIGHT;

  const activeAccent = ACCENTS.find((a) => light["color-primary"] === a.light)?.name;
  const activeRadius = RADII.find((r) => shared["radius-md"] === r.md && shared["radius-sm"] === r.sm)?.name;
  const activeFont = FONTS.find((f) => shared["font-fontFamily"] === f.stack)?.name;

  const applyAccent = (a: typeof ACCENTS[number]) => {
    setLight((p) => ({ ...p, "color-primary": a.light, "color-ring": a.light }));
    setDark((p) => ({ ...p, "color-primary": a.dark, "color-ring": a.dark }));
  };
  const setShV = (k: string, v: string) => setShared((p) => ({ ...p, [k]: v }));
  const setColV = (k: string, v: string) => setColorMap((p) => ({ ...p, [k]: v }));

  const reset = () => { setShared({}); setLight({}); setDark({}); };
  const copy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const present = docked ? "docked" : open ? "drawer" : "hidden";

  return (
    <>
      {present === "hidden" && (
        <button className="czc-trigger" onClick={onOpen} aria-label="Open theme customizer">
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

      <aside className={`czc is-${present}`} aria-hidden={present === "hidden"}>
        <header className="czc-head">
          <div>
            <span className="czc-eyebrow">Live theme</span>
            <h3 className="czc-title">Make it yours</h3>
          </div>
          <button className="czc-close" onClick={onClose} aria-label={docked ? "Collapse" : "Close"}>
            {docked ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
            )}
          </button>
        </header>

        <div className="czc-modes">
          <button className={`czc-mode ${mode === "simple" ? "is-active" : ""}`} onClick={() => setMode("simple")}>Simple</button>
          <button className={`czc-mode ${mode === "advanced" ? "is-active" : ""}`} onClick={() => setMode("advanced")}>Advanced</button>
        </div>

        <div className="czc-scroll">
          {/* live preview — real components, re-skin as you turn knobs */}
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

          {mode === "simple" ? (
            <>
              <section className="czc-block">
                <div className="czc-label">Accent</div>
                <div className="czc-swatches">
                  {ACCENTS.map((a) => (
                    <button
                      key={a.name}
                      className={`czc-swatch ${activeAccent === a.name ? "is-active" : ""}`}
                      style={{ background: `hsl(${a.light})` }}
                      onClick={() => applyAccent(a)}
                      title={a.name}
                      aria-label={a.name}
                    />
                  ))}
                  <label className={`czc-swatch czc-swatch-custom ${activeAccent === undefined && light["color-primary"] ? "is-active" : ""}`} title="Custom color">
                    <input type="color" value={custom} onChange={(e) => { setCustom(e.target.value); applyAccent(accentFromHex(e.target.value)); }} aria-label="Custom accent" />
                  </label>
                </div>
              </section>

              <section className="czc-block">
                <div className="czc-label">Radius</div>
                <div className="czc-seg">
                  {RADII.map((r) => (
                    <button key={r.name} className={`czc-seg-btn ${activeRadius === r.name ? "is-active" : ""}`}
                      onClick={() => setShared((p) => ({ ...p, "radius-sm": r.sm, "radius-md": r.md, "radius-lg": r.lg, "radius-xl": r.xl }))}>
                      {r.name}
                    </button>
                  ))}
                </div>
              </section>

              <section className="czc-block">
                <div className="czc-label">Font</div>
                <div className="czc-seg">
                  {FONTS.map((f) => (
                    <button key={f.name} className={`czc-seg-btn ${activeFont === f.name ? "is-active" : ""}`}
                      style={{ fontFamily: f.stack }} onClick={() => setShV("font-fontFamily", f.stack)}>
                      {f.name}
                    </button>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <>
              <Group title="Colors" defaultOpen>
                <div className="czc-edit-theme">
                  <span>Editing <strong>{editing}</strong> palette</span>
                  <button className="czc-mini" onClick={toggleTheme}>Switch to {editing === "dark" ? "light" : "dark"}</button>
                </div>
                <div className="czc-rows">
                  {COLOR_TOKENS.map(([key, label]) => {
                    const cur = colorMap[`color-${key}`] ?? colorDefaults[`color-${key}`] ?? "0 0% 50%";
                    return (
                      <div className="czc-row" key={key}>
                        <label className="czc-color">
                          <input type="color" value={hslToHex(cur)} onChange={(e) => setColV(`color-${key}`, hexToHsl(e.target.value))} aria-label={label} />
                          <span style={{ background: `hsl(${cur})` }} />
                        </label>
                        <span className="czc-row-name">{label}</span>
                        <input className="czc-text" value={cur} onChange={(e) => setColV(`color-${key}`, e.target.value)} spellCheck={false} />
                      </div>
                    );
                  })}
                </div>
              </Group>

              <Group title="Radius">
                <div className="czc-rows">
                  {RADIUS_TOKENS.map((k) => (
                    <TokenRow key={k} label={k} value={shared[`radius-${k}`] ?? DEF_SHARED[`radius-${k}`]} onChange={(v) => setShV(`radius-${k}`, v)} />
                  ))}
                </div>
              </Group>

              <Group title="Spacing">
                <div className="czc-rows">
                  {SPACING_TOKENS.map((k) => (
                    <TokenRow key={k} label={k} value={shared[`spacing-${k}`] ?? DEF_SHARED[`spacing-${k}`]} onChange={(v) => setShV(`spacing-${k}`, v)} />
                  ))}
                </div>
              </Group>

              <Group title="Typography">
                <div className="czc-rows">
                  <TokenRow label="family" wide value={shared["font-fontFamily"] ?? DEF_SHARED["font-fontFamily"]} onChange={(v) => setShV("font-fontFamily", v)} />
                  {SIZE_TOKENS.map((k) => (
                    <TokenRow key={k} label={`size ${k}`} value={shared[`font-size-${k}`] ?? DEF_SHARED[`font-size-${k}`]} onChange={(v) => setShV(`font-size-${k}`, v)} />
                  ))}
                </div>
              </Group>
            </>
          )}

          <section className="czc-block">
            <div className="czc-label-row">
              <span className="czc-label">Your theme</span>
              <button className={`czc-copy ${copied ? "is-copied" : ""}`} onClick={copy}>{copied ? "Copied" : "Copy CSS"}</button>
            </div>
            <pre className="czc-code"><code>{css}</code></pre>
          </section>
        </div>

        <footer className="czc-foot">
          <button className="czc-reset" onClick={reset} disabled={!dirty}>Reset</button>
          <span className="czc-hint">Applies across the whole site</span>
        </footer>
      </aside>

      {present === "drawer" && <div className="czc-overlay" onClick={onClose} />}
    </>
  );
}

function Group({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="czc-group">
      <button className="czc-group-head" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="czc-label">{title}</span>
        <svg className={`czc-chev ${open ? "is-open" : ""}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && <div className="czc-group-body">{children}</div>}
    </section>
  );
}

function TokenRow({ label, value, onChange, wide = false }: { label: string; value: string; onChange: (v: string) => void; wide?: boolean }) {
  return (
    <div className={`czc-row ${wide ? "is-wide" : ""}`}>
      <span className="czc-row-name">{label}</span>
      <input className="czc-text" value={value} onChange={(e) => onChange(e.target.value)} spellCheck={false} />
    </div>
  );
}
