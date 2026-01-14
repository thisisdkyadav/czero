import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Separator } from "../../../../src/react";
import "../GettingStarted.css";

const separatorProps = [
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "The orientation of the separator",
  },
];

export default function SeparatorPage() {
  return (
    <article className="docs-page">
      <h1>Separator</h1>
      <p className="lead">
        A visual divider to separate content sections.
      </p>

      <h2>Horizontal</h2>
      <CodePreview
        code={`<div>Content above</div>
<Separator />
<div>Content below</div>`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%" }}>
          <div>Content above</div>
          <Separator />
          <div>Content below</div>
        </div>
      </CodePreview>

      <h2>Vertical</h2>
      <CodePreview
        code={`<div style={{ display: "flex", alignItems: "center", gap: "1rem", height: "2rem" }}>
  <span>Left</span>
  <Separator orientation="vertical" />
  <span>Right</span>
</div>`}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", height: "2rem" }}>
          <span>Left</span>
          <Separator orientation="vertical" />
          <span>Right</span>
        </div>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={separatorProps} />
    </article>
  );
}
