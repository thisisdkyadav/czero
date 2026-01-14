import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Textarea } from "../../../../src/react";
import "../GettingStarted.css";

const textareaProps = [
  {
    name: "label",
    type: "string",
    default: "undefined",
    description: "Label text displayed above the textarea",
  },
  {
    name: "error",
    type: "string",
    default: "undefined",
    description: "Error message displayed below the textarea",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size of the textarea",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the textarea",
  },
];

export default function TextareaPage() {
  return (
    <article className="docs-page">
      <h1>Textarea</h1>
      <p className="lead">
        A multi-line text input component with label and error support.
      </p>

      <h2>Basic Usage</h2>
      <CodePreview
        code={`<Textarea placeholder="Enter your message..." />`}
      >
        <Textarea placeholder="Enter your message..." />
      </CodePreview>

      <h2>With Label</h2>
      <CodePreview
        code={`<Textarea label="Message" placeholder="Type here..." />`}
      >
        <Textarea label="Message" placeholder="Type here..." />
      </CodePreview>

      <h2>Sizes</h2>
      <CodePreview
        code={`<Textarea size="sm" placeholder="Small" />
<Textarea size="md" placeholder="Medium" />
<Textarea size="lg" placeholder="Large" />`}
      >
        <Textarea size="sm" placeholder="Small" />
        <Textarea size="md" placeholder="Medium" />
        <Textarea size="lg" placeholder="Large" />
      </CodePreview>

      <h2>States</h2>
      <CodePreview
        code={`<Textarea label="Feedback" error="This field is required" />
<Textarea placeholder="Disabled" disabled />`}
      >
        <Textarea label="Feedback" error="This field is required" />
        <Textarea placeholder="Disabled" disabled />
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={textareaProps} />
    </article>
  );
}
