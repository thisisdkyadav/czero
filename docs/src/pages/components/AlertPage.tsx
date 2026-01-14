import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Alert } from "../../../../src/react";
import "../GettingStarted.css";

const alertProps = [
  {
    name: "variant",
    type: '"info" | "success" | "warning" | "danger"',
    default: '"info"',
    description: "The visual style variant of the alert",
  },
  {
    name: "title",
    type: "string",
    default: "undefined",
    description: "Optional title displayed above the content",
  },
];

export default function AlertPage() {
  return (
    <article className="docs-page">
      <h1>Alert</h1>
      <p className="lead">
        A feedback component to display important messages.
      </p>

      <h2>Variants</h2>
      <CodePreview
        code={`<Alert variant="info">This is an info message.</Alert>
<Alert variant="success">Operation completed successfully!</Alert>
<Alert variant="warning">Please review before continuing.</Alert>
<Alert variant="danger">An error occurred. Please try again.</Alert>`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%" }}>
          <Alert variant="info">This is an info message.</Alert>
          <Alert variant="success">Operation completed successfully!</Alert>
          <Alert variant="warning">Please review before continuing.</Alert>
          <Alert variant="danger">An error occurred. Please try again.</Alert>
        </div>
      </CodePreview>

      <h2>With Title</h2>
      <CodePreview
        code={`<Alert variant="info" title="Information">
  Here is some additional context for this message.
</Alert>
<Alert variant="success" title="Success!">
  Your changes have been saved.
</Alert>`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%" }}>
          <Alert variant="info" title="Information">
            Here is some additional context for this message.
          </Alert>
          <Alert variant="success" title="Success!">
            Your changes have been saved.
          </Alert>
        </div>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={alertProps} />
    </article>
  );
}
