import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Label, Input } from "../../../../src/react";
import "../GettingStarted.css";

const labelProps = [
  {
    name: "required",
    type: "boolean",
    default: "false",
    description: "Shows a required indicator (*)",
  },
  {
    name: "htmlFor",
    type: "string",
    default: "undefined",
    description: "Associated input ID",
  },
];

export default function LabelPage() {
  return (
    <article className="docs-page">
      <h1>Label</h1>
      <p className="lead">
        A form label component with optional required indicator.
      </p>

      <h2>Basic Usage</h2>
      <CodePreview
        code={`<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", width: "100%" }}>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
      </CodePreview>

      <h2>Required</h2>
      <CodePreview
        code={`<Label htmlFor="name" required>Name</Label>
<Input id="name" />`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", width: "100%" }}>
          <Label htmlFor="name" required>Name</Label>
          <Input id="name" placeholder="Enter your name" />
        </div>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={labelProps} />
    </article>
  );
}
