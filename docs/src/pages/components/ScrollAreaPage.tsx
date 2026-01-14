import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { ScrollArea, Separator } from "../../../../src/react";
import "../GettingStarted.css";

const scrollAreaProps = [
  {
    name: "maxHeight",
    type: "string | number",
    default: "undefined",
    description: "Maximum height before scrolling",
  },
];

const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

export default function ScrollAreaPage() {
  return (
    <article className="docs-page">
      <h1>ScrollArea</h1>
      <p className="lead">
        A scrollable area with styled scrollbar.
      </p>

      <h2>Basic Usage</h2>
      <CodePreview
        code={`<ScrollArea maxHeight={200}>
  {items.map(item => (
    <div key={item}>{item}</div>
  ))}
</ScrollArea>`}
      >
        <ScrollArea maxHeight={200} style={{ border: "1px solid hsl(var(--cz-color-border))", borderRadius: "var(--cz-radius-md)", padding: "0.5rem" }}>
          {items.map((item, i) => (
            <div key={item}>
              <div style={{ padding: "0.5rem 0" }}>{item}</div>
              {i < items.length - 1 && <Separator />}
            </div>
          ))}
        </ScrollArea>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={scrollAreaProps} />
    </article>
  );
}
