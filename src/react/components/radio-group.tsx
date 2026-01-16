import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

// ===== Root =====
export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  orientation?: "horizontal" | "vertical";
  /** @deprecated Use standard name attribute on form instead */
  name?: string;
}

const RadioGroupRoot = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className = "", orientation = "vertical", ...props }, ref) => {
  const classes = [
    "cz-radio-group",
    `cz-radio-group-${orientation}`,
    className,
  ].filter(Boolean).join(" ");

  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={classes}
      orientation={orientation}
      {...props}
    />
  );
});
RadioGroupRoot.displayName = "RadioGroup";

// ===== Item =====
export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: string;
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className = "", label, disabled, ...props }, ref) => {
  const wrapperClasses = [
    "cz-radio-wrapper",
    disabled && "cz-disabled",
  ].filter(Boolean).join(" ");

  return (
    <label className={wrapperClasses}>
      <RadioGroupPrimitive.Item
        ref={ref}
        className={`cz-radio ${className}`}
        disabled={disabled}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="cz-radio-indicator" />
      </RadioGroupPrimitive.Item>
      {label && <span className="cz-radio-label">{label}</span>}
    </label>
  );
});
RadioGroupItem.displayName = "RadioGroup.Item";

// ===== Export =====
export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
});
