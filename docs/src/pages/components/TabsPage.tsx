import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Tabs } from "../../../../src/react";
import "../GettingStarted.css";

const tabsProps = [
  {
    name: "items / tabs",
    type: "TabsItem[]",
    default: "undefined",
    description:
      "Convenience mode for rendering tabs from data: [{ value, label, icon?, count?, disabled?, content? }]",
  },
  {
    name: "value / activeTab",
    type: "string | number | boolean",
    default: "undefined",
    description: "Controlled active tab value (supports aliases)",
  },
  {
    name: "onChange / setActiveTab",
    type: "(value) => void",
    default: "undefined",
    description: "Typed change callback aliases for convenience mode",
  },
  {
    name: "variant",
    type: '"underline" | "pills" | "enclosed"',
    default: '"underline"',
    description: "Tab visual style",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "small" | "medium" | "large"',
    default: '"md"',
    description: "Tab sizing",
  },
  {
    name: "fullWidth",
    type: "boolean",
    default: "false",
    description: "Stretch tab triggers equally across the list",
  },
  {
    name: "showBorder",
    type: "boolean",
    default: "true",
    description: "Toggle list bottom border",
  },
  {
    name: "defaultValue / onValueChange",
    type: "primitive tabs props",
    default: "-",
    description: "Primitive Radix-compatible API remains fully supported",
  },
];

const accountItems = [
  { value: "account", label: "Account", count: 4 },
  { value: "security", label: "Security", count: 2 },
  { value: "billing", label: "Billing", count: 1 },
];

export default function TabsPage() {
  return (
    <article className="docs-page">
      <h1>Tabs</h1>
      <p className="lead">
        Accessible tabs with both primitive composition and high-level data-driven convenience mode.
      </p>

      <h2>Primitive Mode</h2>
      <CodePreview
        code={`<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Account</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Account settings...</Tabs.Content>
  <Tabs.Content value="tab2">Password settings...</Tabs.Content>
</Tabs>`}
      >
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Account</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Password</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">
            <p>Manage your account settings here.</p>
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <p>Update password and security settings here.</p>
          </Tabs.Content>
        </Tabs>
      </CodePreview>

      <h2>Convenience Items Mode</h2>
      <CodePreview
        code={`<Tabs
  variant="pills"
  size="small"
  tabs={[
    { value: "account", label: "Account", count: 4 },
    { value: "security", label: "Security", count: 2 },
    { value: "billing", label: "Billing", count: 1 },
  ]}
/>`}
      >
        <Tabs variant="pills" size="small" tabs={accountItems} />
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={tabsProps} />
    </article>
  );
}
