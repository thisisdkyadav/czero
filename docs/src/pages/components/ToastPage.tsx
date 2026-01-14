import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Button, ToastProvider, Toaster, useToast } from "../../../../src/react";
import "../GettingStarted.css";

const toastProps = [
  {
    name: "variant",
    type: '"default" | "success" | "warning" | "danger"',
    default: '"default"',
    description: "Visual style of the toast",
  },
  {
    name: "title",
    type: "string",
    default: "undefined",
    description: "Toast title text",
  },
  {
    name: "description",
    type: "string",
    default: "undefined",
    description: "Toast description text",
  },
  {
    name: "duration",
    type: "number",
    default: "5000",
    description: "Auto-dismiss duration in ms (0 = no auto-dismiss)",
  },
];

function ToastDemo() {
  const { toast } = useToast();

  return (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Button
        onClick={() =>
          toast({ title: "Default Toast", description: "This is a default notification." })
        }
      >
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({ variant: "success", title: "Success!", description: "Operation completed." })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({ variant: "warning", title: "Warning", description: "Please review this." })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({ variant: "danger", title: "Error", description: "Something went wrong." })
        }
      >
        Danger
      </Button>
    </div>
  );
}

export default function ToastPage() {
  return (
    <ToastProvider>
      <article className="docs-page">
        <h1>Toast</h1>
        <p className="lead">
          Toast notifications with auto-dismiss and variants.
        </p>

        <h2>Usage</h2>
        <p>Wrap your app with <code>ToastProvider</code> and add <code>Toaster</code>:</p>
        <CodePreview
          code={`// In your app root:
<ToastProvider>
  <App />
  <Toaster position="bottom-right" />
</ToastProvider>

// In any component:
const { toast } = useToast();
toast({ title: "Hello!", description: "This is a toast." });`}
        >
          <ToastDemo />
        </CodePreview>

        <h2>Variants</h2>
        <p>Click the buttons above to see different toast variants!</p>

        <h2>Props</h2>
        <PropsTable props={toastProps} />
      </article>
      <Toaster position="bottom-right" />
    </ToastProvider>
  );
}
