import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  size?: "sm" | "md" | "lg";
  label?: string;
  description?: string;
  labelPosition?: "left" | "right";
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ 
  className = "", 
  size = "md", 
  disabled, 
  checked,
  label,
  description,
  labelPosition = "right",
  ...props 
}, ref) => {
  const wrapperClasses = [
    "cz-switch",
    `cz-switch-${size}`,
    checked && "cz-switch-checked",
    disabled && "cz-disabled",
    className,
  ].filter(Boolean).join(" ");

  const switchElement = (
    <SwitchPrimitive.Root
      ref={ref}
      className={wrapperClasses}
      disabled={disabled}
      checked={checked}
      {...props}
    >
      <SwitchPrimitive.Thumb className="cz-switch-thumb" />
    </SwitchPrimitive.Root>
  );

  if (label || description) {
    const containerClasses = [
      "cz-switch-container",
      `cz-switch-label-${labelPosition}`,
      disabled && "cz-disabled",
    ].filter(Boolean).join(" ");

    return (
      <label className={containerClasses}>
        {labelPosition === "left" && (
          <div className="cz-switch-text">
            {label && <span className="cz-switch-label">{label}</span>}
            {description && <span className="cz-switch-description">{description}</span>}
          </div>
        )}
        {switchElement}
        {labelPosition === "right" && (
          <div className="cz-switch-text">
            {label && <span className="cz-switch-label">{label}</span>}
            {description && <span className="cz-switch-description">{description}</span>}
          </div>
        )}
      </label>
    );
  }

  return switchElement;
});

Switch.displayName = SwitchPrimitive.Root.displayName;
