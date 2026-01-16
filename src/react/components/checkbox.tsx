import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
  size?: "sm" | "md" | "lg";
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className = "", label, size = "md", disabled, ...props }, ref) => {
  const wrapperClasses = [
    "cz-checkbox-wrapper",
    disabled && "cz-disabled",
  ].filter(Boolean).join(" ");

  const checkboxClasses = [
    "cz-checkbox",
    `cz-checkbox-${size}`,
    className,
  ].filter(Boolean).join(" ");

  const checkbox = (
    <CheckboxPrimitive.Root
      ref={ref}
      className={checkboxClasses}
      disabled={disabled}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="cz-checkbox-indicator">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (label) {
    return (
      <label className={wrapperClasses}>
        {checkbox}
        <span className="cz-checkbox-label">{label}</span>
      </label>
    );
  }

  return checkbox;
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;
