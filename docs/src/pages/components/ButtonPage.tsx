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

      <h2>Props</h2>
      <PropsTable props={buttonProps} />
    </article>
  );
}
