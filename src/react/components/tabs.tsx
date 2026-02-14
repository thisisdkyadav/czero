import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

export type TabsValue = string | number | boolean;
export type TabsVariant = "underline" | "pills" | "enclosed";
export type TabsSize = "sm" | "md" | "lg" | "small" | "medium" | "large";

export interface TabsItem {
  value: TabsValue;
  label: React.ReactNode;
  icon?: React.ReactNode;
  count?: React.ReactNode;
  disabled?: boolean;
  content?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

const toTabKey = (value: TabsValue | undefined): string | undefined => {
  if (value === undefined) return undefined;
  return String(value);
};

const coerceValueByReference = (value: string, reference: TabsValue | undefined): TabsValue => {
  if (typeof reference === "number") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? value : parsed;
  }

  if (typeof reference === "boolean") {
    return value === "true";
  }

  return value;
};

const normalizeSize = (size?: TabsSize): "sm" | "md" | "lg" => {
  if (size === "small") return "sm";
  if (size === "large") return "lg";
  if (size === "medium" || size === undefined) return "md";
  return size;
};

const normalizeVariant = (variant?: TabsVariant): TabsVariant => {
  if (variant === "pills" || variant === "enclosed") return variant;
  return "underline";
};

// ===== Root =====
export interface TabsProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
    "value" | "defaultValue" | "onValueChange" | "onChange"
  > {
  defaultValue?: TabsValue;
  value?: TabsValue;
  activeTab?: TabsValue;
  onValueChange?: (value: string) => void;
  onChange?: (value: TabsValue) => void;
  setActiveTab?: (value: TabsValue) => void;

  items?: TabsItem[];
  tabs?: TabsItem[];
  renderItem?: (item: TabsItem, state: { isActive: boolean }) => React.ReactNode;
  renderContent?: (item: TabsItem, state: { isActive: boolean }) => React.ReactNode;

  variant?: TabsVariant;
  size?: TabsSize;
  fullWidth?: boolean;
  showBorder?: boolean;
  disabled?: boolean;

  listClassName?: string;
  listStyle?: React.CSSProperties;
  triggerClassName?: string;
  triggerStyle?: React.CSSProperties;
}

const TabsRoot = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(
  (
    {
      className = "",
      children,
      defaultValue,
      value,
      activeTab,
      onValueChange,
      onChange,
      setActiveTab,
      items,
      tabs,
      renderItem,
      renderContent,
      variant,
      size = "md",
      fullWidth = false,
      showBorder = true,
      disabled = false,
      listClassName = "",
      listStyle,
      triggerClassName = "",
      triggerStyle,
      ...props
    },
    ref
  ) => {
    const dataItems = React.useMemo(() => {
      if (Array.isArray(items)) return items;
      if (Array.isArray(tabs)) return tabs;
      return undefined;
    }, [items, tabs]);

    const hasItems = Boolean(dataItems && dataItems.length > 0);
    const resolvedVariant = normalizeVariant(
      variant ?? (hasItems ? "pills" : "underline")
    );
    const resolvedSize = normalizeSize(size);
    const controlledValue = value !== undefined ? value : activeTab;
    const resolvedDefaultValue =
      defaultValue !== undefined
        ? defaultValue
        : controlledValue === undefined && hasItems
          ? dataItems?.[0]?.value
          : undefined;

    const controlledKey = toTabKey(controlledValue);
    const defaultKey = toTabKey(resolvedDefaultValue);

    const [internalActiveKey, setInternalActiveKey] = React.useState<string | undefined>(
      controlledKey ?? defaultKey
    );

    React.useEffect(() => {
      if (controlledKey !== undefined) {
        setInternalActiveKey(controlledKey);
      }
    }, [controlledKey]);

    const itemValueMap = React.useMemo(() => {
      const map = new Map<string, TabsValue>();
      dataItems?.forEach((item) => {
        map.set(String(item.value), item.value);
      });
      return map;
    }, [dataItems]);

    const referenceValue =
      controlledValue !== undefined
        ? controlledValue
        : defaultValue !== undefined
          ? defaultValue
          : dataItems?.[0]?.value;

    const handleValueChange = React.useCallback(
      (nextKey: string) => {
        setInternalActiveKey(nextKey);
        onValueChange?.(nextKey);

        const resolvedValue = itemValueMap.has(nextKey)
          ? (itemValueMap.get(nextKey) as TabsValue)
          : coerceValueByReference(nextKey, referenceValue);

        onChange?.(resolvedValue);
        setActiveTab?.(resolvedValue);
      },
      [itemValueMap, onChange, onValueChange, referenceValue, setActiveTab]
    );

    const activeKey = controlledKey ?? internalActiveKey;
    const shouldRenderAutoContent =
      hasItems &&
      Boolean(dataItems?.some((item) => item.content !== undefined) || renderContent);

    return (
      <TabsPrimitive.Root
        ref={ref}
        className={cx(
          "cz-tabs",
          `cz-tabs--variant-${resolvedVariant}`,
          `cz-tabs--size-${resolvedSize}`,
          fullWidth && "cz-tabs--full-width",
          !showBorder && "cz-tabs--no-border",
          className
        )}
        value={controlledKey}
        defaultValue={controlledKey === undefined ? defaultKey : undefined}
        onValueChange={handleValueChange}
        {...props}
      >
        {hasItems ? (
          <>
            <TabsList className={listClassName} style={listStyle}>
              {dataItems?.map((item) => {
                const itemKey = String(item.value);
                const isActive = activeKey === itemKey;
                const triggerNode = renderItem
                  ? renderItem(item, { isActive })
                  : item.label;

                return (
                  <TabsTrigger
                    key={itemKey}
                    value={item.value}
                    disabled={disabled || item.disabled}
                    icon={item.icon}
                    count={item.count}
                    className={cx(triggerClassName, item.className)}
                    style={{ ...triggerStyle, ...item.style }}
                  >
                    {triggerNode}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {shouldRenderAutoContent
              ? dataItems?.map((item) => {
                  const itemKey = String(item.value);
                  const isActive = activeKey === itemKey;
                  const content = renderContent
                    ? renderContent(item, { isActive })
                    : item.content;

                  if (content === undefined || content === null) return null;

                  return (
                    <TabsContent key={`content-${itemKey}`} value={item.value}>
                      {content}
                    </TabsContent>
                  );
                })
              : null}
          </>
        ) : null}

        {children}
      </TabsPrimitive.Root>
    );
  }
);
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
    className={cx("cz-tabs-list", className)}
    {...props}
  />
));
TabsList.displayName = "Tabs.List";

// ===== Trigger =====
export interface TabsTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>, "value"> {
  value: TabsValue;
  icon?: React.ReactNode;
  count?: React.ReactNode;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className = "", children, value, icon, count, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cx("cz-tabs-trigger", className)}
    value={String(value)}
    {...props}
  >
    {icon ? <span className="cz-tabs-trigger-icon">{icon}</span> : null}
    {children}
    {count !== undefined && count !== null ? (
      <span className="cz-tabs-trigger-count">{count}</span>
    ) : null}
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = "Tabs.Trigger";

// ===== Content =====
export interface TabsContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>, "value"> {
  value: TabsValue;
}

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className = "", value, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cx("cz-tabs-content", className)}
    value={String(value)}
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
