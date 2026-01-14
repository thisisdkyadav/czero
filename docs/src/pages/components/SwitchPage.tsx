import { useState } from "react";
import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Switch } from "../../../../src/react";
import "../GettingStarted.css";

const switchProps = [
  {
    name: "checked",
    type: "boolean",
    default: "false",
    description: "Whether the switch is on or off",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size of the switch",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the switch",
  },
  {
    name: "onChange",
    type: "(e: ChangeEvent) => void",
    default: "undefined",
    description: "Callback when switch value changes",
  },
];

function SwitchDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}

function SwitchSizesDemo() {
  const [sm, setSm] = useState(true);
  const [md, setMd] = useState(true);
  const [lg, setLg] = useState(true);
  return (
    <>
      <Switch size="sm" checked={sm} onChange={(e) => setSm(e.target.checked)} />
      <Switch size="md" checked={md} onChange={(e) => setMd(e.target.checked)} />
      <Switch size="lg" checked={lg} onChange={(e) => setLg(e.target.checked)} />
    </>
  );
}

export default function SwitchPage() {
  return (
    <article className="docs-page">
      <h1>Switch</h1>
      <p className="lead">
        A toggle switch component for on/off states.
      </p>

      <h2>Basic Usage</h2>
      <CodePreview
        code={`const [checked, setChecked] = useState(false);
<Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />`}
      >
        <SwitchDemo />
      </CodePreview>

      <h2>Sizes</h2>
      <CodePreview
        code={`<Switch size="sm" checked={checked} onChange={...} />
<Switch size="md" checked={checked} onChange={...} />
<Switch size="lg" checked={checked} onChange={...} />`}
      >
        <SwitchSizesDemo />
      </CodePreview>

      <h2>Disabled</h2>
      <CodePreview
        code={`<Switch disabled />
<Switch checked disabled />`}
      >
        <Switch disabled />
        <Switch checked disabled />
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={switchProps} />
    </article>
  );
}
