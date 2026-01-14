import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Dialog, Button } from "../../../../src/react";
import "../GettingStarted.css";

const dialogProps = [
  {
    name: "open",
    type: "boolean",
    default: "undefined",
    description: "Controlled open state",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: "undefined",
    description: "Callback when open state changes",
  },
];

export default function DialogPage() {
  return (
    <article className="docs-page">
      <h1>Dialog</h1>
      <p className="lead">
        A modal dialog component with overlay and compound parts.
      </p>

      <h2>Basic Usage</h2>
      <CodePreview
        code={`<Dialog>
  <Dialog.Trigger>
    <Button>Open Dialog</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Dialog Title</Dialog.Title>
      <Dialog.Description>This is the dialog description.</Dialog.Description>
    </Dialog.Header>
    <p>Dialog content goes here.</p>
    <Dialog.Footer>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>`}
      >
        <Dialog>
          <Dialog.Trigger>
            <Button>Open Dialog</Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>This is the dialog description.</Dialog.Description>
            </Dialog.Header>
            <p>Dialog content goes here. Press Escape or click outside to close.</p>
            <Dialog.Footer>
              <Button variant="outline">Cancel</Button>
              <Button>Confirm</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={dialogProps} />
    </article>
  );
}
