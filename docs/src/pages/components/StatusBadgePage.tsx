import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { StatusBadge } from "../../../../src/react";
import "../GettingStarted.css";

const statusBadgeProps = [
  {
    name: "status",
    type: "React.ReactNode",
    default: "undefined",
    description: "Status text/value used for label and automatic tone mapping",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: "undefined",
    description: "Optional custom label (overrides the visible text)",
  },
  {
    name: "tone",
    type: '"primary" | "success" | "danger" | "warning"',
    default: "auto",
    description: "Manual tone override. If omitted, tone is inferred from status text.",
  },
  {
    name: "showDot",
    type: "boolean",
    default: "true",
    description: "Whether to show the colored status dot",
  },
];

export default function StatusBadgePage() {
  return (
    <article className="docs-page">
      <h1>StatusBadge</h1>
      <p className="lead">
        Semantic status pill built for common app states. Preserves the same
        shape and spacing as existing frontend status badges.
      </p>

      <h2>Automatic Mapping</h2>
      <CodePreview
        code={`<StatusBadge status="Checked In" />
<StatusBadge status="Checked Out" />
<StatusBadge status="Maintenance" />
<StatusBadge status="Pending" />
<StatusBadge status="Unknown" />`}
      >
        <StatusBadge status="Checked In" />
        <StatusBadge status="Checked Out" />
        <StatusBadge status="Maintenance" />
        <StatusBadge status="Pending" />
        <StatusBadge status="Unknown" />
      </CodePreview>

      <h2>Manual Tone Override</h2>
      <CodePreview
        code={`<StatusBadge status="Approved" tone="success" />
<StatusBadge status="Rejected" tone="danger" />
<StatusBadge status="In Progress" tone="warning" />
<StatusBadge status="Draft" tone="primary" />`}
      >
        <StatusBadge status="Approved" tone="success" />
        <StatusBadge status="Rejected" tone="danger" />
        <StatusBadge status="In Progress" tone="warning" />
        <StatusBadge status="Draft" tone="primary" />
      </CodePreview>

      <h2>No Dot</h2>
      <CodePreview
        code={`<StatusBadge status="Active" showDot={false} />
<StatusBadge status="Inactive" showDot={false} />`}
      >
        <StatusBadge status="Active" showDot={false} />
        <StatusBadge status="Inactive" showDot={false} />
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={statusBadgeProps} />
    </article>
  );
}
