import * as React from "react";

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  children: React.ReactNode;
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface AccordionContextValue {
  type: "single" | "multiple";
  expandedItems: string[];
  toggleItem: (value: string) => void;
}

interface AccordionItemContextValue {
  value: string;
  isExpanded: boolean;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);
const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

const useAccordionContext = () => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
};

const useAccordionItemContext = () => {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error("Accordion.Trigger/Content must be used within Accordion.Item");
  }
  return context;
};

const AccordionRoot = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className = "", type = "single", defaultValue, children, ...props }, ref) => {
    const [expandedItems, setExpandedItems] = React.useState<string[]>(() => {
      if (!defaultValue) return [];
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    });

    const toggleItem = React.useCallback((value: string) => {
      setExpandedItems((prev) => {
        if (type === "single") {
          return prev.includes(value) ? [] : [value];
        }
        return prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value];
      });
    }, [type]);

    return (
      <AccordionContext.Provider value={{ type, expandedItems, toggleItem }}>
        <div ref={ref} className={`cz-accordion ${className}`} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
AccordionRoot.displayName = "Accordion";

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className = "", value, children, ...props }, ref) => {
    const { expandedItems } = useAccordionContext();
    const isExpanded = expandedItems.includes(value);

    return (
      <AccordionItemContext.Provider value={{ value, isExpanded }}>
        <div
          ref={ref}
          className={`cz-accordion-item ${isExpanded ? "cz-accordion-item-expanded" : ""} ${className}`}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = "Accordion.Item";

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className = "", children, ...props }, ref) => {
    const { toggleItem } = useAccordionContext();
    const { value, isExpanded } = useAccordionItemContext();

    return (
      <button
        ref={ref}
        type="button"
        className={`cz-accordion-trigger ${className}`}
        aria-expanded={isExpanded}
        onClick={() => toggleItem(value)}
        {...props}
      >
        {children}
        <span className={`cz-accordion-icon ${isExpanded ? "cz-accordion-icon-expanded" : ""}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
    );
  }
);
AccordionTrigger.displayName = "Accordion.Trigger";

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className = "", children, ...props }, ref) => {
    const { isExpanded } = useAccordionItemContext();

    if (!isExpanded) return null;

    return (
      <div ref={ref} className={`cz-accordion-content ${className}`} {...props}>
        {children}
      </div>
    );
  }
);
AccordionContent.displayName = "Accordion.Content";

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});
