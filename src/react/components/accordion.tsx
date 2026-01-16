import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

// ===== Root =====
export interface AccordionSingleProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> {
  type?: "single";
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
}

export interface AccordionMultipleProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> {
  type: "multiple";
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

const AccordionRoot = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ className = "", type = "single", ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    type={type as any}
    className={`cz-accordion ${className}`}
    {...(props as any)}
  />
));
AccordionRoot.displayName = "Accordion";

// ===== Item =====
export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  value: string;
}

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className = "", ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={`cz-accordion-item ${className}`}
    {...props}
  />
));
AccordionItem.displayName = "Accordion.Item";

// ===== Header =====
const AccordionHeader = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Header>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(({ className = "", ...props }, ref) => (
  <AccordionPrimitive.Header
    ref={ref}
    className={`cz-accordion-header ${className}`}
    {...props}
  />
));
AccordionHeader.displayName = "Accordion.Header";

// ===== Trigger =====
export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className = "", children, ...props }, ref) => (
  <AccordionPrimitive.Header className="cz-accordion-header">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={`cz-accordion-trigger ${className}`}
      {...props}
    >
      {children}
      <svg
        className="cz-accordion-icon"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 4.5L6 7.5L9 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "Accordion.Trigger";

// ===== Content =====
export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {}

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className = "", children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={`cz-accordion-content ${className}`}
    {...props}
  >
    <div className="cz-accordion-content-inner">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "Accordion.Content";

// ===== Export =====
export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Header: AccordionHeader,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});
