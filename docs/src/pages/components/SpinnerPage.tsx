import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Spinner } from "../../../../src/react";
import "../GettingStarted.css";

const spinnerProps = [
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size of the spinner",
  },
  {
    name: "variant",
    type: '"default" | "primary"',
    default: '"default"',
    description: "Color variant",
  },
];

export default function SpinnerPage() {
  return (
    <article className="docs-page">
      <h1>Spinner</h1>
      <p className="lead">
        A loading spinner indicator component.
      </p>

      <h2>Basic Usage</h2>
      <CodePreview
        code={`<Spinner />`}
      >
        <Spinner />
      </CodePreview>

      <h2>Sizes</h2>
      <CodePreview
        code={`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`}
      >
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </CodePreview>

      <h2>Variants</h2>
      <CodePreview
        code={`<Spinner variant="default" />
<Spinner variant="primary" />`}
      >
        <Spinner variant="default" />
        <Spinner variant="primary" />
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={spinnerProps} />
    </article>
  );
}
