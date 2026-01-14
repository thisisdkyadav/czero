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
    name: "options",
    type: "Array<{ value, label, disabled? }>",
    default: "required",
    description: "Array of options to display",
  },
];

const fruitOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
];

export default function SelectPage() {
  return (
    <article className="docs-page">
      <h1>Select</h1>
      <p className="lead">
        A dropdown select component with custom styling.
      </p>

      <h2>Basic Usage</h2>
      <CodePreview
        code={`<Select 
  label="Favorite Fruit"
  placeholder="Select a fruit"
  options={[
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
  ]}
/>`}
      >
        <Select
          label="Favorite Fruit"
          placeholder="Select a fruit"
          options={fruitOptions}
        />
      </CodePreview>

      <h2>Sizes</h2>
      <CodePreview
        code={`<Select size="sm" options={options} placeholder="Small" />
<Select size="md" options={options} placeholder="Medium" />
<Select size="lg" options={options} placeholder="Large" />`}
      >
        <Select size="sm" options={fruitOptions} placeholder="Small" />
        <Select size="md" options={fruitOptions} placeholder="Medium" />
        <Select size="lg" options={fruitOptions} placeholder="Large" />
      </CodePreview>

      <h2>With Error</h2>
      <CodePreview
        code={`<Select 
  label="Required Field"
  options={options}
  error="Please select an option"
/>`}
      >
        <Select
          label="Required Field"
          options={fruitOptions}
          placeholder="Select..."
          error="Please select an option"
        />
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={selectProps} />
    </article>
  );
}
