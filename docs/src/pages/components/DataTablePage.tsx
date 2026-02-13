import { useMemo, useState } from "react";
import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Badge, DataTable } from "../../../../src/react";
import "../GettingStarted.css";

type UserRow = {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  status: "Active" | "Inactive";
};

const tableProps = [
  {
    name: "data",
    type: "Record<string, unknown>[]",
    default: "[]",
    description: "Rows to render.",
  },
  {
    name: "columns",
    type: "DataTableColumn[]",
    default: "[]",
    description: "Column definitions with optional render and sorting controls.",
  },
  {
    name: "sortable",
    type: "boolean",
    default: "false",
    description: "Enables sortable headers for sortable columns.",
  },
  {
    name: "pagination",
    type: "boolean",
    default: "false",
    description: "Enables built-in page controls.",
  },
  {
    name: "pageSize",
    type: "number",
    default: "10",
    description: "Rows per page when pagination is enabled.",
  },
  {
    name: "selectable",
    type: "boolean",
    default: "false",
    description: "Enables checkbox selection column.",
  },
  {
    name: "selectedRows",
    type: "(string | number)[]",
    default: "[]",
    description: "Controlled selected row ids.",
  },
  {
    name: "onSelectionChange",
    type: "(ids) => void",
    description: "Selection change callback when selectable is true.",
  },
  {
    name: "loading / isLoading",
    type: "boolean",
    default: "false",
    description: "Shows loading skeleton rows.",
  },
  {
    name: "emptyMessage",
    type: "string",
    description: "Message shown when data is empty.",
  },
];

const users: UserRow[] = [
  { id: 1, name: "Aarav Mehta", email: "aarav@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Nisha Kapoor", email: "nisha@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Rohan Das", email: "rohan@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Mira Singh", email: "mira@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Kabir Shah", email: "kabir@example.com", role: "Viewer", status: "Inactive" },
  { id: 6, name: "Anaya Roy", email: "anaya@example.com", role: "Admin", status: "Active" },
];

export default function DataTablePage() {
  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        sortable: true,
        render: (row: Record<string, unknown>) => (
          <span style={{ fontWeight: "var(--font-weight-medium)" }}>{String(row.name)}</span>
        ),
      },
      {
        key: "email",
        header: "Email",
        sortable: true,
      },
      {
        key: "role",
        header: "Role",
        sortable: true,
        render: (row: Record<string, unknown>) => (
          <Badge variant="primary" size="sm">
            {String(row.role)}
          </Badge>
        ),
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
        render: (row: Record<string, unknown>) => (
          <Badge variant={row.status === "Active" ? "success" : "warning"} size="sm">
            {String(row.status)}
          </Badge>
        ),
      },
    ],
    []
  );

  return (
    <article className="docs-page">
      <h1>DataTable</h1>
      <p className="lead">
        A high-level data table built on CZero Table primitives with sorting, loading,
        empty state, pagination, and row selection.
      </p>

      <h2>Basic Usage</h2>
      <CodePreview
        code={`const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
];

<DataTable
  data={rows}
  columns={columns}
  sortable
  pagination
  pageSize={5}
/>`}
      >
        <DataTable
          data={users}
          columns={columns}
          sortable
          pagination
          pageSize={5}
          getRowId={(row) => Number(row.id)}
        />
      </CodePreview>

      <h2>Selectable Rows</h2>
      <CodePreview
        code={`const [selectedRows, setSelectedRows] = useState([]);

<DataTable
  data={rows}
  columns={columns}
  selectable
  selectedRows={selectedRows}
  onSelectionChange={setSelectedRows}
/>`}
      >
        <DataTable
          data={users}
          columns={columns}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          getRowId={(row) => Number(row.id)}
        />
      </CodePreview>

      <h2>Loading + Empty States</h2>
      <CodePreview
        code={`<DataTable data={[]} columns={columns} loading />
<DataTable data={[]} columns={columns} emptyMessage="No users found" />`}
      >
        <DataTable data={[]} columns={columns} loading />
        <DataTable data={[]} columns={columns} emptyMessage="No users found" />
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={tableProps} />
    </article>
  );
}
