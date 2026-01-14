import { useState } from "react";
import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { RadioGroup } from "../../../../src/react";
import "../GettingStarted.css";

const radioGroupProps = [
  {
    name: "name",
    type: "string",
    default: "required",
    description: "Name attribute for the radio group",
  },
  {
    name: "value",
    type: "string",
    default: "undefined",
    description: "Controlled value",
  },
  {
    name: "defaultValue",
    type: "string",
    default: '""',
    description: "Initial value (uncontrolled)",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    default: "undefined",
    description: "Callback when value changes",
  },
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"vertical"',
    description: "Layout orientation",
  },
];

function RadioDemo() {
  const [value, setValue] = useState("option1");
  return (
    <RadioGroup name="demo" value={value} onValueChange={setValue}>
      <RadioGroup.Item value="option1" label="Option 1" />
      <RadioGroup.Item value="option2" label="Option 2" />
      <RadioGroup.Item value="option3" label="Option 3" />
    </RadioGroup>
  );
}

export default function RadioGroupPage() {
  return (
    <article className="docs-page">
      <h1>RadioGroup</h1>
      <p className="lead">
        A group of radio buttons for single selection.
      </p>

      <h2>Basic Usage</h2>
      <CodePreview
        code={`<RadioGroup name="options" defaultValue="option1">
  <RadioGroup.Item value="option1" label="Option 1" />
  <RadioGroup.Item value="option2" label="Option 2" />
  <RadioGroup.Item value="option3" label="Option 3" />
</RadioGroup>`}
      >
        <RadioDemo />
      </CodePreview>

      <h2>Horizontal</h2>
      <CodePreview
        code={`<RadioGroup name="size" orientation="horizontal" defaultValue="md">
  <RadioGroup.Item value="sm" label="Small" />
  <RadioGroup.Item value="md" label="Medium" />
  <RadioGroup.Item value="lg" label="Large" />
</RadioGroup>`}
      >
        <RadioGroup name="size" orientation="horizontal" defaultValue="md">
          <RadioGroup.Item value="sm" label="Small" />
          <RadioGroup.Item value="md" label="Medium" />
          <RadioGroup.Item value="lg" label="Large" />
        </RadioGroup>
      </CodePreview>

      <h2>With Disabled</h2>
      <CodePreview
        code={`<RadioGroup name="plan" defaultValue="free">
  <RadioGroup.Item value="free" label="Free" />
  <RadioGroup.Item value="pro" label="Pro" />
  <RadioGroup.Item value="enterprise" label="Enterprise" disabled />
</RadioGroup>`}
      >
        <RadioGroup name="plan" defaultValue="free">
          <RadioGroup.Item value="free" label="Free" />
          <RadioGroup.Item value="pro" label="Pro" />
          <RadioGroup.Item value="enterprise" label="Enterprise" disabled />
        </RadioGroup>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={radioGroupProps} />
    </article>
  );
}
