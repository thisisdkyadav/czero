import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Select } from "../../../../src/react";
import "../GettingStarted.css";

const selectProps = [
  {
    name: "label",
    type: "string",
    default: "undefined",
    description: "Label text above the select",
  },
  {
    name: "error",
    type: "string",
    default: "undefined",
    description: "Error message below the select",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size of the select",
  },
  {
    name: "placeholder",
    type: "string",
    default: "undefined",
    description: "Placeholder option text",
  },
  {
    name: "children",
    type: "ReactNode",
    default: "undefined",
    description: "Select.Item options to display",
  },
];

const fruits = ["Apple", "Banana", "Orange", "Grape"];

export default function SelectPage() {
  return (
    <article className="docs-page">
      <h1>Select</h1>
      <p className="lead">
        A dropdown select component with custom styling.
      </p>

      <h2>Basic Usage</h2>
      <CodePreview
        code={`<Select label="Favorite Fruit" placeholder="Select a fruit">
  <Select.Item value="apple">Apple</Select.Item>
  <Select.Item value="banana">Banana</Select.Item>
</Select>`}
      >
        <Select label="Favorite Fruit" placeholder="Select a fruit">
          {fruits.map((f) => (
            <Select.Item key={f} value={f.toLowerCase()}>{f}</Select.Item>
          ))}
        </Select>
      </CodePreview>

      <h2>Sizes</h2>
      <CodePreview
        code={`<Select size="sm" placeholder="Small">...</Select>
<Select size="md" placeholder="Medium">...</Select>
<Select size="lg" placeholder="Large">...</Select>`}
      >
        {(["sm", "md", "lg"] as const).map((size) => (
          <Select key={size} size={size} placeholder={size}>
            {fruits.map((f) => (
              <Select.Item key={f} value={f.toLowerCase()}>{f}</Select.Item>
            ))}
          </Select>
        ))}
      </CodePreview>

      <h2>With Error</h2>
      <CodePreview
        code={`<Select label="Required Field" error="Please select an option">
  <Select.Item value="apple">Apple</Select.Item>
</Select>`}
      >
        <Select
          label="Required Field"
          placeholder="Select..."
          error="Please select an option"
        >
          {fruits.map((f) => (
            <Select.Item key={f} value={f.toLowerCase()}>{f}</Select.Item>
          ))}
        </Select>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={selectProps} />
    </article>
  );
}
