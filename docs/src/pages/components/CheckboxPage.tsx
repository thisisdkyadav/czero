import { useState } from "react";
import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Checkbox } from "../../../../src/react";
import "../GettingStarted.css";

const checkboxProps = [
  {
    name: "label",
    type: "string",
    default: "undefined",
    description: "Label text displayed next to the checkbox",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size of the checkbox",
  },
  {
    name: "checked",
    type: "boolean",
    default: "false",
    description: "Whether the checkbox is checked",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the checkbox",
  },
];

function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label="Accept terms and conditions"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}

export default function CheckboxPage() {
  return (
    <article className="docs-page">
      <h1>Checkbox</h1>
      <p className="lead">
        A checkbox input component with custom styling and label support.
      </p>

      <h2>Basic Usage</h2>
      <CodePreview
        code={`<Checkbox label="Accept terms" checked={checked} onChange={...} />`}
      >
        <CheckboxDemo />
      </CodePreview>

      <h2>Sizes</h2>
      <CodePreview
        code={`<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />`}
      >
        <Checkbox size="sm" label="Small" defaultChecked />
        <Checkbox size="md" label="Medium" defaultChecked />
        <Checkbox size="lg" label="Large" defaultChecked />
      </CodePreview>

      <h2>States</h2>
      <CodePreview
        code={`<Checkbox label="Unchecked" />
<Checkbox label="Checked" defaultChecked />
<Checkbox label="Disabled" disabled />
<Checkbox label="Disabled checked" defaultChecked disabled />`}
      >
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Disabled checked" defaultChecked disabled />
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={checkboxProps} />
    </article>
  );
}
