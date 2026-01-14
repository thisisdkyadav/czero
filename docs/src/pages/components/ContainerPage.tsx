import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Container, Card } from "../../../../src/react";
import "../GettingStarted.css";

const containerProps = [
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl" | "full"',
    default: '"lg"',
    description: "Maximum width of the container",
  },
  {
    name: "centered",
    type: "boolean",
    default: "true",
    description: "Center container horizontally",
  },
];

export default function ContainerPage() {
  return (
    <article className="docs-page">
      <h1>Container</h1>
      <p className="lead">
        A responsive container with max-width constraints.
      </p>

      <h2>Sizes</h2>
      <CodePreview
        code={`<Container size="sm">Small (640px)</Container>
<Container size="md">Medium (768px)</Container>
<Container size="lg">Large (1024px)</Container>
<Container size="xl">Extra Large (1280px)</Container>`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
          <Container size="sm">
            <Card><div style={{ textAlign: "center" }}>sm: 640px</div></Card>
          </Container>
          <Container size="md">
            <Card><div style={{ textAlign: "center" }}>md: 768px</div></Card>
          </Container>
          <Container size="lg">
            <Card><div style={{ textAlign: "center" }}>lg: 1024px</div></Card>
          </Container>
        </div>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={containerProps} />
    </article>
  );
}
