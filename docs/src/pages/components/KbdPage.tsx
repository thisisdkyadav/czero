import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Kbd } from "../../../../src/react";
import "../GettingStarted.css";

const kbdProps = [
  {
    name: "children",
    type: "ReactNode",
    default: "required",
    description: "Keyboard shortcut text",
  },
];

export default function KbdPage() {
  return (
    <article className="docs-page">
      <h1>Kbd</h1>
      <p className="lead">
        A component to display keyboard shortcuts.
      </p>

      <h2>Single Keys</h2>
      <CodePreview
        code={`<Kbd>Esc</Kbd>
<Kbd>Enter</Kbd>
<Kbd>Tab</Kbd>`}
      >
        <Kbd>Esc</Kbd>
        <Kbd>Enter</Kbd>
        <Kbd>Tab</Kbd>
      </CodePreview>

      <h2>Key Combinations</h2>
      <CodePreview
        code={`<span>
  <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd> to copy
</span>
<span>
  <Kbd>Ctrl</Kbd> + <Kbd>V</Kbd> to paste
</span>`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <span><Kbd>Ctrl</Kbd> + <Kbd>C</Kbd> to copy</span>
          <span><Kbd>Ctrl</Kbd> + <Kbd>V</Kbd> to paste</span>
          <span><Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd> open command palette</span>
        </div>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={kbdProps} />
    </article>
  );
}
