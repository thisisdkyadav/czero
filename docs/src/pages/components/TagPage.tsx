import { useState } from "react";
import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Tag } from "../../../../src/react";
import "../GettingStarted.css";

const tagProps = [
  {
    name: "variant",
    type: '"default" | "primary" | "secondary" | "success" | "warning" | "danger"',
    default: '"default"',
    description: "Color variant",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size of the tag",
  },
  {
    name: "removable",
    type: "boolean",
    default: "false",
    description: "Show remove button",
  },
  {
    name: "onRemove",
    type: "() => void",
    default: "undefined",
    description: "Callback when remove is clicked",
  },
];

function RemovableTagsDemo() {
  const [tags, setTags] = useState(["React", "TypeScript", "CZero"]);

  return (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      {tags.map((tag) => (
        <Tag
          key={tag}
          variant="primary"
          removable
          onRemove={() => setTags(tags.filter((t) => t !== tag))}
        >
          {tag}
        </Tag>
      ))}
      {tags.length === 0 && <span style={{ color: "var(--cz-color-mutedFg)" }}>All tags removed!</span>}
    </div>
  );
}

export default function TagPage() {
  return (
    <article className="docs-page">
      <h1>Tag</h1>
      <p className="lead">
        Tags are used to label, categorize, or organize items.
      </p>

      <h2>Variants</h2>
      <CodePreview
        code={`<Tag variant="default">Default</Tag>
<Tag variant="primary">Primary</Tag>
<Tag variant="secondary">Secondary</Tag>
<Tag variant="success">Success</Tag>
<Tag variant="warning">Warning</Tag>
<Tag variant="danger">Danger</Tag>`}
      >
        <Tag variant="default">Default</Tag>
        <Tag variant="primary">Primary</Tag>
        <Tag variant="secondary">Secondary</Tag>
        <Tag variant="success">Success</Tag>
        <Tag variant="warning">Warning</Tag>
        <Tag variant="danger">Danger</Tag>
      </CodePreview>

      <h2>Sizes</h2>
      <CodePreview
        code={`<Tag size="sm">Small</Tag>
<Tag size="md">Medium</Tag>
<Tag size="lg">Large</Tag>`}
      >
        <Tag size="sm" variant="primary">Small</Tag>
        <Tag size="md" variant="primary">Medium</Tag>
        <Tag size="lg" variant="primary">Large</Tag>
      </CodePreview>

      <h2>Removable</h2>
      <CodePreview
        code={`const [tags, setTags] = useState(["React", "TypeScript"]);

{tags.map((tag) => (
  <Tag removable onRemove={() => removeTag(tag)}>
    {tag}
  </Tag>
))}`}
      >
        <RemovableTagsDemo />
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={tagProps} />
    </article>
  );
}
