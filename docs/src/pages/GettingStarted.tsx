import "./GettingStarted.css";

export default function GettingStarted() {
  return (
    <article className="docs-page">
      <h1>Getting Started</h1>
      <p className="lead">
        CZero is a lightweight, design-token-driven React component library.
      </p>

      <h2>Installation</h2>
      <pre className="code-block">
        <code>npm install czero</code>
      </pre>

      <h2>Usage</h2>
      <p>Import the styles and components:</p>
      <pre className="code-block">
        <code>{`// Import styles (required)
import "czero/styles.css";

// Import components
import { Button, Input, Card, Badge } from "czero/react";`}</code>
      </pre>

      <h2>Dark Mode</h2>
      <p>
        CZero supports dark mode out of the box. Simply add the{" "}
        <code>.dark</code> class to your root element:
      </p>
      <pre className="code-block">
        <code>{`<html class="dark">
  ...
</html>`}</code>
      </pre>
      <p>
        All components will automatically adapt to the dark color scheme.
        Try the toggle in the header to see it in action!
      </p>

      <h2>Customization</h2>
      <p>
        CZero uses CSS variables prefixed with <code>--cz-*</code>. You can
        override any token to customize the look:
      </p>
      <pre className="code-block">
        <code>{`:root {
  --cz-color-primary: 250 80% 60%; /* Purple */
  --cz-radius-md: 1rem; /* More rounded */
}`}</code>
      </pre>
    </article>
  );
}
