import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Skeleton } from "../../../../src/react";
import "../GettingStarted.css";

const skeletonProps = [
  {
    name: "variant",
    type: '"text" | "circular" | "rectangular"',
    default: '"text"',
    description: "Shape of the skeleton",
  },
  {
    name: "width",
    type: "string | number",
    default: "undefined",
    description: "Width of the skeleton",
  },
  {
    name: "height",
    type: "string | number",
    default: "undefined",
    description: "Height of the skeleton",
  },
];

export default function SkeletonPage() {
  return (
    <article className="docs-page">
      <h1>Skeleton</h1>
      <p className="lead">
        A loading placeholder that animates to indicate content is loading.
      </p>

      <h2>Text</h2>
      <CodePreview
        code={`<Skeleton variant="text" />
<Skeleton variant="text" width="80%" />
<Skeleton variant="text" width="60%" />`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
          <Skeleton variant="text" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
        </div>
      </CodePreview>

      <h2>Circular</h2>
      <CodePreview
        code={`<Skeleton variant="circular" width={32} height={32} />
<Skeleton variant="circular" width={48} height={48} />
<Skeleton variant="circular" width={64} height={64} />`}
      >
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={48} height={48} />
        <Skeleton variant="circular" width={64} height={64} />
      </CodePreview>

      <h2>Rectangular</h2>
      <CodePreview
        code={`<Skeleton variant="rectangular" width={200} height={100} />
<Skeleton variant="rectangular" width="100%" height={150} />`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
          <Skeleton variant="rectangular" width={200} height={100} />
          <Skeleton variant="rectangular" width="100%" height={150} />
        </div>
      </CodePreview>

      <h2>Card Loading Example</h2>
      <CodePreview
        code={`<div style={{ display: "flex", gap: "1rem" }}>
  <Skeleton variant="circular" width={48} height={48} />
  <div style={{ flex: 1 }}>
    <Skeleton variant="text" width="40%" />
    <Skeleton variant="text" />
  </div>
</div>`}
      >
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", width: "100%" }}>
          <Skeleton variant="circular" width={48} height={48} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" />
          </div>
        </div>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={skeletonProps} />
    </article>
  );
}
