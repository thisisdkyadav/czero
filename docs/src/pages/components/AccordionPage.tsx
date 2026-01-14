import CodePreview from "../../components/CodePreview";
import PropsTable from "../../components/PropsTable";
import { Accordion } from "../../../../src/react";
import "../GettingStarted.css";

const accordionProps = [
  {
    name: "type",
    type: '"single" | "multiple"',
    default: '"single"',
    description: "Allow single or multiple items to be open",
  },
  {
    name: "defaultValue",
    type: "string | string[]",
    default: "undefined",
    description: "Initially expanded item(s)",
  },
];

export default function AccordionPage() {
  return (
    <article className="docs-page">
      <h1>Accordion</h1>
      <p className="lead">
        A collapsible content component with single or multiple mode.
      </p>

      <h2>Single Mode</h2>
      <CodePreview
        code={`<Accordion type="single" defaultValue="item-1">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    <Accordion.Content>
      Yes. It follows WAI-ARIA design patterns.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Is it styled?</Accordion.Trigger>
    <Accordion.Content>
      Yes. It uses CZero design tokens.
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`}
      >
        <Accordion type="single" defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
            <Accordion.Content>
              Yes. It follows WAI-ARIA design patterns for accordions.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Is it styled?</Accordion.Trigger>
            <Accordion.Content>
              Yes. It uses CZero design tokens for consistent styling.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Trigger>Can I customize it?</Accordion.Trigger>
            <Accordion.Content>
              Yes. You can pass custom classes and styles.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </CodePreview>

      <h2>Multiple Mode</h2>
      <CodePreview
        code={`<Accordion type="multiple" defaultValue={["faq-1", "faq-2"]}>
  <Accordion.Item value="faq-1">...</Accordion.Item>
  <Accordion.Item value="faq-2">...</Accordion.Item>
</Accordion>`}
      >
        <Accordion type="multiple" defaultValue={["faq-1"]}>
          <Accordion.Item value="faq-1">
            <Accordion.Trigger>What is CZero?</Accordion.Trigger>
            <Accordion.Content>
              CZero is a design-token-driven React component library.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="faq-2">
            <Accordion.Trigger>How do I install it?</Accordion.Trigger>
            <Accordion.Content>
              Run npm install czero and import the components.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </CodePreview>

      <h2>Props</h2>
      <PropsTable props={accordionProps} />
    </article>
  );
}
