import * as React from "react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  size?: "sm" | "md" | "lg";
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", label, size = "md", id, disabled, ...props }, ref) => {
    const checkboxId = id || React.useId();

    const wrapperClasses = [
      "cz-checkbox-wrapper",
      disabled && "cz-disabled",
      className,
    ].filter(Boolean).join(" ");

    const checkboxClasses = [
      "cz-checkbox",
      `cz-checkbox-${size}`,
    ].filter(Boolean).join(" ");

    return (
      <label className={wrapperClasses}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={checkboxClasses}
          disabled={disabled}
          {...props}
        />
        <span className="cz-checkbox-indicator" />
        {label && <span className="cz-checkbox-label">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
