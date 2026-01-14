import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Stack, Button } from "../../../../src/react";
import "../GettingStarted.css";

const stackProps = [
  {
    name: "direction",
    type: '"row" | "column"',
    default: '"column"',
    description: "Stack direction",
  },
  {
    name: "gap",
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Gap between items",
  },
  {
    name: "align",
    type: '"start" | "center" | "end" | "stretch"',
    default: '"stretch"',
    description: "Align items on cross axis",
  },
  {
    name: "justify",
    type: '"start" | "center" | "end" | "between" | "around"',
    default: '"start"',
    description: "Justify content on main axis",
  },
  {
    name: "wrap",
    type: "boolean",
    default: "false",
    description: "Allow items to wrap",
  },
];

export default function StackPage() {
  return (
    <article className="docs-page">
      <h1>Stack</h1>
      <p className="lead">
        A flexible layout component for arranging items with gap.
      </p>

      <h2>Vertical Stack (Default)</h2>
      <CodePreview
        code={`<Stack gap="md">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
  <Button>Button 3</Button>
</Stack>`}
      >
        <Stack gap="md">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </Stack>
      </CodePreview>

      <h2>Horizontal Stack</h2>
      <CodePreview
        code={`<Stack direction="row" gap="sm">
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</Stack>`}
      >
        <Stack direction="row" gap="sm">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </Stack>
      </CodePreview>

      <h2>Alignment</h2>
      <CodePreview
        code={`<Stack direction="row" gap="md" justify="between" align="center">
  <span>Left</span>
  <span>Right</span>
</Stack>`}
      >
        <Stack direction="row" gap="md" justify="between" align="center" style={{ width: "100%" }}>
          <Button variant="outline">Left</Button>
          <Button variant="primary">Right</Button>
        </Stack>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={stackProps} />
    </article>
  );
}
