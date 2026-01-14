import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Table, Badge } from "../../../../src/react";
import "../GettingStarted.css";

const tableProps = [
  {
    name: "Table",
    type: "compound",
    default: "-",
    description: "Root table container with horizontal scroll",
  },
  {
    name: "Table.Header",
    type: "compound",
    default: "-",
    description: "Table header section (thead)",
  },
  {
    name: "Table.Body",
    type: "compound",
    default: "-",
    description: "Table body section (tbody)",
  },
  {
    name: "Table.Row",
    type: "compound",
    default: "-",
    description: "Table row (tr)",
  },
  {
    name: "Table.Head",
    type: "compound",
    default: "-",
    description: "Table header cell (th)",
  },
  {
    name: "Table.Cell",
    type: "compound",
    default: "-",
    description: "Table data cell (td)",
  },
];

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Active" },
];

export default function TablePage() {
  return (
    <article className="docs-page">
      <h1>Table</h1>
      <p className="lead">
        A compound table component for displaying data.
      </p>

      <h2>Basic Usage</h2>
      <CodePreview
        code={`<Table>
  <Table.Header>
    <Table.Row>
      <Table.Head>Name</Table.Head>
      <Table.Head>Email</Table.Head>
      <Table.Head>Status</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {users.map((user) => (
      <Table.Row key={user.id}>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>
          <Badge variant={user.status === "Active" ? "success" : "default"}>
            {user.status}
          </Badge>
        </Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>`}
      >
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Name</Table.Head>
              <Table.Head>Email</Table.Head>
              <Table.Head>Status</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <Badge variant={user.status === "Active" ? "success" : "default"}>
                    {user.status}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </CodePreview>

      <h2>Components</h2>
      <PropsTable props={tableProps} />
    </article>
  );
}
