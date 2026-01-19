import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Button } from "../../../../src/react";
import "../GettingStarted.css";

const buttonProps = [
  {
    name: "variant",
    type: '"primary" | "secondary" | "outline" | "ghost" | "danger"',
    default: '"primary"',
    description: "Visual style variant of the button",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size of the button",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    description: "Shows spinner and disables button",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the button",
  },
];

export default function ButtonPage() {
  return (
    <article className="docs-page">
      <h1>Button</h1>
      <p className="lead">
        A versatile button component with multiple variants and sizes.
      </p>

      <h2>Variants</h2>
      <CodePreview
        code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`}
      >
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </CodePreview>

      <h2>Sizes</h2>
      <CodePreview
        code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
      >
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </CodePreview>

      <h2>States</h2>
      <CodePreview
        code={`<Button loading>Loading</Button>
<Button disabled>Disabled</Button>`}
      >
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </CodePreview>

      <h2>With Icons</h2>
      <CodePreview
        code={`<Button>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
  Send Email
</Button>
<Button variant="outline">
  Download
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
</Button>
<Button size="icon" variant="ghost">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
</Button>`}
      >
        <Button>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          Send Email
        </Button>
        <Button variant="outline">
          Download
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </Button>
        <Button size="icon" variant="ghost">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </Button>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={buttonProps} />
    </article>
  );
}
