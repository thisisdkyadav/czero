import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

// ===== Root =====
export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  children: React.ReactNode;
  /** @deprecated Use SelectItem children instead */
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
  label?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
}

const SelectRoot: React.FC<SelectProps> = ({
  value,
  defaultValue,
  onValueChange,
  placeholder,
  disabled,
  children,
  options,
  label,
  error,
  size = "md",
}) => {
  // Support legacy options prop
  const hasLegacyOptions = options && options.length > 0;

  return (
    <div className="cz-flex cz-flex-col cz-gap-1.5">
      {label && <span className="cz-label">{label}</span>}
      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger className={`cz-select-${size}`}>
          <SelectPrimitive.Value placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {hasLegacyOptions
            ? options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </SelectItem>
              ))
            : children}
        </SelectContent>
      </SelectPrimitive.Root>
      {error && <span className="cz-error">{error}</span>}
    </div>
  );
};
SelectRoot.displayName = "Select";

// ===== Trigger =====
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className = "", children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={`cz-select ${className}`}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon className="cz-select-icon">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M3 4.5L6 7.5L9 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = "Select.Trigger";

// ===== Content =====
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className = "", children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={`cz-select-content ${className}`}
      position={position}
      sideOffset={4}
      {...props}
    >
      <SelectPrimitive.Viewport className="cz-select-viewport">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = "Select.Content";

// ===== Item =====
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className = "", children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={`cz-select-item ${className}`}
    {...props}
  >
    <span className="cz-select-item-indicator">
      <SelectPrimitive.ItemIndicator>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "Select.Item";

// ===== Separator =====
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className = "", ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={`cz-select-separator ${className}`}
    {...props}
  />
));
SelectSeparator.displayName = "Select.Separator";

// ===== Label =====
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className = "", ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={`cz-select-label ${className}`}
    {...props}
  />
));
SelectLabel.displayName = "Select.Label";

// ===== Group =====
const SelectGroup = SelectPrimitive.Group;

// ===== Export =====
export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
  Separator: SelectSeparator,
  Label: SelectLabel,
  Group: SelectGroup,
  Value: SelectPrimitive.Value,
});
