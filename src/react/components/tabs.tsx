import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

// ===== Root =====
export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const TabsRoot = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className = "", ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={`cz-tabs ${className}`}
    {...props}
  />
));
TabsRoot.displayName = "Tabs";

// ===== List =====
export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className = "", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={`cz-tabs-list ${className}`}
    {...props}
  />
));
TabsList.displayName = "Tabs.List";

// ===== Trigger =====
export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  value: string;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className = "", ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={`cz-tabs-trigger ${className}`}
    {...props}
  />
));
TabsTrigger.displayName = "Tabs.Trigger";

// ===== Content =====
export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  value: string;
}

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className = "", ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={`cz-tabs-content ${className}`}
    {...props}
  />
));
TabsContent.displayName = "Tabs.Content";

// ===== Export =====
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
