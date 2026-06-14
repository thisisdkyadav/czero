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
    name: "onCheckedChange",
    type: "(checked: boolean) => void",
    default: "undefined",
    description: "Callback when switch value changes",
  },
];

function SwitchDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      checked={checked}
      onCheckedChange={setChecked}
    />
  );
}

function SwitchSizesDemo() {
  const [sm, setSm] = useState(true);
  const [md, setMd] = useState(true);
  const [lg, setLg] = useState(true);
  return (
    <>
      <Switch size="sm" checked={sm} onCheckedChange={setSm} />
      <Switch size="md" checked={md} onCheckedChange={setMd} />
      <Switch size="lg" checked={lg} onCheckedChange={setLg} />
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
<Switch checked={checked} onCheckedChange={setChecked} />`}
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
