import { useState, useEffect } from "react";
import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Progress } from "../../../../src/react";
import "../GettingStarted.css";

const progressProps = [
  {
    name: "value",
    type: "number",
    default: "0",
    description: "Current progress value",
  },
  {
    name: "max",
    type: "number",
    default: "100",
    description: "Maximum value",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Height of the progress bar",
  },
  {
    name: "variant",
    type: '"default" | "success" | "warning" | "danger"',
    default: '"default"',
    description: "Color variant of the progress bar",
  },
];

function AnimatedProgress() {
  const [value, setValue] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return <Progress value={value} />;
}

export default function ProgressPage() {
  return (
    <article className="docs-page">
      <h1>Progress</h1>
      <p className="lead">
        A progress bar component to show completion status.
      </p>

      <h2>Basic Usage</h2>
      <CodePreview
        code={`<Progress value={60} />`}
      >
        <div style={{ width: "100%" }}>
          <Progress value={60} />
        </div>
      </CodePreview>

      <h2>Animated</h2>
      <CodePreview
        code={`const [value, setValue] = useState(0);
// ...animating value
<Progress value={value} />`}
      >
        <div style={{ width: "100%" }}>
          <AnimatedProgress />
        </div>
      </CodePreview>

      <h2>Sizes</h2>
      <CodePreview
        code={`<Progress size="sm" value={40} />
<Progress size="md" value={60} />
<Progress size="lg" value={80} />`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
          <Progress size="sm" value={40} />
          <Progress size="md" value={60} />
          <Progress size="lg" value={80} />
        </div>
      </CodePreview>

      <h2>Variants</h2>
      <CodePreview
        code={`<Progress variant="default" value={25} />
<Progress variant="success" value={50} />
<Progress variant="warning" value={75} />
<Progress variant="danger" value={90} />`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
          <Progress variant="default" value={25} />
          <Progress variant="success" value={50} />
          <Progress variant="warning" value={75} />
          <Progress variant="danger" value={90} />
        </div>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={progressProps} />
    </article>
  );
}
