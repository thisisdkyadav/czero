import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  size?: "sm" | "md" | "lg";
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className = "", size = "md", disabled, checked, ...props }, ref) => {
  const wrapperClasses = [
    "cz-switch",
    `cz-switch-${size}`,
    checked && "cz-switch-checked",
    disabled && "cz-disabled",
    className,
  ].filter(Boolean).join(" ");

  return (
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
});

Switch.displayName = SwitchPrimitive.Root.displayName;
