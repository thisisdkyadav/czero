import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Input } from "../../../../src/react";
import "../GettingStarted.css";

const inputProps = [
  {
    name: "label",
    type: "string",
    description: "Label displayed above the input",
  },
  {
    name: "error",
    type: "string",
    description: "Error message displayed below the input",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size of the input",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the input",
  },
];

export default function InputPage() {
  return (
    <article className="docs-page">
      <h1>Input</h1>
      <p className="lead">
        A form input component with label and validation support.
      </p>

      <h2>Basic</h2>
      <CodePreview
        code={`<Input placeholder="Enter text..." />
<Input label="Email" placeholder="you@example.com" />`}
      >
        <Input placeholder="Enter text..." />
        <Input label="Email" placeholder="you@example.com" />
      </CodePreview>

      <h2>Sizes</h2>
      <CodePreview
        code={`<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`}
      >
        <Input size="sm" placeholder="Small" />
        <Input size="md" placeholder="Medium" />
        <Input size="lg" placeholder="Large" />
      </CodePreview>

      <h2>Error State</h2>
      <CodePreview
        code={`<Input 
  label="Password" 
  type="password" 
  error="Password is required" 
/>`}
      >
        <Input label="Password" type="password" error="Password is required" />
      </CodePreview>

      <h2>Disabled</h2>
      <CodePreview code={`<Input label="Name" disabled value="Cannot edit" />`}>
        <Input label="Name" disabled value="Cannot edit" />
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={inputProps} />
    </article>
  );
}
