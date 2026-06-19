import "./GettingStarted.css";

export default function GettingStarted() {
  return (
    <article className="docs-page">
      <h1>Getting Started</h1>
      <p className="lead">
        CZero is a lightweight, design-token-driven React component library built
        on Radix UI. Define your theme once — every component follows.
      </p>

      <h2>Installation</h2>
      <pre className="code-block">
        <code>npm install czero</code>
      </pre>

      <h2>Usage</h2>
      <p>Import the stylesheet once, then use any component. No build step.</p>
      <pre className="code-block">
        <code>{`// Import styles (required, once)
import "czero/styles.css";

// Import components
import { Button, Input, Card, Badge } from "czero/react";`}</code>
      </pre>

      <h2>Theming</h2>
      <p>
        Every component reads <code>--cz-*</code> CSS variables, so a theme is
        just a set of values for those variables. Set them either way.
      </p>

      <h3>Option A — plain CSS</h3>
      <p>Override any token in your own <code>:root</code>. This is all most apps need:</p>
      <pre className="code-block">
        <code>{`:root {
  --cz-color-primary: 250 80% 60%;   /* colors are "H S% L%" triplets */
  --cz-radius-md: 0.75rem;
  --cz-font-fontFamily: "Inter", system-ui, sans-serif;
}`}</code>
      </pre>

      <h3>Option B — ThemeProvider (typed)</h3>
      <p>
        Pass a typed <code>theme</code> object once at the root. It injects your
        overrides as CSS variables and manages dark mode. Omitted tokens fall
        back to the defaults.
      </p>
      <pre className="code-block">
        <code>{`import { ThemeProvider } from "czero/react";

const theme = {
  color: { primary: { light: "250 80% 60%", dark: "250 70% 70%" } },
  radius: { md: "0.75rem" },
};

<ThemeProvider theme={theme} defaultTheme="system">
  <App />
</ThemeProvider>`}</code>
      </pre>
      <p>
        Try the <strong>customizer</strong> in the bottom-right corner — it
        edits these tokens live and gives you the CSS to copy.
      </p>

      <h2>Dark Mode</h2>
      <p>
        Every color ships light and dark values. Toggle with the{" "}
        <code>useTheme()</code> hook (inside a <code>ThemeProvider</code>):
      </p>
      <pre className="code-block">
        <code>{`import { useTheme } from "czero/react";

const { resolvedTheme, toggleTheme } = useTheme();`}</code>
      </pre>
      <p>
        Prefer no provider? Just toggle a <code>.dark</code> class on{" "}
        <code>&lt;html&gt;</code> — the CSS responds either way. Try the toggle in
        the header.
      </p>

      <h2>Token reference</h2>
      <table className="token-table">
        <thead>
          <tr><th>Category</th><th>Tokens</th></tr>
        </thead>
        <tbody>
          <tr><td>Color</td><td><code>bg</code>, <code>fg</code>, <code>primary</code>, <code>secondary</code>, <code>muted</code>, <code>danger</code>, <code>success</code>, <code>warning</code>, <code>border</code>, <code>ring</code> (+ <code>*Fg</code> variants)</td></tr>
          <tr><td>Radius</td><td><code>none</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, <code>full</code></td></tr>
          <tr><td>Spacing</td><td><code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, <code>2xl</code></td></tr>
          <tr><td>Shadow</td><td><code>none</code>, <code>sm</code>, <code>md</code>, <code>lg</code></td></tr>
          <tr><td>Typography</td><td><code>fontFamily</code>, <code>size.*</code>, <code>weight.*</code>, <code>lineHeight.*</code></td></tr>
          <tr><td>Transition</td><td><code>fast</code>, <code>normal</code>, <code>slow</code></td></tr>
        </tbody>
      </table>
      <p>
        Variables follow <code>--cz-&lt;category&gt;-&lt;token&gt;</code> — e.g.{" "}
        <code>--cz-color-primary</code>, <code>--cz-radius-md</code>,{" "}
        <code>--cz-spacing-lg</code>.
      </p>
    </article>
  );
}
