import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Card, Button } from "../../../../src/react";
import "../GettingStarted.css";

const cardProps = [
  {
    name: "noPadding",
    type: "boolean",
    default: "false",
    description: "Removes default padding from the card",
  },
];

export default function CardPage() {
  return (
    <article className="docs-page">
      <h1>Card</h1>
      <p className="lead">
        A container component with header, body, and footer slots.
      </p>

      <h2>Basic</h2>
      <CodePreview
        code={`<Card>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card description goes here</Card.Description>
  </Card.Header>
  <Card.Body>
    This is the card content area.
  </Card.Body>
</Card>`}
      >
        <Card style={{ width: "100%", maxWidth: 350 }}>
          <Card.Header>
            <Card.Title>Card Title</Card.Title>
            <Card.Description>Card description goes here</Card.Description>
          </Card.Header>
          <Card.Body>This is the card content area.</Card.Body>
        </Card>
      </CodePreview>

      <h2>With Footer</h2>
      <CodePreview
        code={`<Card>
  <Card.Header>
    <Card.Title>Confirm Action</Card.Title>
  </Card.Header>
  <Card.Body>
    Are you sure you want to proceed?
  </Card.Body>
  <Card.Footer>
    <Button variant="ghost">Cancel</Button>
    <Button>Confirm</Button>
  </Card.Footer>
</Card>`}
      >
        <Card style={{ width: "100%", maxWidth: 350 }}>
          <Card.Header>
            <Card.Title>Confirm Action</Card.Title>
          </Card.Header>
          <Card.Body>Are you sure you want to proceed?</Card.Body>
          <Card.Footer>
            <Button variant="ghost">Cancel</Button>
            <Button>Confirm</Button>
          </Card.Footer>
        </Card>
      </CodePreview>

      <h2>Simple Card</h2>
      <CodePreview
        code={`<Card>
  <Card.Body>
    A simple card with just content.
  </Card.Body>
</Card>`}
      >
        <Card style={{ width: "100%", maxWidth: 350 }}>
          <Card.Body>A simple card with just content.</Card.Body>
        </Card>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={cardProps} />
    </article>
  );
}
