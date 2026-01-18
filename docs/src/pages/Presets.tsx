import "./Presets.css";

const presetData = [
  {
    name: "compact",
    description: "Tighter spacing, smaller sizes. Great for data-dense applications.",
    features: ["Reduced heights (1.75rem → 2rem → 2.5rem)", "Tighter gaps and padding", "Smaller checkboxes and switches"],
  },
  {
    name: "comfortable",
    description: "Larger touch targets, more spacing. Great for mobile-first or accessibility-focused apps.",
    features: ["Larger heights (2.5rem → 3rem → 3.5rem)", "Increased padding and gaps", "Bigger checkboxes and switches"],
  },
  {
    name: "rounded",
    description: "Increased border radius for a softer, more modern look.",
    features: ["Larger radius on buttons (0.75rem)", "Larger radius on inputs (0.75rem)", "Extra large radius on cards (1rem)"],
  },
  {
    name: "sharp",
    description: "Minimal border radius for a clean, angular look.",
    features: ["Near-zero radius on buttons", "Minimal radius on inputs", "Sharp card corners"],
  },
  {
    name: "minimal",
    description: "Reduced shadows, subtle borders. Clean and understated.",
    features: ["No/subtle shadows", "Lighter hover effects", "Less visual noise"],
  },
  {
    name: "vibrant",
    description: "Bolder colors, more pronounced effects. Eye-catching and dynamic.",
    features: ["Stronger shadows", "Hover lift effects", "Thicker focus rings"],
  },
];

export default function Presets() {
  return (
    <article className="docs-page">
      <h1>Theme Presets</h1>
      <p className="lead">
        Pre-built theme configurations you can use to quickly customize the look and feel of CZero components.
      </p>

      <h2>Available Presets</h2>
      <div className="preset-grid">
        {presetData.map((preset) => (
          <div key={preset.name} className="preset-card">
            <h3><code>{preset.name}</code></h3>
            <p>{preset.description}</p>
            <ul>
              {preset.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2>Using Presets via CLI</h2>
      <p>Apply a preset when generating CSS:</p>
      <pre className="code-block">
        <code>{`# Single preset
npx czero build --preset compact

# Multiple presets (composed in order)
npx czero build --preset compact --preset rounded`}</code>
      </pre>

      <h2>Programmatic Usage</h2>
      <p>Import and spread presets in your config file:</p>
      <pre className="code-block">
        <code>{`// czero.config.js
import { presets } from "czero/presets";

export default {
  // Apply compact preset
  ...presets.compact,
  
  // Your overrides (always win)
  color: {
    primary: { light: "280 70% 50%", dark: "280 60% 60%" },
  },
};`}</code>
      </pre>

      <h2>Composing Presets</h2>
      <p>Combine multiple presets for custom designs:</p>
      <pre className="code-block">
        <code>{`import { presets } from "czero/presets";

export default {
  // Apply compact sizes + rounded corners
  ...presets.compact,
  ...presets.rounded,
  
  // Later presets override earlier ones
};`}</code>
      </pre>
    </article>
  );
}
