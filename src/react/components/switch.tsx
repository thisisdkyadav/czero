import * as React from "react";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  size?: "sm" | "md" | "lg";
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className = "", size = "md", checked, disabled, ...props }, ref) => {
    const wrapperClasses = [
      "cz-switch",
      `cz-switch-${size}`,
      checked && "cz-switch-checked",
      disabled && "cz-disabled",
      className,
    ].filter(Boolean).join(" ");

    return (
      <label className={wrapperClasses}>
        <input
          ref={ref}
          type="checkbox"
          className="cz-switch-input"
          checked={checked}
          disabled={disabled}
          {...props}
        />
        <span className="cz-switch-track">
          <span className="cz-switch-thumb" />
        </span>
      </label>
    );
  }
);

Switch.displayName = "Switch";
