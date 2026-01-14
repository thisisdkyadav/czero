import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Tabs } from "../../../../src/react";
import "../GettingStarted.css";

const tabsProps = [
  {
    name: "defaultValue",
    type: "string",
    default: '""',
    description: "Initial active tab value (uncontrolled)",
  },
  {
    name: "value",
    type: "string",
    default: "undefined",
    description: "Active tab value (controlled)",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    default: "undefined",
    description: "Callback when active tab changes",
  },
];

export default function TabsPage() {
  return (
    <article className="docs-page">
      <h1>Tabs</h1>
      <p className="lead">
        A tabbed interface for organizing content into sections.
      </p>

      <h2>Basic Usage</h2>
      <CodePreview
        code={`<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Account</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Password</Tabs.Trigger>
    <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Account settings...</Tabs.Content>
  <Tabs.Content value="tab2">Password settings...</Tabs.Content>
  <Tabs.Content value="tab3">Other settings...</Tabs.Content>
</Tabs>`}
      >
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Account</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Password</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">
            <p>Manage your account settings and preferences here.</p>
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <p>Change your password and security settings.</p>
          </Tabs.Content>
          <Tabs.Content value="tab3">
            <p>Configure additional application settings.</p>
          </Tabs.Content>
        </Tabs>
      </CodePreview>

      <h2>Multiple Tabs</h2>
      <CodePreview
        code={`<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
    <Tabs.Trigger value="reports">Reports</Tabs.Trigger>
    <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
  </Tabs.List>
  ...
</Tabs>`}
      >
        <Tabs defaultValue="overview">
          <Tabs.List>
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
            <Tabs.Trigger value="reports">Reports</Tabs.Trigger>
            <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview">
            <p>Welcome to the dashboard overview.</p>
          </Tabs.Content>
          <Tabs.Content value="analytics">
            <p>View your analytics data here.</p>
          </Tabs.Content>
          <Tabs.Content value="reports">
            <p>Generate and download reports.</p>
          </Tabs.Content>
          <Tabs.Content value="notifications">
            <p>Manage your notification preferences.</p>
          </Tabs.Content>
        </Tabs>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={tabsProps} />
    </article>
  );
}
