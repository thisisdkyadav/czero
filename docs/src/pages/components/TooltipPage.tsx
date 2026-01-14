import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Tooltip, Button } from "../../../../src/react";
import "../GettingStarted.css";

const tooltipProps = [
  {
    name: "content",
    type: "ReactNode",
    default: "required",
    description: "Content to display in the tooltip",
  },
  {
    name: "position",
    type: '"top" | "bottom" | "left" | "right"',
    default: '"top"',
    description: "Position of the tooltip relative to the trigger",
  },
  {
    name: "delay",
    type: "number",
    default: "200",
    description: "Delay in milliseconds before showing the tooltip",
  },
];

export default function TooltipPage() {
  return (
    <article className="docs-page">
      <h1>Tooltip</h1>
      <p className="lead">
        A popup that displays information on hover or focus.
      </p>

      <h2>Basic Usage</h2>
      <CodePreview
        code={`<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>`}
      >
        <Tooltip content="This is a tooltip">
          <Button>Hover me</Button>
        </Tooltip>
      </CodePreview>

      <h2>Positions</h2>
      <CodePreview
        code={`<Tooltip content="Top" position="top"><Button>Top</Button></Tooltip>
<Tooltip content="Bottom" position="bottom"><Button>Bottom</Button></Tooltip>
<Tooltip content="Left" position="left"><Button>Left</Button></Tooltip>
<Tooltip content="Right" position="right"><Button>Right</Button></Tooltip>`}
      >
        <Tooltip content="Top" position="top">
          <Button variant="outline">Top</Button>
        </Tooltip>
        <Tooltip content="Bottom" position="bottom">
          <Button variant="outline">Bottom</Button>
        </Tooltip>
        <Tooltip content="Left" position="left">
          <Button variant="outline">Left</Button>
        </Tooltip>
        <Tooltip content="Right" position="right">
          <Button variant="outline">Right</Button>
        </Tooltip>
      </CodePreview>

      <h2>Custom Delay</h2>
      <CodePreview
        code={`<Tooltip content="Instant!" delay={0}><Button>No delay</Button></Tooltip>
<Tooltip content="Wait for it..." delay={500}><Button>500ms delay</Button></Tooltip>`}
      >
        <Tooltip content="Instant!" delay={0}>
          <Button variant="secondary">No delay</Button>
        </Tooltip>
        <Tooltip content="Wait for it..." delay={500}>
          <Button variant="secondary">500ms delay</Button>
        </Tooltip>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={tooltipProps} />
    </article>
  );
}
