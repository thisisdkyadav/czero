import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Code } from "../../../../src/react";
import "../GettingStarted.css";

const codeProps = [
  {
    name: "children",
    type: "ReactNode",
    default: "required",
    description: "Inline code content",
  },
];

export default function CodePage() {
  return (
    <article className="docs-page">
      <h1>Code</h1>
      <p className="lead">
        A component for displaying inline code.
      </p>

      <h2>Basic Usage</h2>
      <CodePreview
        code={`<p>Install with <Code>npm install czero</Code></p>`}
      >
        <p>Install with <Code>npm install czero</Code></p>
      </CodePreview>

      <h2>In Text</h2>
      <CodePreview
        code={`<p>Use the <Code>Button</Code> component for actions.</p>`}
      >
        <p>Use the <Code>Button</Code> component for clickable actions. Import it like <Code>{"import { Button } from 'czero'"}</Code>.</p>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={codeProps} />
    </article>
  );
}
