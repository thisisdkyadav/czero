import { Link } from "react-router-dom";
import { useState, type CSSProperties } from "react";
import { Button, Input, Switch, Badge, StatusBadge } from "../../../src/react";
import "./Home.css";

const ACCENTS = [
  { name: "blue", hsl: "217 87% 53%" },
  { name: "violet", hsl: "262 83% 62%" },
  { name: "teal", hsl: "176 68% 40%" },
  { name: "rose", hsl: "342 79% 56%" },
  { name: "amber", hsl: "33 92% 50%" },
];

const PRINCIPLES = [
  { k: "01", t: "Theme once", d: "Set your --cz-* variables a single time. Every component reads them — no per-component config, no drift." },
  { k: "02", t: "No build step", d: "Import one stylesheet and go. No CSS-in-JS runtime, no config compiler, no codegen to maintain." },
  { k: "03", t: "Built on Radix", d: "Behaviour, focus management and ARIA come from Radix primitives. The styling is ours." },
  { k: "04", t: "Light and dark", d: "Every color ships both modes. Toggle a class, or pass a typed theme to the provider." },
  { k: "05", t: "Typed theming", d: "Hand ThemeProvider a typed theme object; anything you omit falls back to the defaults." },
  { k: "06", t: "Small", d: "A 235 kB package, tree-shakeable ESM and CJS. Ship only the components you import." },
];

const COMPONENTS = [
  "Button", "Input", "Select", "Checkbox", "Switch", "Radio", "Textarea", "Label",
  "Modal", "Dropdown", "Tooltip", "Tabs", "Accordion", "Breadcrumb",
  "Table", "DataTable", "Badge", "StatusBadge", "Tag", "Avatar", "Alert", "Toast",
  "Progress", "Spinner", "Skeleton", "Card", "Stack", "Grid", "Separator", "Kbd", "Code",
];

function slug(name: string) {
  return name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export default function Home() {
  const [accent, setAccent] = useState(ACCENTS[0]);
  const [on, setOn] = useState(true);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText("npm i czero");
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const themed = {
    "--cz-color-primary": accent.hsl,
    "--cz-color-ring": accent.hsl,
  } as CSSProperties;

  return (
    <div className="home">
      {/* ---- hero ---- */}
      <section className="hero">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="hero-eyebrow">React · Design tokens · No build step</span>
            <h1 className="hero-title">
              Theme once.<br />
              <span className="hero-title-accent">Every component follows.</span>
            </h1>
            <p className="hero-lead">
              czero is a design-token React library built on Radix. Set your{" "}
              <code>--cz-*</code> variables once and every component picks them up —
              in light and dark, with no config drift.
            </p>

            <div className="hero-install">
              <span className="hero-install-prompt">$</span>
              <code className="hero-install-cmd">npm i czero</code>
              <button type="button" className="hero-install-copy" onClick={copy}>
                {copied ? "copied" : "copy"}
              </button>
            </div>

            <div className="hero-cta">
              <Link to="/docs" className="btn btn-accent">Get started</Link>
              <Link to="/docs/components/button" className="btn btn-ghost">Browse components</Link>
            </div>
          </div>

          {/* signature: change one token, watch them follow */}
          <div className="hero-panel" style={themed}>
            <div className="hero-panel-bar">
              <span className="hero-panel-file">theme.css</span>
              <div className="hero-swatches" role="group" aria-label="Accent color">
                {ACCENTS.map((a) => (
                  <button
                    key={a.name}
                    type="button"
                    className={`hero-swatch ${a.name === accent.name ? "is-active" : ""}`}
                    style={{ background: `hsl(${a.hsl})` }}
                    onClick={() => setAccent(a)}
                    aria-label={`Set accent to ${a.name}`}
                    aria-pressed={a.name === accent.name}
                  />
                ))}
              </div>
            </div>

            <div className="hero-panel-body">
              <pre className="hero-tokens">
                <span className="tline"><span className="tsel">:root</span> {"{"}</span>
                <span className="tline">  <span className="tk">--cz-color-primary</span>: <span className="tv">{accent.hsl}</span>;</span>
                <span className="tline">  <span className="tk">--cz-radius-md</span>: <span className="tv">0.5rem</span>;</span>
                <span className="tline">  <span className="tk">--cz-font-fontFamily</span>: <span className="tv">Inter</span>;</span>
                <span className="tline">{"}"}</span>
              </pre>

              <div className="hero-demo">
                <div className="hero-demo-row">
                  <Button variant="primary" size="sm">Primary</Button>
                  <Button variant="outline" size="sm">Outline</Button>
                </div>
                <Input placeholder="you@example.com" />
                <div className="hero-demo-inline">
                  <Switch checked={on} onCheckedChange={setOn} />
                  <Badge variant="primary">Active</Badge>
                  <StatusBadge status="success" />
                </div>
              </div>
            </div>

            <div className="hero-panel-foot">
              <span className="hero-panel-comment">// change one token — every component follows</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---- principles ---- */}
      <section className="section">
        <div className="section-head">
          <span className="section-eyebrow">Why czero</span>
          <h2 className="section-title">A component library that stays out of your way.</h2>
        </div>
        <div className="grid-rule cols-3">
          {PRINCIPLES.map((p) => (
            <article key={p.k} className="cell principle">
              <span className="principle-k">{p.k}</span>
              <h3 className="principle-t">{p.t}</h3>
              <p className="principle-d">{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---- components manifest ---- */}
      <section className="section">
        <div className="section-head">
          <span className="section-eyebrow">The set</span>
          <h2 className="section-title">{COMPONENTS.length} components. One token system.</h2>
          <p className="section-sub">
            Forms, overlays, data, feedback and layout — every one reading the same variables.
          </p>
        </div>
        <div className="grid-rule manifest">
          {COMPONENTS.map((name) => (
            <Link key={name} to={`/docs/components/${slug(name)}`} className="cell manifest-item">
              <span className="manifest-name">{name}</span>
              <svg className="manifest-arrow" width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* ---- quickstart ---- */}
      <section className="section">
        <div className="section-head">
          <span className="section-eyebrow">Quickstart</span>
          <h2 className="section-title">Three lines to your first component.</h2>
        </div>
        <div className="grid-rule cols-3 steps">
          <article className="cell step">
            <span className="step-k">01</span>
            <h3 className="step-t">Install</h3>
            <pre className="code-snippet"><code>npm i czero</code></pre>
          </article>
          <article className="cell step">
            <span className="step-k">02</span>
            <h3 className="step-t">Import</h3>
            <pre className="code-snippet"><code>{`import "czero/styles.css";
import { Button } from "czero/react";`}</code></pre>
          </article>
          <article className="cell step">
            <span className="step-k">03</span>
            <h3 className="step-t">Use</h3>
            <pre className="code-snippet"><code>{`<Button variant="primary">
  Ship it
</Button>`}</code></pre>
          </article>
        </div>
      </section>

      {/* ---- cta ---- */}
      <section className="section cta">
        <div className="cta-box">
          <h2 className="cta-title">Build the next thing on one token system.</h2>
          <div className="hero-cta">
            <Link to="/docs" className="btn btn-accent">Read the docs</Link>
            <a
              href="https://github.com/thisisdkyadav/czero"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
