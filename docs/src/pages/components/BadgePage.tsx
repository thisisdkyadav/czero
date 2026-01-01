import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Badge } from "../../../../src/react";
import "../GettingStarted.css";

const badgeProps = [
  {
    name: "variant",
    type: '"default" | "primary" | "success" | "danger" | "warning" | "outline"',
    default: '"default"',
    description: "Visual style variant of the badge",
  },
  {
    name: "size",
    type: '"sm" | "md"',
    default: '"md"',
    description: "Size of the badge",
  },
];

export default function BadgePage() {
  return (
    <article className="docs-page">
      <h1>Badge</h1>
      <p className="lead">
        A compact component for labels, statuses, and tags.
      </p>

      <h2>Variants</h2>
      <CodePreview
        code={`<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="outline">Outline</Badge>`}
      >
        <Badge>Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="outline">Outline</Badge>
      </CodePreview>

      <h2>Sizes</h2>
      <CodePreview
        code={`<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>`}
      >
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
      </CodePreview>

      <h2>Use Cases</h2>
      <CodePreview
        code={`<Badge variant="success">Active</Badge>
<Badge variant="danger">Error</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="outline">v1.0.0</Badge>`}
      >
        <Badge variant="success">Active</Badge>
        <Badge variant="danger">Error</Badge>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="outline">v1.0.0</Badge>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={badgeProps} />
    </article>
  );
}
