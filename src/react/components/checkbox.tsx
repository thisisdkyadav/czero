import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
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
);

const IndeterminateIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 6H9.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className = "", label, description, size = "md", disabled, checked, ...props }, ref) => {
  const wrapperClasses = [
    "cz-checkbox-wrapper",
    disabled && "cz-disabled",
    description && "cz-checkbox-wrapper-with-description",
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
      checked={checked}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="cz-checkbox-indicator">
        {checked === "indeterminate" ? (
          <IndeterminateIcon />
        ) : (
          <CheckIcon />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (label || description) {
    return (
      <label className={wrapperClasses}>
        {checkbox}
        <div className="cz-checkbox-text">
          {label && <span className="cz-checkbox-label">{label}</span>}
          {description && <span className="cz-checkbox-description">{description}</span>}
        </div>
      </label>
    );
  }

  return checkbox;
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;
