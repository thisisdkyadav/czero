import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Grid, Card } from "../../../../src/react";
import "../GettingStarted.css";

const gridProps = [
  {
    name: "cols",
    type: "1 | 2 | 3 | 4 | 5 | 6 | 12",
    default: "3",
    description: "Number of columns",
  },
  {
    name: "gap",
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Gap between grid items",
  },
];

export default function GridPage() {
  return (
    <article className="docs-page">
      <h1>Grid</h1>
      <p className="lead">
        A CSS Grid layout component with column and gap options.
      </p>

      <h2>3 Columns (Default)</h2>
      <CodePreview
        code={`<Grid cols={3} gap="md">
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</Grid>`}
      >
        <Grid cols={3} gap="md">
          <Card><div style={{ textAlign: "center", padding: "1rem" }}>1</div></Card>
          <Card><div style={{ textAlign: "center", padding: "1rem" }}>2</div></Card>
          <Card><div style={{ textAlign: "center", padding: "1rem" }}>3</div></Card>
        </Grid>
      </CodePreview>

      <h2>4 Columns</h2>
      <CodePreview
        code={`<Grid cols={4} gap="sm">
  {[1, 2, 3, 4].map(n => <Card key={n}>{n}</Card>)}
</Grid>`}
      >
        <Grid cols={4} gap="sm">
          {[1, 2, 3, 4].map(n => (
            <Card key={n}><div style={{ textAlign: "center", padding: "1rem" }}>{n}</div></Card>
          ))}
        </Grid>
      </CodePreview>

      <h2>2 Columns with Large Gap</h2>
      <CodePreview
        code={`<Grid cols={2} gap="lg">
  <Card>Left</Card>
  <Card>Right</Card>
</Grid>`}
      >
        <Grid cols={2} gap="lg">
          <Card><div style={{ textAlign: "center", padding: "1rem" }}>Left</div></Card>
          <Card><div style={{ textAlign: "center", padding: "1rem" }}>Right</div></Card>
        </Grid>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={gridProps} />
    </article>
  );
}
