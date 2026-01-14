import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { DropdownMenu, Button } from "../../../../src/react";
import "../GettingStarted.css";

const dropdownProps = [
  {
    name: "DropdownMenu",
    type: "compound",
    default: "-",
    description: "Root container",
  },
  {
    name: "DropdownMenu.Trigger",
    type: "compound",
    default: "-",
    description: "Button that toggles the menu",
  },
  {
    name: "DropdownMenu.Content",
    type: "compound",
    default: "-",
    description: "Container for menu items",
  },
  {
    name: "DropdownMenu.Item",
    type: "compound",
    default: "-",
    description: "Clickable menu item",
  },
  {
    name: "DropdownMenu.Separator",
    type: "compound",
    default: "-",
    description: "Visual divider",
  },
  {
    name: "DropdownMenu.Label",
    type: "compound",
    default: "-",
    description: "Non-interactive label",
  },
];

export default function DropdownMenuPage() {
  return (
    <article className="docs-page">
      <h1>DropdownMenu</h1>
      <p className="lead">
        A dropdown menu component with keyboard navigation.
      </p>

      <h2>Basic Usage</h2>
      <CodePreview
        code={`<DropdownMenu>
  <DropdownMenu.Trigger>
    <Button>Open Menu</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Label>Actions</DropdownMenu.Label>
    <DropdownMenu.Item>Edit</DropdownMenu.Item>
    <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>Delete</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>`}
      >
        <DropdownMenu>
          <DropdownMenu.Trigger>
            <Button variant="outline">Open Menu ▾</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>Actions</DropdownMenu.Label>
            <DropdownMenu.Item onClick={() => alert("Edit clicked")}>Edit</DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => alert("Duplicate clicked")}>Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onClick={() => alert("Delete clicked")}>Delete</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </CodePreview>

      <h2>Alignment</h2>
      <CodePreview
        code={`<DropdownMenu>
  <DropdownMenu.Trigger>...</DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">...</DropdownMenu.Content>
</DropdownMenu>`}
      >
        <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
          <DropdownMenu>
            <DropdownMenu.Trigger>
              <Button variant="outline">Right Aligned ▾</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              <DropdownMenu.Item>Option 1</DropdownMenu.Item>
              <DropdownMenu.Item>Option 2</DropdownMenu.Item>
              <DropdownMenu.Item>Option 3</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </div>
      </CodePreview>

      <h2>Components</h2>
      <PropsTable props={dropdownProps} />
    </article>
  );
}
