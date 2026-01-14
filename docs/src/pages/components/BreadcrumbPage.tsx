import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Breadcrumb } from "../../../../src/react";
import "../GettingStarted.css";

const breadcrumbProps = [
  {
    name: "Breadcrumb",
    type: "compound",
    default: "-",
    description: "Root navigation container",
  },
  {
    name: "Breadcrumb.List",
    type: "compound",
    default: "-",
    description: "Ordered list wrapper",
  },
  {
    name: "Breadcrumb.Item",
    type: "compound",
    default: "-",
    description: "Individual breadcrumb item",
  },
  {
    name: "Breadcrumb.Link",
    type: "compound",
    default: "-",
    description: "Clickable link",
  },
  {
    name: "Breadcrumb.Separator",
    type: "compound",
    default: "-",
    description: "Visual separator between items",
  },
  {
    name: "Breadcrumb.Page",
    type: "compound",
    default: "-",
    description: "Current page (non-clickable)",
  },
];

export default function BreadcrumbPage() {
  return (
    <article className="docs-page">
      <h1>Breadcrumb</h1>
      <p className="lead">
        Navigation breadcrumbs showing the current page's location.
      </p>

      <h2>Basic Usage</h2>
      <CodePreview
        code={`<Breadcrumb>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb>`}
      >
        <Breadcrumb>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>
      </CodePreview>

      <h2>Components</h2>
      <PropsTable props={breadcrumbProps} />
    </article>
  );
}
