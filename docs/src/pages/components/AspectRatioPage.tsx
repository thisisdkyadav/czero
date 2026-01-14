import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { AspectRatio } from "../../../../src/react";
import "../GettingStarted.css";

const aspectRatioProps = [
  {
    name: "ratio",
    type: "number",
    default: "16/9",
    description: "Aspect ratio as width/height",
  },
];

export default function AspectRatioPage() {
  return (
    <article className="docs-page">
      <h1>AspectRatio</h1>
      <p className="lead">
        A component that maintains a consistent aspect ratio for its content.
      </p>

      <h2>16:9 (Default)</h2>
      <CodePreview
        code={`<AspectRatio ratio={16/9}>
  <img src="..." alt="..." />
</AspectRatio>`}
      >
        <div style={{ maxWidth: 400 }}>
          <AspectRatio ratio={16/9}>
            <div style={{ 
              background: "linear-gradient(135deg, hsl(220 70% 50%), hsl(280 70% 50%))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 600,
            }}>
              16:9
            </div>
          </AspectRatio>
        </div>
      </CodePreview>

      <h2>Square (1:1)</h2>
      <CodePreview
        code={`<AspectRatio ratio={1}>...</AspectRatio>`}
      >
        <div style={{ maxWidth: 200 }}>
          <AspectRatio ratio={1}>
            <div style={{ 
              background: "linear-gradient(135deg, hsl(150 70% 50%), hsl(200 70% 50%))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 600,
            }}>
              1:1
            </div>
          </AspectRatio>
        </div>
      </CodePreview>

      <h2>4:3</h2>
      <CodePreview
        code={`<AspectRatio ratio={4/3}>...</AspectRatio>`}
      >
        <div style={{ maxWidth: 300 }}>
          <AspectRatio ratio={4/3}>
            <div style={{ 
              background: "linear-gradient(135deg, hsl(30 70% 50%), hsl(60 70% 50%))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 600,
            }}>
              4:3
            </div>
          </AspectRatio>
        </div>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={aspectRatioProps} />
    </article>
  );
}
