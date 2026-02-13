import { useState } from "react";
import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Button, Modal } from "../../../../src/react";
import "../GettingStarted.css";

const modalProps = [
  {
    name: "open / defaultOpen / onOpenChange",
    type: "boolean / boolean / (open: boolean) => void",
    default: "undefined",
    description: "Controlled or uncontrolled open state",
  },
  {
    name: "isOpen / onClose",
    type: "boolean / () => void",
    default: "undefined",
    description: "Convenience aliases for migration-friendly usage",
  },
  {
    name: "title / description",
    type: "React.ReactNode",
    default: "undefined",
    description: "Header title and description content",
  },
  {
    name: "footer",
    type: "React.ReactNode",
    default: "undefined",
    description: "Footer actions area",
  },
  {
    name: "tabs / activeTab / onTabChange / hideTitle",
    type: "ModalTabItem[] / string / (tabId: string) => void / boolean",
    default: "undefined / undefined / undefined / false",
    description: "Optional tabbed header navigation for multi-section modals",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl" | "full"',
    default: '"md"',
    description: "Preset modal width",
  },
  {
    name: "width",
    type: "number | string",
    default: "undefined",
    description: "Custom width override (e.g. 720 or '60rem')",
  },
  {
    name: "minHeight / fullHeight",
    type: "number | string / boolean",
    default: "undefined / false",
    description: "Content height controls",
  },
  {
    name: "showCloseButton",
    type: "boolean",
    default: "true",
    description: "Show/hide close control in header",
  },
  {
    name: "closeButtonVariant",
    type: '"icon" | "button"',
    default: '"icon"',
    description: "Close control style",
  },
  {
    name: "closeOnOverlay / closeOnEsc",
    type: "boolean / boolean",
    default: "true / true",
    description: "Dismiss behavior on backdrop click and ESC",
  },
];

export default function ModalPage() {
  return (
    <article className="docs-page">
      <h1>Modal</h1>
      <p className="lead">
        A reusable, app-level modal component built on Radix Dialog with
        common production options.
      </p>

      <h2>Basic Usage</h2>
      <CodePreview
        code={`<Modal
  trigger={<Button>Open Modal</Button>}
  title="Update Profile"
  description="Edit your profile information."
  footer={
    <>
      <Button variant="outline">Cancel</Button>
      <Button>Save Changes</Button>
    </>
  }
>
  <p>Modal body content goes here.</p>
</Modal>`}
      >
        <Modal
          trigger={<Button>Open Modal</Button>}
          title="Update Profile"
          description="Edit your profile information."
          footer={
            <>
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </>
          }
        >
          <p>Modal body content goes here.</p>
        </Modal>
      </CodePreview>

      <h2>Custom Width + Button Close</h2>
      <CodePreview
        code={`<Modal
  trigger={<Button variant="secondary">Open Large Modal</Button>}
  title="Review Request"
  width={760}
  closeButtonVariant="button"
  closeButtonText="Close"
>
  <p>Use numeric width for precise layouts.</p>
</Modal>`}
      >
        <Modal
          trigger={<Button variant="secondary">Open Large Modal</Button>}
          title="Review Request"
          width={760}
          closeButtonVariant="button"
          closeButtonText="Close"
        >
          <p>Use numeric width for precise layouts.</p>
        </Modal>
      </CodePreview>

      <h2>Non-Dismissible Backdrop</h2>
      <CodePreview
        code={`<Modal
  trigger={<Button variant="danger">Critical Action</Button>}
  title="Confirm Destructive Action"
  closeOnOverlay={false}
  closeOnEsc={false}
  footer={<Button variant="danger">I Understand</Button>}
>
  <p>This modal requires an explicit action to close.</p>
</Modal>`}
      >
        <Modal
          trigger={<Button variant="danger">Critical Action</Button>}
          title="Confirm Destructive Action"
          closeOnOverlay={false}
          closeOnEsc={false}
          footer={<Button variant="danger">I Understand</Button>}
        >
          <p>This modal requires an explicit action to close.</p>
        </Modal>
      </CodePreview>

      <h2>Tabbed Header</h2>
      <CodePreview
        code={`<Modal
  trigger={<Button variant="secondary">Open Tabbed Modal</Button>}
  title="Manage Students"
  tabs={[
    { id: "basic", name: "Basic" },
    { id: "family", name: "Family" },
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
>
  {activeTab === "basic" ? <p>Basic section</p> : <p>Family section</p>}
</Modal>`}
      >
        <TabbedModalDemo />
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={modalProps} />
    </article>
  );
}

function TabbedModalDemo() {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <Modal
      trigger={<Button variant="secondary">Open Tabbed Modal</Button>}
      title="Manage Students"
      tabs={[
        { id: "basic", name: "Basic" },
        { id: "family", name: "Family" },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === "basic" ? (
        <p>Basic section</p>
      ) : (
        <p>Family section</p>
      )}
    </Modal>
  );
}
